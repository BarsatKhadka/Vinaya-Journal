import { TextEditor } from "./TextEditor/TextEditor";
import { AfterLoginRightTopBar } from "./RightSide/AfterLoginRightTopBar";
import { SideBarAfterLogin } from "../AfterLogin/RightSide/SideBarAfterLogin";

export const AfterLoginHome = () => {
    return (
        <div className="grid grid-cols-2 h-screen divide-x divide-gray-200/90">
            <div className="flex flex-col h-full">
                <AfterLoginRightTopBar />
                <div className="flex flex-1 border-t border-gray-200/90">
                    <div className="w-1/4 border-r border-gray-200/90">
                        <SideBarAfterLogin />
                    </div>
                    <div className="w-3/4">

                    </div>
                </div>
            </div>
            <TextEditor />
        </div>
    );
};