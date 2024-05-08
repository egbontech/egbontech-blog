import { baseUrl, siteUrl } from "@/baseURL";
import { MetadataRoute } from "next";

interface Post {
  id: number;
  slug: string;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const Fetch = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/seo-posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const data = await Fetch();

  const posts: MetadataRoute.Sitemap = data.map((post: Post) => ({
    url: `${siteUrl}/blog/${post?.slug}`,
    lastModified: post?.updated_at,
    changeFrequency: "weekly",
    priority: 1,
  }));
  return [
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...posts,
  ];
}
