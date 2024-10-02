/* eslint-disable react/display-name */
// components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // Vous pouvez ajouter d'autres props spécifiques si nécessaire
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} {...props} />;
});

// N'oubliez pas d'ajouter le forwardRef si vous utilisez des refs
