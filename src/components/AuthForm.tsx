
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import InputField from './InputField';
import { toast } from "@/components/ui/sonner";
import { Loader, CircleCheck } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSwitchForm: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const message = type === 'login' ? 'Welcome Back!' : 'Join Us Today!';
    setWelcomeMessage(message);
    
    // Show welcome message with a slight delay
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'signup' && password !== confirmPassword) {
      toast("Passwords don't match", {
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Reset success state after showing success animation
      setTimeout(() => {
        setSuccess(false);
        toast(type === 'login' ? "Login successful!" : "Account created successfully!", {
          description: type === 'login' 
            ? "Welcome back to the application." 
            : "Your account has been created. Welcome!",
        });
      }, 1500);
    }, 1500);
  };

  const isSignup = type === 'signup';
  const buttonText = isSignup ? 'Sign Up' : 'Login';
  const switchText = isSignup 
    ? 'Already have an account? Login' 
    : "Don't have an account? Sign up";

  return (
    <div className="w-full max-w-md animate-scale-up">
      {/* Welcome message */}
      <div className={`text-center mb-6 ${showWelcome ? 'animate-fade-in' : 'opacity-0'}`}>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          {welcomeMessage}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <InputField
            id="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        
        <InputField
          id="email"
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete={isSignup ? "off" : "email"}
          required
        />
        
        <InputField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
        />
        
        {isSignup && (
          <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        )}
        
        {!isSignup && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="w-4 h-4 accent-purple-500 cursor-pointer"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-white/80 cursor-pointer">
                Remember me
              </label>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="p-0 h-auto text-sm text-primary hover:text-primary/80 hover:bg-transparent"
            >
              Forgot password?
            </Button>
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isLoading || success}
          className={`w-full py-6 mt-4 transition-all duration-300 ease-out ${
            success 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="w-5 h-5 mr-2 animate-rotate-loader" />
              <span>Processing...</span>
            </div>
          ) : success ? (
            <div className="flex items-center justify-center">
              <CircleCheck className="w-5 h-5 mr-2" />
              <span>Success!</span>
            </div>
          ) : buttonText}
        </Button>
        
        <div className="mt-4 text-center">
          <Button
            type="button"
            variant="ghost"
            onClick={onSwitchForm}
            className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {switchText}
          </Button>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black/30 text-white/70 backdrop-blur-md">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                ></path>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                ></path>
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
