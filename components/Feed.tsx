import { 
    Container,
    Grid,
    Button, 
} from '@mui/material'
import PostCard  from './Card'
import { useState } from 'react'

export default function Feed({ posts }) {

    // Show 9 posts on initial render
    const [postCount, setPostCount] = useState(9)

    // Sort posts from most recent to least recent
    const sortedPosts = posts.sort((a,b) => 
        new Date(b.timestamp_created) - new Date(a.timestamp_created)
    )

    // Constrain posts to the current count
    const displayedPosts = sortedPosts.slice(0, postCount)

    const handleLoadMoreClick = () => {
        setPostCount((prevValue) => prevValue + 9)
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                { displayedPosts.map((post) => (
                    <PostCard post={post} key={post.pk}/> 
                ))
                }
            </Grid>
            { postCount < sortedPosts.length && 
                <Grid 
                    container 
                    alignItems='center' 
                    justifyContent='center'
                    sx={{ m: 2 }}
                >
                    <Button variant='contained' onClick={handleLoadMoreClick}>
                        Load More
                    </Button>
                </Grid>
            }
        </Container>
    )
}