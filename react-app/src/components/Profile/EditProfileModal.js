import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditProfileForm from './EditProfileForm';

function EditProfileFormModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <button id="profile-edit-btn" onClick={() => setShowModal(true)}>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileForm user={sessionUser} toggleShow={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditProfileFormModal;
