import { ICategory } from "@/backend/models/Category";
import {create } from "zustand"

type Inventory = {
  id : string;
  category : ICategory[] | null;
  
};

type State = {
    inventory: Inventory
    setInventory: (inventory: Inventory) => void

}
export const useInventory = create<State>((set) => ({
    inventory: {
        id: "",
        name: "",
        category: null
    },
    setInventory: (inventory) => { 
        console.log("Reload Inventory in store")
        return set({inventory}) }
}))