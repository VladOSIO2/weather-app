import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface WtButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  children: ReactNode;
}
