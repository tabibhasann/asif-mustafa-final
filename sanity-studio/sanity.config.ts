import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const singletonTypes = new Set(["profile", "siteSettings"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "asif-mustafa-final",
  title: "Md Asif Mustafa · Portfolio CMS",
  projectId: "gvgzuc20",
  dataset: "asif",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => !singletonTypes.has(option.templateId)),
    actions: (actions, context) => singletonTypes.has(context.schemaType)
      ? actions.filter((action) => action.action && singletonActions.has(action.action))
      : actions,
  },
});
