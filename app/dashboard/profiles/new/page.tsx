'use server'
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ProfileForm } from "@/components/profile-form";

export default async function NewProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Profile</h1>
        <p className="text-muted-foreground">
          Create a new shareable profile to showcase your personal brand
        </p>
      </div>

      <ProfileForm userId={user.id} />
    </div>
  );
}
