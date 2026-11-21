import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AnalyzePage from './pages/Analyze';
import ResultsPage from './pages/Results';
import HistoryPage from './pages/History';
import SkillsExplorer from './pages/SkillsExplorer';
import FairnessAudit from './pages/FairnessAudit';
import AboutModel from './pages/AboutModel';
import AuthPage from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing & Marketing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Protected App Workspace Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/skills" element={<SkillsExplorer />} />
          <Route path="/fairness" element={<FairnessAudit />} />
          <Route path="/about" element={<AboutModel />} />
          <Route path="/settings" element={<AboutModel />} />
          <Route path="/help" element={<AboutModel />} />
        </Route>
      </Routes>
    </Router>
  );
}
