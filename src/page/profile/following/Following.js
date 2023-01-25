import React from 'react';
import "./Follower.css"
const Following = () => {
    return (
        <>
            <div className='container'>
                <div className='follower_container'>
                    <div className='follower'>
                        <div className='follower_profile'>
                            <img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" alt />
                        </div>
                        <div>
                            <h3>username</h3>
                            <p>Name</p>
                        </div>
                    </div>
                    <button>Remove</button>
                </div>
                <div className='follower_container'>
                    <div className='follower'>
                        <div className='follower_profile'>
                            <img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" alt />
                        </div>
                        <div>
                            <h3>username</h3>
                            <p>Name</p>
                        </div>
                    </div>
                    <button>Remove</button>
                </div>
                <div className='follower_container'>
                    <div className='follower'>
                        <div className='follower_profile'>
                            <img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" alt />
                        </div>
                        <div>
                            <h3>username</h3>
                            <p>Name</p>
                        </div>
                    </div>
                    <button>Remove</button>
                </div>
            </div>
        </>

    )
}
export default Following;