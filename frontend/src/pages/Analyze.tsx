import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2, AlertCircle, ChevronRight, Briefcase, MapPin, Clock } from 'lucide-react';
import { api } from '../api/client';
import type { ParsedResume } from '../types';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SkillBadge } from '../components/ui/Badge';

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'review' | 'job' | 'analyzing'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    employment_type: 'Full-time',
    experience_level: '',
    description: '',
  });

  // Dropzone
  const onDrop = useCallback((accepted: File[]) => {
    setError(null);
    if (!accepted.length) return;
    const f = accepted[0];
    if (f.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }
    setFile(f);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setError(null);
    setUploading(true);

    // Progress simulation for UX polish
    const interval = setInterval(() => {
      setUploadProgress(p => Math.min(p + 15, 85));
    }, 200);

    try {
      const result = await api.uploadResume(file);
      clearInterval(interval);
      setUploadProgress(100);
      setParsedResume(result);
      setTimeout(() => { setStep('review'); setUploading(false); }, 400);
    } catch (e: unknown) {
      clearInterval(interval);
      setUploadProgress(0);
      setUploading(false);
      setError(e instanceof Error ? e.message : 'Upload failed. Please try again.');
    }
  };

  const handleAnalyze = async () => {
    if (!parsedResume || !jobForm.description.trim() || !jobForm.title.trim()) return;
    setStep('analyzing');
    setError(null);
    try {
      const result = await api.analyze({
        resume_id: parsedResume.id,
        job: {
          title: jobForm.title,
          company: jobForm.company || undefined,
          location: jobForm.location || undefined,
          employment_type: jobForm.employment_type || undefined,
          experience_level: jobForm.experience_level || undefined,
          description: jobForm.description,
        },
      });
      navigate(`/results/${result.id}`, { state: { result } });
    } catch (e: unknown) {
      setStep('job');
      setError(e instanceof Error ? e.message : 'Analysis failed. Is the backend running?');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
          Resume Analysis Studio
        </h1>
        <p style={{ color: '#727A75', fontSize: '14px' }}>
          Upload your resume, describe the target role, and get your AI compatibility report.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['Upload Resume', 'Review Extraction', 'Job Description', 'Analyzing'].map((s, i) => {
          const steps = ['upload', 'review', 'job', 'analyzing'];
          const idx = steps.indexOf(step);
          const isActive = i === idx;
          const isDone = i < idx;
          return (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: isDone ? '#174C3C' : isActive ? '#DCE9DF' : '#F0F5F1',
                    color: isDone ? '#fff' : isActive ? '#174C3C' : '#9BA5A0',
                    border: isActive ? '1.5px solid #174C3C' : 'none',
                  }}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{ color: isActive ? '#174C3C' : '#9BA5A0' }}>
                  {s}
                </span>
              </div>
              {i < 3 && <ChevronRight size={12} style={{ color: '#E5E8E6', flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl mb-6" style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
          <AlertCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div className="text-sm font-medium" style={{ color: '#991B1B' }}>Error</div>
            <div className="text-sm mt-0.5" style={{ color: '#B91C1C' }}>{error}</div>
          </div>
          <button onClick={() => setError(null)} className="ml-auto" style={{ color: '#DC2626' }}><X size={14} /></button>
        </div>
      )}

      {/* STEP 1: Upload */}
      {step === 'upload' && (
        <div className="max-w-2xl">
          <Card className="p-6">
            <div
              {...getRootProps()}
              className="rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all"
              style={{
                borderColor: isDragActive ? '#174C3C' : '#E5E8E6',
                background: isDragActive ? '#F0F5F1' : '#FAFAF8',
              }}
            >
              <input {...getInputProps()} aria-label="Upload resume file" />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#DCE9DF' }}>
                <Upload size={24} style={{ color: '#174C3C' }} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#202723' }}>
                {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
              </p>
              <p className="text-xs mb-4" style={{ color: '#9BA5A0' }}>
                PDF or TXT files · Maximum 10MB
              </p>
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{ background: '#F0F5F1', color: '#727A75', border: '1px solid #E5E8E6' }}
              >
                or click to browse
              </span>
            </div>

            {file && (
              <div className="mt-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F0F5F1', border: '1px solid #DCE9DF' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#DCE9DF' }}>
                  <FileText size={16} style={{ color: '#174C3C' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: '#202723' }}>{file.name}</div>
                  <div className="text-xs" style={{ color: '#9BA5A0' }}>{(file.size / 1024).toFixed(0)} KB</div>
                </div>
                <button onClick={() => { setFile(null); setUploadProgress(0); }} style={{ color: '#9BA5A0' }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1" style={{ color: '#9BA5A0' }}>
                  <span>Parsing resume…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="rounded-full h-1.5 overflow-hidden" style={{ background: '#F0F5F1' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${uploadProgress}%`, background: '#174C3C' }}
                  />
                </div>
              </div>
            )}

            <div className="mt-5">
              <Button
                onClick={handleUpload}
                disabled={!file}
                loading={uploading}
                fullWidth
              >
                {uploading ? 'Parsing Resume…' : 'Parse & Extract Resume'}
              </Button>
            </div>

            <div className="mt-4 p-3 rounded-xl" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
              <p className="text-xs" style={{ color: '#9BA5A0', lineHeight: 1.65 }}>
                🔒 <strong style={{ color: '#727A75' }}>Privacy note:</strong> Your resume is processed in memory only during this session. 
                Personal identifiers (name, email, phone) are stripped before ML inference.
                No document is stored permanently without your explicit consent.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 2: Review Extraction */}
      {step === 'review' && parsedResume && (
        <div className="max-w-3xl">
          <Card>
            <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: '#F0F5F1' }}>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#202723' }}>Extracted Profile</h2>
                <p className="text-xs mt-0.5" style={{ color: '#9BA5A0' }}>
                  Review what was parsed from "{parsedResume.filename}"
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#DCE9DF', color: '#174C3C' }}>
                ✓ Parsed successfully
              </div>
            </div>
            <div className="p-6 space-y-5">
              {/* Candidate info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: '#174C3C' }}>
                  {parsedResume.candidate_name?.charAt(0) || 'C'}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#202723' }}>{parsedResume.candidate_name || 'Candidate'}</div>
                  <div className="text-xs" style={{ color: '#9BA5A0' }}>
                    {parsedResume.experience_years > 0 ? `~${parsedResume.experience_years.toFixed(1)} yrs experience` : 'Experience not detected'}
                    {parsedResume.email && ` · ${parsedResume.email}`}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Identified Skills ({parsedResume.skills.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {parsedResume.skills.length > 0 ? (
                    parsedResume.skills.map(s => <SkillBadge key={s} label={s} variant="matched" />)
                  ) : (
                    <span className="text-xs" style={{ color: '#9BA5A0' }}>No skills detected automatically. Continue and the analysis will extract from job context.</span>
                  )}
                </div>
              </div>

              {/* Education */}
              {parsedResume.education.length > 0 && (
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</div>
                  {parsedResume.education.slice(0, 3).map((e, i) => (
                    <div key={i} className="text-xs py-1" style={{ color: '#3A4440', borderBottom: '1px solid #F0F5F1' }}>{e}</div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {parsedResume.projects.length > 0 && (
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</div>
                  {parsedResume.projects.slice(0, 3).map((p, i) => (
                    <div key={i} className="text-xs py-1" style={{ color: '#3A4440', borderBottom: '1px solid #F0F5F1' }}>{p}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#F0F5F1', background: '#FAFAF8' }}>
              <Button variant="ghost" onClick={() => { setStep('upload'); setParsedResume(null); setFile(null); }}>
                Re-upload
              </Button>
              <Button onClick={() => setStep('job')}>
                Continue to Job Description <ChevronRight size={14} />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 3: Job Description */}
      {step === 'job' && (
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Left: Resume summary */}
          <Card className="p-5 self-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#DCE9DF' }}>
                <FileText size={16} style={{ color: '#174C3C' }} />
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: '#202723' }}>{parsedResume?.candidate_name || 'Your Resume'}</div>
                <div className="text-xs" style={{ color: '#9BA5A0' }}>{parsedResume?.filename}</div>
              </div>
              <button onClick={() => setStep('review')} className="ml-auto text-xs font-medium" style={{ color: '#174C3C' }}>
                Edit
              </button>
            </div>
            <div className="text-xs font-semibold mb-2" style={{ color: '#727A75' }}>Detected Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {(parsedResume?.skills || []).slice(0, 10).map(s => <SkillBadge key={s} label={s} variant="matched" />)}
              {(parsedResume?.skills.length || 0) > 10 && (
                <SkillBadge label={`+${parsedResume!.skills.length - 10} more`} variant="neutral" />
              )}
            </div>
          </Card>

          {/* Right: Job Description form */}
          <Card className="p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold mb-0.5" style={{ color: '#202723' }}>Target Job Description</h2>
              <p className="text-xs" style={{ color: '#9BA5A0' }}>Paste the job posting you want to compare against.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobForm.title}
                    onChange={e => setJobForm(j => ({ ...j, title: e.target.value }))}
                    placeholder="Machine Learning Engineer"
                    className="w-full text-sm rounded-lg px-3 py-2 outline-none focus:ring-2"
                    style={{
                      border: '1px solid #E5E8E6',
                      background: '#FAFAF8',
                      color: '#202723',
                    }}
                    aria-label="Job title"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>Company</label>
                  <input
                    type="text"
                    value={jobForm.company}
                    onChange={e => setJobForm(j => ({ ...j, company: e.target.value }))}
                    placeholder="Company name"
                    className="w-full text-sm rounded-lg px-3 py-2 outline-none"
                    style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                    aria-label="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>
                    <MapPin size={11} className="inline mr-1" />Location
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={e => setJobForm(j => ({ ...j, location: e.target.value }))}
                    placeholder="Remote / Bangalore"
                    className="w-full text-sm rounded-lg px-3 py-2 outline-none"
                    style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                    aria-label="Job location"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>
                    <Clock size={11} className="inline mr-1" />Employment Type
                  </label>
                  <select
                    value={jobForm.employment_type}
                    onChange={e => setJobForm(j => ({ ...j, employment_type: e.target.value }))}
                    className="w-full text-sm rounded-lg px-3 py-2 outline-none"
                    style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                    aria-label="Employment type"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>
                  <Briefcase size={11} className="inline mr-1" />Experience Level
                </label>
                <input
                  type="text"
                  value={jobForm.experience_level}
                  onChange={e => setJobForm(j => ({ ...j, experience_level: e.target.value }))}
                  placeholder="Mid-Senior (2–4 years)"
                  className="w-full text-sm rounded-lg px-3 py-2 outline-none"
                  style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                  aria-label="Experience level"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: '#3A4440' }}>
                  Job Description * <span style={{ color: '#9BA5A0', fontWeight: 400 }}>(paste the full job posting)</span>
                </label>
                <textarea
                  value={jobForm.description}
                  onChange={e => setJobForm(j => ({ ...j, description: e.target.value }))}
                  placeholder="We are looking for a Machine Learning Engineer with expertise in Python, PyTorch, NLP, SQL and Docker. The ideal candidate will have 2+ years of experience building production ML systems..."
                  rows={8}
                  className="w-full text-sm rounded-lg px-3 py-2 outline-none resize-none"
                  style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723', lineHeight: '1.6' }}
                  aria-label="Job description"
                  required
                />
                <div className="text-xs mt-1 text-right" style={{ color: '#C6DACB' }}>
                  {jobForm.description.length} chars — min 20 required
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep('review')}>Back</Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={!jobForm.title.trim() || jobForm.description.length < 20}
                  fullWidth
                >
                  Analyze Resume <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 4: Analyzing */}
      {step === 'analyzing' && (
        <div className="max-w-lg flex flex-col items-center text-center py-20">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: '#DCE9DF' }}
          >
            <Loader2 size={32} style={{ color: '#174C3C' }} className="animate-spin" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#202723', fontFamily: 'Manrope, sans-serif' }}>
            Analyzing your profile…
          </h2>
          <p className="text-sm mb-6" style={{ color: '#727A75' }}>
            Running Sentence-BERT semantic matching, ESCO skill normalization, and compatibility scoring.
          </p>
          <div className="w-full space-y-2">
            {['Parsing resume sections', 'Extracting & normalizing skills', 'Computing semantic similarity', 'Generating skill gap report', 'Building career roadmap'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm" style={{ color: '#9BA5A0' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#174C3C', animation: `pulse 1s ${i * 0.2}s infinite` }} />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
