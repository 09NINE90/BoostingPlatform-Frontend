import React from 'react'
import {Box} from '@mui/material'
import LeftFooter from "src/layouts/common/footer/utils/ui/LeftFooter.jsx";
import CenterFooter from "src/layouts/common/footer/utils/ui/CenterFooter.jsx";
import RightFooter from "src/layouts/common/footer/utils/ui/RightFooter.jsx";
import PaymentMethods from "src/layouts/common/footer/utils/ui/PaymentMethods.jsx";

const Footer = () => {
    return (
        <Box
            position="static"
            bottom={0}
            pb={20}
            className="flex flex-col items-center py-4"
        >
            <div className="w-[80%] max-w-[1200px] border-t-2 border-background-paper mb-4 md:mb-15"/>

            <PaymentMethods/>
            <Box
                display='flex'
                flexDirection={{xs: 'column', lg: 'row'}}
                justifyContent="space-between"
                width='90%'
                marginTop='55px'
                gap={{xs: 8, md: 0}}
            >
                <LeftFooter/>
                <CenterFooter/>
                <RightFooter/>
            </Box>

            <Box marginTop={10} className="kanit-light text-sm md:text-base text-center">
                © 2025 VBoost. All rights reserved
            </Box>
        </Box>
    )
}

export default Footer