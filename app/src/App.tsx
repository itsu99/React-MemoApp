import { CategoryList } from "./components/CategoryList/CategoryList";
import { MemoEditor } from "./components/MemoEditor/MemoEditor";
import { useCategories } from "./hooks/useCategories";
import { useActiveId } from "./hooks/useActiveId";
import { useMemos } from "./hooks/useMemos";
import { useTitles } from "./hooks/useTitles";
import './App.css'

export const App = () => {
    // カテゴリー
    const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
    // カテゴリーのアクティブ用
    const { activeId, markActiveId, clearActiveId } = useActiveId();
    // タイトルのアクティブ用
    const { activeId: activeTitleId, markActiveId: markActiveTitleId, clearActiveId: clearActiveTitleId } = useActiveId();
    // タイトル
    const { titles, addTitle, updateTitle, deleteTitle } = useTitles();
    // メモ
    const { getMemoByTitleId, updateMemoText, deleteMemosByTitleId } = useMemos();

    // タイトルとメモを削除
    const handleDeleteTitleAndMemo = (titleId: number) => {
        deleteTitle(titleId);
        deleteMemosByTitleId(titleId);
        if (activeTitleId === titleId) {
            clearActiveTitleId();
        }
    };

    // カテゴリーと紐づくタイトル・メモを削除
    const handleDeleteAll = (categoryId: number) => {
        const relatedTitles = titles.filter(title => title.category_id === categoryId);

        relatedTitles.forEach(title => deleteMemosByTitleId(title.id));
        relatedTitles.forEach(title => deleteTitle(title.id));

        deleteCategory(categoryId);

        if (activeId === categoryId) {
            clearActiveId();
            clearActiveTitleId();
        }
    };

    return (
        <div className="app">
            <CategoryList
                categories={categories}
                titles={titles} // 全タイトルを渡す
                activeCategoryId={activeId} 
                activeTitleId={activeTitleId}
                onSelectCategory={markActiveId} // カテゴリーのアクティブ更新
                onAddCategory={addCategory}
                onUpdateCategory={updateCategory}
                onDeleteCategory={handleDeleteAll}
                onSelectTitle={markActiveTitleId} // タイトルのアクティブ更新
                onAddTitle={addTitle}
                onUpdateTitle={updateTitle}
                onDeleteTitleAndMemo={handleDeleteTitleAndMemo}
            />

            <MemoEditor
                memo={getMemoByTitleId(activeTitleId)}
                activeTitleId={activeTitleId}
                onUpdate={updateMemoText}
            />
        </div>
    );
};

export default App;