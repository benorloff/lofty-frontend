import Link from 'next/link'
import { 
    Grid,
    Card, 
    CardActionArea,
    CardMedia,
    CardContent,
    Typography, 
} from '@mui/material'

export default function PostCard({post}) {

    return (
        <Grid item xs={12} md={6} lg={4} key={post.pk}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`http://catstagram.lofty.codes/media/${post.image}`}
                        alt={post.name}
                    />
                    <CardContent>
                        <Typography variant="body2" component="div">
                            <Link href={`/post/${post.pk}`}>{post.pk}</Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )

}