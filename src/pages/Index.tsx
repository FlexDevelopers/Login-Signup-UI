
import React, { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Logo from '@/components/Logo';
import AuthForm from '@/components/AuthForm';

const Index: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [isChanging, setIsChanging] = useState(false);
  
  const toggleFormType = () => {
    setIsChanging(true);
    
    // Wait for the exit animation to complete with a smoother transition
    setTimeout(() => {
      setFormType(formType === 'login' ? 'signup' : 'login');
      setIsChanging(false);
    }, 400);
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        {/* Logo */}
        <Logo className="mb-8" />
        
        {/* Auth form container with transition */}
        <div className="w-full max-w-md">
          <div className={isChanging ? 'animate-fade-out' : 'animate-fade-in transition-all duration-500'}>
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-xl">
              <AuthForm 
                type={formType}
                onSwitchForm={toggleFormType}
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>© 2025 Devflex™️. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
