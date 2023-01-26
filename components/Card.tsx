import Image from 'next/image'
import { 
    Grid,
    Card, 
    CardActionArea,
    CardMedia,
    CardContent,
    Typography, 
} from '@mui/material'
import { Comment } from '@mui/icons-material'

type Post = {
    pk: number;
    name: string;
    comments: [];
    image: string;
    timestamp_created: string;
    timestamp_updated: string;
}

export default function PostCard({post} : {post: Post}) {

    return (
        <Grid item xs={12} md={6} lg={4} key={post.pk}>
            <Card>
                <CardActionArea href={`/post/${post.pk}`}>
                    <CardMedia sx={{ minHeight: 250, position: 'relative' }}>
                            <Image 
                                src={`http://catstagram.lofty.codes/media/${post.image}`}
                                alt={post.name}
                                style={{ objectFit: 'cover'}}
                                fill
                                sizes="(max-width: 768px) 66vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                            />
                    </CardMedia>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant="body2" component="div">
                                    { post.name.length > 25 
                                        ? (`${post.name.substring(0,25)}...`)
                                        : (`${post.name}`)
                                    }
                                </Typography>
                            </Grid>
                            <Grid container xs={2} alignItems='center' justifyContent='flex-end'>
                                <Comment></Comment>
                                {post.comments.length}
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )

}