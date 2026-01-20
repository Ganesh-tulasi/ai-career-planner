"use client";

import { useState } from "react";
import CareerForm from "../components/CareerForm";
import RoadmapDisplay from "../components/RoadmapDisplay";
import { CareerProfile, CareerRoadmap } from "../lib/types";
import { AlertCircle, Rocket } from "lucide-react";

export default function Home() {
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (profile: CareerProfile) => {
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/career-plan`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  }
);
      
      if (!response.ok) {
        throw new Error("Failed to generate plan. Please try again.");
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            AI-Powered Career Architect
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white">
            Design Your Future Career
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get a personalized, actionable roadmap to land your dream role.
            We analyze your background and generate a tailored 4-week study plan.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {!roadmap && (
          <div className="mb-12">
            <CareerForm onSubmit={handleGenerate} isLoading={loading} />
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {roadmap && <RoadmapDisplay data={roadmap} />}

        {roadmap && (
          <div className="text-center mt-12">
            <button
              onClick={() => setRoadmap(null)}
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 underline-offset-4"
            >
              Generate Another Plan
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
