
"use client";
import { useState, useRef, useEffect } from "react";
import Footer from '../../components/Footer';

const SUGGESTED_PROMPTS = [
  "Is Brussels far from where I am?",
  "Best chocolate in Ghent?",
  "Train schedules"
];


async function fetchAIResponse(question: string): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });
    const data = await res.json();
    if (data.response) return data.response;
    if (data.error) return `Error: ${data.error}`;
    return "Sorry, I didn't get a response.";
  } catch (e) {
    return "Network error. Please try again.";
  }
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! Ask me anything about your Belgian adventure." }
  ]);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new message
  const chatFeedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [messages]);


  async function sendMessage(msg: string) {
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: msg },
      { role: "ai", content: "..." }
    ]);
    setInput("");
    textareaRef.current?.focus();
    const aiResponse = await fetchAIResponse(msg);
    setMessages((prev) => {
      // Replace the last "..." AI message with the real response
      const last = [...prev];
      for (let i = last.length - 1; i >= 0; i--) {
        if (last[i].role === "ai" && last[i].content === "...") {
          last[i] = { role: "ai", content: aiResponse };
          break;
        }
      }
      return last;
    });
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <main className="flex-1 pt-24 pb-32 md:pb-8 px-4 md:px-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-80px)]">
        {/* Left Column: Chat Window */}
        <section className="lg:col-span-7 flex flex-col h-full gap-6">
          <div className="flex-1 flex flex-col bg-surface-container-low rounded-xl overflow-hidden relative p-6 md:p-8">
            {/* Chat Feed */}
            <div ref={chatFeedRef} className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex gap-4 items-start flex-row-reverse ml-auto max-w-[85%]">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtSwqVoNL_yG94KukW87DxFyTWJ_yjobc1hhneQYx4hURXG5szHNhbD8lnZITjGBubfJ-233lUf2oLBgpPkFmQBHr9C0yQ2lIWTat9zQ-rggOs02iswRQz0bsC-1gdXq9Y-Tmn_fDn3tOJAd-tXrG8uzDQrSntdSOrKCUY_gsOpR4z_Oke3WDDzpTkeChiFSG76VmA0szcSviY71zISZzTa3FPCMKWMK7VceXywuDpxQyqGQUSDkC5zZ4W-eFiyMuAE2iUIH0d3yEu" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-primary text-white p-5 rounded-xl rounded-tr-none shadow-md">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-4 items-start max-w-[85%]">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-surface-container-lowest p-6 rounded-xl rounded-tl-none shadow-sm text-on-surface leading-relaxed">
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input Area */}
            <div className="mt-6 space-y-4">
              {/* Suggested Prompts */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    className="shrink-0 px-4 py-2 bg-white text-on-surface text-sm font-medium rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Main Input */}
              <form className="relative group" onSubmit={handleSend}>
                <textarea
                  ref={textareaRef}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-5 pr-16 focus:ring-2 focus:ring-surface-tint/20 min-h-[80px] resize-none text-on-surface placeholder:text-stone-400"
                  placeholder="Ask anything about your Belgian adventure..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                />
                <button
                  type="submit"
                  className="absolute right-4 bottom-4 w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                  aria-label="Send"
                >
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ...existing code for the right column and styles... */}
        <aside className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* ...existing code... */}
        </aside>
      </main>
      {/* ...existing code for styles... */}
    </>
  );
}
