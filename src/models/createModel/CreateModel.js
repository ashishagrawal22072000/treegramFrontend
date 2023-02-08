import React, { useEffect, useState } from "react";
import DeleteIcon from "../../assets/images/img/delete.svg";
import Multistep from 'react-multistep'
import Step1 from "./Step1";
import Step2 from "./Step2";
import Modal from "react-modal";
const CreateModel = ({ modalIsOpen, setIsOpen, post_id }) => {
    // const steps = [
    //     { title: 'StepOne', component: <Step1 /> },
    //     { title: 'StepTwo', component: <Step2 /> },
    // ];
    const [step, setStep] = useState(1);
    useEffect(() => {
        setStep(1)
    }, [])

    const [postData, setPostData] = useState({
        media: []
    })

    function showComponent() {
        switch (step) {
            case 1:
                return <Step1 postData={postData} setPostData={setPostData} />
            case 2:
                return <Step2 postData={postData} setPostData={setPostData} />
        }
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "50%",
            width: "50%",
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <Multistep activeStep={0} steps={steps} /> */}
                <div className="create_model">
                    <button onClick={() => setStep(step == 2 ? 1 : step + 1)}>Next</button>
                    <button onClick={() => setStep(step == 1 ? 1 : step - 1)}>Prev</button>
                    <form>
                        {showComponent()}

                    </form>

                </div>

            </Modal>
        </>
    );
};
export default CreateModel;
