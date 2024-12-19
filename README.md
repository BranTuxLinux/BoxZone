# API Endpoints Checklist

---

## Inventory

- [x] **GET** /api/inventory - Obtener todo el inventario
- [x] **GET** /api/inventory?userId=123 - Obtener ítem de inventario por usuario
- [x] **GET** /api/inventory?userId=123&id=123 - Listar inventario por usuario con populate
- [x] **POST** /api/inventory - Crear un nuevo ítem en el inventario
- [x] **PUT** /api/inventory?id= - Actualizar ítem de inventario por ID
- [x] **DELETE** /api/inventory?id= - Eliminar ítem de inventario por ID

---

## Category

- [x] **GET** /api/category - Listar todas las categorias
- [x] **GET** /api/category?inventoryId= - Listar categoria por inventario
- [x] **POST** /api/category - Crear una nueva categoría
- [x] **PUT** /api/category?id= - Actualizar categoría por ID
- [x] **DELETE** /api/category?id= - Eliminar categoría por ID

---

## Items

- [x] **GET** /api/items - Obtener todos los ítems
- [ ] **GET** /api/items? - Obtener ítem por ID **Aun no**
- [x] **POST** /api/items - Crear un nuevo ítem, add in history and inventory
- [x] **PUT** /api/items?id - Actualizar ítem por ID
- [x] **DELETE** /api/items?id - Eliminar ítem por ID 

---

## History

- [x] **GET** /api/history - Obtener todo el historial
- [x] **GET** /api/history?inventoryId - Obtener historial por Inventario
- [x] **POST** reservado para Items - Crear un nuevo registro de historial

---

## User

- [x] **GET** /api/user - Obtener todos los usuarios
- [x] **POST** /api/user - Crear un nuevo usuario
- [x] **GET** /api/user/:id - Obtener usuario por ID
- [x] **PUT** /api/user/:id - Actualizar usuario por ID
- [ ] **DELETE** /api/user/:id - Eliminar usuario por ID
