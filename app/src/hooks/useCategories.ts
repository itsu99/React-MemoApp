import { useCallback } from "react";
import type { Category } from "../types/category";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useCategories = () => {
  const [categories, setCategories] = useLocalStorage<Category[]>("category",[]);

  const addCategory = useCallback((name: string) => {
    setCategories((prev) => {
      const newCategory: Category = {
        id: Date.now(),
        name,
      };
      return [...prev, newCategory];
    });
  }, []);

  const updateCategory = useCallback((id: number, name: string) => {
    setCategories((prev) => prev.map((category) => category.id === id ? { ...category, name } : category));
  }, []);

  const deleteCategory = useCallback((id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }, []);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } as const;
};

