import { TextEditor } from "./TextEditor/TextEditor";
import { AfterLoginRightTopBar } from "./RightSide/AfterLoginRightTopBar";

export const AfterLoginHome = () => {
    return (
        <div className="grid grid-cols-2 h-screen divide-x divide-gray-200/90">
            <AfterLoginRightTopBar />
            <TextEditor />
        </div>
    );
};