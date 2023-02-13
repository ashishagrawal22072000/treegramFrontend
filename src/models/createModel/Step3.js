import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import EmojiPicker from 'emoji-picker-react';
import Emoji from "../../assets/images/img/happy.svg"
const Step3 = ({postData, setPostData}) =>{
    const [content, setContent] = useState("")
    const [emojiShow, setEmojiShow] = useState(false)

const getHashtag = (e) =>{
    e.preventDefault()
    const data = content.split(" ")
    const hashtag = data.filter((ele) =>{
        return ele[0] == '#'
    }).map((el) =>{
        return el.slice(1)
    })

}
    return (
        <>
        <div className="create_post_container3">
            <div className="create_post_content1">
            <Carousel>
            {postData.media.map((ele) =>{
                return (
                    <>
                    <img src={ele} />
                    </>
                )
            })}
        </Carousel>
            </div>
            <div className="create_post_content2">
                <form>
                    <textarea placeholder='Content Here' value={postData.content} onChange={(e) => setPostData({...postData, content : e.target.value})} />
                    <img src={Emoji} height="20px" width="20px" onClick={() => emojiShow ? setEmojiShow(false) : setEmojiShow(true)} />
                    {emojiShow && 
                    <EmojiPicker searchDisabled={true} onEmojiClick={(e) => setPostData({...postData, content : postData.content + e.emoji})}/>
                    }
                    <input type="text" placeholder="Location" onChange={(e) => setPostData({...postData, location : e.target.value})} value={postData.location} />
                </form>
            </div>

        
        </div>
        
        </>
    )
}
export  default Step3;