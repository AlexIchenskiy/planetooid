import { createRoot } from 'react-dom/client';

import App from './App';

import './styles/_typography.scss';
import './styles/_variables.scss';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <App />
);
