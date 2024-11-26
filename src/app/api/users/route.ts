import User from "@/backend/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    await connectToDatabase;
  } catch (error) {
    console.log(error);
  }

  const data = await User.find({})
  console.log(data)

  return Response.json({ data });
}
export const POST = async (req: Request) => {
    const data = await req.json()
    return Response.json({data },{status:200})
}