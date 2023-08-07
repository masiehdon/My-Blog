import { supabase } from '../lib/supabaseClient'
import { useRouter } from "next/router";


export const postsCacheKey = '/api/blogs'


export const getPosts = async () => {
  //Handle get all posts
 const { data, error } = await supabase
    .from("posts")
    .select("*")
  return {data, error}
};


 export const getPost = async ({ slug }) => {
   const { data, error } = await supabase
     .from('posts')
     .select('*')
     .single()
     .eq('slug', slug);
 
    if (error) {
    throw new Error(error.message);
  }

   return { data, error }
 }


export const addPost = async (_, { arg }) => {
  console.log(arg)
  //Handle add post here

      const { data, error } = await supabase
        .from("posts")
        .insert(
        arg 
        )
        .select();
  return { data, error}
 
}

export const deletePost = async(_, { arg } ) => {
 
    const { status, error } = await supabase

      .from('posts')
      .delete()
      .eq('id', arg)
    
  return { status, error }

  }
  
  

   
 



export const editPost = async (_, { arg }) => {
  console.log(arg)
  //Handle add post here
 
      const { data, error } = await supabase
        .from("posts")
        .update(
        arg 
      )
        .eq('id', arg.id)
        .select();
        

  return { data, error}

};
