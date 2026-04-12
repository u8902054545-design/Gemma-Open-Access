import React, { useState } from 'react';
import { GemmaIcon } from './GemmaIcon';
import { GoogleIcon } from './GoogleIcon';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await onLoginSuccess();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black font-sans text-white p-4">
      <style>{`
        .google-spinner {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          position: absolute;
          background: conic-gradient(#4285f4, #ea4335, #fbbc05, #34a853, #4285f4);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff 100%);
          mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff 100%);
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes animated-gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: animated-gradient-slow 8s ease infinite;
          background-image: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4);
        }
        .input-glow {
          box-shadow: 0 -8px 20px -10px rgba(66, 133, 244, 0.3), 0 -15px 40px -20px rgba(52, 168, 83, 0.2);
        }
        .text-gradient {
          background-size: 200% 200%;
          animation: animated-gradient-slow 8s ease infinite;
          background-image: linear-gradient(90deg, #4285F4, #FBBC05, #34A853);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] animate-gradient opacity-10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="relative w-full max-w-[400px] bg-[#121212] rounded-[32px] p-8 flex flex-col items-center border border-white/5 input-glow z-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-gradient text-center">
          Gemma Open Access
        </h1>
        <p className="text-[#a0a0a0] text-sm mb-10 text-center font-medium">
          Sign in to access your premium workspace
        </p>

        <div className="w-32 h-32 mb-12 flex items-center justify-center bg-white/5 rounded-[32px] border border-white/10 shadow-inner">
          <GemmaIcon className="w-20 h-20" />
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full relative flex items-center justify-center gap-3 bg-white text-black rounded-full py-4 px-6 text-[15px] font-semibold transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] disabled:opacity-80"
        >
          {isLoading ? (
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="google-spinner"></div>
            </div>
          ) : (
            <>
              <GoogleIcon className="text-[22px]" />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-[#666666] text-xs mt-6 text-center max-w-[280px]">
          By continuing, you agree to the Gemma Open Access Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
