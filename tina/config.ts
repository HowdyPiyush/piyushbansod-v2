import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "blog",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              return (
                values?.title
                  ?.toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "") || ""
              );
            },
          },
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "seo", label: "SEO" },
              { value: "aeo", label: "AEO" },
              { value: "ai", label: "AI" },
              { value: "marketing", label: "Marketing" },
              { value: "tools", label: "Tools" },
              { value: "personal", label: "Personal" },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: [
              { value: "seo", label: "SEO" },
              { value: "aeo", label: "AEO" },
              { value: "ai", label: "AI" },
              { value: "custom-gpts", label: "Custom GPTs" },
              { value: "marketing", label: "Marketing" },
              { value: "schema", label: "Schema" },
              { value: "b2b", label: "B2B" },
              { value: "shopify", label: "Shopify" },
              { value: "tools", label: "Tools" },
              { value: "productivity", label: "Productivity" },
            ],
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            options: [
              { value: "piyush-bansod", label: "Piyush Bansod" },
            ],
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "thumbnailAlt",
            label: "Cover Image Alt Text",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured post",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title (optional)",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description (optional)",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});