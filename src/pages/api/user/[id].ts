import User, { IUser } from "@/backend/models/User";
import { Data, Methods } from "@/pages/api";
import { userParser } from "@/schemas/user";
import { existsID } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<IUser | IUser[] | undefined>>
) {
  const { id } = req.query;
  existsID(id, res);
  const methods = req.method as Methods | undefined;
  match(methods)
    .with(Methods.GET, async () => {
      try {
        const user = await User.findById(id);
        console.log(user);
        if (!user)
          return res
            .status(401)
            .json({ success: false, message: "User for ID no found" });

        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    })
    .with(Methods.PUT, async () => {
      try {
        const user = await userParser(req, res);
        if (!user) return;
        const userUpdated = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              name: user.name,
              password: user.password,
              company: user.company,
            },
          },
          { new: true }
        );
        if (!userUpdated) {
          return res
            .status(404)
            .json({ success: false, message: "Item not found" });
        }
        console.log(userUpdated);
        return res.status(200).json({ success: true, data: userUpdated });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }
    });
}
