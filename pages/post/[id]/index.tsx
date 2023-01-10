import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSWRConfig } from 'swr'
import { CommentsDisabled } from '@mui/icons-material'

export default function PostPage() {
    const router = useRouter()
    const id = router.query.id as string
    const { cache } = useSWRConfig()

    const cachedPosts = cache.get("http://catstagram.lofty.codes/api/posts/")
    console.log(cachedPosts, '<-- cachedPosts')

    const post = cachedPosts?.data?.find(({ pk }) => pk === Number(id))
    console.log(post, '<-- post')

    return (
        <div style={{ marginLeft: 25 }}>
            <img width='150' src={`http://catstagram.lofty.codes/media/${post.image}`} />
            <div>PK: {post.pk}</div>
            <div>Name: {post.name}</div>
            <div>Created: {post.timestamp_created}</div>
            <div>Updated: {post.timestamp_updated}</div>
            <div>Comments ({post.comments.length}):</div>
            <ul>
                { post.comments.map((c) => (
                    <li key={c.pk}>{c.text}</li>
                ))}
            </ul>
        </div>
    )
}

interface Cache<Data> {
    get(key: string): Data | undefined
    set(key: string, value: Data): void
    delete(key: string): void
    keys(): IterableIterator<string>
}