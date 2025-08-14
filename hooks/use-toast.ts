import { useCallback } from 'react';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast({ title, description, variant = 'default' }: ToastOptions) {
  const message = description ? `${title}: ${description}` : title;
  
  if (variant === 'destructive') {
    console.error(message);
    alert(`Error: ${message}`);
  } else {
    console.log(message);
    alert(message);
  }
}

export function useToast() {
  return { toast };
}