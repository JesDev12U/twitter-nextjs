import { createClient } from "@/utils/supabase/server"
import { ComposePostClient } from "./compose-post-client"
import { revalidatePath } from "next/cache"

export function ComposePost({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const addPost = async (formData: FormData) => {
    'use server' 
    const content = formData.get('post') as string
    if (!content || content.trim() === '') return
    
    const supabase = await createClient()
    // Revisar que el usuario esté autenticado
    const { data: { user } } = await supabase.auth.getUser()
    if (user === null) return
    const { data, error } = await supabase
    .from('posts')
    .insert({ content: content.trim(), user_id: user.id })
    if (error) throw new Error('Error al crear el post')

    revalidatePath('/')
  }

  return (
    <>
      <ComposePostClient 
        userAvatarUrl={userAvatarUrl} 
        onSubmit={addPost}
      />
    </>
  )
}