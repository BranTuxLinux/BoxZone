import { Data } from "@/pages/api";
import { NextApiRequest, NextApiResponse } from "next";
import { HistoryModel, IHistory } from "../models/History";

type ApiHandler = (
  req: NextApiRequest ,
  res: NextApiResponse<Data<IHistory[] |IHistory>>
) => Promise<void>;

export const GetHistory: ApiHandler = async (req, res) => {
  try {
    const history = await HistoryModel.find();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in History" });
  }
};

export const GetHistoryByInventory: ApiHandler = async (req, res) => {
  const { inventoryId } = req.query;
  try {
    const history = await HistoryModel.find({ inventoryId });
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in History" });
  }
};