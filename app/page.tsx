import { getAllPosts } from "@/lib/posts";
import { DesktopContainer } from "@/components/os/desktop-container";

export default async function Home() {
  const posts = await getAllPosts();

  return <DesktopContainer posts={posts} />;
}
