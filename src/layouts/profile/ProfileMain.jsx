import {Box} from '@mui/material';
import OrderTable from "src/layouts/profile/utils/ui/OrderTable.jsx";
import CashbackProgress from "src/layouts/profile/utils/ui/CashbackProgress.jsx";
import UserProfile from "src/layouts/profile/utils/ui/UserProfile.jsx";

function ProfileMain() {
    return (
        <Box sx={{padding: 3, display: 'flex', gap: 3}}>
            <UserProfile/>
            <Box sx={{flex: 1}}>
                <CashbackProgress/>
                <OrderTable/>
            </Box>
        </Box>
    );
}

export default ProfileMain;
