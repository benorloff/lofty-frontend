import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useSWRConfig } from 'swr'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds } from '../../../lib/posts'
import Header from '../../../components/Header'
import { Container, Card, CardContent, Typography, Stack } from '@mui/material'

export default function PostPage({ post }) {
    const router = useRouter()
    const id = router.query.id as string
    // const { cache } = useSWRConfig()

    // console.log(cache, '<-- cache')
    // console.log(posts, '<-- posts')

    // const cachedPosts = cache.get("http://catstagram.lofty.codes/api/posts/")
    // console.log(cachedPosts, '<-- cachedPosts')

    // const post = cachedPosts?.data?.find(({ pk }) => pk === Number(id))
    // console.log(post, '<-- post')

    // const [posts, setPosts] = useState([])
    // const [post, setPost] = useState(null)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const getAllPosts = () => {
    //         fetch('http://catstagram.lofty.codes/api/posts/')
    //             .then((res) => res.json())
    //             .then((data) => setPosts(data))
    //     }
    //     getAllPosts()
    // }, [])

    // useEffect(() => {
    //     const getPost = () => {
    //         const post = posts.find(({ pk }) => pk === Number(id))
    //         setPost(post)
    //     }
    //     getPost()
    //     setLoading(false)
    // }, [posts])

    // console.log(posts, '<-- posts from postpage')
    // console.log(post, '<-- post from postpage')

    // if (loading) return <h1>Loading...</h1>

    return (
        <>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                {/* <Image 
                    src={`http://catstagram.lofty.codes/media/${post.image}`}
                    alt={post.name}
                    style={{ objectFit: 'contain'}}
                    fill
                    sizes="(max-width: 768px) 66vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                /> */}
                <div>
                    { post ? ( 
                        <>
                            <img width='100%' src={`http://catstagram.lofty.codes/media/${post.image}`} />
                        </>
                    ) : (
                        <p>No post found</p>
                    )}
                
                </div>
                <Card>
                    <CardContent>
                        <Typography>Comments</Typography>
                        <Stack>
                            { post.comments ? (
                                post.comments.map((c) => (
                                    <div key={c.pk} >{c.text}</div>
                                ))
                            ) : (
                                'No comments yet.'
                            )

                            }
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export async function getStaticPaths() {
    const posts = await fetch('http://catstagram.lofty.codes/api/posts/')
        .then((res) => res.json())
    const paths = posts.map((post) => {
        return {
            params: {
                id: post.pk.toString(),
            }
        }
    })
    return {
        paths,
        fallback: false,
    }

}

export async function getStaticProps({ params }) {
    const id = params.id
    const posts = await fetch('http://catstagram.lofty.codes/api/posts/')
        .then((res) => res.json())
    const postData = posts.find(({ pk }) => pk === Number(id))
    return {
        props: {
            post: {
                id,
                ...postData,
            }
        }
    }
}