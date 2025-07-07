import React from "react";

const CustomerStatusDescription = ({customerNextStatus}) => {
    return (
        <div className='kanit-light text-text-primary space-y-1.5'>
            {customerNextStatus && (
                <div className='kanit-medium'>Your next status <span className='text-third'>{customerNextStatus}</span>
                </div>
            )}
            <div className='kanit-medium'>All statuses rules:</div>
            <div>
                <span className='kanit-medium text-third'>EXPLORER</span> - 1% cashback by order (default level)
            </div>
            <div>
                <span className='kanit-medium text-third'>VANGUARD</span> - 5% cashback by order (40 created orders)
            </div>
            <div>
                <span className='kanit-medium text-third'>IMMORTAL</span> - 10% cashback by order (100 created orders)
            </div>

        </div>
    )
}

export default CustomerStatusDescription;