import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

function ReviewFormModal({taskId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Leave a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal} taskId={taskId}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
