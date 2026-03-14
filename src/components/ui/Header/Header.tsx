import Logo from '@ui/Logo/Logo';

import './header.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Header() {
  return (
    <header className='header'>
      <Logo />
      <div className='header-actions'>
        <ThemeSwitcher />
      </div>
    </header>
  );
}