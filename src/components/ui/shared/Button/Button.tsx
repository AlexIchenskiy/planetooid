import type { ReactNode } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      className={[
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn--full' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
    </button>
  );
}