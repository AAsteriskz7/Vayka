'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ChatMessage {
  id?: string;
  role: 'ai' | 'user';
  content: string;
  sources?: string[];
}

function FormatCitations({ text }: { text: string }) {
  const parts = text.split(/(\[Source\s+\d+(?:\s*,\s*Source\s+\d+)*\])/gi);
  return (
    <>
      {parts.map((part, i) =>
        /^\[Source/i.test(part) ? (
          <span key={i} className="inline px-1 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function FormattedText({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;
        const lines = trimmed.split('\n');
        const isList = lines.length > 1 && lines.every(l => /^\s*[-*•]\s|^\s*\d+[.)]\s/.test(l));
        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1 pl-1">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex gap-1.5 items-start">
                  <span className="text-primary mt-1 text-[5px]">●</span>
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

export default function FloatingChatButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: 'Hi! Ask me anything about travel.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (pathname?.startsWith('/admin')) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function sendMessage(msg: string) {
    if (!msg.trim() || isLoading) return;
    const placeholderId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: msg },
      { role: 'ai', content: '...', id: placeholderId },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      const response = data.response || data.error || 'No response.';
      const sources: string[] = data.sources || [];
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderId ? { ...m, content: response, sources } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderId ? { ...m, content: 'Network error. Try again.' } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-[88px] md:bottom-24 right-4 md:right-12 z-50 w-[calc(100vw-2rem)] md:w-[420px] max-h-[70vh] bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-variant/30 flex flex-col overflow-hidden animate-in">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-primary text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <div>
                <p className="font-bold text-sm">Vayka AI</p>
                <p className="text-[10px] opacity-70">Travel Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={feedRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[50vh]">
            {messages.map((msg, i) =>
              msg.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <div className="bg-primary text-white px-4 py-2.5 rounded-xl rounded-tr-none max-w-[80%] text-sm">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded-xl rounded-tl-none max-w-[85%] text-sm text-on-surface leading-relaxed">
                    {msg.content === '...' ? (
                      <span className="text-secondary italic text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                        Thinking...
                      </span>
                    ) : (
                      <FormattedText text={msg.content} />
                    )}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-surface-variant/40 flex flex-wrap gap-1">
                        {msg.sources.map((src, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-surface-container-high rounded-full text-[10px] text-secondary truncate max-w-[140px]" title={src}>
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex items-center gap-2 p-3 border-t border-surface-variant/30"
          >
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-surface-container border-none rounded-full px-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Ask about destinations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-base">arrow_upward</span>
            </button>
          </form>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-[88px] md:bottom-12 right-6 md:right-12 z-50 w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/30"
      >
        <span className="material-symbols-outlined text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {open ? 'close' : 'auto_awesome'}
        </span>
      </button>
    </>
  );
}
