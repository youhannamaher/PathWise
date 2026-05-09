# PathWise - MVP Setup Guide

PathWise is a lifelong academic and career guidance platform designed to help high school students understand themselves, discover suitable majors, compare real university programs, and generate a personalized roadmap.

## 1. Project Setup
To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## 2. Environment Variables
Create a `.env.local` file in the root of the project (`y:\Projet - Business Model\pathwise`) and add the following keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Getting Gemini API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click "Get API key".
3. Create a new key and add it to `GEMINI_API_KEY`.

## 3. Supabase Setup & SQL Schema

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20240101_init.sql` from the project files and paste the entire contents into the SQL Editor, then run it. This creates all tables and policies.

## 4. Seed Data Instructions

We have provided two ways to seed real university data from Egypt into your Supabase database:

**Method 1: via SQL**
1. Open `supabase/seed.sql` and run its contents in the Supabase SQL Editor.

**Method 2: via Admin Page**
1. Navigate to `/admin/seed` in the app.
2. Click "Run Supabase Seed". This will automatically inject the seed data from the application logic into your Supabase project.

*Note: The app supports a "Demo Mode" fallback that works completely offline via `localStorage` even if Supabase is not yet configured.*

## 5. Vercel Deployment

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click "Add New... > Project".
3. Import your GitHub repository.
4. Expand the **Environment Variables** section and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**. Vercel will automatically build the Next.js 15 app.

## 6. Pitch Demo User Journey

When pitching the product live, follow this journey to demonstrate its power:

1. **The Hook (Landing Page)**: Go to `/`. Show the premium design. Explain the problem (students choose blindly) and the PathWise solution.
2. **Start the Journey**: Click "Start My Career Assessment".
3. **The Assessment**: Act as **Mariam Hassan**.
   - **Interests**: Choose Business & management, Technology & software, Communication.
   - **Skills**: Rate Problem Solving (4), Communication (5), Technology (4).
   - **Constraints**: Select Location (Cairo/New Cairo), Budget (Medium-High), Language (English).
   - **Goals**: High salary, Stability, International opportunities.
4. **The Reveal (Results Page)**: Show how the AI (or matching engine) calculated her Career DNA. Point out the top recommended paths (e.g., Business Informatics).
5. **Explore Options**: Click to view "Business Informatics" at the German University in Cairo.
6. **Save & Compare**: Save the GUC program and the Nile University Computer Science program. Go to the `/compare` page and show them side-by-side.
7. **Decision Board**: Go to the Decision Board. Show the pros/cons functionality.
8. **AI Coach**: Go to the AI Coach (`/coach`). Type: *"Should I choose Business Informatics at GUC or Information Systems at BUE?"* Show the Gemini AI providing personalized advice based on Mariam's profile.
9. **Final Output**: Go to the Final Report (`/final-report`) to show the beautiful printable report the student takes home.
10. **The Vision**: End the demo on the `/dashboard` showing the "Locked Features" (Living CV, Mentor Matching) to prove this is a lifelong ecosystem, not just a one-time test.
