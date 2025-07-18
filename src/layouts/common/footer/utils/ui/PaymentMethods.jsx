import React from "react";
import {ApplePay, Bitcoin, GooglePay, Mastercard, PayPal, Visa} from "src/assets/icons/index.js";

const PaymentMethods = () => {
    const paymentMethods = [
        {id: 'visa', Icon: Visa, alt: 'Visa'},
        {id: 'mastercard', Icon: Mastercard, alt: 'Mastercard'},
        {id: 'paypal', Icon: PayPal, alt: 'PayPal'},
        {id: 'bitcoin', Icon: Bitcoin, alt: 'Bitcoin'},
        {id: 'applepay', Icon: ApplePay, alt: 'ApplePay'},
        {id: 'googlepay', Icon: GooglePay, alt: 'GooglePay'}
    ];

    return (
        <div className="flex justify-between w-[80%] max-w-[1200px] px-8">
            <div className="hidden md:flex w-full justify-between">
                {paymentMethods.map(({id, Icon, alt}) => (
                    <div key={id} className="flex items-center">
                        <Icon aria-label={alt}/>
                    </div>
                ))}
            </div>

            <div className="flex md:hidden flex-wrap justify-center gap-4 w-full px-2">
                {paymentMethods.map(({id, Icon, alt}) => (
                    <div key={id} className="h-8 flex items-center">
                        <Icon aria-label={alt}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethods;