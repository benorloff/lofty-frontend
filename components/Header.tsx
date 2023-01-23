import { useState } from "react";
import { 
    Container, 
    AppBar, 
    Toolbar, 
    Typography,
    Button,
    IconButton,
    Avatar,
} from "@mui/material";
import UploadModal from "./UploadModal";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {

    const { data: session, status } = useSession()
    const [modalOpen, setModalOpen] = useState(false)
    
    console.log(session, '<-- session data')

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
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
                            <Link href={'/'}>Catstagram</Link>
                        </Typography>
                        {/* Get session status and display actions accordingly */}
                        { status === "authenticated" ? (
                            <>
                                <Button 
                                    variant="contained"
                                    onClick={() => handleModalOpen()}
                                    sx={{ mr: 1 }}
                                >
                                    Add Photo
                                </Button>
                                <IconButton
                                    sx={{ mr: 1 }}
                                >
                                    <Avatar alt={`${session?.user?.name}`} src={`${session?.user?.image}`} />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    onClick={() => signOut()}
                                >
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/register">
                                    <Button variant="contained" sx={{ mr: 2 }}>
                                        Sign Up
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    onClick={() => signIn()}
                                >
                                    Log In
                                </Button>
                            </>
                            
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <UploadModal open={modalOpen} handleClose={handleModalClose} />
        </>
    )
}