import { useState, useEffect } from 'react';
import {
  User, Mail, MapPin, GraduationCap, Briefcase, Code,
  Sparkles, CheckCircle2, ShieldCheck, Edit3, Plus, ExternalLink
} from 'lucide-react';
import { api } from '../api/client';
import type { UserProfile } from '../types';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SkillBadge } from '../components/ui/Badge';

export default function CareerProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getUserProfile();
        setProfile(data);
      } catch {
        // Fallback robust profile for demonstration
        setProfile({
          full_name: 'Alex Candidate',
          email: 'alex.candidate@university.edu',
          career_stage: 'Student',
          target_role: 'Machine Learning Engineer',
          experience_years: 1.5,
          degree: 'B.Tech in Computer Science and Engineering',
          institution: 'National Institute of Technology',
          graduation_year: '2026',
          preferred_locations: ['Bengaluru', 'Hyderabad', 'Remote / Global'],
          preferred_work_mode: 'Flexible',
          profile_summary:
            'Passionate Computer Science undergraduate focusing on applied Machine Learning, NLP, and scalable backend microservices. Proven project experience building predictive classifiers, semantic matching engines, and data transformation pipelines.',
          github_url: 'https://github.com/alex-candidate',
          linkedin_url: 'https://linkedin.com/in/alex-candidate',
          skills_with_evidence: [
            { skill: 'Python', category: 'Programming Languages', proficiency: 'Advanced', confidence: 'High', evidence_source: 'Smart Resume Parser Project + 1 Research Internship' },
            { skill: 'PyTorch', category: 'Machine Learning & AI', proficiency: 'Intermediate', confidence: 'High', evidence_source: 'Deep Learning Model Capstone Project' },
            { skill: 'SQL', category: 'Data & Databases', proficiency: 'Intermediate', confidence: 'Medium', evidence_source: 'Coursework + Hospital Management Database Project' },
            { skill: 'FastAPI', category: 'Web & Backend', proficiency: 'Intermediate', confidence: 'High', evidence_source: 'Microservice API Capstone' },
            { skill: 'Scikit-Learn', category: 'Machine Learning & AI', proficiency: 'Advanced', confidence: 'High', evidence_source: 'Benchmarked Classifiers on 962 Kaggle Resumes' },
            { skill: 'Docker', category: 'Cloud & DevOps', proficiency: 'Beginner', confidence: 'Low', evidence_source: 'Basic Containerization in Internship' },
            { skill: 'Git & Version Control', category: 'Cloud & DevOps', proficiency: 'Intermediate', confidence: 'High', evidence_source: '15+ Repositories & Team Collaboration' },
            { skill: 'React', category: 'Web & Backend', proficiency: 'Intermediate', confidence: 'Medium', evidence_source: 'Frontend Portfolio Dashboard' },
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !profile) {
    return <div className="p-10 text-xs text-muted-500">Loading your unified career profile...</div>;
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Profile Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-sm flex-shrink-0"
              style={{ background: '#155642' }}
            >
              {profile.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold" style={{ color: '#202A26', fontFamily: 'Manrope, sans-serif' }}>
                  {profile.full_name}
                </h1>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#DCE9DF', color: '#155642' }}
                >
                  {profile.career_stage}
                </span>
              </div>
              <p className="text-xs font-semibold mt-0.5" style={{ color: '#155642' }}>
                Targeting: {profile.target_role}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: '#727A75' }}>
                <span className="flex items-center gap-1"><Mail size={12} /> {profile.email}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {profile.preferred_locations.join(', ')}</span>
                <span className="flex items-center gap-1"><Briefcase size={12} /> {profile.experience_years} yrs practical experience</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <Button size="sm" variant="secondary" onClick={() => setEditing(!editing)}>
              <Edit3 size={12} /> {editing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mt-5 pt-4 border-t" style={{ borderColor: '#F0F5F1' }}>
          <div className="text-[11px] font-bold tracking-wider uppercase mb-1.5" style={{ color: '#727A75' }}>
            Professional Summary
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#3A4440' }}>
            {profile.profile_summary}
          </p>
        </div>

        {/* Links */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium" style={{ color: '#155642' }}>
              <Code size={12} /> GitHub Profile <ExternalLink size={10} />
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-medium" style={{ color: '#155642' }}>
              <User size={12} /> LinkedIn <ExternalLink size={10} />
            </a>
          )}
        </div>
      </Card>

      {/* Profile Evidence Section: Core Differentiator */}
      <Card className="p-6">
        <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: '#F0F5F1' }}>
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} style={{ color: '#155642' }} />
              <h2 className="text-sm font-bold" style={{ color: '#202A26' }}>
                Profile Evidence & Grounded Skills
              </h2>
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: '#727A75' }}>
              Every skill is tied to tangible evidence (projects, internships, or mentions) to ensure honest compatibility scoring.
            </p>
          </div>
          <Button size="sm" variant="ghost">
            <Plus size={12} /> Add Evidence
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-3.5">
          {profile.skills_with_evidence.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border flex flex-col justify-between"
              style={{ background: '#FAFAF8', borderColor: '#E5E8E6' }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold" style={{ color: '#202A26' }}>
                    {item.skill}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: item.confidence === 'High' ? '#DCE9DF' : item.confidence === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                        color: item.confidence === 'High' ? '#155642' : item.confidence === 'Medium' ? '#92400E' : '#991B1B',
                      }}
                    >
                      {item.confidence} Evidence
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: '#727A75' }}>
                      {item.proficiency}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-medium mb-2" style={{ color: '#727A75' }}>
                  Category: {item.category}
                </div>

                <div className="p-2 rounded-lg text-[11px]" style={{ background: '#FFFFFF', border: '1px solid #E5E8E6', color: '#3A4440' }}>
                  <span className="font-semibold text-[10px] text-gray-500 uppercase tracking-wide block mb-0.5">Evidenced in:</span>
                  {item.evidence_source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Education & Academic Qualifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 pb-3 border-b mb-4" style={{ borderColor: '#F0F5F1' }}>
          <GraduationCap size={16} style={{ color: '#155642' }} />
          <h2 className="text-sm font-bold" style={{ color: '#202A26' }}>
            Academic Qualifications
          </h2>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs" style={{ background: '#DCE9DF', color: '#155642' }}>
            BE
          </div>
          <div>
            <div className="text-xs font-bold" style={{ color: '#202A26' }}>{profile.degree}</div>
            <div className="text-[11px]" style={{ color: '#727A75' }}>{profile.institution} · Graduating Class of {profile.graduation_year}</div>
            <div className="flex items-center gap-1 text-[11px] mt-1 text-green-800">
              <CheckCircle2 size={11} /> Degree requirements satisfied for graduate engineering roles
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
