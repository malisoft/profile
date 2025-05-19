'use server'
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="border rounded-lg p-8 text-center bg-card">
        <h3 className="font-medium text-lg mb-2">Account Settings</h3>
        <p className="text-muted-foreground mb-6">
          To manage your account details, please use the Clerk user settings.
        </p>
        <p className="text-sm text-muted-foreground">
          Account management is handled securely through our authentication provider.
        </p>
      </div>
    </div>
  );
}
