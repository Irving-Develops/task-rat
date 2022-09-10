import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import '../Profile/profilereviews.css';

function EditReviewFormModal({taskId, review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='review-profile-btns' onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm toggleShow={setShowModal} reviewProp={review}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;
