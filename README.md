# Assistant Marketer

## Introduction

**Assistant Marketer** is an AI marketing assistant for early-stage founders. The platform takes charge of the marketing activities so that the founder can focus on delivering value to their customer. The website is live here [https://www.assistantmarketer.com](https://www.assistantmarketer.com) 

## Technology Used
- Next JS (Fullstack Framework)
- Vercel (Hosting)
- Supabase (Authentication and Database)
- OpenAI (Large Language Model)
- Resend (Email service)

## Environmental Variables

To setup your environmental variables duplicate `.env.local.example` and rename it to `.env.local` then change the variables value to your own.

```bash
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
AZURE_OPENAI_API_KEY=
NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN=
EXA_API_KEY=
```

## Installation

This application is run on the Node runtime. If you don't have Node server installed on your computer you need to download here [https://nodejs.org/en/download](https://nodejs.org/en/download)

You need to install all the dependency needed to run the code. Copy and paste this command to your terminal.

```bash
npm install
```

You can then start the developement server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

There two ways you can set up the database. Local database or Supabase cloud database. 

#### Local Database

- Start a local version of Supabase _(runs in Docker)_.

   ```shell
   npx supabase start
   ```

- Store the Supabase URL & public anon key in `.env.local` as stated earlier.

#### Supabase Cloud

- Create a Supabase project at https://database.new, or via the CLI:

   ```shell
   npx supabase projects create -i "Assistant Marketer"
   ```

   Your Org ID can be found in the URL after [selecting an org](https://supabase.com/dashboard/org/_/general).

- Link your CLI to the project.

   ```shell
   npx supabase link --project-ref=<project-id>
   ```

   You can get the project ID from the [general settings page](https://supabase.com/dashboard/project/_/settings/general).

- Store Supabase URL & public anon key in `.env.local` as stated earlier.

   You can get the project API URL and anonymous key from the [API settings page](https://supabase.com/dashboard/project/_/settings/api).

## SQL migration
Apply the migration to our local database.

  ```bash
  npx supabase migration up
  ```

  or if you are developing directly on the cloud, push your migrations up:

  ```
  npx supabase db push
  ```

## Deployment on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 

Check out the [deployment documentation](https://nextjs.org/docs/deployment) for more details.
