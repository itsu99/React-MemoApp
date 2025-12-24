import { useState } from "react";
import "./CategoryItem.css";
import type { Category } from "../../types/category";

type Props = {
  category: Category;
  isActive: boolean;
  isOpen: boolean;
  onSelect: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
};

export const CategoryItem = ({
  category,
  isActive,
  isOpen,
  onSelect,
  onUpdate,
  onDelete,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);

  // 編集確定
  const handleSave = () => {
    if (!editName.trim()) return;
    onUpdate(category.id, editName.trim());
    setIsEditing(false);
  };

  // 編集キャンセル
  const handleCancel = () => {
    setEditName(category.name);
    setIsEditing(false);
  };

  return (
    <li className={`category-item ${isActive ? "active" : ""}`}>
      {isEditing ? (
        <>
          <input
            className="category-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>保存</button>
          <button onClick={handleCancel}>キャンセル</button>
        </>
      ) : (
        <>
          <span className="category-name" onClick={() => onSelect(category.id)}>
            {isOpen ? '▼' : '▶'}
            {category.name}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(category.id)}>🗑️</button>
        </>
      )}
    </li>
  );
};
