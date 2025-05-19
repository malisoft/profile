Here's a comprehensive `README.md` for your project, **My Profile**, which integrates Next.js 15, TypeScript, Clerk, Supabase, and Cloudinary:

---

# My Profile

**My Profile** is a platform that enables users to authenticate, create, and share personalized profiles. Each profile can include a photo, description, name, social media links, and a selectable theme.

## 🚀 Features

* **User Authentication**: Secure sign-in and sign-up using Clerk.
* **Dashboard**: Post-authentication, users are redirected to `/dashboard` to manage their profiles.
* **Profile Creation**:

  * Upload a profile photo (limited to one per profile).
  * Add a name, description, and social media links.
  * Choose from at least three available themes.
* **Multiple Profiles**: Users can create multiple profiles under a single account.
* **Unique Slugs**: Each profile is assigned a unique, user-editable slug for sharing.
* **Public Profile Pages**: Accessible via `https://<your-domain>/<slug>`, displaying the user's information.
* **SEO Optimization**: Dynamic meta tags based on user-provided data enhance search engine visibility.
* **Social Sharing**: Open Graph tags ensure rich previews when profiles are shared on social media platforms.([Clerk][1])

## 🛠️ Technologies Used

* **Frontend**: Next.js 15 with TypeScript.
* **Authentication**: Clerk.
* **Database**: Supabase (PostgreSQL).
* **Image Storage**: Cloudinary.([LinkedIn][2])

## 📦 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/my-profile.git
   cd my-profile
   ```



2. **Install Dependencies**:

   ```bash
   npm install
   ```



3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
   ```



4. **Run the Development Server**:

   ```bash
   npm run dev
   ```



The application will be available at `http://localhost:3000`.

## 🧩 Project Structure

```
my-profile/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── [slug]/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ProfileForm.tsx
│   ├── ThemeSelector.tsx
│   └── ...
├── lib/
│   ├── supabaseClient.ts
│   ├── cloudinary.ts
│   └── ...
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── package.json
└── README.md
```



## 🔐 Authentication Flow

* **Clerk Integration**: Utilizes Clerk's React components and hooks for seamless authentication.
* **Redirection**: Upon successful sign-in or sign-up, users are redirected to the `/dashboard` route.

## 🖼️ Image Upload with Cloudinary

* **Single Image Constraint**: Each profile is limited to one photo.
* **Upload Process**:

  * Images are uploaded to Cloudinary using their API.
  * The returned URL is stored in Supabase and used to display the image on the profile page.

## 🌐 SEO and Social Sharing

* **Dynamic Meta Tags**: Each profile page generates meta tags based on the user's name, description, and photo.
* **Open Graph Integration**: Ensures rich link previews when profiles are shared on platforms like Facebook and Twitter.

## 📝 Slug Management

* **Uniqueness**: Slugs are unique identifiers for profiles.
* **Editability**: Users can edit their profile slugs, with real-time validation to ensure uniqueness.
* **Access**: Profiles are accessible via `https://<your-domain>/<slug>`.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` further to match your project's specific details and requirements.

[1]: https://clerk.com/blog/how-clerk-integrates-nextjs-supabase?utm_source=chatgpt.com "How Clerk integrates with a Next.js application using Supabase"
[2]: https://www.linkedin.com/posts/mohammad-abbas-dev_nextjs-supabase-clerk-activity-7314749700421656577-ED4h?utm_source=chatgpt.com "Mohammad Abbas' Post - LinkedIn"

