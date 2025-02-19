'use client';

import React, { useState } from 'react';
import TrainingForm from '@/components/TrainingForm';
import type { TrainingOutline } from '@/lib/schema';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [trainingOutline, setTrainingOutline] = useState<TrainingOutline | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmitForm(data: {
    companyName: string;
    industry: string;
    goals: string;
    context: string;
  }) {
    setLoading(true);
    setTrainingOutline(null);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate training.');
      }

      // The server should return { trainingOutline: stringifiedJSON }
      const result = await response.json();
      // Attempt to parse the JSON structure
      const parsed: TrainingOutline = JSON.parse(result.trainingOutline);

      setTrainingOutline(parsed);
    } catch (error: any) {
      console.error('Error generating training:', error);
      setErrorMessage(error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        AI-Driven Sustainability Training Generator
      </h1>

      <TrainingForm onSubmit={handleSubmitForm} loading={loading} />

      {loading && (
        <p className="mt-4">Generating outline...</p>
      )}

      {errorMessage && (
        <p className="mt-4 text-red-600">
          {errorMessage}
        </p>
      )}

      {trainingOutline && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">
            Generated Sustainability Training Outline
          </h2>

          <section className="mb-4">
            <h3 className="font-bold">Introduction</h3>
            <p>{trainingOutline.introduction}</p>
          </section>

          {trainingOutline.keyTopics?.length > 0 && (
            <section className="mb-4">
              <h3 className="font-bold">Key Topics</h3>
              <ul className="list-disc pl-6">
                {trainingOutline.keyTopics.map((topic, idx) => (
                  <li key={idx}>
                    <strong>{topic.topicTitle}</strong>: {topic.description}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {trainingOutline.actionSteps?.length > 0 && (
            <section className="mb-4">
              <h3 className="font-bold">Action Steps</h3>
              <ol className="list-decimal pl-6">
                {trainingOutline.actionSteps.map((step, idx) => (
                  <li key={idx}>
                    <strong>{step.stepTitle}</strong>: {step.instructions}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="mb-4">
            <h3 className="font-bold">Measurement & Continuous Improvement</h3>
            <p>{trainingOutline.measurementAndContinuousImprovement}</p>
          </section>

          <section>
            <h3 className="font-bold">Conclusion</h3>
            <p>{trainingOutline.conclusion}</p>
          </section>
        </div>
      )}
    </div>
  );
}
