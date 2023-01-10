import Image from 'next/image'
import { 
    Grid, 
    Card, 
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
import useSWR from 'swr'

export default function Feed() {

    const url = 'http://catstagram.lofty.codes/api/posts/'
    const fetcher = async (url: string) => fetch(url).then(res => res.json())
    const { data, error } = useSWR(url, fetcher);

    if (error) <p>Loading failed...</p>;
    if (!data) <h1>Loading...</h1>;

    return (
        <Grid container spacing={2}>
            { data && 
                data.map((post) => (
                    <Grid item xs={12} md={6} lg={4} key={post.pk}>
                        {/* <img
                            src={`http://catstagram.lofty.codes/media/${post.image}`}
                            alt={post.name}
                            height={100}
                        /> */}
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={`http://catstagram.lofty.codes/media/${post.image}`}
                                    alt={post.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {post.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    
                ))
            }
        </Grid>
    )
}