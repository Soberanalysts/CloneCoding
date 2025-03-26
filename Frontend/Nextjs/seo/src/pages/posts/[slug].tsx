import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { marked } from 'marked';
import fs from 'fs';

export default function PostPage({ post }: any) {
  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={`${post.title}에 대한 블로그 포스트입니다.`} />
      </Head>

      <main className="container">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

// export const getStaticPaths: GetStaticPaths = async () =>  {
//   const files = fs.readdirSync("posts");

//   const paths = files.map((filename) => {
//     const fileContent = fs.readFileSync(`posts/${filename}`, "utf-8");
//     const { data } = matter(fileContent);
//     return {
//       params: { slug: data.slug },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  return {
    props: { post },
  };
};
