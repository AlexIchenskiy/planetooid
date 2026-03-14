import { useSettingsStore } from '@/store/useSettingsStore';
import './SettingsPanel.scss';
import Button from '../shared/Button/Button';
import { Dices, Globe, RefreshCcw } from 'lucide-react';
import Input from '../shared/Input/Input';
import type { IOption } from '../shared/OptionList/OptionList';
import type { INoiseVariant } from '@/components/3d/utils/noise';
import OptionList from '../shared/OptionList/OptionList';

const noiseOptions: IOption<INoiseVariant>[] = [
  { value: 'fbm', label: 'fBm', description: 'Natural terrain' },
  { value: 'ridged', label: 'Ridged', description: 'Sharp mountain ridges' },
  { value: 'terraced', label: 'Terraced', description: 'Stepped elevation' },
  { value: 'domainWarp', label: 'Domain Warp', description: 'Twisted continents' },
];

export default function SettingsPanel() {
  const { seed, variant, setVariant, setSeed, randomizeSeed, generate } = useSettingsStore();

  return (
    <div className="settings-panel">
      <section className="settings-panel-section">
        <div className="settings-panel-section-title">
          <Globe size={18} />
          <h3 className="settings-panel-section-title-text fancy">World</h3>
        </div>

        <div className='settings-panel-form'>
          <Input
            id="seed-input"
            type="number"
            value={seed}
            onChange={(v) => setSeed(v as number)}
            min={0}
            max={99999}
          />
          <Button onClick={randomizeSeed} variant="outline" size="sm" icon={<Dices size={14} />} ariaLabel="Randomize seed">
            Randomize
          </Button>
        </div>

        <OptionList label='Noise type' options={noiseOptions} value={variant} onChange={setVariant} />
      </section>

      <Button onClick={generate} icon={<RefreshCcw size={16} strokeWidth={3} />} fullWidth>
        Generate Planet
      </Button>
    </div>
  );
}