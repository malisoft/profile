export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          slug: string
          image_url: string | null
          theme: string
          user_id: string
          social_links: Json
          is_public: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          slug: string
          image_url?: string | null
          theme: string
          user_id: string
          social_links?: Json
          is_public?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          slug?: string
          image_url?: string | null
          theme?: string
          user_id?: string
          social_links?: Json
          is_public?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
