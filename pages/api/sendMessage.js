const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
);

const handler = async (req, res) => {
  if (req.method === "GET") {
    res.status(422).json({ message: "req_method_not_supported" });
  } else {
    const { email, message, toEmail, toName } = req.body;
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "devshowcase85@gmail.com",
            Name: "Devshowcase",
          },
          To: [
            {
              Email: toEmail,
              Name: toName,
            },
          ],
          Subject: `You have a new message from ${email}.`,
          TextPart: `You have a new message from ${email}.`,
          HTMLPart: `<h3>Hello ${toName}, <br/>You have a new message from ${email}</h3><p>Message: ${message}</p>`,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
    request
      .then((result) => {
        res.status(400).json({ status: "success" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ status: "fail" });
      });
  }
};

export default handler;
