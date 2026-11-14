import React, { useState } from 'react';

interface TerminalProps {
  title?: string;
  onAuthenticate?: () => Promise<void>;
}

export default function Terminal({ title = "Matrix of Conscience", onAuthenticate }: TerminalProps) {
  const [status, setStatus] = useState<string>("Awaiting connection... Please authenticate to access the grid.");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setStatus("Establishing secure connection...");
    try {
      if (onAuthenticate) {
        await onAuthenticate();
      }
      setStatus("Access Granted. Welcome back, Operative.");
    } catch (error: any) {
      setStatus(`Authentication Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-matrix-dark text-matrix font-mono flex justify-center items-center p-4 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px]">
      <div className="bg-matrix-surface border border-matrix p-8 rounded shadow-[0_0_20px_rgba(0,255,65,0.2)] text-center max-w-lg w-full">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">{title}</h1>
        <p className="text-sm text-gray-300 mb-6">{status}</p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-transparent border-2 border-matrix text-matrix px-6 py-3 font-mono uppercase tracking-wider hover:bg-matrix hover:text-matrix-dark transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Initialize Authorization"}
        </button>
      </div>
    </div>
  );
}
