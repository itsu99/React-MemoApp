import { useState, useEffect } from 'react';
import type { Memo } from "../../types/memo";
import './MemoEditor.css';

type Props = {
    memo?: Memo | null;
    activeTitleId: number | null;
    onUpdate: (activeTitleId: number, text: string) => void;
}

export const MemoEditor = ({
    memo,
    activeTitleId,
    onUpdate,
}: Props) => {
    const [text, setText] = useState(memo?.text || "");
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (activeTitleId !== null) {
            onUpdate(activeTitleId, newText)
        }
    }

    useEffect(() => {
        setText(memo?.text || "");
    }, [memo])

    return (
        <div className="memo-editor">
            {activeTitleId === null ? (
                <p>タイトルを選択してください</p>
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
    