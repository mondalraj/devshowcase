import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

export default function Clipboard() {
  var url;
  useEffect(() => {
    url = window.location.href;
  }, [url]);
  console.log(url);
  return (
    <CopyToClipboard text={url}>
      <Icon icon="clarity:share-line" className="text-3xl" />
    </CopyToClipboard>
  );
}
