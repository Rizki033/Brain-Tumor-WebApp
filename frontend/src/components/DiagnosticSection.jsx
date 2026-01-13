import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CloudUpload, FileEarmarkMedical } from 'react-bootstrap-icons';
import './DiagnosticSection.css';

const DiagnosticSection = ({ onAnalysisComplete }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAnalysis = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });

            // Handle non-2xx responses with a useful message
            if (!response.ok) {
                let detail = "";
                try {
                    const errJson = await response.json();
                    detail = errJson?.detail || errJson?.error || JSON.stringify(errJson);
                } catch {
                    try {
                        detail = await response.text();
                    } catch {
                        detail = "";
                    }
                }
                throw new Error(`Request failed (${response.status}). ${detail}`);
            }

            const data = await response.json();


            // Backend currently returns: diagnosis, confidence (0-100), type, severity, tumorSize
            // Normalize to also include prediction for components that expect it.
            if (data?.error) {
                alert("Analysis failed: " + data.error);
                return;
            }

            const normalized = {
                ...data,
                prediction: data?.prediction ?? data?.diagnosis ?? "Unknown",
                patientId: data?.patientId ?? ("PID-" + Math.floor(Math.random() * 10000)),
            };

            if (onAnalysisComplete) {
                onAnalysisComplete(normalized);
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Analysis request failed. ${error?.message || "Please ensure backend is running."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="diagnostic-section" id="diagnosis">
            <div className="diagnostic-bg-shape"></div>
            <Container>
                <Row className="align-items-center">
                    <Col lg={5} md={12} className="mb-5 mb-lg-0">
                        <div className="diagnostic-text">
                            <h2 className="section-title">Upload MRI Scan <br /> for AI Analysis</h2>
                            <p className="section-description">
                                Our advanced deep learning model is optimized to detect potential anomalies in brain MRI scans.
                                Simply upload your DICOM, JPEG, or PNG files to get an instant preliminary analysis.
                            </p>
                            <ul className="instruction-list">
                                <li><FileEarmarkMedical className="me-2" /> Supports JPG, PNG, and DICOM</li>
                                <li><FileEarmarkMedical className="me-2" /> Secure & Private Processing</li>
                                <li><FileEarmarkMedical className="me-2" /> Instant AI Segmentation</li>
                            </ul>
                        </div>
                    </Col>

                    <Col lg={7} md={12}>
                        <div
                            className={`upload-card ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="upload-content">
                                {selectedFile ? (
                                    <div className="file-success">
                                        <FileEarmarkMedical size={60} className="success-icon" />
                                        <h4 className="mt-3">{selectedFile.name}</h4>
                                        <p className="text-muted">Ready for Analysis</p>
                                        <Button
                                            variant="primary"
                                            className="analyze-btn mt-3"
                                            onClick={handleAnalysis}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing Scan...' : 'Run AI Diagnosis'}
                                        </Button>
                                        <Button variant="link" onClick={() => setSelectedFile(null)} className="text-muted mt-2">
                                            Upload Different File
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <CloudUpload size={80} className="upload-icon mb-4" />
                                        <h3 className="upload-title">Drag & Drop MRI Image</h3>
                                        <p className="upload-subtitle">or</p>
                                        <label htmlFor="file-upload" className="browse-btn">
                                            Browse Files
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                        />
                                        <p className="formats-text mt-3">Supported formats: JPG, JPEG, PNG</p>
                                    </>
                                )}
                            </div>
                            {dragActive && <div className="drag-overlay"></div>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DiagnosticSection;
