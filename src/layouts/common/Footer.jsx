import React from 'react'
import {Box} from '@mui/material'
import VisaIcon from 'src/assets/visa.svg'
import MastercardIcon from 'src/assets/mastercard.svg'
import PayPalIcon from 'src/assets/pay-pal.svg'
import BitcoinIcon from 'src/assets/bitcoin.svg'
import ApplePay from 'src/assets/apple-pay.svg'
import GogglePay from 'src/assets/GPay.svg'
import Logo from 'src/assets/logo-footer.svg'
import YouTube from 'src/assets/you-tube.svg'
import Telegram from 'src/assets/TG.svg';
import Mail from 'src/assets/Mail.svg'
import WhatsApp from 'src/assets/WA.svg'

const Footer = () => {

    const paymentMethods = [
        {icon: VisaIcon, alt: 'Visa'},
        {icon: MastercardIcon, alt: 'Mastercard'},
        {icon: PayPalIcon, alt: 'PayPal'},
        {icon: BitcoinIcon, alt: 'Bitcoin'},
        {icon: ApplePay, alt: 'ApplePay'},
        {icon: GogglePay, alt: 'GogglePay'}
    ];

    return (
        <Box
            position="static"
            bottom={0}
            className="flex flex-col items-center py-4"
        >
            <div className="w-[80%] max-w-[1200px] border-t-2 border-[#19054D] mb-4 md:mb-15"/>

            <div className="flex justify-between w-[80%] max-w-[1200px] px-8">
                <div className="hidden md:flex w-full justify-between">
                    {paymentMethods.map((method, index) => (
                        <img
                            key={index}
                            src={method.icon}
                            alt={method.alt}
                            className="h-auto"
                        />
                    ))}
                </div>

                <div className="flex md:hidden flex-wrap justify-center gap-4 w-full px-2">
                    {paymentMethods.map((method, index) => (
                        <img
                            key={index}
                            src={method.icon}
                            alt={method.alt}
                            className="h-auto max-h-8"
                        />
                    ))}
                </div>
            </div>

            <Box
                display='flex'
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                width='90%'
                marginTop='55px'
                gap={{ xs: 8, md: 0 }}
            >
                {/* Лого и соцсети */}
                <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
                    <img src={Logo} className="w-32 md:w-auto"/>
                    <div className="flex flex-col mt-4 items-center md:items-start">
                        <div className="kanit-bold text-xl">
                            Social media:
                        </div>
                        <div className="flex flex-row mt-2 space-x-3">
                            <a href="#"><img src={YouTube} className="w-10 h-7 md:w-[48px] md:h-[34px] hover:scale-105"/></a>
                            <a href="#"><img src={Telegram} className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                        </div>
                    </div>
                </div>

                {/* Центральный блок */}
                <div className="flex flex-col w-full md:w-[50%] max-w-[670px] text-center mx-auto gap-2 kanit-light order-first md:order-none mb-8 md:mb-0">
                    <p className="text-sm md:text-base">
                        <span className="font-bold">VBoost</span> is a service that helps players achieve goals in modern
                    </p>
                    <p className="text-sm md:text-base">
                        multiplayer games. We offer rank ups, challenging missions,
                    </p>
                    <p className="text-sm md:text-base">
                        individual training, and rare resource farming.
                    </p>
                    <div className="flex flex-col justify-center gap-1 mt-4 kanit-thin text-sm md:text-base">
                        <a href="#" className="text-white hover:text-purple-300 transition-colors">User Agreement</a>
                        <a href="#" className="text-white hover:text-purple-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white hover:text-purple-300 transition-colors">Refund Policy</a>
                        <a href="#" className="text-white hover:text-purple-300 transition-colors">Terms of Use</a>
                        <a href="#" className="text-white hover:text-purple-300 transition-colors">Payments and Security</a>
                    </div>
                </div>

                {/* Правый блок */}
                <div className="flex flex-col justify-start items-center md:items-end">
                    <div className="flex flex-col kanit-medium text-lg md:text-xl text-center md:text-right">
                        <a href="#" className="hover:text-purple-300 transition-colors">Our mission</a>
                        <a href="#" className="hover:text-purple-300 transition-colors">About us</a>
                        <a href="#" className="hover:text-purple-300 transition-colors">Career</a>
                        <a href="#" className="hover:text-purple-300 transition-colors">Support</a>
                        <a href="#" className="hover:text-purple-300 transition-colors">FAQ</a>
                    </div>
                    <div className="flex flex-col mt-3 text-center md:text-right">
                        <div className="kanit-bold">
                            Contact:
                        </div>
                        <div className="flex flex-row mt-2 space-x-3">
                            <a href="#"><img src={Mail} className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                            <a href="#"><img src={Telegram} className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                            <a href="#"><img src={WhatsApp} className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                        </div>
                    </div>
                </div>
            </Box>

            <Box marginTop={10} className="kanit-light text-sm md:text-base text-center">
                © 2025 VBoost. All rights reserved
            </Box>
        </Box>
    )
}

export default Footer