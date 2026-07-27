# 🚀 SyncSpace Lite

A modern **offline-first productivity workspace** built with **React 19, TypeScript, and Vite**.

SyncSpace Lite combines **Markdown Notes**, **Interactive Whiteboards**, and a **VS Code-powered Code Editor** into one beautiful browser application. Everything is stored securely in your browser using **localStorage**, making the project fast, lightweight, and server-free.

🌐 **Live Demo:** https://sync-space-lite.vercel.app/

---

## ✨ Preview

# 📸 Screenshots

## 🏠 Landing Page


<img width="1902" height="909" alt="{859A3070-2169-419B-857F-9CF8F567C8BA}" src="https://github.com/user-attachments/assets/ecfbf1d4-1d5e-4453-85d9-a62ff96e1a6a" />



## 📊 Dashboard

<img width="1920" height="907" alt="{43C9E5D9-3053-4E4C-A967-73350E2967B9}" src="https://github.com/user-attachments/assets/de57178f-842f-4de9-8c88-22d3ebaa79c6" />



## 📝 Notes Workspace

<img width="1885" height="787" alt="{ED5A015A-32BF-4361-B146-8D6605D8C240}" src="https://github.com/user-attachments/assets/ae4cffb0-608a-4cf3-a875-2bfdd234b78b" />


---

## 🎨 Whiteboard

<img width="1898" height="882" alt="{0E6205EF-D932-4268-BC99-B54FB25EFEB9}" src="https://github.com/user-attachments/assets/8e2ba6ab-6ddd-4533-ab60-26ed06ff0368" />


---

## 💻 Code Editor

<img width="1906" height="879" alt="{DFEBAD3F-FFC7-410E-B0E2-AF39DCA8B127}" src="https://github.com/user-attachments/assets/7a6e9246-9248-43ac-9ed5-e6f996058d26" />


---

## ⚙️ Settings


<img width="1896" height="896" alt="{1DC9DF78-0664-4F03-85AA-1ECADE946E81}" src="https://github.com/user-attachments/assets/6fbe2fcd-c572-4e86-8d06-de7b596f6e62" />

---

## 🔐 Login Page

<img width="1787" height="906" alt="{962091E0-A2EA-4C0A-859D-CB6473C80769}" src="https://github.com/user-attachments/assets/8bac181a-0d96-4e2f-ad8c-257b5e756939" />


---

## 📝 Register Page

<img width="1860" height="961" alt="{D89FC8C0-4BDA-42AB-9291-14B021EF5422}" src="https://github.com/user-attachments/assets/61c492cf-9146-44c8-9d46-7d7b82db06a3" />


> A clean, modern workspace designed for developers, students, and creators.

### Features Include

- 📝 Smart Markdown Notes
- 🎨 Interactive Whiteboard
- 💻 Monaco Code Editor
- 📊 Workspace Dashboard
- 🌙 Dark & Light Theme
- 🎯 Custom Accent Colors
- 🔐 Local Authentication
- 📱 Responsive UI
- ⚡ Lightning Fast Performance

---

# ✨ Features

## 📝 Notes

- Create unlimited notes
- Live Markdown Preview
- Auto Save (500ms debounce)
- Search Notes
- Export as Markdown
- Export as JSON
- Clean distraction-free editor

---

## 🎨 Whiteboard

Draw using multiple tools:

- Pencil
- Rectangle
- Circle
- Arrow
- Text

Additional Features

- Undo / Redo
- Clear Canvas
- Export as PNG
- Smooth drawing experience
- History management

---

## 💻 Code Editor

Powered by **Monaco Editor** (the same editor used in VS Code).

Features

- Syntax Highlighting
- Multiple Languages
- Adjustable Font Size
- Copy Code
- Download Files
- Modern Coding Experience

---

## 📊 Dashboard

A beautiful workspace dashboard showing

- Total Notes
- Whiteboards
- Code Files
- Recent Files
- Quick Navigation
- Workspace Overview

---

## 🎨 Beautiful UI

- Modern Design
- Professional Dashboard
- Responsive Layout
- Smooth Animations
- Framer Motion
- Indigo Color Theme
- Custom Accent Colors
- Light / Dark Mode

---

## 🔐 Authentication

Local Authentication System

- Register
- Login
- Protected Routes
- Session Persistence

No backend required.

Credentials are safely stored in browser localStorage.

---

## ♿ Accessibility

- Keyboard Shortcuts
- ARIA Labels
- Focus States
- Responsive Components

---

## ⚡ Performance

- Route-based Code Splitting
- Lazy Loading
- Fast Rendering
- Optimized Bundle
- Offline-first Architecture

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router v7 |
| State Management | Zustand |
| Whiteboard | React Konva |
| Code Editor | Monaco Editor |
| Markdown | React Markdown |
| Notifications | React Hot Toast |
| Storage | Browser localStorage |

---

# 📂 Project Structure

```
src
│
├── components
│   ├── code
│   ├── layout
│   ├── notes
│   ├── settings
│   ├── ui
│   ├── whiteboard
│   └── workspace
│
├── hooks
│
├── pages
│   ├── Auth
│   ├── Landing
│   └── Workspace
│
├── routes
│
├── store
│
├── types
│
├── utils
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/mukesh9555/SyncSpace-Lite.git
```

Move into the project

```bash
cd SyncSpace-Lite
```

Install dependencies

```bash
npm install
```

Start Development Server

```bash
npm run dev
```

Build for Production

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| Ctrl/Cmd + Shift + N | New Note |
| Ctrl/Cmd + Shift + B | New Whiteboard |
| Ctrl/Cmd + Shift + F | New Code File |
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Shift + Z | Redo |

---

# 💾 Data Storage

SyncSpace Lite is completely offline-first.

The application stores data using browser **localStorage**.

Stored Keys

- syncspace_user
- syncspace_notes
- syncspace_whiteboards
- syncspace_codefiles
- syncspace_settings

No external server or database is used.

---

# 🌐 Live Demo

### 🔗 https://sync-space-lite.vercel.app/

---

# 🚀 Deployment

This project is deployed on **Vercel**.

To deploy your own version:

```bash
npm run build
```

Import the GitHub repository into **Vercel** and deploy with default settings.

No additional configuration is required.

---

# 📈 Future Improvements

- Cloud Sync
- Real-time Collaboration
- Team Workspaces
- Share Notes
- Export PDF
- AI Writing Assistant
- Authentication Backend
- MongoDB Support
- File Uploads
- Collaborative Whiteboard

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Developer

**Mukesh Chauhan**

B.Tech CSE (AI)

KIET Deemed to be University

GitHub: https://github.com/mukesh9555

Project Repository:

https://github.com/mukesh9555/SyncSpace-Lite

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub if you found it useful.

It helps support future development and motivates me to build more open-source projects.
