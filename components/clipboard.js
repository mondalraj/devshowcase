import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clipboard({ router }) {
  const notify = () => toast.info("Copied to clipboard");

  return (
    // Add domain in text for redirection
    <CopyToClipboard text={router.asPath}>
      <Icon icon="clarity:share-line" className="text-3xl" onClick={notify} />
    </CopyToClipboard>
  );
}
