import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface WtButtonProps {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
