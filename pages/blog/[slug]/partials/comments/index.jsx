import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR from 'swr'
import { commentsCacheKey, getComments } from "../../../../../api-routes/comments";




export default function Comments({ postId }) {
  console.log(commentsCacheKey, getComments)
  const { data: { data = [] } = {}, error } = useSWR(postId ? commentsCacheKey : null , () => getComments(postId))
 console.log(data, error)


  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */
  
  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
