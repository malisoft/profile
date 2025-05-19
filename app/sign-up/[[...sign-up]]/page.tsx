import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">My</span>
            <span>Profile</span>
          </div>
        </div>
        <SignUp forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}
