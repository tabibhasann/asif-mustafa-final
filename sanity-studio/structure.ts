import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio content")
    .items([
      S.listItem().title("Website Copy & Homepage").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().title("Profile").child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      ...["practiceArea", "experience", "project", "publication"].map((type) => S.documentTypeListItem(type)),
      S.documentTypeListItem("story").title("My Stories"),
      S.documentTypeListItem("insight").title("Blogs"),
      S.documentTypeListItem("credential"),
    ]);
