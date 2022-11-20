import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import app from '../../Hook/firebaseConfig';


const ResetPassword = (props) => {

    const auth = getAuth(app);
    const [email,setEmail] = useState("");

    const handleResetPass = () =>{

        sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    props.onHide();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

} 

    return (
        <div>
             <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
             <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Forget password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h5 className='text-danger'>Reset your Password</h5>
      <input
      onBlur={(e)  =>setEmail(e.target.value)}
       type="email" className='from-control p-2 mt-3'name="" placeholder='Email' id="" />
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Update</Button> */}
        <Button onClick={handleResetPass}>Update</Button>
      </Modal.Footer>
    </Modal>
            
        </div>
    );
};

export default ResetPassword;