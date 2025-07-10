import {useState} from "react";
import {Box, TextareaAutosize} from "@mui/material";
import theme from "src/theme/theme.jsx";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";

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
                    p: '8px',
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
                <OutlinedBlueButton
                    variant="outlined"
                    size="small"
                    onClick={onCancel}
                >
                    Cancel
                </OutlinedBlueButton>
                <ContainedBlueButton
                    variant="contained"
                    size="small"
                    onClick={() => onSave(tempDescription)}
                >
                    Save
                </ContainedBlueButton>
            </Box>
        </Box>
    );
}

export default DescriptionEditor;