import { useState } from "react";
import "./AddButton.css";

type Props = {
  onAdd: (name: string) => void;
  placeholder: string;
};

export const AddButton = ({ onAdd, placeholder }: Props) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    // trim():前後の空白を削除
    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setName("");
  };

  return (
    <div className="add-category">
      <input
        type="text"
        value={name}
        placeholder={placeholder}
        // eはChangeEvent<HTMLInputElement>
        // e.target.value が入力値
        onChange={(e) => setName(e.target.value)}
        // Enter キーで追加できる UX
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      {/* {クリックでもhandleAddを実行} */}
      <button onClick={handleAdd}>追加</button>
    </div>
  );
};
