import { PostList } from '@/components/posts-list';
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { PostsListData } from '@/types/posts';
import { ComposePost } from '@/components/compose-post-server';

export default async function App() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user === null) {
    redirect('/login')
  }

  const { data: posts }: { data: PostsListData } = await supabase.from('posts').select('*, users(*)').order('created_at', { ascending: false });
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/30 min-h-screen'>
        <ComposePost userAvatarUrl={user.user_metadata.avatar_url} />
        <PostList posts={posts} />
      </section>
    </main>
  )
}