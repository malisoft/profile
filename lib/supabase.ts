import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { auth } from '@clerk/nextjs/server';

export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,  {
    async accessToken() {
      return (await auth()).getToken()
    },
  }

);
