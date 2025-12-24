import type { Title } from "../../types/title";
import './TitleList.css'
import { TitleItem } from "../TitleItem/TitleItem";
import { AddButton } from "../AddCategoryButton/AddButton";

type Props = {
    categoryId: number;
    titles: Title[];
    activeTitleId: number | null;
    onSelect: (id: number) => void;
    addTitle: (categoryId: number, titleName: string) => void;
    updateTitle: (id: number, titleName: string) => void;
    deleteTitle: (id: number) => void;
}

const TITLE_PLACEHOLDER = 'タイトルを追加';

export const TitleList = ({
    categoryId,
    titles,
    activeTitleId,
    onSelect,
    addTitle,
    updateTitle,
    deleteTitle,
}: Props) => {
    return (
        <div className="title-list">
            <ul>
                {titles.map((title) => (
                    <TitleItem 
                        key={title.id}
                        title={title}
                        isActive={title.id === activeTitleId}
                        onSelect={onSelect}
                        onUpdate={updateTitle}
                        onDelete={deleteTitle}
                    />
                ))}
            </ul>
            <AddButton onAdd={(name) => addTitle(categoryId, name)} placeholder={TITLE_PLACEHOLDER}/>
        </div>
    )
}