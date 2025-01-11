"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
interface Post {
   id: number;
   title: string;
   content: string;
   slug: string;
}
export default function Blog() {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      fetchPosts();
   }, []);
   const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
         const response = await fetch("http://localhost:3000/api/posts");
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const data = await response.json();
         setPosts(data);
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: string | any) {
         setError(error.message || "An unexpected error occurred");
      } finally {
         setLoading(false);
      }
   };
   return (
      <div className="min-h-screen p-8 pb-2">
         <Header />
         <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1>Blog</h1>
            {/* loading */}
            {loading && <p>Loading...</p>}
            {/* error */}
            {error && <p>{error}</p>}
            {posts.length > 0 && (
               <ul>
                  {posts.map((post: Post) => (
                     <li key={post.id}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                     </li>
                  ))}
               </ul>
            )}
         </main>
         <Footer />
      </div>
   );
}
