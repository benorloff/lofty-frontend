import { 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions, 
    Button,
    Typography 
} from "@mui/material"

export default function UploadModal ({ open, handleClose }) {

    return (
        <Dialog 
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>form goes here</DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
                <Button>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}