import User, { IUser } from "@/backend/models/User";
import { Data, Methods } from "@/pages/api";
import { userParser } from "@/schemas/user";
import { existsID } from "@/utils/utils";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { match } from "ts-pattern";
import bcrypt from "bcryptjs";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<IUser | IUser[] | undefined | unknown>>
) {
  const { id } = req.query;
  existsID(id, res);
  const methods = req.method as Methods | undefined;
  match(methods)
    .with(Methods.GET, async () => {
      try {
        const user = await User.findById(id);
        console.log({ test: user });
        const idValue = Array.isArray(id) ? id[0] : id;
        const objectId = new mongoose.Types.ObjectId(idValue);
        const userGoogle =
          user ??
          (await mongoose.connection.db
            ?.collection("users")
            .findOne({ _id: objectId }));
        if (!user && !userGoogle)
          return res
            .status(401)
            .json({ message: "user not found", success: false });

        const userData = user ?? userGoogle;
        console.log(userData);
        return res.status(200).json({ success: true, data: userData });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    })
    .with(Methods.PUT, async () => {
      try {
        const user = await userParser(req, res);
        if (!user) return;
        let passwordHash;
        if (user?.password) {
          passwordHash = await bcrypt.hash(user.password, 10);
        }

        const userUpdated = await User.findByIdAndUpdate(
          id,
          {
            $set: {
              name: user.name,
              password: passwordHash,
              company: user.company,
            },
          },
          { new: true }
        );
        const idValue = Array.isArray(id) ? id[0] : id;
        const objectId = new mongoose.Types.ObjectId(idValue);
        const usersGoogle =
          userUpdated ??
          (await mongoose.connection.db?.collection("users").findOneAndUpdate(
            {
              _id: objectId,
            },
            {
              $set: {
                name: user.name,
                password: user.password,
                company: user.company,
              },
            },
            { returnDocument: "after" }
          ));
        if (!userUpdated && !usersGoogle)
          return res
            .status(401)
            .json({ success: false, message: "User not found" });

        const userGeneral = userUpdated ?? usersGoogle;

        return res.status(200).json({ success: true, data: userGeneral });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }
    });
}
