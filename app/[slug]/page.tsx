import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfileBySlug } from "@/lib/profiles";
import { ProfileView } from "@/components/profile-view";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ProfilePageProps
): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  
  if (!profile) {
    return {
      title: "Profile Not Found",
      description: "The requested profile could not be found.",
    };
  }

  return {
    title: `${profile.name} - MyProfile`,
    description: profile.description,
    openGraph: {
      title: profile.name,
      description: profile.description,
      images: profile.image_url ? [
        {
          url: profile.image_url,
          width: 1200,
          height: 630,
          alt: profile.name,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: profile.name,
      description: profile.description,
      images: profile.image_url ? [profile.image_url] : undefined,
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  
  if (!profile) {
    notFound();
  }

  return <ProfileView profile={profile} />;
}
