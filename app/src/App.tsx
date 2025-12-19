import { CategoryList } from "./components/CategoryList/CategoryList";
import { MemoEditor } from "./components/MemoEditor/MemoEditor";
import { useCategories } from "./hooks/useCategories";
import { useActiveCategory } from "./hooks/useActiveCategory";
import { useMemos } from "./hooks/useMemos";
import './App.css'

export const App = () => {

    const { categories, addCategory, updateCategory, deleteCategory} = useCategories();

    const { activeId, setActiveCategory, clearActiveCategory} = useActiveCategory();

    const { getMemoByCategoryId, updateMemoText, deleteMemosByCategoryId} = useMemos();

    const handleDeleteCategoryAndMemo = (categoryId: number) => {
        deleteCategory(categoryId);
        deleteMemosByCategoryId(categoryId);
        if (activeId === categoryId) {
            clearActiveCategory();
        }
    };
    return (
        <div className="app">
            <CategoryList
                categories={categories}
                activeCategoryId={activeId}
                onSelect={setActiveCategory}
                onAdd={addCategory}
                onUpdate={updateCategory}
                onDelete={handleDeleteCategoryAndMemo}
            />
            <MemoEditor
                memo={getMemoByCategoryId(activeId)}
                activeCategoryId={activeId}
                onUpdate={updateMemoText}
            />
        </div>
    )


}; 
export default App;