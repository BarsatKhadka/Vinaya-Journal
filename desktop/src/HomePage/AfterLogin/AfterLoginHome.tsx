import { TextEditor } from "./TextEditor/TextEditor";
import { AfterLoginRightTopBar } from "./RightSide/AfterLoginRightTopBar";

export const AfterLoginHome = () => {
    return (
        <div className="grid grid-cols-2 h-screen">
            <AfterLoginRightTopBar />
            <TextEditor />
        </div>
    );
};