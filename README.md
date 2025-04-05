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

# My Next.js App – Route Overview

This project uses the **App Router** (`app/`) structure introduced in Next.js 13+.

Below is a list of routes and their functionalities.

---

## 🔐 Auth Routes

| URL                              | Description                       |
|----------------------------------|-----------------------------------|
| `/auth/forget-password`         | Request a password reset link     |
| `/auth/login`                   | User login page                   |
| `/auth/register`                | User registration page            |
| `/auth/reset-password`         | Reset password with token/link    |

---

## 📊 Dashboard Routes

| URL                                                | Description                                  |
|----------------------------------------------------|----------------------------------------------|
| `/dashboard/add-group`                             | Add a new group                              |
| `/dashboard/check-permission-group`                | Check permissions of a specific group        |
| `/dashboard/create-group`                          | Create a group (possibly with more config)   |
| `/dashboard/delete-group`                          | Delete a specific group                      |
| `/dashboard/home`                                  | Dashboard homepage or overview               |
| `/dashboard/register-user`                         | Register a new user (admin panel)            |
| `/dashboard/remove-group`                          | Remove a group from the system               |
| `/dashboard/update-group-permission`               | Modify group permission settings             |
| `/dashboard/users`                                 | List or manage users                         |
| `/dashboard/verify-user`                           | Verify user account manually                 |

---

## 🧠 Custom Hooks

- `useCurrentUser.ts`: Custom hook to get the currently logged-in user data.

---



## 🛠️ Notes

- This project uses TypeScript (`.tsx`) and follows modular routing.
- All routes under `/app` are server components by default unless marked otherwise.
- You can access pages via the corresponding URLs unless dynamic route segments or middleware are applied.

