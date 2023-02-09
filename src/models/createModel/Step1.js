import { useEffect, useState } from "react"
import feedApi from "../../api/feedApi"
import "./CreateModel.css"
import _ from "lodash"
import Notify from "../../core/Toast"
const Step1 = ({ postData, setPostData, step, setStep }) => {
    const handleChange = async (e) => {

        // let formData = new FormData();
        // _.forEach(e.target.files, file => {
        //     console.log(file)
        //     formData.append("file", file)
        // })
        console.log(e.target.files)
        if (e.target.files.length) {
            console.log(Object.values(e.target.files))
            setPostData({ ...postData, media: Object.values(e.target.files) })
            setStep(step + 1)
            // const res = await feedApi.uploadFile(formData)
            // if (res.success) {
            //     setPostData({ ...postData, media: res.data })
            //     
            // } else {
            //     Notify("error", res.data.message)
            // }
        } else {
            Notify("error", "Please select a file")
        }
        // 



        // console.log(e.target.files)
        // let picture = []
        // for (let i = 0; i < e.target.files.length; i++) {
        //     picture.push(e.target.files[i])
        // }
        // console.log(picture)
        // // setPicture([...picture, ...e.target.files[0]])
        // let data = new FormData();
        // picture.forEach(image => {
        //     console.log(image.name)
        //     data.append('file', {
        //         fileName: image.name
        //     })
        // })
        // // picture.forEach((ele) => {
        // //     formData.append(key, value);
        // //   });
        // console.log(data, "fhgfjhebfjbre")
        // // const res = feedApi.uploadFile()
    }
    // console.log(picture)
    return (
        <>
            <form>

                <input id="upload" type="file" accept="image/png, image/jpeg, video/mp4" multiple onChange={handleChange} />
                <label class="button" for="upload">Select File</label>
            </form>
        </>
    )
}
export default Step1