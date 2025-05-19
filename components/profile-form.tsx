"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { Profile, ProfileFormValues, SocialLinks, Theme } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ImageIcon, Loader2 } from "lucide-react";
import { createProfile, isSlugAvailable, updateProfile } from "@/lib/profiles";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
//import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters.",
    })
    .max(50, {
      message: "Slug must be at most 50 characters.",
    })
    .regex(/^[a-z0-9_-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, hyphens, and underscores.",
    }),
  image_url: z.string().optional(),
  theme: z.enum(['minimal', 'gradient', 'dark']),
  social_links: z.record(z.string().url().optional().or(z.literal(""))),
  is_public: z.boolean().default(true),
});

interface ProfileFormProps {
  userId: string;
  initialData?: Profile;
}

export function ProfileForm({ userId, initialData }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      image_url: initialData.image_url || undefined,
      social_links: initialData.social_links as SocialLinks,
      is_public: initialData.is_public,
      theme: initialData.theme as Theme,
    } : {
      name: "",
      description: "",
      slug: "",
      image_url: undefined,
      theme: "minimal",
      social_links: {},
      is_public: true,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    const isEditing = !!initialData;
    try {
      setIsLoading(true);
      
      // Check if slug is available (and not the current profile's slug)
      const slugAvailable = await isSlugAvailable(
        values.slug, 
        isEditing ? initialData.id : undefined
      );
      
      if (!slugAvailable) {
        form.setError("slug", {
          type: "manual",
          message: "This slug is already taken. Please choose another one.",
        });
        setIsLoading(false);
        return;
      }
      
      if (isEditing) {
        await updateProfile(initialData.id, values);
        toast.success("Profile updated successfully");
      } else {
        await createProfile(values, userId);
        toast.success("Profile created successfully");
      }
      
      router.push("/dashboard/profiles");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(isEditing ? "Failed to update profile" : "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name or title" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name that will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief description about yourself"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Write a short bio or description for your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="text-muted-foreground mr-2">/</span>
                            <Input placeholder="your-custom-url" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          This will be the URL of your profile: {process.env.NEXT_PUBLIC_SITE_URL}/{field.value || "your-custom-url"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div className="border rounded-md p-4 flex flex-col items-center justify-center min-h-[150px]">
                              {field.value ? (
                                <div className="relative w-full h-[150px]">
                                  <img
                                    src={field.value}
                                    alt="Profile"
                                    className="w-full h-full object-contain rounded-md"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => form.setValue("image_url", "")}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                  <ImageIcon className="h-10 w-10" />
                                  <p>No image uploaded</p>
                                </div>
                              )}
                            </div>
                            <CldUploadWidget
                              uploadPreset="profile_images"
                              options={{
                                maxFiles: 1,
                                resourceType: "image",
                                maxFileSize: MAX_FILE_SIZE,
                                sources: ["local", "url"],
                              }}
                              onSuccess={(result) => {
                                //@ts-ignore
                                form.setValue("image_url", result.info.secure_url);
                              }}
                            >
                              {({ open }) => (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => open()}
                                >
                                  {field.value ? "Change Image" : "Upload Image"}
                                </Button>
                              )}
                            </CldUploadWidget>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a profile image. Max file size: 5MB.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="is_public"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Public Profile</FormLabel>
                          <FormDescription>
                            Make your profile visible to everyone.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <h3 className="text-lg font-medium">Social Media Links</h3>
                  <p className="text-sm text-muted-foreground">
                    Add links to your social media profiles.
                  </p>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="social_links.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/yourusername" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="social_links.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/yourusername" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="social_links.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourusername" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="social_links.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/yourusername" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="social_links.youtube"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youtube.com/c/yourchannel" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="social_links.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <h3 className="text-lg font-medium">Theme Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a theme for your profile.
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="space-y-2">
                                  <div className="border-2 rounded-lg overflow-hidden transition-all hover:border-primary cursor-pointer aspect-video relative">
                                    <div className="absolute inset-0 bg-white flex flex-col">
                                      <div className="h-20 bg-muted flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full border-4 border-white bg-secondary"></div>
                                      </div>
                                      <div className="flex-1 p-4 flex flex-col items-center">
                                        <div className="bg-muted w-20 h-3 rounded mb-2"></div>
                                        <div className="bg-muted w-32 h-2 rounded mb-4"></div>
                                        <div className="flex gap-2 mt-2">
                                          <div className="w-6 h-6 rounded-full bg-muted"></div>
                                          <div className="w-6 h-6 rounded-full bg-muted"></div>
                                          <div className="w-6 h-6 rounded-full bg-muted"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <RadioGroupItem
                                      value="minimal"
                                      id="minimal"
                                      className="sr-only"
                                    />
                                    {field.value === "minimal" && (
                                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                          ✓
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <FormLabel htmlFor="minimal" className="cursor-pointer text-center block font-medium">
                                    Minimal
                                  </FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="space-y-2">
                                  <div className="border-2 rounded-lg overflow-hidden transition-all hover:border-primary cursor-pointer aspect-video relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col">
                                      <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-200"></div>
                                      </div>
                                      <div className="flex-1 p-4 flex flex-col items-center text-white">
                                        <div className="bg-white/20 w-20 h-3 rounded mb-2"></div>
                                        <div className="bg-white/20 w-32 h-2 rounded mb-4"></div>
                                        <div className="flex gap-2 mt-2">
                                          <div className="w-6 h-6 rounded-full bg-white/20"></div>
                                          <div className="w-6 h-6 rounded-full bg-white/20"></div>
                                          <div className="w-6 h-6 rounded-full bg-white/20"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <RadioGroupItem
                                      value="gradient"
                                      id="gradient"
                                      className="sr-only"
                                    />
                                    {field.value === "gradient" && (
                                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                          ✓
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <FormLabel htmlFor="gradient" className="cursor-pointer text-center block font-medium">
                                    Gradient
                                  </FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="space-y-2">
                                  <div className="border-2 rounded-lg overflow-hidden transition-all hover:border-primary cursor-pointer aspect-video relative">
                                    <div className="absolute inset-0 bg-gray-900 flex flex-col">
                                      <div className="h-20 bg-gray-800 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full border-4 border-gray-900 bg-gray-700"></div>
                                      </div>
                                      <div className="flex-1 p-4 flex flex-col items-center text-gray-200">
                                        <div className="bg-gray-700 w-20 h-3 rounded mb-2"></div>
                                        <div className="bg-gray-700 w-32 h-2 rounded mb-4"></div>
                                        <div className="flex gap-2 mt-2">
                                          <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                          <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                          <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <RadioGroupItem
                                      value="dark"
                                      id="dark"
                                      className="sr-only"
                                    />
                                    {field.value === "dark" && (
                                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                          ✓
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <FormLabel htmlFor="dark" className="cursor-pointer text-center block font-medium">
                                    Dark
                                  </FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/profiles")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Profile" : "Create Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
