import {Box, Divider} from '@mui/material';
import ChatInputSkeleton from "./ChatInputSkeleton.jsx";
import ChatMessagesSkeleton from "./ChatMessagesSkeleton.jsx";
import theme from "src/theme/theme.jsx";

const ChatSkeleton = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: {xs: '60%', sm: '85vh'},
                width: {xs: '100%', sm: '70%'},
                mt: {xs: 2, sm: 0},
                minWidth: "70%",
                px: 5,
                py: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 1,
                pb: {xs: 20, md: 0}
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    pr: 1,
                }}
            >
                <ChatMessagesSkeleton/>
                <div style={{height: 1}}/>
            </Box>

            <Divider sx={{my: 2}}/>

            <ChatInputSkeleton/>
        </Box>
    );
};

export default ChatSkeleton;