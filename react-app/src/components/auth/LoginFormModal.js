import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ task }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {task ? <button onClick={() => setShowModal(true)}>Login To Claim A Task</button> : <button onClick={() => setShowModal(true)}>Login</button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
