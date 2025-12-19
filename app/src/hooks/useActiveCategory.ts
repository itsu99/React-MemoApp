import { useState, useCallback } from "react";

export const useActiveCategory = (initialId: number | null = null) => {
    
    // 今どのカテゴリーが選ばれているかを取得 
    const [activeId, setActiveId] = useState<number | null>(initialId);

    // カテゴリーをアクティブにする
    const setActiveCategory = useCallback((id: number) => {
        setActiveId(id);
    },[]);

    // アクティブを解除する
    const clearActiveCategory = useCallback(() => {
        setActiveId(null);
    },[]);

    return {
        activeId,
        setActiveCategory,
        clearActiveCategory,
    } as const;
};