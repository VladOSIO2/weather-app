import React from 'react';

export type WtLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
