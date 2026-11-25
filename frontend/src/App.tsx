import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CareerProfile from './pages/CareerProfile';
import AnalyzePage from './pages/Analyze';
import ResultsPage from './pages/Results';
import CareerDiscovery from './pages/CareerDiscovery';
import JobOpportunities from './pages/JobOpportunities';
import ApplicationTracker from './pages/ApplicationTracker';
import LearningRoadmap from './pages/LearningRoadmap';
import InterviewStudio from './pages/InterviewStudio';
import HistoryPage from './pages/History';
import SkillsExplorer from './pages/SkillsExplorer';
import FairnessAudit from './pages/FairnessAudit';
import AboutModel from './pages/AboutModel';
import AuthPage from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing & Authentication */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Authenticated Application Workspace with Persistent Sidebar */}
        <Route element={<AppLayout />}>
          {/* Overview */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<CareerProfile />} />

          {/* Career Intelligence */}
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/careers" element={<CareerDiscovery />} />
          <Route path="/history" element={<HistoryPage />} />

          {/* Opportunities */}
          <Route path="/jobs" element={<JobOpportunities />} />
          <Route path="/jobs/saved" element={<JobOpportunities />} />
          <Route path="/applications" element={<ApplicationTracker />} />

          {/* Growth Center */}
          <Route path="/learning" element={<LearningRoadmap />} />
          <Route path="/interview" element={<InterviewStudio />} />
          <Route path="/skills" element={<SkillsExplorer />} />

          {/* Trust & Transparency */}
          <Route path="/fairness" element={<FairnessAudit />} />
          <Route path="/about" element={<AboutModel />} />

          {/* Account */}
          <Route path="/settings" element={<CareerProfile />} />
          <Route path="/help" element={<AboutModel />} />
        </Route>
      </Routes>
    </Router>
  );
}
