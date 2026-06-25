import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata = {
  title: "Journal · anh nd.",
  description: "Writing is how I find out what I think.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <article className="grid gap-space-7">
      <header className="grid gap-space-3 sm:max-w-[60ch]">
        <p className="uppercase-eyebrow">journal</p>
        <h1 className="text-h1 font-display font-semibold tracking-tight text-ink-strong">
          Writing is how I find out what I think.
        </h1>
        <p className="text-ink-mute">
          Most of these are short. The oldest ones are a little embarrassed.
          Read in any order.
        </p>
      </header>

      <PostList posts={posts} />
    </article>
  );
}
