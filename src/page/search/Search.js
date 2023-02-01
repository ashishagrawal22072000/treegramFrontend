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
            <div className="container">
                <div className="search">
                    <div className='search_input'>
                        <input type="search" className="input_field" placeholder="Search by username, email" value={searchValue} onChange={handleChange} />
                        {loading ? <div className="loading"><ButtonLoader style={{ color: 'black' }} /></div> : ''}
                    </div>

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
                                        <p className="paragraph">{ele.username}{ele.badge ? <span><HiBadgeCheck color="#645bff" size="20" /></span> : ""}</p>
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
                <InnerNavbar />
            </div>
        </>
    )
}
export default Search;