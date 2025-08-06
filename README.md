# MPDEE Creative

A modern, light-themed website for creative web design and development services.

## Features

- **Light Theme Design**: Clean, professional white theme with beautiful gradients
- **Single Page Layout**: Smooth scrolling navigation between sections
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Technology**: Built with Next.js 15, React, and TypeScript
- **Performance Optimized**: Fast loading with Turbopack support

## Sections

- **Hero**: Eye-catching landing section with call-to-action buttons
- **Services**: Three main service offerings (Web Development, UI/UX Design, Branding)
- **Contact**: Professional contact form with project inquiry fields

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- Next.js 15 with App Router
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Project Structure

```
mpdee-creative/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/         # React components
│       ├── Layout.tsx      # Main layout wrapper
│       ├── Navigation.tsx  # Navigation with smooth scrolling
│       ├── Hero.tsx        # Hero section
│       ├── Services.tsx    # Services showcase
│       ├── Contact.tsx     # Contact form
│       └── Footer.tsx      # Footer
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Design Philosophy

This project follows a clean, professional light theme approach that contrasts with darker themes. It emphasizes:

- Clean typography with Inter font
- Subtle gradients and hover effects
- Professional color palette (blues, grays, whites)
- Smooth animations and transitions
- Accessible design patterns

## Navigation

The navigation uses smooth scrolling to jump between sections on the same page:
- **Home**: Hero section
- **Services**: Service offerings
- **Contact**: Contact form

## License

© 2025 MPDEE Creative. All rights reserved.

## Last Updated
January 2025 - Address configuration updated 