import React, { useState  } from 'react';

import { Modal, Button, Input } from 'react-bootstrap';


export default function ItemModal(props){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


return (
    <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body><img src={props.img} alt="" /></Modal.Body>
    <Modal.Footer>
    <input type="number"  id="spinner-input"  min="0" max="20" step="1" pattern="[0-9]*" role="alert" aria-live="assertlive" />
      
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

}