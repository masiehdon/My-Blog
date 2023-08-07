import { supabase } from '../lib/supabaseClient'
export const commentsCacheKey = '/api/comments'

export const getComments = async (postId) => {
  const { data, error, status } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)

  return { data, error, status }
}

export const deleteComment = async (_, {arg: id}) => {
  const { data, error } = await supabase 
    .from('comments')
    .delete()
  .eq('id', id)
  
  return { data, error}
}