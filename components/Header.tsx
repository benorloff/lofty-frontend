import { useState } from "react";
import { 
    Container, 
    AppBar, 
    Toolbar, 
    Typography,
    Button
} from "@mui/material";
import UploadModal from "./UploadModal";

export default function Header() {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            <AppBar component="nav" position="sticky">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography 
                            variant="h5" 
                            component="div"
                            sx={{ flexGrow: 1, ml: 1 }}
                        >
                            Catstagram
                        </Typography>
                        <Button 
                            variant="contained"
                            onClick={() => handleOpen()}
                        >
                            Add Photo
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <UploadModal open={open} handleClose={handleClose} />
        </>
    )
}