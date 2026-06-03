type Props = { html: string };

export function PostBody({ html }: Props) {
  return (
    <div
      className="prose"
      // Server-rendered markdown from a trusted local folder.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
