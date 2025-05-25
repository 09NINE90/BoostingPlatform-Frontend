import React from "react";

import ProfileMain from "../layouts/profile/ProfileMain.jsx";
import Header from "../layouts/common/Header.jsx";
import Footer from "../layouts/common/Footer.jsx"

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