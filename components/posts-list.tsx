import PostCard from "./post-card"
import { PostsListData } from "@/types/posts"

interface PostListProps {
  posts: PostsListData
}

export async function PostList ({ posts }: PostListProps) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            users,
            content
          } = post
          const {
            user_name: username,
            name: userFullName,
            avatar_url: avatarUrl,
          } = users
          return (
            <PostCard 
              content={content}
              key={post.id} 
              username={username} 
              userFullName={userFullName} 
              avatarUrl={avatarUrl}
            />
          )
        })
      }
    </>
  )
}