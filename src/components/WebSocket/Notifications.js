import React, { useState,useRef, useEffect  } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceHolder from '../WebSocket/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../WebSocket/SendMessagePlaceholder';
import UsernamePlaceholder from '../WebSocket/UsernamePlaceholder';
import './Notifications.css';


function Notifications() {
    const [stompClient, setStompClient] = useState();
    const [username, setUsername] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const setupStompClient = (username) => {
   
      const stompClient = new Client({
        brokerURL: 'ws://localhost:8081/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      });
  
      stompClient.onConnect = () => {
        // subscribe to the backend public topic
        stompClient.subscribe('/topic/public-messages', (data) => {
          console.log(data);
          onMessageReceived(data);
        });
  
        // subscribe to the backend "private" topic
        stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
          onMessageReceived(data);
        });
      };
  
      // initiate client
      stompClient.activate();
  
      // maintain the client for sending and receiving
      setStompClient(stompClient);
    };
  
    // send the data using Stomp
    const sendMessage = (newMessage) => {
      const payload = {
         'id': uuidv4(),
          'from': username, 
          'to': newMessage.to, 
          'text': newMessage.text
         };
      if (payload.to) {
        stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
      } else {
        stompClient.publish({ 'destination': '/topic/public-messages', body: JSON.stringify(payload) });
      }  setSentMessages((sentMessages) => [...sentMessages, payload]);
    };
  
 
    const onMessageReceived = (data) => {
      const message = JSON.parse(data.body);
      if (message.to === username) {
        setSentMessages((sentMessages) => [...sentMessages, message]);
      } else {
      setMessagesReceived(messagesReceived => [...messagesReceived, message]);
      }
    };
  
    const onUsernameInformed = (username) => {
      setUsername(username);
      setupStompClient(username);
    }
  
    return (
      <div className="notifications">
      <div className="notification-content">
      <UsernamePlaceholder
          className="username-placeholder"
          username={username}
          onUsernameInformed={onUsernameInformed}
        /> <br></br>
      
        <SendMessagePlaceholder
          className="send-message-placeholder"
          username={username}
          onMessageSend={sendMessage}
        />
        <br></br>
        <div>
        <ChatMessagesPlaceHolder
          className="chat-messages-placeholder"
          username={username}
          sentMessages={sentMessages}
          messagesReceived={messagesReceived}
        />
        <b></b>
        </div>
      </div>
    </div>
    
    );
  
}

export default Notifications;