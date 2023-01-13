import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSWRConfig } from 'swr'
import { CommentsDisabled } from '@mui/icons-material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds } from '../../../lib/posts'

export default function PostPage() {
    const router = useRouter()
    const id = router.query.id as string
    // const { cache } = useSWRConfig()

    // console.log(cache, '<-- cache')
    // console.log(posts, '<-- posts')

    // const cachedPosts = cache.get("http://catstagram.lofty.codes/api/posts/")
    // console.log(cachedPosts, '<-- cachedPosts')

    // const post = cachedPosts?.data?.find(({ pk }) => pk === Number(id))
    // console.log(post, '<-- post')

    const [posts, setPosts] = useState([])
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getAllPosts = () => {
            fetch('http://catstagram.lofty.codes/api/posts/')
                .then((res) => res.json())
                .then((data) => setPosts(data))
        }
        getAllPosts()
    }, [])

    useEffect(() => {
        const getPost = () => {
            const post = posts.find(({ pk }) => pk == id)
            setPost(post)
        }
        getPost()
    }, [posts])

    console.log(posts, '<-- posts from postpage')
    console.log(post, '<-- post from postpage')

    return (
        <div style={{ marginLeft: 25 }}>
            { post ? ( 
                <>
                    <img width='150' src={`http://catstagram.lofty.codes/media/${post.image}`} />
                    <div>PK: {post.pk}</div>
                    <div>Name: {post.name}</div>
                    <div>Created: {post.timestamp_created}</div>
                    <div>Updated: {post.timestamp_updated}</div>
                    {/* <div>Comments ({post.comments.length}):</div>
                    <ul>
                        { post.comments.map((c) => (
                            <li key={c.pk}>{c.text}</li>
                        ))}
                    </ul> */}
                </>
            ) : (
                <p>No post found</p>
            )}
            TEST
            
        </div>
    )
}

// export async function getStaticPaths () {
//     let postIds = []
//     const getAllPostIds = () => {
//         const posts = fetch('http://catstagram.lofty.codes/api/posts/')
//             .then((res) => res.json())
//             .then((data) => postIds = data)
//         return postIds.map((post) => {
//             return {
//                 params: {
//                     id: post.pk,
//                 }
//             }
//         })
//     }
//     getAllPostIds()

//     // const posts = getAllPostIds();
//     // console.log(posts, '<-- posts from getStaticPaths')
    
    
//     // fetch('http://catstagram.lofty.codes/api/posts/')
//     //     .then((res) => res.json())

//     // return {
//     //     paths,
//     //     fallback: false,
//     // }
// }

// export async function getStaticProps ({ params }) {
//     const posts = await fetch('http://catstagram.lofty.codes/api/posts/')
//         .then((res) => res.json())
//     const post = posts.find(({ pk }) => pk === params.id)
//     return {
//         props: {
//             post,
//             fallback: false,
//         }
//     }
// }



// interface Cache<Data> {
//     get(key: string): Data | undefined
//     set(key: string, value: Data): void
//     delete(key: string): void
//     keys(): IterableIterator<string>
// }

// interface Post<Object> {
//     keys(): IterableIterator<string>
// }