import './MenuIcon.scss';

interface IMenuIconProps {
  open: boolean;
  onClick: () => void;
}

export default function MenuIcon({ open, onClick }: IMenuIconProps) {
  return (
    <button
      className={`menu-icon ${open ? 'menu-icon-open' : ''}`}
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
    >
      <span className="menu-icon-bar menu-icon-bar-top" />
      <span className="menu-icon-bar menu-icon-bar-mid" />
      <span className="menu-icon-bar menu-icon-bar-bot" />
    </button>
  );
}