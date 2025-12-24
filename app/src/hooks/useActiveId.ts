import { useState, useCallback } from "react";

export const useActiveId = (initialId: number | null = null) => {
  // 今どのカテゴリーが選ばれているかを取得
  const [activeId, setActiveId] = useState<number | null>(initialId);

  // カテゴリーをアクティブにする
  const markActiveId = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  // アクティブを解除する
  const clearActiveId = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    activeId,
    markActiveId,
    clearActiveId,
  } as const;
};
