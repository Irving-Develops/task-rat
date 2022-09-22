import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UsersProfiles from './UsersProfiles';

function UsersProfileModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="view-profile-btn" onClick={() => setShowModal(true)}> View {user.first_name}'s Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div id="user-profile-modal">
            <UsersProfiles user={user} setShowModal={setShowModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default UsersProfileModal;
