import { TextEditor } from "./TextEditor/TextEditor";

export const AfterLoginHome = () => {
    return (
        <div className="grid grid-cols-2 h-screen">
            <div></div>
            <TextEditor />
        </div>
    );
};