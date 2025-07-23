import { Tables, TablesInsert, TablesUpdate } from "@/types/database"

// Tipos base para entidades
export type Post = Tables<"posts">
export type User = Tables<"users">

// Tipos para inserciones
export type PostInsert = TablesInsert<"posts">
export type UserInsert = TablesInsert<"users">

// Tipos para actualizaciones
export type PostUpdate = TablesUpdate<"posts">
export type UserUpdate = TablesUpdate<"users">

// Tipo para post con relación de usuario incluida
export type PostWithUser = Post & {
  users: User
}

// Tipo para los datos que recibe el componente PostList
export type PostsListData = PostWithUser[] | null
