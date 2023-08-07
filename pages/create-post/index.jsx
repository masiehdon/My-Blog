import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation"
import { addPost, postsCacheKey } from "../../api-routes/posts";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";



export default function CreatePost() {
  const user = useUser()

  const router = useRouter()
  const { trigger } = useSWRMutation(postsCacheKey, addPost)
  const handleOnSubmit = async ({ editorContent, titleInput }) => {
    const slug = createSlug(titleInput);
    const newPost = {
      body: editorContent,
      title: titleInput,
      slug: slug,
      user_id: user.id
    }
    
   
    const { error } = await trigger(newPost);
    if (!error) {
      router.push(`/blog/${slug}`)
    }
    // Insert the new blog post data into the Supabase table
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
