import InfinityIcon from './InfinityIcon';
import './logo.scss';

export default function Logo() {
  return (
    <div className='logo' role='img' aria-label='planetooid'>
      <span className='logo-text'>planet</span>
      <InfinityIcon className='logo-infinity' />
      <span className='logo-text'>id</span>
    </div>
  );
}