import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UsersProfiles from './UsersProfiles';

function UsersProfileModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Mercenary: {user.first_name} {user.last_name}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UsersProfiles user={user} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UsersProfileModal;
