import { axGetPageByPageId } from "@services/page.service";
import React, { useEffect, useState } from "react";
import { Page } from "types/pages";

import PageEditorComponent from "../editor";

export default function EditPageComponent({ pageId }) {
  const [page, setPage] = useState<Page>();

  useEffect(() => {
    axGetPageByPageId(pageId).then(({ data }) => setPage(data));
  }, [pageId]);

  return <div>{page && <PageEditorComponent page={page} isEdit={true} />}</div>;
}
