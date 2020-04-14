import React, { useState } from 'react';

const ProfileEditor = (props) => {
  const [userName, setUserName] = useState('')

  return (
    <div>
      <input
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder={'New User Name'} />
      <button onClick={() => props.submitName(userName)}>Submit</button>
    </div>
  );
}

export default ProfileEditor;