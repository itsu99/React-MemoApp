import { useCallback } from "react";
import type { Memo } from "../types/memo";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const useMemos = () => {
  const [memos, setMemos] = useLocalStorage<Memo[]>("memos", []);

  // title_id を受け取って、そのタイトルに対応する Memo を1つ返す
  // 今選択されているカテゴリーのメモを取得する
  const getMemoByTitleId = useCallback(
    (titleId: number | null): Memo | null => {
      if (titleId === null) return null;

      return memos.find((memo) => memo.title_id === titleId) ?? null;
    },
    [memos]
  );

  // updateMemoText
  // 指定した category_id の memo の text を更新
  // なければ 新しく memo を作る
  const updateMemoText = useCallback((titleId: number, text: string) => {
    setMemos((prev) => {
      // some:一致した要素があるかをtrue or false で返す
      // 今回は「===」で完全一致
      // memo はMemo[]を1件ずつ格納したもの
      const exists = prev.some((memo) => memo.title_id === titleId);

      if (exists) {
        // tureの場合memoのtextを新しいtextに書き換える
        return prev.map((memo) =>
          memo.title_id === titleId ? { ...memo, text } : memo
        );
      }
      // falseであればmemo[]がまだ作成されていないため配列に加える
      return [...prev, { title_id: titleId, text }];
    });
  }, []);

  // deleteMemosByTitleId
  // 指定した title_id に紐づく memo を全削除
  const deleteMemosByTitleId = useCallback((titleId: number) => {
    setMemos((prev) => prev.filter((memo) => memo.title_id !== titleId));
  }, []);

  return {
    memos,
    getMemoByTitleId,
    updateMemoText,
    deleteMemosByTitleId,
  } as const;
};
