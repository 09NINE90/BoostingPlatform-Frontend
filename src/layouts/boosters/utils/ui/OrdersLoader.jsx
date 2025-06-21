import {ClipLoader} from "react-spinners";
import React from "react";

const OrdersLoader = () => {
    return(
        <div className="mt-[30vh]">
            <ClipLoader
                color="#FD980B"
                size={100}
                cssOverride={{display: "block", margin: "auto auto"}}
            />
        </div>
    )
}

export default OrdersLoader;