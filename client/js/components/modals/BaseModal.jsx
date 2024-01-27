import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

const BaseModal = ({show, setShow, title, children}) => {
  return (
    <Modal backdrop="static" centered onHide={() => setShow(false)} {...{show}}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

BaseModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  show: PropTypes.bool,
  setShow: PropTypes.func
};

export default BaseModal;
