import { WtButtonProps } from './WtButton.types';

const WtButton = ({ type = 'button', className, children }: WtButtonProps) => {
  return (
    <button
      type={type}
      className={
        'rounded-xl bg-blue-500 p-2 font-bold text-white hover:bg-blue-600 active:bg-blue-700 ' +
        className
      }
    >
      {children}
    </button>
  );
};

export default WtButton;
