import {useState} from "react";
import {Box, Button} from "@mui/material";

const BoosterNameEditor = ({ initialName, onSave, onCancel }) => {
    const [tempName, setTempName] = useState(initialName);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent text-text-primary border border-gray-600 rounded px-2 py-1"
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Button variant="contained" size="small" onClick={() => onSave(tempName)}>
                    Save
                </Button>
                <Button variant="outlined" size="small" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default BoosterNameEditor;