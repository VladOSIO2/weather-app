import Link from 'next/link';
import { WtLinkButtonProps } from './WtLinkButton.types';

const WtLinkButton = ({
  href,
  children,
  className = '',
  onClick,
}: WtLinkButtonProps) => {
  return (
    <Link
      href={href}
      className={
        'rounded-xl bg-blue-500 px-4 py-2 font-bold text-white duration-200 hover:bg-blue-600 active:bg-blue-700 ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default WtLinkButton;
