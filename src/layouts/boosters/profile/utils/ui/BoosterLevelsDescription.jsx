import React from "react";

const BoosterLevelsDescription = ({boosterNextLevel}) => {
    return (
        <div className='kanit-light text-text-primary space-y-1.5'>
            {boosterNextLevel && (
                <div className='kanit-medium'>Your next level <span className='text-third'>{boosterNextLevel}</span></div>
            )}
            <div className='kanit-medium'>All levels rules:</div>
            <div><span className='kanit-medium text-third'>ROOKIE</span> - 45% by order (default level)</div>
            <div><span className='kanit-medium text-third'>VETERAN</span> - 50% by order (500$ total income or
                10 completed orders)
            </div>
            <div><span className='kanit-medium text-third'>ELITE</span> - 55% by order (2000$ total income or
                50 completed orders)
            </div>
            <div><span className='kanit-medium text-third'>LEGEND</span> - 60% by order (5000$ total income or
                200 completed orders)
            </div>
        </div>
    )
}

export default BoosterLevelsDescription;