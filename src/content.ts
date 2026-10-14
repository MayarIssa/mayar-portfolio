/**
 * Everything the portfolio says lives here, so updating it never means touching layout code.
 * To add a screenshot to a project, put the image in /public/work and set `image`.
 */

export const profile = {
  name: "Mayar Issa",
  fullName: "Mayar Mohamed Issa",
  role: "Software engineer",
  location: "Alexandria, Egypt",
  status: "Open to junior software engineering roles",
  intro:
    "I design interfaces in Figma, then build them for real: front ends in Next.js and TypeScript, APIs in ASP.NET Core and SQL Server, shipped to Vercel and Cloudflare.",
  email: "Myar.issa2003@gmail.com",
  github: "https://github.com/MayarIssa",
  linkedin: "https://www.linkedin.com/in/mayar-issa/",
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  kind: string;
  summary: string;
  role: string;
  points: string[];
  stack: string[];
  live?: string;
  code?: string;
  /** Card colour when there's no screenshot yet. */
  tint: string;
  image?: { src: string; alt: string };
  /** For API projects: a real request and response, shown instead of a screenshot. */
  sample?: { request: string; response: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mentoro",
    name: "Mentoro",
    year: "2025",
    kind: "Graduation project",
    summary: "A web platform that matches mentees with mentors for guidance and career growth.",
    role: "UI/UX designer and frontend developer, team of six",
    points: [
      "Designed the complete interface in Figma before any code was written.",
      "Built the home page, user profiles and the mentor–mentee connections feature.",
      "Shipped alongside two backend and two mobile developers on one product.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    live: "https://mentoro2.vercel.app/",
    tint: "#6c4cf1",
    featured: true,
  },
  {
    slug: "carechart",
    name: "CareChart EHR",
    year: "2026",
    kind: "Health records app",
    summary: "Patient records for a small clinic: allergies, problems, medications, vitals trends and SOAP visit notes.",
    role: "Designed and built solo",
    points: [
      "Severe-allergy banner and vital-sign flags put the dangerous detail first.",
      "One validation schema shared by every form and the data layer, plus an audit trail.",
      "Blood-pressure trend chart in hand-written SVG; 25 unit tests on the clinical rules.",
    ],
    stack: ["Next.js", "TypeScript", "Zod", "Vitest"],
    code: "https://github.com/MayarIssa/carechart-ehr",
    tint: "#2f6f68",
    image: { src: "/work/carechart.webp", alt: "CareChart patient summary with a red severe-allergy banner, latest vitals and problem list" },
    featured: true,
  },
  {
    slug: "sublime",
    name: "Sublime+",
    year: "2026",
    kind: "Company website",
    summary: "The website for Sublime+, an AI-powered content and marketing agency.",
    role: "Built, launched and maintain it",
    points: [
      "Blog editor that publishes by committing Markdown to GitHub: no database to run.",
      "Technical SEO, structured data, Search Console, Analytics and meeting booking.",
      "Deployed to Cloudflare Workers with OpenNext.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Cloudflare"],
    live: "https://sublime-plus.com/",
    tint: "#1f4a32",
    image: { src: "/work/sublime.webp", alt: "Sublime+ homepage with the headline 'Be the brand AI recommends'" },
  },
  {
    slug: "shop-api",
    name: "Shop API",
    year: "2026",
    kind: "E-commerce backend",
    summary: "A REST API for an online store: catalog, cart, checkout and orders, with customer and admin roles.",
    role: "Designed and built solo",
    points: [
      "Checkout runs in a transaction: stock and cart change together or not at all.",
      "JWT auth, hashed passwords and role-based access.",
      "Integration tests run on every push with GitHub Actions.",
    ],
    stack: ["C#", "ASP.NET Core", "EF Core", "SQL Server"],
    code: "https://github.com/MayarIssa/shop-api",
    tint: "#16181d",
    sample: {
      request: `POST /api/orders/checkout
Authorization: Bearer eyJhbGciOi…
{ "shippingAddress": "12 Fouad St, Alexandria" }`,
      response: `201 Created
{
  "id": 42,
  "status": "Pending",
  "total": 99.98,
  "items": [{ "productName": "Wireless Earbuds",
              "unitPrice": 49.99, "quantity": 2 }]
}`,
    },
  },
  {
    slug: "buildfin",
    name: "BuildFin",
    year: "2026",
    kind: "Building finance app",
    summary: "A phone-friendly app that tracks a residential building's dues and shared expenses.",
    role: "Designed and built solo",
    points: ["Tracks what residents owe and what the building spends, from a phone."],
    stack: ["Next.js", "MongoDB Atlas", "Vercel"],
    live: "https://building11.vercel.app/",
    tint: "#b4532a",
  },
];

export const process = [
  { step: "Design", detail: "Flows and screens in Figma first, so the team agrees on what we're building before anyone codes it." },
  { step: "Build", detail: "Typed front ends in Next.js and TypeScript; APIs in ASP.NET Core with Entity Framework and SQL Server." },
  { step: "Ship", detail: "Tested in CI, deployed to Vercel or Cloudflare, and kept fast, accessible and easy to find in search." },
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
  "CCNA: Introduction to Networks",
  "CCNA: Switching, Routing, and Wireless Essentials",
  "CCNA: Enterprise Networking, Security, and Automation",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C#", "TypeScript", "C++", "Python", "SQL"] },
  { group: "Build", items: ["ASP.NET Core", "Entity Framework", "Next.js", "Tailwind CSS", "Flutter"] },
  { group: "Data and hosting", items: ["SQL Server", "MongoDB", "Vercel", "Cloudflare Workers", "AWS"] },
  { group: "Design and tools", items: ["Figma", "Git", "GitHub Actions", "Power BI"] },
];
