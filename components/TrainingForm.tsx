"use client";
import React, { useState } from "react";
import { IndustryCombobox } from "@/components/ui/custom-build/IndustryCombobox";

interface TrainingFormProps {
  onSubmit: (data: {
    companyName: string;
    industry: string;
    goals: string;
    context: string;
  }) => void;
  loading: boolean;
}

export default function TrainingForm({ onSubmit, loading }: TrainingFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState("");
  const [context, setContext] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ companyName, industry, goals, context });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Company Name</label>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-medium mb-1">Industry</label>
        <IndustryCombobox
          value={industry}
          onChange={(val) => setIndustry(val)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Sustainability Goals
        </label>
        <textarea
          className="mt-1 block w-full border rounded px-3 py-2"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Additional Context</label>
        <textarea
          className="mt-1 block w-full border rounded px-3 py-2"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Any extra details or context that might help the AI model..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Training Outline"}
      </button>
    </form>
  );
}
