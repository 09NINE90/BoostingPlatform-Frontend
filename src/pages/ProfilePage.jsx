import React from "react";

import ProfileMain from "../layouts/customer/profile/ProfileMain.jsx";
import Header from "../layouts/common/header/Header.jsx";
import Footer from "../layouts/common/footer/Footer.jsx"

const ProfilePage = () => {

    return (
        <div className="h-full">
            <Header/>
            <ProfileMain />
            <Footer />
        </div>
    )
}

export default ProfilePage;