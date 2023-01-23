import { 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions, 
    Button,
    TextField,
    Stack,
    Typography,
    CircularProgress
} from "@mui/material"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"

export default function UploadModal ({ open, handleClose }) {

    const router = useRouter()

    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleChange = (e) => {
        setDescription(e.target.value)
    }

    const handleUpload = async () => {

        // Initiate loader
        setLoading(true)

        // Create form data for upload
        const formData = new FormData()
        formData.append('name', description)
        formData.append('image', file)

        setMessage('Sending your cat on a journey.')
        
        // Upload file to Lofty API
        const uploadFile = await fetch('http://catstagram.lofty.codes/api/posts/', {
            method: 'POST',
            body: formData
        })
            .then((data) => {
                setMessage('Success! Your cat arrived safely.')
                // Close modal and reset state
                setTimeout(() => {
                    handleClose()
                    setLoading(false)
                    setMessage('')
                }, 2000)
                console.log(data, '<-- post api success')
            })
            .catch((error) => {
                setMessage('Uh oh! There was problem sending your cat.')
                console.log(error, '<-- post api error')
            })
        
        // Send user back to feed
        setMessage('Returning you to the land of cats.')
        router.push('/')

    }


    return (
        <Dialog 
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogContent>
                { loading ? (
                    <>
                        <CircularProgress />
                        <Typography variant="h6">
                            {message}
                        </Typography>
                    </>
                ) : (
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
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleUpload}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}