import { config, fields, collection } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

export default config({
  storage: {
    // Local mode: edits write directly to the filesystem.
    // Only works in development. Do not expose in production.
    kind: "local",
  },

  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Description",
          description: "One-sentence summary. Used in meta tags and post cards.",
          multiline: false,
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publish date",
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Updated date (optional)",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            description: "Lowercase kebab-case tags, e.g. nba, data-viz, react",
            itemLabel: (props) => props.value,
          }
        ),
        draft: fields.checkbox({
          label: "Draft",
          description: "Draft posts are not included in the public build.",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Content",
          description:
            "Write your post entirely in MDX. All components (Aside, NBAStatGrid, etc.) are available without imports.",
          components: {
            Aside: wrapper({
              label: "Aside / Callout",
              description: "Info, warning, success, or danger callout box.",
              schema: {
                type: fields.select({
                  label: "Type",
                  options: [
                    { label: "Info", value: "info" },
                    { label: "Warning", value: "warning" },
                    { label: "Success", value: "success" },
                    { label: "Danger", value: "danger" },
                  ],
                  defaultValue: "info",
                }),
                title: fields.text({
                  label: "Title (optional — overrides default label)",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
