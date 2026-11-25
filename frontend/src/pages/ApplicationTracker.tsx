import { useState, useEffect } from 'react';
import {
  Bookmark, Plus, CheckCircle2, Building2, MapPin,
  Calendar, ExternalLink, Trash2, Edit2, Clock
} from 'lucide-react';
import { api } from '../api/client';
import type { JobApplication } from '../types';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

const STATUSES: JobApplication['current_status'][] = [
  'Saved',
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected'
];

export default function ApplicationTracker() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    company: '',
    role: '',
    location: '',
    job_url: '',
    current_status: 'Applied' as JobApplication['current_status'],
    notes: '',
    interview_date: '',
    salary_expectation: ''
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getApplications();
        setApps(data);
      } catch {
        // High quality mock applications pipeline
        setApps([
          {
            id: 'app-1',
            company: 'Infosys Applied AI',
            role: 'Junior ML Engineer',
            location: 'Bengaluru, India',
            job_url: 'https://careers.infosys.com',
            current_status: 'Interview',
            applied_date: '2026-11-18',
            interview_date: '2026-11-28',
            notes: 'Technical round scheduled on Google Meet. Reviewing PyTorch and system design questions.',
            salary_expectation: '₹10,50,000',
            updated_at: '2026-11-20'
          },
          {
            id: 'app-2',
            company: 'Accenture Tech',
            role: 'Data Analyst Graduate',
            location: 'Hyderabad, India',
            job_url: 'https://accenture.com',
            current_status: 'Applied',
            applied_date: '2026-11-22',
            notes: 'Application submitted on official career site. Tracking referral status.',
            salary_expectation: '₹8,00,000',
            updated_at: '2026-11-22'
          },
          {
            id: 'app-3',
            company: 'Tata Consultancy Services',
            role: 'AI/ML Intern',
            location: 'Remote, India',
            job_url: 'https://tcs.com',
            current_status: 'Assessment',
            applied_date: '2026-11-15',
            notes: 'Online coding assessment completed on 20th Nov. Waiting for shortlist results.',
            salary_expectation: '₹35,000/mo',
            updated_at: '2026-11-21'
          },
          {
            id: 'app-4',
            company: 'GreenLeaf Innovations',
            role: 'Python Backend Engineer',
            location: 'Berlin / Remote',
            job_url: 'https://arbeitnow.com',
            current_status: 'Saved',
            applied_date: '2026-11-23',
            notes: 'Saved from TalentLens Job Explorer. Need to complete Docker portfolio project before applying.',
            salary_expectation: '€60,000',
            updated_at: '2026-11-23'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, newStatus: JobApplication['current_status']) => {
    setApps(apps.map(a => a.id === id ? { ...a, current_status: newStatus } : a));
    try {
      await api.updateApplicationStatus(id, newStatus);
    } catch {}
  };

  const handleDelete = async (id: string) => {
    setApps(apps.filter(a => a.id !== id));
    try {
      await api.deleteApplication(id);
    } catch {}
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.role) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      company: form.company,
      role: form.role,
      location: form.location || 'Remote',
      job_url: form.job_url || '#',
      current_status: form.current_status,
      applied_date: new Date().toISOString().split('T')[0],
      interview_date: form.interview_date || undefined,
      notes: form.notes,
      salary_expectation: form.salary_expectation,
      updated_at: new Date().toISOString()
    };

    setApps([newApp, ...apps]);
    setShowAddModal(false);
    setForm({ company: '', role: '', location: '', job_url: '', current_status: 'Applied', notes: '', interview_date: '', salary_expectation: '' });

    try {
      await api.createApplication(newApp);
    } catch {}
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark size={20} style={{ color: '#155642' }} />
            <h1 className="text-2xl font-bold" style={{ color: '#202A26', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
              Application & Opportunity Tracker
            </h1>
          </div>
          <p style={{ color: '#727A75', fontSize: '14px' }}>
            Track every job application, scheduled interview, assessment deadline, and offer in your personal career pipeline.
          </p>
        </div>

        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <Plus size={13} /> Add Application
        </Button>
      </div>

      {/* Pipeline Summary Counters */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {STATUSES.map(st => {
          const count = apps.filter(a => a.current_status === st).length;
          return (
            <Card key={st} className="p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">{st}</div>
              <div className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {count}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {STATUSES.map(statusCol => {
          const colApps = apps.filter(a => a.current_status === statusCol);
          return (
            <div
              key={statusCol}
              className="p-3 rounded-2xl border min-h-96 flex flex-col gap-2.5"
              style={{ background: '#F8F8F4', borderColor: '#E5E8E6' }}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-800">{statusCol}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-gray-200 text-gray-700">
                  {colApps.length}
                </span>
              </div>

              {colApps.length === 0 ? (
                <div className="text-[11px] text-gray-400 text-center py-8">
                  No items
                </div>
              ) : (
                colApps.map(item => (
                  <Card key={item.id} className="p-3.5 space-y-2 bg-white">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="text-xs font-bold text-gray-900 leading-tight">
                          {item.role}
                        </div>
                        <div className="text-[11px] font-medium text-green-900">
                          {item.company}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-300 hover:text-red-600 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <MapPin size={10} /> {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={10} /> Applied: {item.applied_date}
                      </div>
                      {item.interview_date && (
                        <div className="flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 p-1 rounded">
                          <Clock size={10} /> Interview: {item.interview_date}
                        </div>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-[10px] text-gray-600 line-clamp-2 italic bg-gray-50 p-1.5 rounded">
                        "{item.notes}"
                      </p>
                    )}

                    {/* Change Status Dropdown */}
                    <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between">
                      <select
                        value={item.current_status}
                        onChange={e => handleStatusChange(item.id, e.target.value as JobApplication['current_status'])}
                        className="text-[10px] font-semibold bg-transparent border-none outline-none text-gray-600 cursor-pointer"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      {item.job_url && item.job_url !== '#' && (
                        <a
                          href={item.job_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-green-900 hover:underline flex items-center gap-0.5"
                        >
                          Link <ExternalLink size={9} />
                        </a>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <Card className="w-full max-w-md p-6 bg-white shadow-xl animate-scale-in">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Add Job Application</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. Infosys, TCS, Google"
                  className="w-full text-xs p-2 rounded-lg border outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Target Role *</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Machine Learning Engineer"
                  className="w-full text-xs p-2 rounded-lg border outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Remote"
                    className="w-full text-xs p-2 rounded-lg border outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Initial Status</label>
                  <select
                    value={form.current_status}
                    onChange={e => setForm({ ...form, current_status: e.target.value as JobApplication['current_status'] })}
                    className="w-full text-xs p-2 rounded-lg border outline-none bg-white"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Application URL</label>
                <input
                  type="url"
                  value={form.job_url}
                  onChange={e => setForm({ ...form, job_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-2 rounded-lg border outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Interview Date (if scheduled)</label>
                <input
                  type="date"
                  value={form.interview_date}
                  onChange={e => setForm({ ...form, interview_date: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Follow-up tasks, recruiter contact, referral notes..."
                  rows={2}
                  className="w-full text-xs p-2 rounded-lg border outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button size="sm" variant="ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
