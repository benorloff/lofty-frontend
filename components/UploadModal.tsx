import { 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions, 
    Button,
    TextField,
    Stack,
    Typography 
} from "@mui/material"
import { ChangeEvent, useState } from "react"

export default function UploadModal ({ open, handleClose }) {

    const [selectedFile, setSelectedFile] = useState(null)
    const [description, setDescription] = useState('')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleChange = (e) => {
        setDescription(e.target.value)
    }



    return (
        <Dialog 
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        required
                        id="description"
                        label="Description"
                        value={description}
                        onChange={handleChange}
                    >

                    </TextField>
                    <input  
                        required
                        accept="image/*" 
                        type="file"
                        onChange={handleFileChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained">Upload</Button>
            </DialogActions>
        </Dialog>
    )
}