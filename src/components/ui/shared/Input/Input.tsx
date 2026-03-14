import './input.scss';

type InputType = 'text' | 'number';

interface InputProps {
  id?: string;
  type?: InputType;
  value: string | number;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function Input({
  id,
  type = 'text',
  value,
  onChange,
  min,
  max,
  placeholder,
  disabled = false,
}: InputProps) {
  return (
    <input
      id={id}
      className='input'
      type={type}
      value={value}
      min={min}
      max={max}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) =>
        onChange(type === 'number' ? Number(e.target.value) : e.target.value)
      }
    />
  );
}