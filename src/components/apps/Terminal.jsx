import React, { useState, useRef, useEffect } from 'react';
import { COMMANDS, INITIAL_MESSAGE } from '../../data/commands';
import { useGemini } from '../../hooks/useGemini';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const { callGeminiAPI } = useGemini();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const rawInput = input;
      const cmd = rawInput.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: rawInput }];

      setInput('');
      setHistory(newHistory);

      if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'resume') {
        setHistory(prev => [...prev, { type: 'output', content: COMMANDS.resume }]);
        window.open('/assests/cv/Sahan_Intern SE.pdf', '_blank');
      } else if (cmd.startsWith('ai ')) {
        const prompt = rawInput.slice(3).trim();
        if (!prompt) {
          setHistory(prev => [...prev, { type: 'output', content: 'Usage: ai "your question here"' }]);
          return;
        }
        setHistory(prev => [...prev, { type: 'output', content: '✨ Thinking...' }]);

        try {
          const result = await callGeminiAPI(prompt);
          setHistory(prev => [
            ...prev.slice(0, -1),
            { type: 'output', content: `[AI] ${result}` }
          ]);
        } catch (err) {
          setHistory(prev => [
            ...prev.slice(0, -1),
            { type: 'output', content: "[AI] Error contacting AI. Please try again." }
          ]);
        }
      } else if (COMMANDS[cmd]) {
        setHistory(prev => [...prev, { type: 'output', content: COMMANDS[cmd] }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', content: `command not found: ${cmd.split(' ')[0]}` }]);
      }
    }
  };

  return (
    <div className="h-full bg-black/90 p-4 font-mono text-sm text-green-400 overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="mb-1 break-words whitespace-pre-wrap">
          {line.type === 'input' ? (
            <span className="text-white flex">
              <span className="text-blue-400 mr-2">sahan@portfolio ~ %</span> {line.content}
            </span>
          ) : (
            <span className="opacity-80">{line.content}</span>
          )}
        </div>
      ))}
      <div className="flex">
        <span className="text-blue-400 mr-2">sahan@portfolio ~ %</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent border-none outline-none text-white"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;

