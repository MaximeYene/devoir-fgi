import * as React from "react";

import { cn } from "@/lib/utils";

// Exemple d'interface Input modifiée
export interface InputProps {
  type?: string; // Par exemple, vous pouvez définir les types possibles
  accept?: string; // Acceptation des types de fichiers
  className?: string; // Pour le style
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Pour gérer le changement de fichier
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
