import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children, className }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" />
      <div id="modal-background-2" />
      <div id='modal-pipboy' onClick={onClose}></div>
      <div className={`${className} screen`} id="modal-content">
        {children}
      </div>
        {/* <img src='../images/pipboy-transparency-v_1.1.png' alt='pipboy'/> */}
    </div>,
    modalNode
  );
}
