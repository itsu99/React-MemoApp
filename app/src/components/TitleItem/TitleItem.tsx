import { useState } from "react";
import type { Title } from "../../types/title";
import "./TitleItem.css";

type Props = {
  title: Title;
  isActive: boolean;
  onSelect: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
};

export const TitleItem = ({
  title,
  isActive,
  onSelect,
  onUpdate,
  onDelete,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(title.title_name);

  // 編集確定
  const handleSave = () => {
    if (!editName.trim()) return;
    onUpdate(title.id, editName.trim());
    setIsEditing(false);
  };

  // 編集キャンセル
  const handleCancel = () => {
    setEditName(title.title_name);
    setIsEditing(false);
  };
  return (
    <li className={`title-item ${isActive ? "active" : ""}`}>
      {isEditing ? (
        <>
          <input
            className="title-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>保存</button>
          <button onClick={handleCancel}>キャンセル</button>
        </>
      ) : (
        <>
          <span className="title-name" onClick={() => onSelect(title.id)}>
            {title.title_name}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(title.id)}>🗑️</button>
        </>
      )}
    </li>
  );
};
