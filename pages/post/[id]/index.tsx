import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '../../../components/Header'
import { 
    Container, 
    Card, 
    CardContent, 
    Typography, 
    Stack,
    TextField,
    Button,
    Box,
    CircularProgress,
} from '@mui/material'

export default function PostPage({ post }) {

    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        postComment({
            text: newComment,
            entry: Number(post.id)
        })
            .then((data) => {
                console.log(data, '<-- comments api response')
            })
            .catch((error) => {
                console.log(error, '<-- comments api error')
            })
        setLoading(false)
        setNewComment('')
    }

    // Post the comment to the Lofty API
    const postComment = async (data = {}) => {
        const res = await fetch('http://catstagram.lofty.codes/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res.json()
    }

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
                <Stack spacing={2}>
                    {/* Post image */}
                    <Card>
                        <CardContent>
                        <div>
                            { post ? ( 
                                <>
                                    <img width='100%' src={`http://catstagram.lofty.codes/media/${post.image}`} />
                                </>
                            ) : (
                                <p>No post found</p>
                            )}
                        
                        </div>
                        </CardContent>
                    </Card>
                    {/* Add a new comment */}
                    <Card>
                        <CardContent>
                            <Typography variant='h5' sx={{ mb: 1 }}>
                                Add Your Comment
                            </Typography>
                            <TextField
                                required
                                id="description"
                                label="What are your thoughts?"
                                value={newComment}
                                onChange={handleChange}
                                sx={{ width: '100%', mb: 1 }}
                            />
                            <Button 
                                variant='contained'
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            { loading && 
                                <CircularProgress />
                            }
                        </CardContent>
                    </Card>
                    {/* Comment feed */}
                    <Card>
                        <CardContent>
                            <Typography variant='h5' sx={{ mb: 1 }}>
                                Comments
                            </Typography>
                            <Stack spacing={1}>
                                { post.comments.length ? (
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
                </Stack>
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
        },
        revalidate: 10,
    }
}