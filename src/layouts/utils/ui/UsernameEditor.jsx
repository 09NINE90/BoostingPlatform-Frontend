import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import theme from "src/theme/theme.jsx";

const UsernameEditor = ({initialName, onSave, onCancel}) => {
    const [tempName, setTempName] = useState(initialName);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', gap: 1, minHeight: '40px', width: '400px',
        }}>
            <TextField
                label="Change nickname"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent text-text-primary border border-gray-600 rounded"
                sx={{
                    '& .MuiInputLabel-root': {
                        color: theme.palette.divider,
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: theme.palette.third.main,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.third.main,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.divider,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.third.main,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.third.main,
                        },
                    },
                    '& .MuiInputBase-root': {
                        height: 40,
                        width: '260px',

                    },
                    '& .MuiInputBase-input': {
                        py: 0.5,
                        width: '260px',
                    },
                    flexGrow: 1
                }}
            />
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onSave(tempName)}
                    sx={{
                        p: 2,
                        width: "100%",
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            backgroundColor: theme.palette.third.hover,
                        }
                    }}>
                    Save
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onCancel}
                    sx={{
                        p: 2,
                        width: "100%",
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        fontWeight: theme.typography.fontWeightLight,
                        border: 1,
                        borderColor: theme.palette.text.primary,
                        textDecoration: 'none',
                        '&:hover': {
                            backgroundColor: theme.palette.background.paper,
                            borderColor: theme.palette.third.main,
                        }
                    }}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default UsernameEditor;