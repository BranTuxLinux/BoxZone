import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ItemBoxProps {
  price: number;
  quantity: number;
  inventoryId: string;
  category?: string | undefined;
  onDelete: () => void;
  onUpdate: () => void;
}

export const ItemCard: React.FC<ItemBoxProps> = ({ price: precio, quantity: cantidad, category: categoria, onDelete, onUpdate }) => {
  console.log("render")
  return (
    <div className=" shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold">Precio: ${precio.toFixed(2)}</p>
        <p className="text-md">Cantidad: {cantidad}</p>
        {categoria && <p className="text-sm text-gray-600">Categoría: {categoria}</p>}
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" size="icon" onClick={onUpdate}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Actualizar</span>
        </Button>
        <Button variant="outline" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </div>
    </div>
  );
};

