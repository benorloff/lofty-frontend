import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PostPage() {
    const router = useRouter()
    const id = router.query.id as string


    return (
        <>
            <div>PK: {id}</div>
        </>
    )
}