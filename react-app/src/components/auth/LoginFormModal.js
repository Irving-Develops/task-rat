import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ task, modalCheck }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {task ?
        modalCheck ?
          <button id='claim-task-modal' onClick={() => setShowModal(true)}>[Login To Claim A Task]</button>
        :
          <button onClick={() => setShowModal(true)}>Login To Claim A Task</button>
      :
        <button onClick={() => setShowModal(true)}>Login</button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} modalCheck={modalCheck}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
