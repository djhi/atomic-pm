import { useRecordContext } from "react-admin";
import { Link, useParams } from "react-router";
import { useSignedUrl } from "../ra/useSignedUrl";
import mime from "mime";

export const DocumentLink = (
  props: React.HtmlHTMLAttributes<HTMLAnchorElement>,
) => {
  const record = useRecordContext();
  const params = useParams<"boardId">();
  const { data: signedUrl } = useSignedUrl(
    {
      bucket: "documents",
      filePath: record?.content,
    },
    {
      enabled: !!record?.type && !!record?.content,
    },
  );
  if (!record) return null;

  if (record.type == null) {
    return (
      <Link
        to={`/boards/${params.boardId}/documents/${record.id}`}
        {...props}
      />
    );
  }

  const fileExtension = mime.getExtension(record.type);
  return (
    <a
      target="_blank"
      {...props}
      download={`${record.title}.${fileExtension}`}
      href={signedUrl}
    />
  );
};
