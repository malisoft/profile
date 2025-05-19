"use server";

import { supabase } from "@/lib/supabase";
import { ProfileFormValues } from "@/types";

export async function getUserProfiles(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  return data || [];
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function getProfileBySlug(slug: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error) {
    console.error("Error fetching profile by slug:", error);
    return null;
  }

  return data;
}

export async function isSlugAvailable(slug: string, excludeProfileId?: string) {
  const query = supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug);

  if (excludeProfileId) {
    query.not("id", "eq", excludeProfileId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error checking slug availability:", error);
    return false;
  }

  return data.length === 0;
}

export async function createProfile(profile: ProfileFormValues, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      name: profile.name,
      description: profile.description,
      slug: profile.slug,
      image_url: profile.image_url,
      theme: profile.theme,
      social_links: profile.social_links,
      user_id: userId,
      is_public: profile.is_public,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    throw new Error("Failed to create profile");
  }

  return data;
}

export async function updateProfile(id: string, profile: ProfileFormValues) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: profile.name,
      description: profile.description,
      slug: profile.slug,
      image_url: profile.image_url,
      theme: profile.theme,
      social_links: profile.social_links,
      is_public: profile.is_public,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }

  return data;
}

export async function deleteProfile(id: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting profile:", error);
    throw new Error("Failed to delete profile");
  }

  return true;
}
