import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
import '../Profile/profilereviews.css';

function ReviewFormModal({taskId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='review-profile-btns' onClick={() => setShowModal(true)}>Leave a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal} taskId={taskId}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
