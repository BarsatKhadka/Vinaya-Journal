import { useState } from "react";
import { Lock, LockKeyhole } from "lucide-react";

export const Encryption = () => {
    const [encryptionEnabled, setEncryptionEnabled] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordHint, setPasswordHint] = useState("");

    return (
        <div className="flex flex-col space-y-4 w-[300px] mt-10">
            {/* Encryption Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
                <div className={`w-11 h-6 rounded-full p-1 transition-colors
                            ${encryptionEnabled ? 'bg-[#2F4F4F]' : 'bg-gray-300'}`}
                     onClick={() => setEncryptionEnabled(!encryptionEnabled)}>
                    <div className={`w-4 h-4 rounded-full transition-transform bg-white
                                ${encryptionEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm text-gray-700" 
                      style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    Enable Encryption
                </span>
            </label>

            {/* Password Input */}
            <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!encryptionEnabled}
                    placeholder="Enter password"
                    className={`w-full px-3 py-2 pl-9 rounded-lg border
                            ${!encryptionEnabled ? 'bg-gray-100 text-gray-400' : 'bg-white'}
                            focus:outline-none focus:ring-1 focus:ring-[#2F4F4F]`}
                    style={{ fontFamily: '"Fira Sans", sans-serif' }}
                />
                <Lock className={`absolute left-3 top-2.5 w-4 h-4
                              ${!encryptionEnabled ? 'text-gray-400' : 'text-[#2F4F4F]'}`} />
            </div>

            {/* Password Hint Input */}
            <div className="relative">
                <input
                    type="text"
                    value={passwordHint}
                    onChange={(e) => setPasswordHint(e.target.value)}
                    disabled={!encryptionEnabled}
                    placeholder="Password hint (optional)"
                    className={`w-full px-3 py-2 pl-9 rounded-lg border
                            ${!encryptionEnabled ? 'bg-gray-100 text-gray-400' : 'bg-white'}
                            focus:outline-none focus:ring-1 focus:ring-[#2F4F4F]`}
                    style={{ fontFamily: '"Fira Sans", sans-serif' }}
                />
                <LockKeyhole className={`absolute left-3 top-2.5 w-4 h-4
                                    ${!encryptionEnabled ? 'text-gray-400' : 'text-[#2F4F4F]'}`} />
            </div>
        </div>
    );
};