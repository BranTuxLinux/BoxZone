import { NextApiResponse } from "next"

export const existsID = (id: unknown, res:NextApiResponse) => {
    if (!id) return res.status(400).json({success: false, message:"ID is required"})
  }