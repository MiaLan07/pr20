import Post from "./Post"

export default function PostList({ posts, delPost }) {
    return (
        <ul>
            {posts.map((val, ind) => (
                <Post key={ind} post={val} delPost={delPost}></Post>
            ))}
        </ul>
    )
}