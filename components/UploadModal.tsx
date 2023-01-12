import { 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions, 
    Button,
    TextField,

    Typography 
} from "@mui/material"
import { ChangeEvent, useState } from "react"

export default function UploadModal ({ open, handleClose }) {

    const [image, setImage] = useState<File>()
    const [description, setDescription] = useState('')

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files[0])
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }



    return (
        <Dialog 
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>
                <Button
                    variant="contained" component="label"
                >
                    Choose File
                    <input hidden accept="image/*" type="file" />
                </Button>
                <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={handleChange}
                >

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
                <Button>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}