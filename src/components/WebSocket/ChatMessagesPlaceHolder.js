import React from 'react';
import './Notifications.css';

const MessageReceived = (props) => {
  return (
    <div className="message-received">
      <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
    </div>
  );
};

const MessageSent = (props) => {
  return (
    <div className="message-sent">
      <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
    </div>
  );
};

const ChatMessagesPlaceholder = (props) => {
  const {  sentMessages, messagesReceived } = props;
  
  const combinedMessages = [];
  let sentIndex = 0;
  let receivedIndex = 0;

  // Merge sent and received messages in alternating order
  while (sentIndex < sentMessages.length || receivedIndex < messagesReceived.length) {
    if (sentIndex < sentMessages.length) {
      combinedMessages.push(sentMessages[sentIndex]);
      sentIndex++;
    }
    if (receivedIndex < messagesReceived.length) {
      combinedMessages.push(messagesReceived[receivedIndex]);
      receivedIndex++;
    }
  }

  return (
    <div className="messages-container">
      <h2 className="h2">Messages:</h2>
      {combinedMessages.map((message) => {
        if (message.from === props.username) {
          return (
            <MessageSent
              key={message.id}
              from={message.from}
              text={message.text}
              direct={message.to.includes(props.username)}
            />
          );
        } else {
          return (
            <MessageReceived
              key={message.id}
              from={message.from}
              text={message.text}
              direct={message.to.includes(props.username)}
            />
          );
        }
      })}
    </div>
  );
};

export default ChatMessagesPlaceholder;