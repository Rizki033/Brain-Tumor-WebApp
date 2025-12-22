import React, { useState, useEffect } from 'react';
import DiagnosticSection from '../components/DiagnosticSection';
import ResultsSection from '../components/ResultsSection';

const Diagnostic = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalysisComplete = (result) => {
        setAnalysisResult(result);
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
