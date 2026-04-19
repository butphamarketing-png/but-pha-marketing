import { PostStudio } from "@/components/seo-studio/PostStudio";

type StudioPostsPageProps = {
  searchParams: Promise<{ ids?: string; keyword?: string }>;
};

export default async function StudioPostsPage({ searchParams }: StudioPostsPageProps) {
  const params = await searchParams;
  const initialIds = params.ids?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];

  return <PostStudio initialIds={initialIds} seedKeyword={params.keyword} />;
}
