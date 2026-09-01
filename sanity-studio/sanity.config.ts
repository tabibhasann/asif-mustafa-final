import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "asif-mustafa-final",
  title: "Md Asif Mustafa · Portfolio CMS",
  projectId: "gvgzuc20",
  dataset: "asif",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
