import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ message, type, duration = 3000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastStyle = type === 'error' 
    ? { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' } 
    : { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' };

  return (
    <Toast
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 9999,
        ...toastStyle,
      }}
      show={show}
      onClose={() => setShow(false)}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;