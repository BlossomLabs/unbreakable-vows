import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import { withSessionRoute } from "@/lib/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);

        const result = await siweMessage.verify({
          signature: signature || "",
          domain: req.headers.host,
          nonce: req.session.nonce,
        });
        if (result.success) {
          req.session.siwe = siweMessage;
          await req.session.save();
          res.json({ ok: true });
        } else {
          res.json({ ok: false });
        }
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSessionRoute(handler);
