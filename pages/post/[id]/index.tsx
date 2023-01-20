import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import { Container, Card, CardContent, Typography, Stack } from '@mui/material'

export default function PostPage({ post }) {

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
                        <Typography variant='h5'>Comments</Typography>
                        <Stack>
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