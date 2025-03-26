import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');
// console.log('postsDirectory : ',path.join(process.cwd(), 'src', 'posts'));
export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    // console.log('slug : ', slug);
    // console.log('fullPath : ', fullPath);
    // console.log('fileContents : ', fileContents);
    // console.log('data', data);
    return {
      slug,
      ...data,
      content,
    };
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  

  return {
    slug,
    ...data,
    content,
  };
  // const posts = getAllPosts();
  // return posts.find((post) => post.slug === slug); // slug 기준으로 찾음!
}
