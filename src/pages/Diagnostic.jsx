import React, { useState, useEffect } from 'react';
import DiagnosticSection from '../components/DiagnosticSection';
import ResultsSection from '../components/ResultsSection';

const Diagnostic = ({ setGlobalDiagnosis }) => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalysisComplete = (result) => {
        setAnalysisResult(result);

        // Update global state for chatbot
        if (setGlobalDiagnosis && result) {
            setGlobalDiagnosis({
                prediction: result.prediction,
                confidence: result.confidence
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
