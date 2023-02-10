import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'
import { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Carousel } from 'react-responsive-carousel'
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux'
import UserApi from '../../api/UserApi'
const Step2 = ({ postData, setPostData, step, setStep }) => {
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState("")
    const [tags, setTags] = useState([]);
    const { auth } = useSelector(state => state.AuthReducer);
    const { following } = useSelector(state => state.ListReducer);
    const [show, setShow] = useState(false)
    const [people, setPeople] = useState([])
    const [searchValue, setSearchValue] = useState(null);
    const [data, setData] = useState([])
    const [coordinate, setCoordinate] = useState({
        coordinate_x: 0,
        coordinate_y: 0,
    })
    const handleChange = async (e) => {
        setSearchValue(e.target.value)
        const response = await UserApi.searchUser(auth?.token, e.target.value)
        if (response.success) {
            setData(response.data)
        } else {
            setData([])
        }

    }

    const handleSubmit = (username) => {
        // const element = document.getElementById(selectedImage);
        // var position = element.getBoundingClientRect();
        // var x = element.x - position.x;
        // var y = element.y - position.y;
        const data = { username, media_url: selectedImage, coordinate_x: coordinate.coordinate_x, coordinate_y: coordinate.coordinate_y }
        setTags([...tags, data])
        setShow(false)
        setSearchValue("")
        setData([])

    }

    console.log(tags)

    useEffect(() => {
        setSelectedImage(postData.media[0])
    }, [])


    return (

        <>
            <div className="post_media">
                <div className="main-container">
                    <img src={selectedImage} width="100%" onClick={() => show ? setShow(false) : setShow(true)} onMouseMove={(e) => {
                        console.log(e)
                        setCoordinate({
                            coordinate_x: e.clientX,
                            coordinate_y: e.clientY,
                        })
                    }} />
                    <h4>Click anywhere to tag people</h4>
                    {show &&
                        <>
                            <div >
                                <input type="text" value={searchValue} onChange={handleChange} />
                                <div className="">
                                    {data.map((ele) => {
                                        return (
                                            <>
                                                <h4 onClick={() => handleSubmit(ele.username)}>{ele.username}</h4>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                        </>}
                </div>
                <br />
                {postData.media.map((ele) => {
                    return (
                        <>
                            <img id={ele} src={ele} onClick={(e) => { setSelectedImage(ele) }} />
                            {tags && tags.map((el) => {
                                return (
                                    <>
                                        {el.media_url == selectedImage ? <>
                                            <p className="small-tooltip" style={{
                                                position: 'absolute',
                                                top: el.coordinate_y,
                                                left: el.coordinate_x,
                                                color: "blue"
                                            }}>{el.username}</p>
                                        </> : ""}

                                    </>
                                )
                            })}
                        </>
                    )
                })}
            </div>

        </>
    )
}
export default Step2