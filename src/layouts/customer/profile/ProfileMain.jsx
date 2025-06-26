import {Box} from '@mui/material';
import OrderTable from "src/layouts/customer/profile/utils/ui/OrderTable.jsx";
import CashbackProgress from "src/layouts/customer/profile/utils/ui/CashbackProgress.jsx";
import CustomerProfileInfo from "src/layouts/customer/profile/utils/ui/CustomerProfileInfo.jsx";

function ProfileMain() {
    return (
        <Box sx={{padding: 3, paddingInline: 25, display: 'flex', flexDirection: 'column', gap: 3}}>
            <CustomerProfileInfo/>
            <CashbackProgress/>
            <OrderTable/>
        </Box>
    );
}

export default ProfileMain;
