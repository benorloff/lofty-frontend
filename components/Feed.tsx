import { 
    Container,
    Grid, 
} from '@mui/material'
import PostCard  from './Card'

export default function Feed({ posts }) {

    const sortedPosts = posts.sort((a,b) => new Date(b.timestamp_created) - new Date(a.timestamp_created))

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                { sortedPosts.map((post) => (
                    <PostCard post={post} key={post.pk}/> 
                ))
                }
            </Grid>
        </Container>
    )
}