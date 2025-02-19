This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


**How We Approached the Challenge**  
We built a full-stack Next.js application backed by a PostgreSQL database and Prisma, ensuring type safety from schema to frontend. On the frontend, we used Tailwind CSS and ShadCN UI components for a modern, responsive design. The API and database layers were structured to cleanly handle user input—like company name, industry, and goals—and store generated outlines alongside the original submissions. This approach let us quickly spin up a polished MVP while leaving room for iterative improvements and scalability.

**How We Ensured Quality AI Output**  
We employed clear, well-structured prompts using a JSON schema to guide the AI model’s responses. By explicitly defining the desired sections and format (for instance, “introduction,” “key topics,” “action steps,” etc.), we reduced ambiguity and ensured consistently parseable results on the frontend. Storing the full input-output record in the database also allowed us to refine or regenerate outputs if needed, providing an iterative feedback loop to improve the model’s performance over time.
