// ignore type script errors 
// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { forwardRef, useId, useRef, useState } from "react";
import { useInventory } from "@/context/store";

export function CreateItems({ InventoryID }: { InventoryID: string }) {
  const inputPrice = useRef<HTMLInputElement>(null);
  const inputQuantity = useRef<HTMLInputElement>(null);
  
  const { inventory } = useInventory();
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { 
    if (e.key === "Enter") {
      inputQuantity.current?.focus();
    }
   }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Nuevo Articulo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Un Nuevo Articulo</DialogTitle>
          <DialogDescription>
            Escribe El Precio y Cantidad, Opcionalmente la categoría
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Precio</Label>
            <InputComponents placeholder="500.000" ref={inputPrice} keyDownHandler={keyDownHandler} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Cantidad</Label>
            <InputComponents placeholder="41" ref={inputQuantity} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Categoría</Label>
            {inventory?.category?.length > 0 ? (
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {inventory?.category?.map((category) => (
                    <SelectItem
                      key={category?._id?.toString()}
                      value={category?._id?.toString()}
                    >
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="col-span-3 text-gray-500">
                No hay categorías disponibles
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Crear articulo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const InputComponents = forwardRef<HTMLInputElement, { placeholder: string, keyDownHandler: () => void }>(
  ({ placeholder, keyDownHandler }, ref) => {
    const id = useId();
    const [value, setValue] = useState<string>("");
    const [formattedValue, setFormattedValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");
      if (!isNaN(Number(rawValue))) {
        setValue(rawValue);
        setFormattedValue(rawValue);
      }
    };

    const handleBlur = () => {
      if (value) {
        setFormattedValue(new Intl.NumberFormat("es-ES").format(Number(value)));
      }
    };

    const handleFocus = () => {
      setFormattedValue(value);
    };

    return (
      <Input
        className="col-span-3"
        type="text"
        id={id}
        ref={ref}
        placeholder={placeholder}
        value={formattedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={keyDownHandler}
      />
    );
  }
);
