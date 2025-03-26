import Link from 'next/link';
import { getAllPosts } from '../lib/posts';

export default function Home({ posts }: any) {
  return (
    <main className="container">
      <h1>블로그</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
