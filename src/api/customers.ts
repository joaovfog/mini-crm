import type { Customer } from "@/types/customer";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await api.get("/customers");

  return data;
};

export const createCustomer = async (
  customer: Omit<Customer, "id" | "createdAt">
) => {
  return api.post("/customers", {
    ...customer,
    createdAt: new Date().toISOString(),
  });
};

export const updateCustomer = async (customer: Customer) => {
  return api.put(`/customers/${customer.id}`, customer);
};

export const deleteCustomer = async (id: string) => {
  return api.delete(`/customers/${id}`);
};
