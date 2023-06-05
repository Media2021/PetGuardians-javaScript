import './Notifications.css';

const UsernamePlaceholder = (props) => {
  if (props.username) {
    return (
      <h2 className="username-header">My username: {props.username}</h2>
    );
  }

  return (
    <div className="FromTo">
      <label htmlFor="username" className="username-label">
        Username:
      </label>
      <input
        id="username"
        className="message-input"
        type="text"
        value={props.username}
        onChange={(event) => props.onUsernameInformed(event.target.value)}
      />
    </div>
  );
}

export default UsernamePlaceholder;
