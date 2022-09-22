import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import '../Profile/profilereviews.css';

function EditReviewFormModal({taskId, review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='review-edit-btn-div'>
        <button className='review-profile-btns' onClick={() => setShowModal(true)}>Edit Review</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm toggleShow={setShowModal} reviewProp={review}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;
