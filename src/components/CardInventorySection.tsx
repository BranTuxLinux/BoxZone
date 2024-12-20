import { IInventory, InventoryModel } from "@/backend/models/Inventory";
import { CardInventory } from "./card";
import { auth } from "@/auth";
import mongooseDB from "@/lib/mongoose";


// Extender el tipo existente
export interface IExtendedInventory extends IInventory {
  createdAt?: Date;
  updatedAt?: Date;
}
export const CardInventorySection = async () => {
  await mongooseDB();
  const user = await auth();
  if (!user) {
    return <>error</>;
  }
  console.log({ user });
  const data = await InventoryModel.find({ userId: user.user?.id }) as IExtendedInventory[]
  
  return (
    <>
      {data.length === 0 && <h1 className="">No hay Inventarios aun</h1>}
      {data.map((item) => (
        <CardInventory key={item.id} id={item._id} name={item.name} createAt={item?.createdAt} updateAt={item?.updatedAt} />
      ))}
    </>
  );
};
