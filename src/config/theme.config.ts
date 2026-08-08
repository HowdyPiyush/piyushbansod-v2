const siteUrl = (
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  "https://piyushbansod.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Piyush Bansod",
  description:
    "Full-stack digital marketer & AI generalist. Writing about SEO, AEO, AI, and things I'm genuinely curious about.",
  url: siteUrl,
  locale: "en-IN",
  language: "en",
  repositoryUrl: "https://github.com/HowdyPiyush/piyushbansod-website",
};

export const NAVIGATION = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/projects", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const CONTACT = {
  email: "howdypiyush@gmail.com",
  socialHandle: "@howdypiyush_",
  socialUrl: "https://x.com/howdypiyush_",
};

export const FORMS = {
  contact: {
    action: "/api/contact",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
  newsletter: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
};

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/howdypiyush/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://instagram.com/howdypiyush/", label: "Instagram", icon: "instagram" },
  { href: "https://x.com/howdypiyush_", label: "X / Twitter", icon: "twitter" },
  { href: "mailto:howdypiyush@gmail.com", label: "Email", icon: "mail" },
];

export const authors = [
  {
    slug: "piyush-bansod",
    name: "Piyush Bansod",
    bio: "Full-stack digital marketer & AI generalist helping SMB & B2B businesses grow.",
    longBio:
      "I'm a full-stack digital marketer and AI generalist with 6+ years of experience helping SMB and B2B businesses grow through SEO, AEO, and AI-powered marketing strategies. I've executed 350+ on-page SEO campaigns and I'm now building Clysentra, my own digital marketing agency. This is my space to share what I'm exploring — sometimes it's marketing, sometimes it's just things I'm genuinely curious about.",
    avatar: "/profile.webp",
  },
];

export const categories = [
  { slug: "seo", name: "SEO" },
  { slug: "aeo", name: "AEO" },
  { slug: "ai", name: "AI" },
  { slug: "marketing", name: "Marketing" },
  { slug: "tools", name: "Tools" },
  { slug: "personal", name: "Personal" },
];

export const tags = [
  { slug: "seo", name: "SEO" },
  { slug: "aeo", name: "AEO" },
  { slug: "ai", name: "AI" },
  { slug: "custom-gpts", name: "Custom GPTs" },
  { slug: "marketing", name: "Marketing" },
  { slug: "schema", name: "Schema" },
  { slug: "b2b", name: "B2B" },
  { slug: "shopify", name: "Shopify" },
  { slug: "tools", name: "Tools" },
  { slug: "productivity", name: "Productivity" },
];