import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{ background: '#F8F8F4' }}>
      <Sidebar />
      <Topbar />
      <main
        className="min-h-screen"
        style={{ marginLeft: '224px', marginTop: '56px', padding: '28px 32px' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
