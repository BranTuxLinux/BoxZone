import User from "@/backend/models/User";
import connectToDatabase from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await User.find({});
    console.log(data);
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
export const POST = async (req: Request) => {
  const data = await req.json();
  return Response.json({ data }, { status: 200 });
};
