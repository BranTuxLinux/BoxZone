import { auth } from "@/auth";
import LogoutBtn from "@/components/logout-button";
const Admin = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return <h1>No eres admin</h1>;
  }
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <hr />
      <br />
      <LogoutBtn />
    </div>
  );
};

export default Admin;
