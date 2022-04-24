import React from "react";

export default function MailTo({ email, subject, body, ...props }) {
  return (
    <a
      href={`mailto:${email}?subject=Mail from ${
        subject || "devshowcase user"
      }&body=${body || ""}`}
    >
      {props.children}
    </a>
  );
}
