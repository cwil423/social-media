import React, { useState } from 'react';

const ProfileEditor = (props) => {
  const [userName, setUserName] = useState('');
  const [photo, setPhoto] = useState('');

  return (
    <div>
      <input
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder={'New User Name'} />
      <button onClick={() => props.submitName(userName)}>Submit</button>
      <input
        value={photo}
        onChange={event => setPhoto(event.target.value)}
        placeholder={'New Photo URL'} />
      <button onClick={() => props.submitPhoto(photo)}>Submit</button>

    </div>
  );
}

export default ProfileEditor;