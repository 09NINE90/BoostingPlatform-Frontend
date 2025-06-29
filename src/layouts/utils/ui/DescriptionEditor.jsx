import {useState} from "react";
import {Box, Button, TextareaAutosize} from "@mui/material";
import theme from "src/theme/theme.jsx";

const DescriptionEditor = ({initialDescription, onSave, onCancel}) => {
    const [tempDescription, setTempDescription] = useState(initialDescription);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%'
        }}>
            <TextareaAutosize
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                style={{
                    width: '100%',
                    height: '80px',
                    minHeight: '80px',
                    padding: '8px',
                    border: '1px solid',
                    borderColor: theme.palette.third.hover,
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightLight,
                    fontSize: 14,
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',

                    '&:focus': {
                        borderColor: theme.palette.third.main,
                    },
                }}
            />
            <Box sx={{
                mt: 1,
                gap: 2,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onCancel}
                    sx={{
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
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onSave(tempDescription)}
                    sx={{
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.third.main,
                        fontWeight: theme.typography.fontWeightLight,
                        '&:hover': {
                            backgroundColor: theme.palette.third.hover,
                        }
                    }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default DescriptionEditor;