"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProfile } from "@/lib/profiles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteProfileDialogProps {
  profileId: string;
  profileName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DeleteProfileDialog({
  profileId,
  profileName,
  isOpen,
  setIsOpen,
}: DeleteProfileDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteProfile(profileId);
      toast.success("Profile deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete profile");
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the profile <strong>{profileName}</strong> and all associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
