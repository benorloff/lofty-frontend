import { Container, Grid, Typography } from "@mui/material"

export default function Footer () {
    return (
        <Container maxWidth="lg" sx={{ mt: '50px', mb: '50px' }}>
            <Grid container rowGap={2} justifyContent="space-between">
                    <Typography>
                        {`Copyright ${new Date().getFullYear()} Catstagram.`}
                    </Typography>
                    <Typography>
                        Contact Us
                    </Typography>
            </Grid>
        </Container>
    )
}