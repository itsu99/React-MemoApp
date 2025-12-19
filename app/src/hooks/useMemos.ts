import { useCallback } from "react";
import type { Memo } from "../types/memo";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useMemos = () => {
    const[memos, setMemos] = useLocalStorage<Memo[]>("memos",[]);

    // categoryId を受け取って、そのカテゴリーに対応する Memo を1つ返す
    // 今選択されているカテゴリーのメモを取得する
    const getMemoByCategoryId = useCallback((categoryId: number | null):Memo | null =>{
        if (categoryId === null) return null;

        return memos.find(
            (memo) => memo.category_id === categoryId
        ) ?? null;
    },
    [memos]);

    // updateMemoText
    // 指定した category_id の memo の text を更新
    // なければ 新しく memo を作る
    const updateMemoText = useCallback((categoryId: number, text: string) => {
        setMemos((prev) => {
            // some:一致した要素があるかをtrue or false で返す
            // 今回は「===」で完全一致
            // memo はMemo[]を1件ずつ格納したもの
            const exists = prev.some((memo) => memo.category_id === categoryId);

            if(exists) {
                // tureの場合memoのtextを新しいtextに書き換える
                return prev.map((memo) => memo.category_id === categoryId ? {...memo,text}: memo);
            }
            // falseであればmemo[]がまだ作成されていないため配列に加える
            return [...prev,{category_id: categoryId, text,},];
        });
    },[])

    // deleteMemosByCategoryId
    // 指定した category_id に紐づく memo を全削除
    const deleteMemosByCategoryId = useCallback((categoryId: number) => {
        setMemos((prev) => prev.filter((memo) => memo.category_id !== categoryId));
    },[])

    return {
        memos,
        getMemoByCategoryId,
        updateMemoText,
        deleteMemosByCategoryId
    } as const;
};
