import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditTaskForm from '../editTaskForm/editTaskForm';

function EditTaskFormModal({task}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='single-task-edit-btns' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditTaskForm task={task} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditTaskFormModal;
