import React from 'react'
import ProfileMain from '../layouts/boosters/profile/ProfilePage.jsx'
import Footer from "src/layouts/common/footer/Footer.jsx";

const ProfileBoosterPage = () => {
    return (
        <div className="h-full">
            <div className="min-h-[100%]">
                <ProfileMain/>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfileBoosterPage