import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import useSWR from 'swr';
import { getPosts, postsCacheKey } from "../../api-routes/posts";



export default function FetchBlog() {
  const { data: { data=[], error}={}, isLoading }  = useSWR(postsCacheKey, getPosts)
  console.log({data, error, isLoading})
 

  return (
    <section>
      <Heading>Blog</Heading>
      {data.map((post) => (
        <Link key={post.id} className={styles.link} href={`/blog/${post.slug}`}>
          <div className="w-full flex flex-col">
            <h2>{post.title}</h2>
          
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}
