import { useRouter } from 'next/router'
import styles from './blog-post.module.css'
import Comments from './partials/comments'
import AddComment from './partials/add-comment'
import Button from '@components/button'
import Heading from '@components/heading'
import BlogImageBanner from '@components/blog-image-banner'
import { supabase } from '../../../lib/supabaseClient'
import useSWR from 'swr'
import { getPost, postsCacheKey, deletePost } from 'api-routes/posts'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  toastSuccessDeleteBlog,
  toastError,
  toastSuccess,
} from '../../../components/toast/Toast'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import useSWRMutation from 'swr/mutation'



export default function BlogPost() {
  const router = useRouter()

  const user = useUser()
  console.log(user)

  
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query

  const { data: { data: post = {} } = {}, error } = useSWR(
    slug ? `${postsCacheKey}${slug}` : null,
    () => getPost({ slug })
  )

  const { trigger: deleteTrigger }= useSWRMutation(postsCacheKey, deletePost)
  const handleDeletePost = async () => {
    await deleteTrigger(post.id)
    router.push('/blog')
    toastSuccess()
    
  }

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`)
  }
const isAuthor = user?.id === post.user_id

  return (
    <>
      <ToastContainer />
      <section className={styles.container}>
        <Heading>{post.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.created_at}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <span className={styles.author}>Author: {post.author}</span>

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        <div className={styles.buttonContainer}>
         { isAuthor && <Button onClick={handleDeletePost }>Delete</Button>}
         { isAuthor&& <Button onClick={handleEditPost}>Edit</Button> }
        </div>
      </section>

      <Comments postId={post.id} />

      {/* This component should only be displayed if a user is authenticated */}
      <AddComment postId={post.id} />
    </>
  )
}
