import React, { useState } from 'react';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Button/Button';

const ProfileEditor = (props) => {
  const [photo, setPhoto] = useState('');

  return (
    <div>
      <Input
        value={photo}
        onChange={event => setPhoto(event.target.value)}
        placeholder={'New Photo URL'} />
      <Button onClick={() => props.submitPhoto(photo)}>Submit</Button>

    </div>
  );
}

export default ProfileEditor;