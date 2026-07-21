# ProblemFirst

An AI-powered next-step guide built with Next.js, TypeScript, Tailwind CSS, Gemini, and Firebase Auth.

## Local setup

1. Copy `.env.example` to `.env.local` and add a `GEMINI_API_KEY` to enable live Gemini guidance. Without it, the app uses its local heuristic fallback.
2. Add Firebase Web app values to `.env.local` and enable the **Google** provider in Firebase Authentication to activate Google sign-in.
3. Run `npm run dev`.

The Gemini key is used exclusively by `app/api/insight/route.ts` and is never sent to the browser.
