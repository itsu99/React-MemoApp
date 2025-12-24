import type { Category } from "../../types/category";
import './CategoryList.css'
import { CategoryItem } from "../CategoryItem/CategoryItem";
import { AddButton } from "../AddCategoryButton/AddButton";

type Props = {
    // 表示用データ
    categories: Category[];
    activeCategoryId: number | null;
    // ユーザーの操作通知 呼ぶだけで返り値は求めないのでvoid
    onSelect: (id: number) => void;
    onAdd: (name: string) => void;
    onUpdate: (id: number, name: string) => void;
    onDelete: (id: number) => void;
};

const CATEGORY_PLACEHOLDER = 'カテゴリを追加';

export const CategoryList = ({
    categories,
    activeCategoryId,
    onSelect,
    onAdd,
    onUpdate,
    onDelete,
}: Props) => {
    return (
        <div className="category-list">
            <ul>
                {categories.map((category) => (
                    <CategoryItem 
                        key={category.id}
                        category={category}
                        isActive={category.id === activeCategoryId}
                        onSelect={onSelect}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </ul>

            <AddButton onAdd={onAdd} placeholder={CATEGORY_PLACEHOLDER}/>
        </div>
    )
}