import Image from 'next/image'
import Link from 'next/link'
import { 
    Grid, 
    CardContent, 
    CardMedia, 
    Typography, 
    CardActionArea, 
    IconButton, 
    ImageList, 
    ImageListItem, 
    ImageListItemBar 
} from '@mui/material'
import { Info } from '@mui/icons-material'
import PostCard  from './Card'
import useSWR from 'swr'

export default function Feed({ posts }) {

    const url = 'http://catstagram.lofty.codes/api/posts/'
    const fetcher = async (url: string) => fetch(url).then(res => res.json())
    const { data, error } = useSWR(url, fetcher);

    console.log(data, '<-- data')

    if (error) return <p>Loading failed...</p>;
    if (!data) return <h1>Loading...</h1>;

    // Change grid to masonry??

    return (
        <Grid container spacing={2}>
            { posts && 
                posts.map((post) => (
                    <PostCard post={post} key={post.pk}/>
                    // <Grid item xs={12} md={6} lg={4} key={post.pk}>
                    //     <Card>
                    //         <CardActionArea>
                    //             <CardMedia
                    //                 component="img"
                    //                 height="300"
                    //                 image={`http://catstagram.lofty.codes/media/${post.image}`}
                    //                 alt={post.name}
                    //             />
                    //             <CardContent>
                    //                 <Typography variant="body2" component="div">
                    //                     <Link href={`/post/${post.pk}`}>{post.pk}</Link>
                    //                 </Typography>
                    //             </CardContent>
                    //         </CardActionArea>
                    //     </Card>
                    // </Grid>
                    
                ))
            }
        </Grid>
    )
}