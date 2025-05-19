"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { getThemeStyles } from "@/lib/theme-utils";
import { getSocialIcon } from "@/lib/social-icons";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  const [copied, setCopied] = useState(false);
  
  const themeStyles = getThemeStyles(profile.theme);
  
  const socialLinks = Object.entries(profile.social_links || {}).filter(
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, url]) => url && url.trim() !== ""
  );
  
  const shareProfile = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.description,
          url: url,
        });
      } catch (err) {
        console.error(err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };
  
  const copyToClipboard = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Profile link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={themeStyles.container} className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg mx-auto p-4 md:p-6 flex flex-col items-center">
        <div style={themeStyles.header} className="w-full pb-6 md:pb-10 flex flex-col items-center">
          <div className="w-full flex justify-end">
            <Button 
              onClick={shareProfile}
              variant="ghost" 
              size="icon" 
              style={themeStyles.shareButton}
              //put green on copied
              className={cn(
                "rounded-full",
                copied && "bg-success/10 text-success"
              )}
            >
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share profile</span>
            </Button>
          </div>
          
          <div style={themeStyles.profileImage} className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 shadow-md mb-4">
            {profile.image_url ? (
              <img 
                src={profile.image_url}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
          
          <h1 style={themeStyles.name} className="text-2xl md:text-3xl font-bold text-center mb-2">
            {profile.name}
          </h1>
          
          <p style={themeStyles.description} className="text-center text-muted-foreground max-w-md">
            {profile.description}
          </p>
        </div>
        
        {socialLinks.length > 0 && (
          <div className="w-full space-y-4">
            {socialLinks.map(([platform, url]) => (
              <a 
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="w-full flex items-center p-3 md:p-4 rounded-lg border transition-all hover:opacity-90 hover:scale-[1.01]"
              >
                {getSocialIcon(platform)}
                <span className="ml-3 font-medium">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </span>
              </a>
            ))}
          </div>
        )}
        
        <div className="w-full mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>
            Created with <NextLink href="/" className="hover:underline font-medium">MyProfile</NextLink>
          </p>
        </div>
      </div>
    </div>
  );
}
