import { WtButtonProps } from './WtButton.types';

const WtButton = ({
  type = 'button',
  className = '',
  children,
  onClick,
  disabled,
}: WtButtonProps) => {
  return (
    <button
      type={type}
      className={
        'rounded-xl bg-blue-500 p-2 font-bold text-white duration-200 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 ' +
        className
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default WtButton;
