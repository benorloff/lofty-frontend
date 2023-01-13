export function getAllPosts() {

}

export async function getAllPostIds() {
    let posts = getPosts();
    const getPosts = async () => {
        fetch('http://catstagram.lofty.codes/api/posts/')
        .then((res) => res.json())
    }
    return posts.map((post) => {
        return {
            params: {
                id: post.pk,
            }
        }
    })
}