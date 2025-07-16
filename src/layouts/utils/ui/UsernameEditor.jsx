import {useState} from "react";
import {Box} from "@mui/material";
import BlueTextField from "src/layouts/utils/ui/BlueTextField.jsx";
import ContainedBlueButton from "src/layouts/utils/ui/ContainedBlueButton.jsx";
import OutlinedBlueButton from "src/layouts/utils/ui/OutlinedBlueButton.jsx";

const UsernameEditor = ({initialName, onSave, onCancel, loading}) => {
    const [tempName, setTempName] = useState(initialName);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'row', gap: 1, minHeight: '40px', width: '400px',
        }}>
            <BlueTextField
                label="Change nickname"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent text-text-primary border border-gray-600 rounded"
                sx={{
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
                <ContainedBlueButton
                    loading={loading}
                    variant="contained"
                    size="small"
                    onClick={() => onSave(tempName)}
                    sx={{p: 2,}}
                >
                    Save
                </ContainedBlueButton>
                <OutlinedBlueButton
                    variant="outlined"
                    size="small"
                    onClick={onCancel}
                    sx={{p: 2, width: '100%',}}
                >
                    Cancel
                </OutlinedBlueButton>
            </Box>
        </Box>
    );
}

export default UsernameEditor;