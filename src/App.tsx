import Header from '@ui/Header/Header';
import CanvasContainer from '@/components/3d/CanvasContainer';
import DesktopSidebar from '@/components/ui/DesktopSidebar/DesktopSidebar';
import MobileControls from '@/components/ui/MobileControls/MobileControls';

import './styles/layout.scss';

function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <DesktopSidebar />
        <CanvasContainer />
      </main>

      <MobileControls />
    </div>
  );
}

export default App;
