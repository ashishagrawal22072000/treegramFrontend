import { useEffect, useState } from "react";
import feedApi from "../../api/feedApi";
import "./CreateModel.css";
import _ from "lodash";
import Notify from "../../core/Toast";
import { FileUploader } from "react-drag-drop-files";
import DragIcon from "../../assets/images/img/photo-and-video.svg"
const Step1 = ({ postData, setPostData, step, setStep }) => {
  const fileTypes = ["JPEG", "PNG", "GIF", "MP4"];

  const handleChange = async (file) => {
    if (file) {
      let formData = new FormData();
      _.forEach(file, (file) => {
        formData.append("file", file);
      });
      const res = await feedApi.uploadFile(formData);
      if (res.success) {
        setPostData({ ...postData, media: [...postData.media, ...res.data] });
        setStep(step + 1);
      } else {
        Notify("error", res.data.message);
      }
    }
  };
  return (
    <>
    <div className="step1_container">
    <img src={DragIcon} />
    <h2>Drag Photos or videos Here</h2>
    <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
      
      {/* <form>

                <input id="upload" type="file" accept="image/png, image/jpeg, video/mp4" multiple onChange={handleChange} />
                <label class="button" for="upload">Select File</label>
            </form> */}
    </>
  );
};
export default Step1;
