import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio content")
    .items([
      S.listItem().title("Profile").child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      ...["practiceArea", "experience", "project", "publication", "story", "insight", "credential"].map((type) =>
        S.documentTypeListItem(type),
      ),
    ]);
