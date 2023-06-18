import { useState, useEffect } from "react";
import './Notifications.css';
import UserService from "../../services/UserService";
import { Combobox } from 'react-widgets';

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');
  const [destinationUsername, setDestinationUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);

  useEffect(() => {
    fetchUsernames();
  }, []);

  const fetchUsernames = async () => {
    try {
      const response = await (props.isAdmin
        ? UserService.getUsersWithUsernames()
        : UserService.getUsersWithUsernames());
      console.log('Response:', response);
      if (Array.isArray(response)) {
        const usernames = response;
        console.log('Usernames:', usernames);
        setUsernames(usernames);
        setFilteredUsernames(usernames);
      } else {
        console.error('Error: Invalid response format');
      }
    } catch (error) {
      console.error('Error while getting usernames: ', error);
    }
  };

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }

    props.onMessageSend({ 'text': message, 'to': destinationUsername });
    setMessage('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getUsernameStyle = () => {
    return {
      fontSize: '16px',
      fontWeight: 'bold',
    };
  };

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const filtered = usernames.filter((username) =>
      username.toLowerCase().includes(searchTerm)
    );
    setFilteredUsernames(filtered);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="FromTo">
        <label className="username-label" htmlFor="message">
          Type your SMS:
        </label>
        <input
          id="message"
          type="text"
          className="message-input"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
      </div>
      <div className="FromTo">
        <label htmlFor="destUsername" className="username-label">
          Send to:
        </label>
        <Combobox
          id="destUsername"
          data={filteredUsernames}
          value={destinationUsername}
          textField="name"
          filter="contains"
          placeholder="Select a username"
          onChange={(value) => setDestinationUsername(value)}
          onSearch={handleSearch}
          style={{ backgroundColor: 'antiquewhite' }}
        />
        <button className="send-button" onClick={onMessageSend}>
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessagePlaceholder;
