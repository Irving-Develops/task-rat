import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UsersProfiles from './UsersProfiles';

function UsersProfileModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}> View {user.first_name}'s Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UsersProfiles user={user} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UsersProfileModal;
