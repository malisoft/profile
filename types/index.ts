/* export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  website?: string;
  [key: string]: string | undefined;
} */

export type SocialLinks = {[key: string]: string | undefined};

export type Theme = 'minimal' | 'gradient' | 'dark';

export type ProfileFormValues = {
  name: string;
  description: string;
  slug: string;
  image_url?: string;
  theme: Theme;
  social_links: SocialLinks;
  is_public?: boolean;
}

export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  slug: string;
  image_url?: string | null;
  theme: Theme;
  user_id: string;
  social_links: SocialLinks;
  is_public: boolean;
}
