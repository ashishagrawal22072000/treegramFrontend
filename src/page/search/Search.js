import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../api/UserApi';
import { HiBadgeCheck } from "react-icons/hi"
import Recent from '../../core/recent/Recent';
import { NavLink } from 'react-router-dom';
import { addSearch } from '../../store/list/ListAction';
import "./Search.css"
import ButtonLoader from '../../core/button-loader/ButtonLoader';
import InnerNavbar from '../../core/innerNavbar/InnerNavbar';
import SideNavbar from '../../core/sideNavbar/SideNavbar';
const Search = () => {
    const [loading, setLoading] = useState(false);
    const { auth } = useSelector(state => state.AuthReducer)
    const [data, setData] = useState([])
    const [error, setError] = useState('');
    const [searchValue, setSearchValue] = useState(null);
    const [showRecent, setShowRecent] = useState(true)
    const dispatch = useDispatch()
    const handleChange = async (e) => {
        setLoading(true)
        setSearchValue(e.target.value)
        const response = await UserApi.searchUser(auth?.token, e.target.value)
        if (response.success) {
            setLoading(false)
            setData(response.data)
            setShowRecent(false)
        } else {
            setLoading(false)
            setShowRecent(true)
            setData([])
        }

    }

    const addSearchList = (data) => {
        dispatch(addSearch(data))
    }

    return (

        <>
            <div className="search">
                <div className="container">
                    <SideNavbar />
                    <div className="middle">
                        <div className="search_content">
                            <div className='search_input'>
                                <input type="search" className="input_field" placeholder="Search by username, email" value={searchValue} onChange={handleChange} />
                                {loading ? <div className="loading"><ButtonLoader style={{ color: 'black' }} /></div> : ''}
                            </div>

                            <hr />
                            <div className="search_container">
                                {data && data?.map((ele) => {
                                    return (
                                        <>
                                            <div class="user_content">
                                                <div class="user_profile">
                                                    <NavLink to={`/profile/${ele?.username}`}><img src={ele.profile} onClick={() => addSearchList(ele)} /></NavLink>
                                                </div>
                                                <div class="user_detail">
                                                    <p className="paragraph">{ele.username}{ele.badge ? <span className="badge"><HiBadgeCheck size="20" /></span> : ""}</p>
                                                    <p className="paragraph">{ele.email}</p>
                                                </div>
                                            </div>
                                            <br />

                                        </>

                                    )
                                })}

                                {showRecent ? <Recent /> : <>
                                    <h2>No Result Found</h2>
                                </>}
                            </div>
                        </div>

                    </div>

                    <div className="right">
                        <h2>Suggestions</h2>
                        <div className="suggestion">

                            <div class="user_content">
                                <div class="user_profile">
                                    <NavLink><img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" /></NavLink>
                                </div>
                                <div class="user_detail">
                                    <p className="paragraph">A_12shish<span><HiBadgeCheck color="#645bff" size="20" /></span></p>
                                    <p className="paragraph">Ashish</p>
                                </div>
                            </div>
                            <button className="btn">Follow</button>


                        </div>
                        <div className="suggestion">

                            <div class="user_content">
                                <div class="user_profile">
                                    <NavLink><img src="http://localhost:8000/api/v1/image/1674124163743-image-3551739.jpg" /></NavLink>
                                </div>
                                <div class="user_detail">
                                    <p className="paragraph">A_12shish<span><HiBadgeCheck color="#645bff" size="20" /></span></p>
                                    <p className="paragraph">Ashish</p>
                                </div>
                            </div>
                            <button className="btn">Follow</button>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Search;