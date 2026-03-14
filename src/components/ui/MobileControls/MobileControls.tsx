import { useMobileMenuStore } from '@/store/useMobileMenuStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import SettingsPanel from '@/components/ui/SettingsPanel/SettingsPanel';
import './MobileControls.scss';
import { Dices } from 'lucide-react';
import Button from '../shared/Button/Button';

const SlidersIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="5" r="2" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" />
    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="13" cy="10" r="2" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" />
    <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="15" r="2" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function MobileControls() {
  const { open, toggle, close } = useMobileMenuStore();
  const { randomizeAll } = useSettingsStore();

  return (
    <>
      {open && (
        <div
          className="mobile-backdrop"
          onClick={close}
        />
      )}

      <div className={`mobile-drawer ${open ? 'mobile-drawer-open' : ''}`}>
        <div className="mobile-drawer-handle" onClick={close} />
        <SettingsPanel />
      </div>

      <div className="mobile-bar">
        <Button onClick={randomizeAll} icon={<Dices size={14} />} fullWidth>
          Randomize
        </Button>
        <button
          className="mobile-bar-settings"
          onClick={toggle}
          aria-label="Open settings"
        >
          <SlidersIcon />
        </button>
      </div>
    </>
  );
}