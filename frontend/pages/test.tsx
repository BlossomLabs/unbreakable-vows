import { withSessionSsr } from "@/lib/withSession";
import useContract from "../hooks/useContract";

export default function Admin() {
  const { yourContract } = useContract();
  console.log({ yourContract });
  // Users will never see this unless they're logged in.
  return <h1>This is a "secured" page, let's do some stuff w contracts</h1>;
}

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
  const session = req.session.siwe;
  if (session === undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  // You can return data here from a database knowing only authenticated users (you) will see it.
  return { props: {} };
});
