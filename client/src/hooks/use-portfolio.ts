import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

export interface Asset {
  id: string;
  userId: string;
  categoryId: string;
  name: string;
  symbol: string;
  type: string;
  quantity: string;
  purchasePrice: string;
  currentPrice: string | null;
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  userId: string;
  assetId: string;
  type: string;
  quantity: string;
  price: string;
  totalAmount: string;
  transactionDate: Date;
  notes: string | null;
  createdAt: Date;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
}

export function useAssets() {
  return useQuery<Asset[]>({
    queryKey: [`/api/assets?userId=${DEMO_USER_ID}`],
  });
}

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: [`/api/transactions?userId=${DEMO_USER_ID}`],
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (asset: {
      categoryId: string;
      name: string;
      symbol: string;
      type: string;
      quantity: string;
      purchasePrice: string;
      currentPrice?: string;
      purchaseDate: Date;
    }) => {
      const response = await apiRequest("POST", "/api/assets", {
        userId: DEMO_USER_ID,
        ...asset,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
    },
  });
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; currentPrice?: string; quantity?: string }) => {
      const response = await apiRequest("PATCH", `/api/assets/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/assets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transaction: {
      assetId: string;
      type: string;
      quantity: string;
      price: string;
      totalAmount: string;
      transactionDate: Date;
      notes?: string;
    }) => {
      const response = await apiRequest("POST", "/api/transactions", {
        userId: DEMO_USER_ID,
        ...transaction,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
  });
}
