import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SettingsOption {
    id: string;
    label: string;
    icon: string;
}

const settingsOptions: SettingsOption[] = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'about', label: 'About', icon: 'ℹ️' }
];

export const Settings: React.FC = () => {
    const [activeOption, setActiveOption] = useState<string>('general');

    return (
        <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-48 border-r border-[#2F4F4F] p-4">
                <h2 className="text-[#2F4F4F] font-serif text-lg mb-4">Settings</h2>
                <div className="space-y-2">
                    {settingsOptions.map((option) => (
                        <motion.button
                            key={option.id}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 font-serif
                                ${activeOption === option.id 
                                    ? 'bg-[#fae4b2] text-[#2F4F4F]' 
                                    : 'text-[#2F4F4F] hover:bg-[#fae4b2]/50'}`}
                            onClick={() => setActiveOption(option.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 p-6">
                <div className="max-w-3xl mx-auto">
                    {activeOption === 'general' && (
                        <div className="space-y-6">
                            <h3 className="text-[#2F4F4F] font-serif text-xl">General Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Language</label>
                                    <select className="bg-[#fae4b2] text-[#2F4F4F] px-3 py-1 rounded-lg font-serif">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Time Zone</label>
                                    <select className="bg-[#fae4b2] text-[#2F4F4F] px-3 py-1 rounded-lg font-serif">
                                        <option>UTC</option>
                                        <option>EST</option>
                                        <option>PST</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeOption === 'appearance' && (
                        <div className="space-y-6">
                            <h3 className="text-[#2F4F4F] font-serif text-xl">Appearance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Theme</label>
                                    <select className="bg-[#fae4b2] text-[#2F4F4F] px-3 py-1 rounded-lg font-serif">
                                        <option>Light</option>
                                        <option>Dark</option>
                                        <option>System</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Font Size</label>
                                    <select className="bg-[#fae4b2] text-[#2F4F4F] px-3 py-1 rounded-lg font-serif">
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeOption === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-[#2F4F4F] font-serif text-xl">Notifications</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Email Notifications</label>
                                    <input type="checkbox" className="w-4 h-4" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Push Notifications</label>
                                    <input type="checkbox" className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeOption === 'privacy' && (
                        <div className="space-y-6">
                            <h3 className="text-[#2F4F4F] font-serif text-xl">Privacy</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Data Collection</label>
                                    <input type="checkbox" className="w-4 h-4" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-[#2F4F4F] font-serif">Analytics</label>
                                    <input type="checkbox" className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeOption === 'about' && (
                        <div className="space-y-6">
                            <h3 className="text-[#2F4F4F] font-serif text-xl">About</h3>
                            <div className="space-y-4">
                                <p className="text-[#2F4F4F] font-serif">Version: 1.0.0</p>
                                <p className="text-[#2F4F4F] font-serif">© 2024 Vinaya Journal. All rights reserved.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 