/**
 * Everything the portfolio says lives here, so updating it never means touching layout code.
 * To add a screenshot to a project, put the image in /public/work and set `image`.
 */

export const profile = {
  name: "Mayar Issa",
  fullName: "Mayar Mohamed Issa",
  role: "UI/UX Designer & Frontend Developer",
  location: "Alexandria, Egypt",
  status: "Open to UI/UX and frontend roles",
  intro:
    "I design interfaces in Figma, then build them for real in Next.js and TypeScript, from the first wireframe to the live URL. When a product needs it, I build the API too.",
  email: "Myar.issa2003@gmail.com",
  github: "https://github.com/MayarIssa",
  linkedin: "https://www.linkedin.com/in/mayar-issa/",
};

export const categories = ["All", "Web apps", "Backend", "Data", "Hardware & games"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  name: string;
  year: string;
  kind: string;
  category: Exclude<Category, "All">;
  summary: string;
  role: string;
  points: string[];
  stack: string[];
  live?: string;
  code?: string;
  /** Accent colour for the card and its cover when there's no screenshot. */
  tint: string;
  image?: { src: string; alt: string; fit?: "cover" | "contain" };
  /** For API projects: a real request and response, shown instead of a screenshot. */
  sample?: { request: string; response: string };
  featured?: boolean;
  team?: string;
};

export const projects: Project[] = [
  {
    slug: "mentoro",
    name: "Mentoro",
    year: "2025",
    kind: "Graduation project",
    category: "Web apps",
    summary: "A mentorship platform that matches students with mentors, with student, mentor and admin dashboards.",
    role: "UI/UX design + frontend",
    team: "Team of six",
    points: [
      "Designed the whole product in Figma before a line of code.",
      "Built the home page, profiles and mentor–mentee connections.",
      "Roadmaps, tasks, real-time chat, an AI assistant, and Arabic/English with RTL.",
    ],
    stack: ["Next.js", "TypeScript", "Figma", "SignalR", "next-intl"],
    live: "https://mentoro2.vercel.app/",
    code: "https://github.com/MayarIssa/MentoroLast",
    tint: "#14AE5C",
    image: { src: "/work/mentoro.webp", alt: "Mentoro's 'Who are Mentoro' section with illustrated cards for community, personalised mentorship and AI assistance" },
    featured: true,
  },
  {
    slug: "carechart",
    name: "CareChart EHR",
    year: "2026",
    kind: "Health records app",
    category: "Web apps",
    summary: "Patient records for a small clinic: allergies, problems, medications, vitals trends and SOAP visit notes.",
    role: "Design + build, solo",
    points: [
      "Severe-allergy banner and vital-sign flags put the dangerous detail first.",
      "Blood-pressure trend chart in hand-written SVG.",
      "One validation schema shared by every form; 25 unit tests on the clinical rules.",
    ],
    stack: ["Next.js", "TypeScript", "Zod", "Vitest"],
    live: "https://carechart-ehr.vercel.app/",
    code: "https://github.com/MayarIssa/carechart-ehr",
    tint: "#0D99FF",
    image: { src: "/work/carechart.webp", alt: "CareChart patient summary with a red severe-allergy banner, latest vitals and problem list" },
    featured: true,
  },
  {
    slug: "nour-hr",
    name: "Nour HR",
    year: "2026",
    kind: "Pharmacy HR system",
    category: "Web apps",
    summary: "A bilingual HR system for a multi-branch pharmacy, from schedules and attendance to monthly payroll.",
    role: "Design + build, solo",
    points: [
      "Approval flows for holidays, overtime, salary borrows and resignations.",
      "Full right-to-left Arabic interface with a switch to English.",
      "25-table Postgres schema with row-level security on every table.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres"],
    live: "https://hr-pharmacy-nine.vercel.app/",
    code: "https://github.com/MayarIssa/PharmacyHr-",
    tint: "#9747FF",
    featured: true,
  },
  {
    slug: "sublime",
    name: "Sublime+",
    year: "2026",
    kind: "Agency website",
    category: "Web apps",
    summary: "The website for Sublime+, an AI-powered content and marketing agency, where I work as Full Stack Developer.",
    role: "Build, launch and maintain",
    points: [
      "Motion-rich landing page with a cursor-reactive mascot.",
      "Blog editor that publishes by committing Markdown to GitHub.",
      "Technical SEO, structured data and Analytics; served from Cloudflare Workers.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Cloudflare"],
    live: "https://sublime-plus.com/",
    code: "https://github.com/MayarIssa/Sublime-landing-page",
    tint: "#C7F94B",
    image: { src: "/work/sublime.webp", alt: "Sublime+ homepage with the headline 'Be the brand AI recommends'" },
    featured: true,
  },
  {
    slug: "magnetiq",
    name: "Magnetiq",
    year: "2026",
    kind: "E-commerce store",
    category: "Web apps",
    summary: "An online store for custom photo magnets: upload a photo, preview it as a magnet, and order.",
    role: "Design + build, solo",
    points: [
      "Photo upload with a live magnet-shaped preview.",
      "Cart with coupons, guest checkout, Cash on Delivery and InstaPay.",
      "Admin dashboard for orders, products, bundles and offers.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "MongoDB"],
    code: "https://github.com/MayarIssa/magnetiq",
    tint: "#FF7262",
  },
  {
    slug: "buildfin",
    name: "BuildFin",
    year: "2026",
    kind: "Building finance app",
    category: "Web apps",
    summary: "Helps a building owner track what every resident pays and what the building spends, month by month.",
    role: "Design + build, solo",
    points: [
      "Records each resident's payments and totals each month.",
      "Logs expenses like electricity, water and elevator maintenance.",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB Atlas"],
    live: "https://building11.vercel.app/",
    code: "https://github.com/MayarIssa/BuildingFinance",
    tint: "#FFC700",
  },
  {
    slug: "shop-api",
    name: "Shop API",
    year: "2026",
    kind: "E-commerce backend",
    category: "Backend",
    summary: "A REST API for an online store: catalog, cart, checkout and orders, with customer and admin roles.",
    role: "Design + build, solo",
    points: [
      "Checkout runs in a transaction: stock and cart change together or not at all.",
      "JWT auth, hashed passwords and role-based access.",
      "Integration tests run on every push with GitHub Actions.",
    ],
    stack: ["C#", "ASP.NET Core", "EF Core", "SQL Server"],
    code: "https://github.com/MayarIssa/shop-api",
    tint: "#0D99FF",
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
    slug: "breast-cancer",
    name: "Breast Cancer Diagnosis",
    year: "2025",
    kind: "Data science + Power BI",
    category: "Data",
    summary: "A machine-learning pipeline that classifies tumours as benign or malignant, with a Power BI dashboard for non-technical readers.",
    role: "Data analysis + dashboard",
    team: "Team of three",
    points: [
      "Random Forest reached 95.6% accuracy, beating a Logistic Regression baseline.",
      "Compared imputation strategies and capped outliers with the IQR rule.",
      "Power BI dashboard on tumour size, perimeter and texture by diagnosis.",
    ],
    stack: ["Python", "scikit-learn", "pandas", "Power BI"],
    code: "https://github.com/MayarIssa/breast-cancer-diagnosis",
    tint: "#0D99FF",
    image: { src: "/work/breast-cancer.webp", alt: "Scatter plot of perimeter mean against perimeter worst, coloured by benign and malignant diagnosis", fit: "contain" },
  },
  {
    slug: "smart-safe",
    name: "Smart Safe",
    year: "2024",
    kind: "IoT lock",
    category: "Hardware & games",
    summary: "A working safe that opens with a keypad code or remotely from a phone.",
    role: "Hardware + firmware",
    team: "Team of five",
    points: [
      "ESP32 drives a relay-switched solenoid lock, keypad, I2C LCD and alarm buzzer.",
      "Remote lock and unlock over Wi-Fi with Blynk and a built-in web page.",
      "Circuits simulated on Wokwi before wiring the real parts.",
    ],
    stack: ["ESP32", "C++", "Blynk", "Wokwi"],
    code: "https://github.com/MayarIssa/smart-safe",
    tint: "#FF4D8D",
    image: { src: "/work/smart-safe.webp", alt: "The finished smart safe: a metal box with a keypad and a blue LCD screen" },
  },
  {
    slug: "pet-feeder",
    name: "Smart Pet Feeder",
    year: "2025",
    kind: "Embedded system",
    category: "Hardware & games",
    summary: "Automatic food and water for pets, on an ATmega32 programmed straight from the registers.",
    role: "Firmware, solo",
    points: [
      "A load cell weighs the bowl and a servo refills it when food runs low.",
      "A water sensor drives a pump; an LCD, LEDs and a buzzer report status.",
    ],
    stack: ["ATmega32", "C/C++", "Proteus"],
    code: "https://github.com/MayarIssa/smart-pet-feeder",
    tint: "#14AE5C",
  },
  {
    slug: "maze-chase",
    name: "Maze Chase",
    year: "2024",
    kind: "Arcade game",
    category: "Hardware & games",
    summary: "A Pac-Man-style game where every run gets a brand-new maze.",
    role: "Game logic + graphics, solo",
    points: [
      "Mazes generated with a recursive-backtracking algorithm.",
      "Ghost movement, collisions, scoring and lives, all drawn with GDI+.",
    ],
    stack: ["C#", "Windows Forms"],
    code: "https://github.com/MayarIssa/pacman-game",
    tint: "#FFC700",
  },
];

export const stack = [
  "Figma", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Flutter",
  "C#", "ASP.NET Core", "SQL Server", "Supabase", "Postgres", "MongoDB", "Vercel", "Cloudflare", "Git",
];

export const process = [
  { step: "Research & flows", detail: "Who is this for and what do they need to get done? User flows and wireframes before pixels." },
  { step: "Design in Figma", detail: "Components, states and responsive layouts, so the team agrees on what we're building." },
  { step: "Build the front end", detail: "Typed, accessible components in Next.js and TypeScript, with motion where it helps." },
  { step: "Ship & iterate", detail: "Deployed to Vercel or Cloudflare, tested in CI, and refined from real use." },
];

export const experience = [
  {
    role: "Full Stack Developer",
    org: "Sublime+",
    when: "Aug 2026 – now",
    detail: "Built and run the agency's website: motion-rich landing page, Git-backed blog editor, technical SEO, and Cloudflare for the domain.",
  },
  {
    role: "Teaching Assistant",
    org: "Pharos University",
    when: "Nov 2025 – Sep 2026",
    detail: "Taught labs for Human-Computer Interaction (Figma and Flutter), Programming 1, System Programming and Compiler Design.",
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
  degree: "BSc Computer Science",
  school: "Pharos University, Alexandria",
  when: "2021 – 2025",
  note: "GPA 3.76 · ECPC competitor 2023 & 2024",
};

export const certifications = [
  "CCNA: Introduction to Networks",
  "CCNA: Switching, Routing & Wireless Essentials",
  "CCNA: Enterprise Networking, Security & Automation",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Design", items: ["Figma", "UI/UX design", "Wireframing", "Prototyping", "Design systems", "Responsive & RTL layouts"] },
  { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Flutter"] },
  { group: "Backend & data", items: ["C#", "ASP.NET Core", "SQL Server", "Supabase", "MongoDB", "Python"] },
  { group: "Ship", items: ["Git", "GitHub Actions", "Vercel", "Cloudflare", "SEO"] },
];
