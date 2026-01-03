import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import logo from "../Assets/logo.png";

export default function Chatbot({ prediction = "Unknown", confidence = 0 }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm the NeuroScan AI Assistant. I can help answer questions about brain tumors and medical imaging. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(null); // Will be set on first open
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatWindowRef = useRef(null);

  // Set initial position when chat opens
  useEffect(() => {
    if (open && position === null) {
      // Calculate position to appear above the button (bottom-right)
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const chatWidth = 360;
      const chatHeight = 480;

      setPosition({
        x: windowWidth - chatWidth - 24, // 24px from right
        y: windowHeight - chatHeight - 100 // 100px from bottom (above button)
      });
    }
  }, [open, position]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when diagnosis is detected
  const [hasNotifiedDiagnosis, setHasNotifiedDiagnosis] = useState(false);

  useEffect(() => {
    if (prediction !== "Unknown" && !hasNotifiedDiagnosis) {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: `I see your analysis is ready! You have been diagnosed with ${prediction} (${(confidence * 100).toFixed(1)}% confidence). Would you like me to explain what this means or answer any questions?`
        }
      ]);
      setHasNotifiedDiagnosis(true);
    }
  }, [prediction, confidence, hasNotifiedDiagnosis]);

  // Handle mouse down on header to start dragging
  const handleMouseDown = (e) => {
    if (!chatWindowRef.current) return;

    const rect = chatWindowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  // Handle mouse move while dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const chatWidth = 360;
      const chatHeight = 480;

      // Calculate new position
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Constrain to window boundaries
      newX = Math.max(0, Math.min(newX, windowWidth - chatWidth));
      newY = Math.max(0, Math.min(newY, windowHeight - chatHeight));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentInput,
          prediction: prediction,
          confidence: confidence,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer || "I'm sorry, I couldn't generate a response." },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm sorry, I'm having trouble connecting to the server. Please make sure the backend is running on http://localhost:8000"
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        <img src={logo} alt="Chatbot" />
      </button>

      {open && position && (
        <div
          ref={chatWindowRef}
          className="chatbot-window"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            right: 'auto',
            bottom: 'auto',
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        >
          <div
            className="chatbot-header"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <span>NeuroScan AI Assistant</span>
            <span className="drag-hint"> Drag to move</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}

            {isLoading && (
              <div className="msg bot">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about brain tumors..."
              disabled={isLoading}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}