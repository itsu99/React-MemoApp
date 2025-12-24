import { useCallback } from "react";
import type { Title } from "../types/title";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useTitles = () => {
  const [titles, setTitles] = useLocalStorage<Title[]>("titles", []);

  // categoryId を受け取って、そのカテゴリーに対応する Title を返す(複数可)
  const getTitlesByCategoryId = useCallback(
    (categoryId: number | null): Title[] => {
      if (categoryId === null) return [];

      // filter = 条件に合う要素だけ返す
      return titles.filter((title) => title.category_id === categoryId);
    },
    [titles]
  );

  // Title の追加
  // categoryId(ActiveなcategoryIdが渡ってくる) と titleName を受け取って、新しい Title を追加する
  const addTitle = useCallback((categoryId: number, titleName: string) => {
    setTitles((prev) => {
      const newTitle: Title = {
        id: Date.now(),
        category_id: categoryId,
        title_name: titleName,
      };
      return [...prev, newTitle];
    });
  }, []);

  // Title の更新
  const updateTitle = useCallback((id: number, titleName: string) => {
    setTitles((prev) =>
      prev.map((title) =>
        title.id === id ? { ...title, title_name: titleName } : title
      )
    );
  }, []);

  // Title の削除
  const deleteTitle = useCallback((id: number) => {
    setTitles((prev) => prev.filter((title) => title.id !== id));
  }, []);

  return {
    titles,
    getTitlesByCategoryId,
    addTitle,
    updateTitle,
    deleteTitle,
  } as const;
};
