import React, { useState } from "react";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Form,
   FormGroup,
   Input,
} from "reactstrap";

const SignInModal = () => {
    const [modal, setModal] = useState(false);


    const toggle = () => {
        setModal(!modal);
    }

   return (
      <div className="signin-modal">
         <div className="signin-option-text">
            <p>already have an account?</p>
            <p id="signin-p" onClick={() => toggle()}>Sign In</p>
         </div>

         <Modal isOpen={modal} modalClassName="text-center">
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
               <Form onSubmit={() => console.log("Submit")}>
                  <FormGroup>
                     <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="mb-3"
                        // onChange={(e) => onChange(e)}
                     />
                     <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mb-3"
                        // onChange={(e) => onChange(e)}
                     />
                     <Button>Submit</Button>
                  </FormGroup>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default SignInModal;
