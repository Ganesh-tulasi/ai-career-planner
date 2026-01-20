"use client";

import { CareerRoadmap } from "@/lib/types";
import { CheckCircle2, Book, ArrowRight, Brain, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function RoadmapDisplay({ data }: { data: CareerRoadmap }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-4xl mx-auto space-y-8 pb-12"
        >
            {/* Summary Section */}
            <motion.div variants={item} className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    Your Career Strategy
                </h2>
                <p className="text-indigo-50 text-lg leading-relaxed">
                    {data.summary}
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Skill Gaps */}
                <motion.div variants={item} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Skill Gaps to Bridge
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skill_gaps.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-full text-sm font-medium border border-red-100 dark:border-red-800">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Resources */}
                <motion.div variants={item} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-green-100 dark:border-green-900/30 shadow-lg">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <Book className="w-5 h-5 text-green-500" />
                        Recommended Resources
                    </h3>
                    <ul className="space-y-2">
                        {data.learning_resources.map((resource, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                {resource}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* 4-Week Plan */}
            <motion.div variants={item} className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 px-2">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    4-Week Study Plan
                </h3>
                <div className="grid gap-4">
                    {data.study_plan.map((week) => (
                        <div key={week.week_number} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-3">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase py-1 px-3 rounded-full">
                                    Week {week.week_number}
                                </span>
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {week.focus_area}
                                </h4>
                            </div>
                            <ul className="space-y-2 ml-1">
                                {week.tasks.map((task, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        <CheckCircle2 className="w-4 h-4 text-zinc-300 mt-0.5 shrink-0" />
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div variants={item} className="bg-zinc-900 dark:bg-zinc-800 p-6 rounded-2xl text-white shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-yellow-400" />
                    Immediate Next Actions
                </h3>
                <div className="space-y-3">
                    {data.next_steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-xs">
                                {i + 1}
                            </span>
                            <p className="text-zinc-300">{step}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Helper icons
import { Target as TargetIcon } from "lucide-react";
const Target = TargetIcon;
