import React from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import theme from "src/theme/theme.jsx";
import {Box} from "@mui/material";
import {toLocaleDateTime} from "src/utils/functions.js";

const BalanceHistoryTableBody = ({balanceHistoryList}) => {

    const CustomCell = ({text, center = true, width}) => {
        return (
            <TableCell
                align={center ? "center" : "left"}
                sx={{
                    fontWeight: theme.typography.fontWeightLight,
                    width: {width}
                }}>
                {text}
            </TableCell>
        )
    }

    const RecordTypeCell = ({type}) => {
        return (
            <TableCell align="center" sx={{width: '15%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <span
                        className={`px-3 py-1 text-xs kanit-light ${
                            type === 'TIPS'
                                ? 'bg-background-default text-primary border border-primary'
                                : type === 'SALARY'
                                    ? 'bg-background-default text-third border border-third'
                                    : 'bg-background-default text-custom-red border border-custom-red'
                        }`}
                        style={{
                            display: 'inline-block',
                            textAlign: 'center',
                            minWidth: '60%',
                        }}
                    >
                      {type}
                    </span>
                </Box>
            </TableCell>


        )
    }

    const PaymentStatusCell = ({paymentStatus}) => {
        return (
            <TableCell align="center" sx={{width: '15%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <span className={`px-3 py-1 text-xs kanit-light ${
                        paymentStatus === 'ON_PENDING'
                            ? 'bg-background-default text-primary border border-primary'
                            : 'bg-background-default text-completed border border-completed'}`}
                          style={{
                              display: 'inline-block',
                              textAlign: 'center',
                              minWidth: '60%',
                          }}
                    >
                        {paymentStatus}
                    </span>
                </Box>
            </TableCell>
        )
    }

    return (
        <TableBody>
            {balanceHistoryList.map((item) => (
                <TableRow
                    key={item.id}
                >
                    <CustomCell text={item.orderId ? `#${item.orderId}` : '-'} center={false} width='10%'/>
                    <RecordTypeCell type={item.recordType}/>
                    <CustomCell text={item.createdAt ? toLocaleDateTime(item.createdAt) : '-'} width='25%'/>
                    <CustomCell text={item.completedAt ? toLocaleDateTime(item.completedAt) : '-'} width='25%'/>
                    <TableCell align="center" sx={{
                        width: '10%',
                        fontWeight: theme.typography.fontWeightLight,
                        color: item.amount > 0 ? theme.palette.statuses.completed : theme.palette.statuses.red,
                    }}>
                        {item.amount}$
                    </TableCell>
                    <PaymentStatusCell paymentStatus={item.paymentStatus}/>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default BalanceHistoryTableBody;