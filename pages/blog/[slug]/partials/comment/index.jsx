import Button from "@components/button";
import styles from "./comment.module.css";
import useSWRMutation from 'swr/mutation'
import { commentsCacheKey, deleteComment } from "../../../../../api-routes/comments";


export default function Comment({ comment, createdAt, author, id }) {
  const {trigger: deleteTrigger} = useSWRMutation(commentsCacheKey, deleteComment)

  const handleDelete = async () => {
   const {error} = await deleteTrigger(id)
    console.log({ error });
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
