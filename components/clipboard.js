import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";

export default function Clipboard({ router }) {
  return (
    // Add domain in text for redirection
    <CopyToClipboard text={router.asPath}>
      <Icon icon="clarity:share-line" className="text-3xl" />
    </CopyToClipboard>
  );
}
