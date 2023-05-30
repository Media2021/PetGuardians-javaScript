
import './Notifications.css';



const UsernamePlaceholder = (props) => {
    if (props.username) {
      return (<h2 className="username-header">my username : {props.username}</h2>)
    }

    return (
      <>
        <label htmlFor='username'className="username-label">Username : </label>
        <input id='username' type='text' onBlur={(event) => props.onUsernameInformed(event.target.value)} />
      </>
    );
  }

  export default UsernamePlaceholder;