import { useState } from 'react'
import Header from '../../../components/Header'
import { 
    Container, 
    Card, 
    CardContent, 
    Typography, 
    Stack,
    TextField,
    Button,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import Footer from '../../../components/Footer';

type Post = {
    id: string;
    pk: number;
    name: string;
    comments: [];
    image: string;
    timestamp_created: string;
    timestamp_updated: string;
}

export default function PostPage({ post } : { post: Post }) {

    const { data: session, status } = useSession()

    const router = useRouter()

    const [newComment, setNewComment] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const validateURL = async () => {
        const res = await fetch(`http://catstagram.lofty.codes/media/${post.image}`)
            .then((res) => console.log(res, '<-- post res'))
    }

    console.log(post)
    validateURL()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        postComment({
            text: newComment,
            entry: Number(post.id)
        })
            .then((data) => {
                console.log(data, '<-- comments api success')
                setMessage('Success! Your comment has been posted.')
            })
            .catch((error) => {
                console.log(error, '<-- comments api error')
                setMessage('Uh oh! There was an error posting your comment.')
            })
        setLoading(false)
        setNewComment('')
        router.reload()
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
                    {/* Add a new comment, restricted to authenticated users */}
                    { status === "authenticated" && 
                        <Card>
                            <CardContent>
                                <Typography variant='h5' sx={{ mb: 1 }}>
                                    Add Your Comment
                                </Typography>
                                <TextField
                                    required
                                    id="description"
                                    label={`What are your thoughts, ${session?.user?.name?.split(' ')[0]}?`}
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
                                { message && 
                                    <Typography>
                                        {message}
                                    </Typography>
                                }
                            </CardContent>
                        </Card>
                    }
                    {/* Comment feed */}
                    <Card>
                        <CardContent>
                            <Typography variant='h5' sx={{ mb: 1 }}>
                                Comments
                            </Typography>
                            <Stack spacing={1}>
                                { post.comments.length ? (
                                    post.comments.map((c) => (
                                        <Stack direction="row" alignItems="center" spacing={2} key={c.pk}>
                                            <AccountCircle />
                                            <div>{c.text}</div>
                                            <div>{new Date(c.timestamp_created).toLocaleDateString()}</div>
                                        </Stack>
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
            <Footer />
        </>
    )
}

// Statically pre-render all paths during build
export async function getStaticPaths() {
    const posts = await fetch('http://catstagram.lofty.codes/api/posts/')
        .then((res) => res.json())
    const paths = posts.map((post: Post) => {
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

// Statically pre-render props during build
// Runs in the background and revalidates every 10 seconds
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