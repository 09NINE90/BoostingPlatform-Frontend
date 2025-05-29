import React, {useMemo} from "react";
import {ApplePay, Bitcoin, GogglePay, Mastercard, PayPal, Visa} from "src/assets/icons/index.js";


const PaymentMethods = () => {
    const paymentMethods = [
        {icon: <Visa/>, alt: 'Visa'},
        {icon: <Mastercard/>, alt: 'Mastercard'},
        {icon: <PayPal/>, alt: 'PayPal'},
        {icon: <Bitcoin/>, alt: 'Bitcoin'},
        {icon: <ApplePay/>, alt: 'ApplePay'},
        {icon: <GogglePay/>, alt: 'GogglePay'}
    ];

    const getIcons = useMemo(() => (
        paymentMethods.map((method) => (
            method.icon
        ))
    ), [paymentMethods]);

    return (
        <div className="flex justify-between w-[80%] max-w-[1200px] px-8">
            <div className="hidden md:flex w-full justify-between">
                {getIcons}
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
    )
}


export default PaymentMethods;