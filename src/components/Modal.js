// src/components/Modal.js
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, content }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>Error</h2>
      <div>{content}</div>
      <button onClick={onRequestClose}>Close</button>
    </ReactModal>
  );
};

export default Modal;
