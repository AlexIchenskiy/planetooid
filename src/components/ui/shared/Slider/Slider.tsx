import './Slider.scss';

interface ISliderProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function Slider({
  id,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  disabled = false,
}: ISliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider">
      <input
        id={id}
        className="slider-track"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${percent}%` } as React.CSSProperties}
      />
      <span className="slider-value">{value}</span>
    </div>
  );
}