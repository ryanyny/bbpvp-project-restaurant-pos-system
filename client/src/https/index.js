import {axiosWrapper} from "./axiosWrapper"

export const login = (data) => axiosWrapper.post("/api/users/login", data)
export const register = (data) =>
  axiosWrapper.post("/api/users/register", data)
export const getUserData = () => axiosWrapper.get("/api/users/")
export const logout = () => axiosWrapper.post("/api/users/logout")

export const getTables = () => axiosWrapper.get("/api/tables");
export const addTable = (data) => axiosWrapper.post("/api/tables", data);
export const updateTable = (id, data) => axiosWrapper.put(`/api/tables/${id}`, data);
export const deleteTable = (id) => axiosWrapper.delete(`/api/tables/${id}`);


export const addMenu = (data) => axiosWrapper.post("/api/menus", data)
export const getMenus = () => axiosWrapper.get("/api/menus")
export const updateMenu = (menuId, menuData) =>
  axiosWrapper.put(`/api/menus/${menuId}`, menuData)
export const deleteMenu = (menuId) =>
  axiosWrapper.delete(`/api/menus/${menuId}`)

export const addItem = (data) => axiosWrapper.post("/api/items", data);
export const getItems = () => axiosWrapper.get("/api/items");
export const updateItem = (itemId, itemData) =>
  axiosWrapper.put(`/api/items/${itemId}`, itemData);
export const deleteItem = (itemId) =>
  axiosWrapper.delete(`/api/items/${itemId}`);

export const addOrder = (data) => axiosWrapper.post("/api/orders", data);
export const getOrders = () => axiosWrapper.get("/api/orders");
export const updateOrderStatus = ({ orderId, orderStatus }) =>
  axiosWrapper.put(`/api/orders/${orderId}`, { orderStatus })