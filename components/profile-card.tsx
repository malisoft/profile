"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteProfileDialog } from "@/components/delete-profile-dialog";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const profileUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${profile.slug}`;
  
  const copyProfileLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard");
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">{profile.name}</CardTitle>
            <CardDescription className="truncate max-w-[200px]">
              {profile.description}
            </CardDescription>
          </div>
          {!profile.is_public && (
            <Badge variant="outline">Private</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <span>/{profile.slug}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={copyProfileLink}
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
        <div className="h-32 bg-muted/50 rounded-md overflow-hidden relative">
          {profile.image_url ? (
            <img 
              src={profile.image_url}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
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
          <a href={`/${profile.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
            View
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>

      <DeleteProfileDialog 
        profileId={profile.id} 
        profileName={profile.name}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </Card>
  );
}
