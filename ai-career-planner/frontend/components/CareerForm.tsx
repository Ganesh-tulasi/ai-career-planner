"use client";

import { useState } from "react";
import { CareerProfile } from "@/lib/types";
import { Send, Clock, BookOpen, GraduationCap, Target } from "lucide-react";

interface CareerFormProps {
    onSubmit: (profile: CareerProfile) => void;
    isLoading: boolean;
}

export default function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
    const [formData, setFormData] = useState({
        degree: "",
        skills: "",
        target_role: "",
        daily_hours: "2",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            degree: formData.degree,
            skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
            target_role: formData.target_role,
            daily_hours: Number(formData.daily_hours),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        <GraduationCap className="w-4 h-4" />
                        Current Degree / Major
                    </label>
                    <input
                        required
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="e.g. B.Tech Computer Science"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        <BookOpen className="w-4 h-4" />
                        Current Skills (comma separated)
                    </label>
                    <textarea
                        required
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[80px]"
                        placeholder="e.g. Python, HTML, Basic SQL"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        <Target className="w-4 h-4" />
                        Target Role
                    </label>
                    <input
                        required
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="e.g. AI Engineer"
                        value={formData.target_role}
                        onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        <Clock className="w-4 h-4" />
                        Daily Study Hours
                    </label>
                    <input
                        required
                        type="number"
                        min="1"
                        max="12"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.daily_hours}
                        onChange={(e) => setFormData({ ...formData, daily_hours: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Plan...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Generate Roadmap
                    </>
                )}
            </button>
        </form>
    );
}
