import { useState } from "react";
import type { Category } from "../../types/category";
import type { Title } from "../../types/title";
import './CategoryList.css'
import { CategoryItem } from "../CategoryItem/CategoryItem";
import { AddButton } from "../AddCategoryButton/AddButton";
import { TitleList } from "../TitleList/TitleList";

type Props = {
    categories: Category[];
    titles: Title[];
    activeCategoryId: number | null;
    activeTitleId: number | null;
    onSelectCategory: (id: number) => void;
    onAddCategory: (name: string) => void;
    onUpdateCategory: (id: number, name: string) => void;
    onDeleteCategory: (id: number) => void;
    onSelectTitle: (id: number) => void;
    onAddTitle: (categoryId: number, name: string) => void;
    onUpdateTitle: (id: number, name: string) => void;
    onDeleteTitleAndMemo: (id: number) => void;
};

const CATEGORY_PLACEHOLDER = 'カテゴリを追加';

export const CategoryList = ({
    categories,
    titles,
    activeCategoryId,
    activeTitleId,
    onSelectCategory,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
    onSelectTitle,
    onAddTitle,
    onUpdateTitle,
    onDeleteTitleAndMemo,
}: Props) => {
    const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

    const toggleCategory = (id: number) => {
        if (openCategoryId === id) {
            setOpenCategoryId(null); // 開いている場合は閉じる
        } else {
            setOpenCategoryId(id);   // 開いていない場合は開く
        }
        onSelectCategory(id);       // ついでにアクティブ更新
    }

    return (
        <div className="category-list">
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <CategoryItem
                            category={category}
                            isActive={category.id === activeCategoryId}
                            isOpen={category.id === openCategoryId}
                            onSelect={() => toggleCategory(category.id)}
                            onUpdate={onUpdateCategory}
                            onDelete={onDeleteCategory}
                        />
                        {category.id === openCategoryId && (
                            <TitleList
                                categoryId={category.id}
                                titles={titles.filter(t => t.category_id === category.id)}
                                activeTitleId={activeTitleId}
                                onSelect={onSelectTitle}
                                addTitle={onAddTitle}
                                updateTitle={onUpdateTitle}
                                deleteTitle={onDeleteTitleAndMemo}
                            />
                        )}
                    </li>
                ))}
            </ul>

            <AddButton onAdd={onAddCategory} placeholder={CATEGORY_PLACEHOLDER} />
        </div>
    )
}
