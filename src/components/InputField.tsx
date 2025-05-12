
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  required = false,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mb-4 group">
      <label 
        htmlFor={id} 
        className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none ${
          isFocused || value ? 
            'text-xs -top-2 bg-black bg-opacity-50 px-1 text-primary rounded' : 
            'text-sm top-3 text-white/80'
        }`}
      >
        {label}{required ? ' *' : ''}
      </label>
      
      <Input
        id={id}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete={autoComplete}
        required={required}
        className={`bg-black/40 py-6 backdrop-blur-md border border-white/20 text-white placeholder-white/50 transition-all duration-300 ease-in-out ${
          isFocused ? 'shadow-[0_0_8px_rgba(139,92,246,0.5)] border-purple-400/50' : ''
        }`}
      />
      
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 transition-transform duration-300" />
          ) : (
            <Eye className="w-5 h-5 transition-transform duration-300" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
