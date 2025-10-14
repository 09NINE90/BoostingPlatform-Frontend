import {Box, Skeleton, Accordion, AccordionSummary} from '@mui/material';
import theme from "src/theme/theme.jsx";

const OrderInfoSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                p: 5,
                width: {xs: '100%', sm: '29%'},
                minWidth: '29%',
                height: {xs: 'fit-content', sm: "85vh"},
                flexDirection: 'column',
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Box sx={{flexGrow: 1, overflowY: 'auto', pr: 1}}>
                <Skeleton
                    variant="text"
                    sx={{
                        mb: 3,
                        height: 34,
                    }}
                />

                {[...Array(5)].map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            mb: {xs: 1.5, sm: 3},
                            width: '100%',
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Skeleton variant="text" width="30%" height={30}/>
                        <Skeleton variant="text" width="50%" height={30}/>
                    </Box>
                ))}

                <Accordion sx={{background: theme.palette.background.default, mb: 2}}>
                    <AccordionSummary>
                        <Skeleton variant="text" width="40%" height={24}/>
                    </AccordionSummary>
                </Accordion>

                <Accordion sx={{background: theme.palette.background.default, mb: 2}}>
                    <AccordionSummary>
                        <Skeleton variant="text" width="35%" height={24}/>
                    </AccordionSummary>
                </Accordion>

                <Accordion sx={{background: theme.palette.background.default}}>
                    <AccordionSummary>
                        <Skeleton variant="text" width="40%" height={24}/>
                    </AccordionSummary>
                </Accordion>
            </Box>

            <Box>
                <Skeleton
                    variant="rectangular"
                    sx={{
                        mt: 2,
                        p: 2,
                        width: '100%',
                        height: 48,
                        borderRadius: 1
                    }}
                />
            </Box>
        </Box>
    );
};

export default OrderInfoSkeleton;