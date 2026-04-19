import { PostStudio } from "@/components/seo-studio/PostStudio";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  return <PostStudio postId={id} />;
}
