import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceHolder from '../WebSocket/ChatMessagesPlaceHolder';
import UsernamePlaceholder from '../WebSocket/UsernamePlaceholder';
import SendMessagePlaceholder from '../WebSocket/SendMessagePlaceholder';
import './Notifications.css';

function Notifications() {
  const [stompClient, setStompClient] = useState(null);
  const [username, setUsername] = useState(() => sessionStorage.getItem('username') || '');
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    sessionStorage.setItem('username', username);

    if (username && !stompClient) {
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
  

  const onUsernameInformed = (username) => {
    setUsername(username);
  };

  return (
    <div className="notifications">
      <div className="notification-content">
        <UsernamePlaceholder
          className="username-placeholder"
          username={username}
          onUsernameInformed={onUsernameInformed}
        />
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
