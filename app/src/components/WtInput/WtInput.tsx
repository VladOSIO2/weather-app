import { useMemo } from 'react';
import { WtInputProps } from './WtInput.types';

const WtInput = ({ id, type = 'text', label, name }: WtInputProps) => {
  const renderLabel = useMemo(
    () => label && <label htmlFor={id}>{label}</label>,
    [label, id],
  );

  return (
    <div className="flex flex-col">
      {renderLabel}
      <input
        id={id}
        type={type}
        className="rounded-md border-2 border-gray-300 p-2"
        name={name}
      />
    </div>
  );
};

export default WtInput;
