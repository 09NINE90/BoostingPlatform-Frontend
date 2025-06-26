import {useState} from "react";
import {Box, Button, TextareaAutosize} from "@mui/material";
import theme from "src/theme/theme.jsx";

const DescriptionEditor = ({ initialDescription, onSave, onCancel }) => {
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
                    minHeight: '100px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: theme.palette.primary.main,
                    borderRadius: '4px',
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightLight,
                    fontSize: 16,
                    resize: 'vertical'
                }}
            />
            <Box sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'flex-end',
                mt: 1
            }}>
                <Button variant="outlined" size="small" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={() => onSave(tempDescription)}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default DescriptionEditor;