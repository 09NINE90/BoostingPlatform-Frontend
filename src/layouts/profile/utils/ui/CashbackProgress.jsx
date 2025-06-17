import React, {useState} from "react";
import {Box, LinearProgress, Typography} from "@mui/material";

const CashbackProgress = () => {

    const [totalSpent, setTotalSpent] = useState(0);

    const getCashbackLevel = () => {
        if (totalSpent >= 2000) {
            return {level: "Legend", percentage: 20, nextLevel: null, progress: 100};
        } else if (totalSpent >= 1000) {
            return {
                level: "Hero",
                percentage: 15,
                nextLevel: "Legend",
                progress: ((totalSpent - 1000) / 1000) * 100
            };
        } else {
            return {
                level: "Explorer",
                percentage: 10,
                nextLevel: "Hero",
                progress: (totalSpent / 1000) * 100
            };
        }
    };

    const cashbackInfo = getCashbackLevel();

    return (
        <Box sx={{
            backgroundColor: '#1E1930',
            borderRadius: 2,
            padding: 3,
            marginBottom: 3,
        }}>
            <Typography variant="h5" sx={{color: '#fff', marginBottom: 2}}>
                Unlock higher cashback rewards as you level up!
            </Typography>
            <Typography variant="body1" sx={{color: '#fff', marginBottom: 1}}>
                Current Level: {cashbackInfo.level} • {cashbackInfo.percentage}% Cashback
            </Typography>
            {cashbackInfo.nextLevel && (
                <>
                    <LinearProgress
                        variant="determinate"
                        value={cashbackInfo.progress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#6a6ad8'
                            }
                        }}
                    />
                    <Typography variant="body2" sx={{color: '#fff', marginTop: 1}}>
                        ${totalSpent} spent • Next level: {cashbackInfo.nextLevel}
                    </Typography>
                </>
            )}
        </Box>
    )
}

export default CashbackProgress;