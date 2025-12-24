import { CategoryList } from "./components/CategoryList/CategoryList";
import { MemoEditor } from "./components/MemoEditor/MemoEditor";
import { TitleList } from "./components/TitleList/TitleList";
import { useCategories } from "./hooks/useCategories";
import { useActiveId } from "./hooks/useActiveId";
import { useMemos } from "./hooks/useMemos";
import { useTitles } from "./hooks/useTitles";
import './App.css'

export const App = () => {

    const { categories, addCategory, updateCategory, deleteCategory} = useCategories();
    // カテゴリーのアクティブ用
    const { activeId, markActiveId, clearActiveId} = useActiveId();
    // タイトルのアクティブ用
    const { activeId: activeTitleId, markActiveId: markActiveTitleId, clearActiveId: clearActiveTitleId } = useActiveId();
    const { titles, addTitle, updateTitle, deleteTitle } = useTitles();
    const { getMemoByTitleId, updateMemoText, deleteMemosByTitleId} = useMemos();

    const handleDeleteTitleAndMemo = (titleId: number) => {
        deleteTitle(titleId);
        deleteMemosByTitleId(titleId);
        if (activeTitleId === titleId) {
            clearActiveTitleId();
        }
    };

    const handleDeleteAll = (categoryId: number) => {
        //　categoryId に紐づくタイトルを取得
        const relatedTitles = titles.filter((title) => title.category_id === categoryId);
        // それぞれのタイトルに紐づくメモを削除
        relatedTitles.forEach((title) => {
            deleteMemosByTitleId(title.id);
        })

        relatedTitles.forEach((title) => {
            deleteTitle(title.id);
        });
        deleteCategory(categoryId);
        if (activeId === categoryId) {
            clearActiveId();
            clearActiveTitleId();
        }

    }


    return (
    <div className="app">
        <CategoryList
        categories={categories}
        activeCategoryId={activeId}
        onSelect={markActiveId}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={handleDeleteAll}
        />

        {activeId !== null && (
        <TitleList
            categoryId={activeId}
            titles={titles.filter(t => t.category_id === activeId)}
            activeTitleId={activeTitleId}
            onSelect={markActiveTitleId}
            addTitle={addTitle}
            updateTitle={updateTitle}
            deleteTitle={handleDeleteTitleAndMemo}
        />
        )}

        <MemoEditor
        memo={getMemoByTitleId(activeTitleId)}
        activeTitleId={activeTitleId}
        onUpdate={updateMemoText}
        />
    </div>
    )



}; 
export default App;