
# Cyber Security Professional Portfolio

This is a personal portfolio website built to showcase the skills, projects, and experience of Pragnesh Singh Rajput, a Cyber Security Professional and B.Tech CSE student. The portfolio is designed with a modern aesthetic, featuring smooth animations, parallax scroll effects, and a custom cursor.

## Technologies Used

This project is built with a modern web development stack:

- **Next.js 15 (App Router)**: A React framework for building server-rendered and statically generated web applications.
- **React 18**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN UI**: A collection of re-usable UI components built with Radix UI and Tailwind CSS.
- **Lucide React**: A library for beautiful and consistent icons.
- **Framer Motion (implied by `AnimatedSection` principles)**: For page animations and transitions.
- **Genkit**: Integrated for potential future AI-powered features.
- **Geist Font**: For clean and modern typography.

## Key Features

- **Responsive Design**: Adapts to various screen sizes (desktop, tablet, mobile).
- **Dark Theme**: Sleek and modern dark interface.
- **Animated Sections**: Content animates into view as the user scrolls, providing a dynamic experience.
- **Parallax Scroll Effects**: Subtle parallax movement for background elements, adding depth to the design.
- **Custom Cursor**: A unique two-part cursor enhances the user interaction.
- **Smooth Scrolling**: Fluid navigation between sections.
- **Component-Based Architecture**: Well-organized and reusable UI components.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json` if different) with your browser to see the result.

The page will auto-update as you edit files.

## Project Structure

-   `src/app/`: Contains the main application pages and layout.
    -   `page.tsx`: The main homepage.
    -   `layout.tsx`: The root layout for the application.
    -   `globals.css`: Global styles and Tailwind CSS base/components/utilities.
-   `src/components/`: Contains reusable UI components.
    -   `layout/`: Components like Header and Footer.
    -   `sections/`: Components for different parts of the portfolio (Hero, About, Projects, etc.).
    -   `ui/`: ShadCN UI components.
    -   `effects/`: Components for visual effects like the custom cursor.
-   `src/lib/`: Utility functions.
-   `src/types/`: TypeScript type definitions.
-   `src/ai/`: Genkit related files for AI functionalities.
-   `public/`: Static assets.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.
-   `next.config.ts`: Configuration for Next.js.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

This README was generated with assistance from an AI coding partner.
