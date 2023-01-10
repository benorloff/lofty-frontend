import Image from 'next/image'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Info } from '@mui/icons-material'
import useSWR from 'swr'

export default function Feed() {

    const url = 'http://catstagram.lofty.codes/api/posts/'
    const fetcher = async (url: string) => fetch(url).then(res => res.json())
    const { data, error } = useSWR(url, fetcher);

    if (error) <p>Loading failed...</p>;
    if (!data) <h1>Loading...</h1>;

    return (
        <ImageList>
          { data &&  
            data.forEach((post) => (
              <ImageListItem key={post.pk}>
                <Image
                  src={`http://catstagram.lofty.codes/media/${post.image}`}
                  alt={post.name}
                  // className={styles.vercelLogo}
                  width={100}
                  height={24}
                  // priority
                />
                <ImageListItemBar 
                  title={post.name}
                  // actionIcon={
                  //   <IconButton
                  //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  //     aria-label={`info about ${post.name}`}
                  //   >
                  //     <Info />
                  //   </IconButton>
                  // }
                />
              </ImageListItem>
            ))
          }
        </ImageList>
    )
}