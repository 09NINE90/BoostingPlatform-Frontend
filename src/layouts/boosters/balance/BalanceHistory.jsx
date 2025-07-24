import {Box, useMediaQuery} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {getBalanceHistory} from "src/services/financeApi.js";
import ErrorPage, {handleApiError} from "src/components/error/ErrorPage.jsx";
import Table from "@mui/material/Table";
import BalanceHistoryTableHead from "src/layouts/boosters/balance/utils/ui/BalanceHistoryTableHead.jsx";
import BalanceHistoryTableBody from "src/layouts/boosters/balance/utils/ui/BalanceHistoryTableBody.jsx";
import theme from "src/theme/theme.jsx";
import CustomLoader from "src/layouts/boosters/utils/ui/CustomLoader.jsx";
import MobileBalanceHistory from "src/layouts/boosters/balance/utils/ui/MobileBalanceHistory.jsx";

const BalanceHistory = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [balanceHistoryList, setBalanceHistoryList] = useState([]);

    const fetchBalanceHistory = useCallback(async () => {
        try {
            setIsLoading(true);
            const balanceHistoryApi = await getBalanceHistory();
            setBalanceHistoryList(balanceHistoryApi);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    }, [getBalanceHistory, setBalanceHistoryList]);

    useEffect(() => {
        fetchBalanceHistory();
    }, [fetchBalanceHistory]);

    if (isLoading) {
        return (
            <div className="min-h-[100vh]">
                <div className="fixed inset-0 flex items-center justify-center">
                    <CustomLoader height='100%'/>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[100vh]">
                <ErrorPage error={error}/>
            </div>
        )
    }

    return (
        <Box sx={{minHeight: '80vh',}}>
            <Box sx={{
                p: {xs: 1, sm: 3},
                overflowX: 'auto',
                backgroundColor: theme.palette.background.paper,
            }}>
                {isMobile ? (
                    <MobileBalanceHistory balanceHistoryList={balanceHistoryList} />
                ) : (
                    <Box sx={{ overflowX: 'auto' }}>
                        <Table>
                            <BalanceHistoryTableHead/>
                            <BalanceHistoryTableBody balanceHistoryList={balanceHistoryList}/>
                        </Table>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default BalanceHistory;