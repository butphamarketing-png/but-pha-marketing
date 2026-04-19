import { PostStudio } from "@/components/seo-studio/PostStudio";

type CreatePostPageProps = {
  searchParams: Promise<{ keyword?: string }>;
};

export default async function CreatePostPage({ searchParams }: CreatePostPageProps) {
  const params = await searchParams;

  return <PostStudio seedKeyword={params.keyword} />;
}
