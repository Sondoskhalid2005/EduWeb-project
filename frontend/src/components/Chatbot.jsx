import React, { useState } from "react";
import "../pages/style.css";
const faqs = {

  "What courses are available?": "We offer 15 programming courses including Web Dev, React, Python, AI, and more.",
  "How can I enroll?": "Go to the Courses page and click the Enroll button for any course.",
  "Can I track my progress?": "Yes! Your enrolled courses show progress in your Dashboard.",
  "Is there a free trial?": "Yes,all courses are free."
};
export default function Chatbot()  {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  
  const handleSend = () => {
    if (!input) return;
    const userMessage = { text: input, sender: "user" };
    let reply = faqs[input] || "Sorry, I don't understand your question.";
    const botMessage = { text: reply, sender: "bot" };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className={`chatbot-container ${visible ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setVisible(!visible)}>
        {visible ? "×" : "💬"}
      </button>

      {visible && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Ask a question..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};
