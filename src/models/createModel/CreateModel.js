import React, { useEffect, useState } from "react";
import DeleteIcon from "../../assets/images/img/delete.svg";
import Multistep from "react-multistep";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Modal from "react-modal";
import Step3 from "./Step3";
import PreviousIcon from "../../assets/images/img/left.svg";
import NextIcon from "../../assets/images/img/right.svg";
import SendIcon from "../../assets/images/img/send.svg"
const CreateModel = ({ modalIsOpen, setIsOpen, post_id }) => {
  // const steps = [
  //     { title: 'StepOne', component: <Step1 /> },
  //     { title: 'StepTwo', component: <Step2 /> },
  // ];
  const [step, setStep] = useState(1);
  useEffect(() => {
    setStep(1);
  }, []);

  const [postData, setPostData] = useState({
    media: [],
    tags: [],
    content: "",
    location: "",
    hashTags: [],
    comment_status: false,
    like_status: false,
  });

  function showComponent() {
    switch (step) {
      case 1:
        return (
          <Step1
            postData={postData}
            setPostData={setPostData}
            step={step}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <Step2
            postData={postData}
            setPostData={setPostData}
            step={step}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Step3
            postData={postData}
            setPostData={setPostData}
            step={step}
            setStep={setStep}
          />
        );
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
      height: "80%",
      width: "80%",
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
          <div className="model_btn">
            <button style={{visibility : step == 1 ? "hidden" : "visible"}} onClick={() => setStep(step == 1 ? 1 : step - 1)}>
              <img src={PreviousIcon} height={25} width={25} />
            </button>
            <button className="btn_icon" onClick={() => setStep(step == 3 ? 1 : step + 1)}>
              {step == 3 ? <img src={SendIcon} height={25} width={25} /> : <img src={NextIcon} height={25} width={25} />}
            </button>
          </div>

          <form>{showComponent()}</form>
        </div>
      </Modal>
    </>
  );
};
export default CreateModel;
