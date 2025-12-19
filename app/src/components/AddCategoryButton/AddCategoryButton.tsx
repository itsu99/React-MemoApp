import { useState } from 'react';
import './AddCategoryButton.css';

type Props = {
  onAdd: (name: string) => void;
};

export const AddCategoryButton = ({ onAdd }: Props) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    // trim():前後の空白を削除
    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setName('');
  };

  return (
    <div className="add-category">
      <input
        type="text"
        value={name}
        placeholder="カテゴリを追加"
        // eはChangeEvent<HTMLInputElement>
        // e.target.value が入力値
        onChange={(e) => setName(e.target.value)}
        // Enter キーで追加できる UX
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAdd();
          }
        }}
      />
      {/* {クリックでもhandleAddを実行} */}
      <button onClick={handleAdd}>追加</button>
    </div>
  );
};
