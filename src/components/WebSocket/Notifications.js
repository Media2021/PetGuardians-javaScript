import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceHolder from '../WebSocket/ChatMessagesPlaceHolder';
import UsernamePlaceholder from '../WebSocket/UsernamePlaceholder';
import SendMessagePlaceholder from '../WebSocket/SendMessagePlaceholder';
import './Notifications.css';
import smileyImage from '../WebSocket/yeeee.jfif';


function Notifications({ username }) {
  const [stompClient, setStompClient] = useState(null);
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [storedUsername, setStoredUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    if (storedUsername && !stompClient) {
      const client = new Client({
        brokerURL: 'ws://localhost:8081/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = () => {
        // subscribe to the backend public topic
        client.subscribe('/topic/public-messages', (data) => {
          console.log(data);
          onMessageReceived(data);
        });

        // subscribe to the backend "private" topic
        client.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
          onMessageReceived(data);
        });
      };

      client.activate();
      setStompClient(client);
    }
  }, [username, stompClient]);

  const sendMessage = (newMessage) => {
    if (stompClient) {
      const payload = {
        id: uuidv4(),
        from: username,
        to: newMessage.to,
        text: newMessage.text,
      };
      if (payload.to) {
        stompClient.publish({
          destination: `/user/${payload.to}/queue/inboxmessages`,
          body: JSON.stringify(payload),
        });
      } else {
        stompClient.publish({
          destination: '/topic/public-messages',
          body: JSON.stringify(payload),
        });
      }
      setSentMessages((sentMessages) => [...sentMessages, payload]);
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);

    if (message.from === username) {
      // Ignore messages sent by the current user
      return;
    }

    if (message.from === username) {
      setSentMessages((sentMessages) => [...sentMessages, message]);
    } else {
      setMessagesReceived((messagesReceived) => {
        if (!messagesReceived.find((msg) => msg.id === message.id)) {
          return [...messagesReceived, message];
        }
        return messagesReceived;
      });
    }
  };

  return (
    <div className="notifications">
      <div className="notification-content">
        <div className="FromTo">
          <label className="username-label text-green-900 " htmlFor="username" style={{ fontSize: '15px' }}>
          WhatsApp: {storedUsername} <img src={smileyImage} alt="smiley"  style={{ width: '130px', height: '100px' }}  />
          </label>
        </div>
        <br />
        <br />
        <SendMessagePlaceholder
          className="send-message-placeholder"
          username={username}
          onMessageSend={sendMessage}
        />
        <br />
        <ChatMessagesPlaceHolder
          className="chat-messages-placeholder"
          username={username}
          sentMessages={sentMessages}
          messagesReceived={messagesReceived}
        />
      </div>
    </div>
  );
}

export default Notifications;
