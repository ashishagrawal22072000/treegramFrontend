import React from 'react';
import InnerNavbar from '../../core/innerNavbar/InnerNavbar';
import SideNavbar from '../../core/sideNavbar/SideNavbar';
import ChangePassword from './change-password/ChangePassword';

const Setting = () => {
    return (
        <>
            <SideNavbar />
            <ChangePassword />
            <InnerNavbar />
        </>
    )
}
export default Setting;