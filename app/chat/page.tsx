"use client";
import { useState, useRef, useEffect } from "react";
import Footer from '../../components/Footer';

const SUGGESTED_PROMPTS = [
  "Tell me about Tokyo",
  "Recommend a budget-friendly European destination",
  "Plan me a 3-day trip to Kyoto"
];

interface ChatMessage {
  id?: string;
  role: "ai" | "user";
  content: string;
  sources?: string[];
}

async function fetchAIResponse(question: string): Promise<{ response: string, sources: string[] }> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });
    const data = await res.json();
    if (data.response) return { response: data.response, sources: data.sources || [] };
    if (data.error) return { response: `Error: ${data.error}`, sources: [] };
    return { response: "Sorry, I didn't get a response.", sources: [] };
  } catch {
    return { response: "Network error. Please try again.", sources: [] };
  }
}

function FormattedResponse({ text }: { text: string }) {
  // Split into paragraphs on double newlines, then handle single newlines as line breaks
  const paragraphs = text.split(/\n{2,}/);

  return (
    <div className="space-y-3">
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Check if this paragraph is a list (lines starting with - or * or numbered)
        const lines = trimmed.split('\n');
        const isList = lines.length > 1 && lines.every(l => /^\s*[-*•]\s|^\s*\d+[.)]\s/.test(l));

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1.5 pl-1">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex gap-2 items-start">
                  <span className="text-primary mt-1.5 text-[6px]">●</span>
                  <span><FormatCitations text={line.replace(/^\s*[-*•]\s*|^\s*\d+[.)]\s*/, '')} /></span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={pIdx}>
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {lIdx > 0 && <br />}
                <FormatCitations text={line} />
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function FormatCitations({ text }: { text: string }) {
  // Highlight [Source N] or [Source N, Source M] patterns
  const parts = text.split(/(\[Source\s+\d+(?:\s*,\s*Source\s+\d+)*\])/gi);
  return (
    <>
      {parts.map((part, i) =>
        /^\[Source/i.test(part) ? (
          <span key={i} className="inline-flex items-center px-1.5 py-0.5 mx-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-md align-baseline">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", content: "Hi! Ask me anything about your travel records." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(msg: string) {
    if (!msg.trim() || isLoading) return;
    const placeholderId = Date.now().toString() + Math.random().toString();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: msg },
      { role: "ai", content: "Thinking...", id: placeholderId }
    ]);
    setInput("");
    setIsLoading(true);
    textareaRef.current?.focus();
    const result = await fetchAIResponse(msg);
    setMessages((prev) =>
      prev.map(m =>
        m.id === placeholderId ? { ...m, content: result.response, sources: result.sources } : m
      )
    );
    setIsLoading(false);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <main className="flex-1 pt-24 pb-32 md:pb-8 px-4 md:px-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-80px)]">
        <section className="lg:col-span-7 flex flex-col h-full gap-6">
          <div className="flex-1 flex flex-col bg-surface-container-low rounded-xl overflow-hidden relative p-6 md:p-8">
            {/* Chat Feed */}
            <div ref={chatFeedRef} className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex gap-4 items-start flex-row-reverse ml-auto max-w-[85%]">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-secondary-container text-sm">person</span>
                    </div>
                    <div className="bg-primary text-white p-5 rounded-xl rounded-tr-none shadow-md">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-4 items-start max-w-[85%]">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                      <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    </div>
                    <div className="space-y-3 w-full">
                      <div className="bg-surface-container-lowest p-6 rounded-xl rounded-tl-none shadow-sm text-on-surface leading-relaxed">
                        {msg.content === "Thinking..." ? (
                          <div className="flex items-center gap-2 text-secondary">
                            <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                            <span className="text-sm italic">Thinking...</span>
                          </div>
                        ) : (
                          <FormattedResponse text={msg.content} />
                        )}

                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-surface-variant/50">
                            <p className="text-[10px] font-bold text-secondary mb-2 uppercase tracking-widest">Knowledge Base Sources</p>
                            <div className="flex flex-wrap gap-2">
                              {msg.sources.map((src, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-surface-container rounded-full text-xs text-secondary font-medium border border-outline-variant/20 truncate max-w-[200px]" title={src}>
                                  {src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input Area */}
            <div className="mt-6 space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    disabled={isLoading}
                    className="shrink-0 px-4 py-2 bg-white text-on-surface text-sm font-medium rounded-full border border-outline-variant/20 hover:bg-surface-container-high transition-colors disabled:opacity-50"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form className="relative group" onSubmit={handleSend}>
                <textarea
                  ref={textareaRef}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-5 pr-16 focus:ring-2 focus:ring-surface-tint/20 min-h-[80px] resize-none text-on-surface placeholder:text-stone-400"
                  placeholder="Ask anything about the travel records..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-4 bottom-4 w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  aria-label="Send"
                >
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        </aside>
      </main>
      <Footer />
    </>
  );
}
