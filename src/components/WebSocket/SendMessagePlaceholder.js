import { useState } from "react";
import './Notifications.css';

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');
  const [destinationUsername, setDestinationUsername] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }

    props.onMessageSend({ 'text': message, 'to': destinationUsername });
    setMessage('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="FromTo">
        <label className="username-label" htmlFor='message'>Type ur SMS:  </label>
        <input id='message' type='text' className="message-input" onChange={(event) => setMessage(event.target.value)} value={message} />
      </div>
      <div className="FromTo">
        <label htmlFor='destUsername' className="username-label"> Send to : </label>
        <input id='destUsername' type='text' className="destination-input" onChange={(event) => setDestinationUsername(event.target.value)} />
      
      <button className="send-button " onClick={onMessageSend}>Send</button></div>
    </form>
  );
}

export default SendMessagePlaceholder;