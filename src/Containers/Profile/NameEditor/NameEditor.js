import React, { useState } from 'react';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Button/Button';

const ProfileEditor = (props) => {
  const [userName, setUserName] = useState('');

  return (
    <div>
      <Input
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder={'New User Name'} />
      <Button onClick={() => props.submitName(userName)}>Submit</Button>

    </div>
  );
}

export default ProfileEditor;