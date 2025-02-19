'use client';

import React, { useState } from 'react';
import TrainingForm from '@/components/TrainingForm';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [trainingOutline, setTrainingOutline] = useState<string | null>(null);

  async function handleSubmitForm(data: {
    companyName: string;
    industry: string;
    goals: string;
    context: string;
  }) {
    setLoading(true);
    setTrainingOutline(null);

    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setTrainingOutline(result?.trainingOutline);
    } catch (error) {
      console.error('Error generating training:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI-Driven Sustainability Training Generator</h1>

      <TrainingForm onSubmit={handleSubmitForm} loading={loading} />

      {loading && <p className="mt-4">Generating outline...</p>}

      {trainingOutline && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Sustainability Training Outline</h2>
          <p>{trainingOutline}</p>
        </div>
      )}
    </div>
  );
}
