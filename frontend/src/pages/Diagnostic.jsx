import React, { useState, useEffect } from 'react';
import DiagnosticSection from '../components/DiagnosticSection';
import ResultsSection from '../components/ResultsSection';

const Diagnostic = ({ setGlobalDiagnosis }) => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalysisComplete = (result) => {
        setAnalysisResult(result);

        // Update global state for chatbot
        if (setGlobalDiagnosis && result) {
            // Backend returns confidence as percentage (0-100). Chatbot + /api/chat expect 0-1.
            const rawConfidence = typeof result.confidence === 'number' ? result.confidence : 0;
            const confidence01 = rawConfidence > 1 ? rawConfidence / 100 : rawConfidence;
            setGlobalDiagnosis({
                prediction: result.prediction ?? result.diagnosis ?? "Unknown",
                confidence: confidence01
            });
        }

        // Smooth scroll to results
        setTimeout(() => {
            const resultsElement = document.getElementById('results-section');
            if (resultsElement) {
                resultsElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <DiagnosticSection onAnalysisComplete={handleAnalysisComplete} />
            {analysisResult && <ResultsSection result={analysisResult} id="results-section" />}
        </div>
    );
};

export default Diagnostic;
