import { useState, useEffect } from 'react';
import type { Memo } from "../../types/memo";
import './MemoEditor.css';

type Props = {
    memo?: Memo | null;
    activeCategoryId: number | null;
    onUpdate: (categoryId: number, text: string) => void;
}

export const MemoEditor = ({
    memo,
    activeCategoryId,
    onUpdate,
}: Props) => {
    const [text, setText] = useState(memo?.text || "");
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (activeCategoryId !== null) {
            onUpdate(activeCategoryId, newText)
        }
    }

    useEffect(() => {
        setText(memo?.text || "");
    }, [memo])

    return (
        <div className="memo-editor">
            {activeCategoryId === null ? (
                <p>カテゴリーを選択してください</p>
            ): (
                <textarea 
                    value={text}
                    onChange={handleChange}
                    placeholder='メモを入力...'
                />
            )}
        </div>
    )

}
    