import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import useSWR from 'swr'
import useSWRMutation from "swr/mutation"
import { editPost, postsCacheKey } from 'api-routes/posts'
import { createSlug } from "@/utils/createSlug";


export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data: { data: post = {} } = {}, error } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }))
  
  const { trigger } = useSWRMutation(postsCacheKey, editPost)
  
  
  const handleOnSubmit = async ({titleInput, editorContent }) => {
    const slug = createSlug(titleInput);
    const editedPost = {
      body: editorContent,
      title: titleInput,
      slug: slug, 
      id: post.id
    }
    
   
    const res = await trigger(editedPost);
    if (!res || res.error) {
    console.log(res && res.error)
  }
    // const { error } = await trigger(editPost);
    // if (!error) {
        router.push(`/blog/${slug}`)
    }
  
  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}
