import React, {useState} from 'react';
import Modal from 'react-modal';
import WelcomeMessage from './ModalContent'

function ModalInFunctionalComponent (){

    const [modalIsOpen,setModalIsOpen] = useState(true);
    // console.log(visited)
   
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return(
        <>
            {/* <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button> */}

            <Modal isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <WelcomeMessage/>
            </Modal>
        </>
    )
}
export default ModalInFunctionalComponent;