'use server'
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileForm } from "@/components/profile-form";
import { getProfileById } from "@/lib/profiles";
import { notFound } from "next/navigation";

export default async function EditProfilePage({
  params
}: { params: Promise<{ id: string }>}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  const { id } = await params;

  const profile = await getProfileById(id);

  if (!profile) {
    notFound();
  }

  // Ensure the user can only edit their own profiles
  if (profile.user_id !== user.id) {
    redirect('/dashboard/profiles');
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your profile information and settings
        </p>
      </div>

      <ProfileForm 
        userId={user.id}
        initialData={profile}
      />
    </div>
  );
}
