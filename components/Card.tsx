import Link from 'next/link'
import Image from 'next/image'
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
                        <Typography variant="body2" component="div">
                            <Link href={`/post/${post.pk}`}>{post.pk}</Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )

}