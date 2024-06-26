import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import PanelAdmin from "components/app/components/Admin";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

const getListRegister = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const data = await response.json();
  return {
    data,
    session,
  };
};

export default async function AdminPanel() {
  const { data, session } = await getListRegister();
  return (
    <div>
      <PanelAdmin session={session} dataTable={data} />
    </div>
  );
}
