'use server'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfiles } from '@/lib/profiles';
import { DashboardStats } from '@/components/dashboard-stats';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  const profiles = await getUserProfiles(user.id);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName || 'there'}!
        </p>
      </div>

      <DashboardStats profilesCount={profiles.length} />

      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent Profiles</h2>
          <Link href="/dashboard/profiles">
            <Button variant="ghost" className="gap-1">
              View all profiles
            </Button>
          </Link>
        </div>

        {profiles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles.slice(0, 3).map((profile) => (
              <Card key={profile.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{profile.name}</CardTitle>
                  <CardDescription className="truncate">{profile.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">
                    /{profile.slug}
                  </div>
                  <div className="h-32 bg-muted/50 rounded-md overflow-hidden relative">
                    {profile.image_url ? (
                      <img 
                        src={profile.image_url}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No image uploaded
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 w-full justify-end">
                  <Button variant="outline" size="sm" className="" asChild>
                    <Link href={`/dashboard/profiles/${profile.id}`}>Edit</Link>
                  </Button>
                  <Button size="sm" className="" asChild>
                    <Link href={`/${profile.slug}`} target="_blank">View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-8 text-center bg-card">
            <h3 className="font-medium text-lg mb-2">Create your first profile</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create a customizable profile to showcase your personal brand and easily share it with others.
            </p>
            <Button asChild>
              <Link href="/dashboard/profiles/new">Create Profile</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
