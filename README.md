
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

