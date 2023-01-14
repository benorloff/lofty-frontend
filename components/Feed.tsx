import { 
    Container,
    Grid, 
} from '@mui/material'
import PostCard  from './Card'

export default function Feed({ posts }) {

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                { posts.map((post) => (
                    <PostCard post={post} key={post.pk}/> 
                ))
                }
            </Grid>
        </Container>
    )
}