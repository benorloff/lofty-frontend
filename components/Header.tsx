import { 
    Container, 
    AppBar, 
    Toolbar, 
    Typography,
    Button
} from "@mui/material";
import App from "../pages/_app";

export default function Header() {
    <AppBar position="sticky">
        <Container maxWidth="lg">
            <Toolbar disableGutters>
                <Typography 
                    variant="h5" 
                    component="div"
                    sx={{ flexGrow: 1, ml: 1 }}
                >
                    Catstagram
                </Typography>
                <Button>
                    Add Photo
                </Button>
            </Toolbar>
        </Container>
    </AppBar>
}