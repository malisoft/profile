import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md text-center space-y-6 py-10">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Profile Not Found</h2>
          <p className="text-muted-foreground">
            The profile you are looking for does not exist or is set to private.
          </p>
          <div className="flex justify-center pt-4">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
