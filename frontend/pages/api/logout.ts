import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      req.session.destroy();
      res.send({ ok: true });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSessionRoute(handler);
