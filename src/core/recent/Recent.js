import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiBadgeCheck } from "react-icons/hi"
import { ImBin } from "react-icons/im"
import "./Recent.css"
import { removeSearch } from '../../store/list/ListAction';
import { NavLink } from "react-router-dom"
import Dustbin from "../../assets/images/img/delete.svg"
const Recent = () => {
    const { search } = useSelector(state => state.ListReducer)
    const dispatch = useDispatch()
    const removeUser = (user_id) => {
        dispatch(removeSearch(user_id))
    }
    return (
        <>
            <div className='recent_container'>
                <h2>Recent</h2>
                <br />
                {!search.length ? <>No Recent Found</> : <>
                    {search.map((ele) => {
                        return (
                            <>
                                <div className='recent_data'>
                                    <div class="user_content">
                                        <div class="user_profile">
                                            <NavLink to={`/profile/${ele.username}`}><img src={ele.profile} /></NavLink>

                                        </div>
                                        <div class="user_detail">
                                            <p className="paragraph">{ele.username}{ele.badge ? <span><HiBadgeCheck color="#645bff" size="20" /></span> : ""}</p>
                                            <p className="paragraph">{ele.email}</p>
                                        </div>
                                    </div>
                                    <img src={Dustbin} width="25" height="25" onClick={() => removeUser(ele._id)} />
                                    {/* <ImBin size={20} /> */}
                                </div>
                            </>
                        )
                    })}
                </>}

            </div>
        </>
    )
}

export default Recent