import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Download, ArrowCounterclockwise, Activity, FileEarmarkMedical } from 'react-bootstrap-icons';
import mriScan from '../Assets/mri_scan_overlay.png';
import './ResultsSection.css';

const ResultsSection = ({ result, id }) => {
    // Fallback if no result passed (should not happen in current flow)
    const data = result || {
        patientId: "Unknown",
        diagnosis: "Pending...",
        confidence: 0,
        type: "-",
        severity: "-",
        tumorSize: "-"
    };

    const diagnosisText = (data.diagnosis || "").toLowerCase();
    const isClear = diagnosisText.includes("no tumor");

    return (
        <section className="results-section" id={id}>
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="results-title">AI Diagnosis Report</h2>
                    <p className="results-subtitle">Analysis complete. Please review the findings below.</p>
                </div>

                <Row className="justify-content-center">
                    {/* Left Column: MRI Visualization */}
                    <Col lg={6} md={12} className="mb-4 mb-lg-0">
                        <div className="scan-card">
                            <div className="scan-header">
                                <span className="scan-label">Processed Scan Output</span>
                                <Badge bg={isClear ? "success" : "danger"} className="pulse-badge">
                                    {isClear ? "Clear" : "Attention Required"}
                                </Badge>
                            </div>
                            <div className="scan-image-wrapper">
                                <img src={mriScan} alt="MRI Scan with Overlay" className="scan-image" />
                                <div className="overlay-legend">
                                    <span className="legend-item"><span className="dot red"></span> Tumor Region</span>
                                    <span className="legend-item"><span className="dot blue"></span> Healthy Tissue</span>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Column: Analytics & Findings */}
                    <Col lg={5} md={12}>
                        <div className="analytics-card">
                            <div className="card-header-custom">
                                <h4>Diagnostic Findings</h4>
                                <Badge bg="light" text="dark" className="id-badge">ID: {data.patientId}</Badge>
                            </div>

                            <div className="confidence-meter">
                                <div className="confidence-label">
                                    <span>AI Confidence Score</span>
                                    <span className="score-value">{data.confidence}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: `${data.confidence}%` }}></div>
                                </div>
                            </div>

                            <div className="findings-grid">
                                <div className="finding-item">
                                    <span className="finding-label">Diagnosis</span>
                                    <span className={`finding-value ${data.diagnosis !== 'No Tumor' ? 'highlight-red' : ''}`}>{data.diagnosis}</span>
                                </div>
                                <div className="finding-item">
                                    <span className="finding-label">Est. Type</span>
                                    <span className="finding-value">{data.type}</span>
                                </div>
                                <div className="finding-item">
                                    <span className="finding-label">Severity</span>
                                    <span className="finding-value">{data.severity}</span>
                                </div>
                                <div className="finding-item">
                                    <span className="finding-label">Approx. Size</span>
                                    <span className="finding-value">{data.tumorSize || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <Button className="action-btn primary-btn w-100 mb-3">
                                    <Download className="me-2" /> Download Full Report
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    className="action-btn secondary-btn w-100"
                                    onClick={() => window.location.reload()}
                                >
                                    <ArrowCounterclockwise className="me-2" /> Upload New Scan
                                </Button>
                            </div>

                            <div className="disclaimer-box">
                                <Activity className="disclaimer-icon" />
                                <p>
                                    <strong>Note:</strong> This analysis is generated by AI and should be reviewed by a certified radiologist.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ResultsSection;
