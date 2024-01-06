import ReactDOM from 'react-dom';

import { useEffect } from 'react';
import classes from './showModal.module.css'

const ShowModal = (props) => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    }
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={classes.modalWrapper} onClick={props.onClose}></div>
      <div className={classes.modalContainer}>
        {props.children}
      </div>
    </>,
    document.querySelector('.myPortalModalDiv')
  );
};

export default ShowModal;
