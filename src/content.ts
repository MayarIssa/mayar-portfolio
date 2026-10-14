/**
 * Everything the portfolio says lives here, so updating it never means touching layout code.
 * To add a screenshot to a project, put the image in /public/work and set `image`.
 */

export const profile = {
  name: "Mayar Issa",
  fullName: "Mayar Mohamed Issa",
  role: "Software engineer",
  location: "Alexandria, Egypt",
  intro:
    "I design interfaces in Figma and build them for real: front ends in Next.js and TypeScript, APIs in ASP.NET Core and SQL Server. Computer Science graduate, former teaching assistant, and the person who built and runs the Sublime+ website.",
  email: "Myar.issa2003@gmail.com",
  github: "https://github.com/MayarIssa",
  linkedin: "https://www.linkedin.com/in/mayar-issa/",
};

export type Project = {
  slug: string;
  name: string;
  /** Shown as the frame's label, like a Figma frame name. */
  frame: string;
  summary: string;
  role: string;
  points: string[];
  stack: string[];
  live?: string;
  code?: string;
  image?: { src: string; alt: string };
  /** For API projects: a real request and response, shown instead of a screenshot. */
  sample?: { request: string; response: string };
};

export const projects: Project[] = [
  {
    slug: "mentoro",
    name: "Mentoro",
    frame: "Mentoro / Graduation project, 2025",
    summary: "A web platform that matches mentees with mentors for guidance and career growth.",
    role: "UI/UX designer and frontend developer, team of six",
    points: [
      "Designed the complete interface in Figma before any code was written.",
      "Built the home page, user profiles and the mentor–mentee connections feature.",
      "Worked alongside two backend and two mobile developers on one shared product.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    live: "https://mentoro2.vercel.app/",
  },
  {
    slug: "carechart",
    name: "CareChart EHR",
    frame: "CareChart / Electronic health record, 2026",
    summary:
      "A patient record system for a small clinic: allergies, problems, medications, vitals trends and SOAP visit notes.",
    role: "Designed and built solo",
    points: [
      "Allergy banner and vital-sign flags designed so the dangerous detail is the first thing a clinician sees.",
      "One validation schema shared by every form and the data layer, plus an audit trail of every change.",
      "Blood-pressure trend chart drawn in hand-written SVG; 25 unit tests on the clinical rules.",
    ],
    stack: ["Next.js", "TypeScript", "Zod", "Vitest", "Tailwind CSS"],
    live: "[ADD: CareChart URL]",
    code: "https://github.com/MayarIssa/carechart-ehr",
    image: { src: "/work/carechart.webp", alt: "CareChart patient summary showing a red severe-allergy banner, latest vitals and problem list" },
  },
  {
    slug: "shop-api",
    name: "Shop API",
    frame: "Shop API / E-commerce backend, 2026",
    summary: "A REST API for an online store: catalog, cart, checkout and orders, with customer and admin roles.",
    role: "Designed and built solo",
    points: [
      "Checkout runs in a database transaction: stock is reduced and the cart emptied together, or not at all.",
      "JWT authentication, hashed passwords and role-based access for admins and customers.",
      "Integration tests run the real API against an in-memory database on every push.",
    ],
    stack: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "xUnit"],
    code: "https://github.com/MayarIssa/shop-api",
    sample: {
      request: `POST /api/orders/checkout
Authorization: Bearer eyJhbGciOi…
{ "shippingAddress": "12 Fouad St, Alexandria" }`,
      response: `201 Created
{
  "id": 42,
  "status": "Pending",
  "total": 99.98,
  "items": [
    { "productName": "Wireless Earbuds",
      "unitPrice": 49.99, "quantity": 2 }
  ]
}`,
    },
  },
  {
    slug: "sublime",
    name: "Sublime+",
    frame: "Sublime+ / Company website, 2026",
    summary: "The marketing site for Sublime+, an AI-powered content and marketing agency.",
    role: "Built, launched and maintain it",
    points: [
      "Blog editor that publishes by committing Markdown to GitHub, so posts deploy with no database to run.",
      "Technical SEO: sitemap, structured data, Open Graph images, Search Console and Analytics.",
      "Deployed to Cloudflare Workers with OpenNext.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Cloudflare"],
    live: "https://sublime-plus.com/",
    image: { src: "/work/sublime.webp", alt: "Sublime+ homepage with the headline 'Be the brand AI recommends'" },
  },
  {
    slug: "buildfin",
    name: "BuildFin",
    frame: "BuildFin / Building finance manager, 2026",
    summary: "A mobile-friendly web app for managing a residential building's dues and shared expenses.",
    role: "Designed and built solo",
    points: ["Tracks what residents owe and what the building spends, from a phone."],
    stack: ["Next.js", "MongoDB Atlas", "Vercel"],
    live: "https://building11.vercel.app/",
  },
];

export const experience = [
  {
    role: "Sublime+",
    org: "AI-powered marketing agency",
    when: "Current",
    detail: "Built, launched and maintain the company website. The agency serves clients in the US, Europe and the Middle East.",
  },
  {
    role: "Teaching Assistant",
    org: "Pharos University, Alexandria",
    when: "Nov 2025 – Sep 2026",
    detail: "Lab sessions for Programming 1, System Programming, Compiler Design and Human-Computer Interaction (Figma and Flutter).",
  },
  {
    role: "Data Entry & Client Information Technician",
    org: "KOP Coach, USA (remote)",
    when: "Jun – Aug 2025",
    detail: "Kept client records accurate and organized in company systems.",
  },
  {
    role: "Backend .NET Developer Intern",
    org: "Route",
    when: "Jul – Nov 2024",
    detail: "Built an e-commerce REST API and an MVC web app in C# with Entity Framework and SQL Server.",
  },
  {
    role: "Robotics Intern",
    org: "ST Smart",
    when: "Jun – Aug 2023",
    detail: "Arduino and ESP32 projects: a GSM security alarm, a Wi-Fi/Bluetooth car and a secured safe.",
  },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "Pharos University, Alexandria",
  when: "2021 – 2025",
  note: "GPA 3.76. Two-time competitor in the Egyptian Collegiate Programming Contest (2023, 2024).",
};

export const certifications = [
  "Cisco CCNA: Introduction to Networks",
  "Cisco CCNA: Switching, Routing, and Wireless Essentials",
  "Cisco CCNA: Enterprise Networking, Security, and Automation",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C#", "TypeScript", "C++", "Python", "SQL"] },
  { group: "Build", items: ["ASP.NET Core", "Entity Framework", "Next.js", "Tailwind CSS", "Flutter"] },
  { group: "Data and hosting", items: ["SQL Server", "MongoDB", "Vercel", "Cloudflare Workers", "AWS"] },
  { group: "Design and tools", items: ["Figma", "Git", "GitHub Actions", "Power BI"] },
];
