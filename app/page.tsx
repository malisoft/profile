import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <header className="border-b bg-background flex justify-center w-full">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">My</span>
            <span>Profile</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 container">
        <section className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Create your <span className="text-primary">shareable</span> professional profile
            </h1>
            <p className="text-lg text-muted-foreground md:w-[90%]">
              Build beautiful profiles to showcase your personal brand, with customizable themes and easy sharing to social platforms.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/sign-up">
                <Button size="lg" className="rounded-full">
                  Create Your Profile
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="rounded-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md p-4 md:p-8 bg-muted/50 rounded-lg border shadow-sm">
            <div className="border rounded-lg overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 h-32 relative">
                <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full bg-background border-4 border-background shadow-md"></div>
              </div>
              <div className="pt-16 p-6">
                <h2 className="text-xl font-bold">Jane Smith</h2>
                <p className="text-muted-foreground">Product Designer & Illustrator</p>
                <p className="mt-4">Creating intuitive user experiences and delightful interfaces</p>
                <div className="flex gap-3 mt-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="sr-only">Twitter</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="sr-only">LinkedIn</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="sr-only">Instagram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Features designed for you</h2>
            <p className="text-muted-foreground text-lg">Everything you need to create your perfect online presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Themes</h3>
              <p className="text-muted-foreground">Choose from multiple themes to match your personal brand and style.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Social Links</h3>
              <p className="text-muted-foreground">Connect all your social media accounts and important links in one place.</p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom URL</h3>
              <p className="text-muted-foreground">Get your own personalized URL that is easy to remember and share.</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to create your profile?</h2>
            <p className="text-lg text-muted-foreground mb-10">Join thousands of professionals showcasing their work and personal brand</p>
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full px-8">
                Get Started For Free
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-primary">My</span>
              <span>Profile</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MyProfile. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
