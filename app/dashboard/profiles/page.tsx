'use server'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { getUserProfiles } from '@/lib/profiles';
import { PlusIcon } from 'lucide-react';
import { ProfileCard } from '@/components/profile-card';

export default async function ProfilesPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  const profiles = await getUserProfiles(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profiles</h1>
          <p className="text-muted-foreground">
            Manage your shareable profiles
          </p>
        </div>
        <Link href="/dashboard/profiles/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Profile
          </Button>
        </Link>
      </div>

      {profiles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center bg-card">
          <h3 className="font-medium text-lg mb-2">No profiles yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create your first profile to share with others.
          </p>
          <Button asChild>
            <Link href="/dashboard/profiles/new">Create Your First Profile</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
