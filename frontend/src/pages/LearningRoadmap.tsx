import { useState, useEffect } from 'react';
import {
  GraduationCap, CheckCircle2, Circle, ExternalLink,
  BookOpen, Sparkles, FolderGit2, Clock, ChevronDown, ChevronRight
} from 'lucide-react';
import { api } from '../api/client';
import type { RoadmapPhase } from '../types';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function LearningRoadmap() {
  const [targetRole, setTargetRole] = useState('Machine Learning Engineer');
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>({
    'Python Programming Core': true,
    'Git & GitHub Version Control': true,
    'SQL Fundamentals': true,
  });
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getLearningRoadmap(targetRole);
        setPhases(data.phases);
      } catch {
        // High quality curated 7-phase learning roadmap
        const mockPhases: RoadmapPhase[] = [
          {
            phase_number: 1,
            phase_title: 'Programming & Foundations',
            estimated_weeks: 'Weeks 1 - 2',
            skills: [
              {
                name: 'Python Programming Core',
                description: 'Object-oriented programming, data structures (dicts, sets, lists), list comprehensions, and generators.',
                resources: [
                  { title: 'Scientific Computing with Python', provider: 'freeCodeCamp', type: 'Free', url: 'https://freecodecamp.org' },
                  { title: 'Official Python Tutorial', provider: 'Python.org', type: 'Free', url: 'https://docs.python.org' }
                ],
                is_completed: true
              },
              {
                name: 'Git & GitHub Version Control',
                description: 'Branching, pull requests, resolving merge conflicts, and publishing open-source portfolios.',
                resources: [
                  { title: 'Git & GitHub Crash Course', provider: 'freeCodeCamp', type: 'Free', url: 'https://freecodecamp.org' },
                  { title: 'Pro Git Book', provider: 'Git-SCM', type: 'Free', url: 'https://git-scm.com/book' }
                ],
                is_completed: true
              }
            ],
            portfolio_project: {
              title: 'Command-Line ETL Tool & Data Formatter',
              description: 'Build a modular CLI utility that reads multi-format files, scrubs anomalies, and outputs normalized JSON with pytest coverage.',
              deliverables: ['Modular Python package', 'Automated pytest suite', 'Comprehensive README'],
              difficulty: 'Beginner'
            }
          },
          {
            phase_number: 2,
            phase_title: 'Mathematics, Statistics & SQL',
            estimated_weeks: 'Weeks 3 - 4',
            skills: [
              {
                name: 'SQL Fundamentals & Analytical Queries',
                description: 'Aggregations, joins, window functions (ROW_NUMBER, RANK), and CTEs for feature engineering.',
                resources: [
                  { title: 'SQLBolt Interactive Exercises', provider: 'SQLBolt', type: 'Free', url: 'https://sqlbolt.com' },
                  { title: 'Intro to SQL', provider: 'Kaggle Learn', type: 'Free', url: 'https://kaggle.com/learn' }
                ],
                is_completed: true
              },
              {
                name: 'Linear Algebra & Probability for ML',
                description: 'Vectors, matrix multiplications, eigenvalues, Bayes theorem, probability distributions, and hypothesis testing.',
                resources: [
                  { title: 'Essence of Linear Algebra', provider: '3Blue1Brown', type: 'Free', url: 'https://3blue1brown.com' },
                  { title: 'Mathematics for Machine Learning', provider: 'Coursera (Imperial)', type: 'Free', url: 'https://coursera.org' }
                ],
                is_completed: false
              }
            ],
            portfolio_project: {
              title: 'Relational Database Performance & Analytics Pipeline',
              description: 'Formulate an analytical reporting dashboard on a multi-table database with complex indexes and window calculations.',
              deliverables: ['Schema DDL + queries', 'Benchmark query execution plan'],
              difficulty: 'Intermediate'
            }
          },
          {
            phase_number: 3,
            phase_title: 'Data Wrangling & Exploratory Analysis',
            estimated_weeks: 'Weeks 5 - 6',
            skills: [
              {
                name: 'Pandas & NumPy Vectorization',
                description: 'Multi-indexing, pivot tables, vectorized operations, missing value imputation, and memory optimization.',
                resources: [
                  { title: 'Pandas Official 10-Minute Walkthrough', provider: 'Pandas Dev Team', type: 'Free', url: 'https://pandas.pydata.org' },
                  { title: 'Data Cleaning Track', provider: 'Kaggle Learn', type: 'Free', url: 'https://kaggle.com/learn' }
                ],
                is_completed: false
              },
              {
                name: 'Exploratory Data Analysis (EDA)',
                description: 'Correlation matrices, distribution plotting with Seaborn/Matplotlib, outlier detection, and feature correlation.',
                resources: [
                  { title: 'Data Visualization Course', provider: 'Kaggle Learn', type: 'Free', url: 'https://kaggle.com/learn' }
                ],
                is_completed: false
              }
            ],
            portfolio_project: {
              title: 'Comprehensive EDA on 100k+ Real Job Listings',
              description: 'Process an open job dataset, clean missing fields, and visualize skill co-occurrence networks with insight findings.',
              deliverables: ['Interactive Jupyter Notebook', 'Publication-quality plots', 'Executive Summary'],
              difficulty: 'Intermediate'
            }
          },
          {
            phase_number: 4,
            phase_title: 'Classical Machine Learning',
            estimated_weeks: 'Weeks 7 - 8',
            skills: [
              {
                name: 'Scikit-Learn Machine Learning Pipelines',
                description: 'Regression, classification (Random Forests, Logistic Regression, XGBoost), hyperparameter tuning (GridSearchCV), and cross-validation.',
                resources: [
                  { title: 'Machine Learning Specialization', provider: 'Coursera (DeepLearning.AI)', type: 'Free', url: 'https://coursera.org' },
                  { title: 'Scikit-Learn Official User Guide', provider: 'Scikit-Learn', type: 'Free', url: 'https://scikit-learn.org' }
                ],
                is_completed: false
              }
            ],
            portfolio_project: {
              title: 'End-to-End Classification System with Benchmark Evaluation',
              description: 'Build a supervised classification pipeline comparing baseline Logistic Regression against Random Forest with confusion matrix and precision/recall evaluation.',
              deliverables: ['Serialized .joblib model', 'Metrics JSON artifact', 'Evaluation Report'],
              difficulty: 'Intermediate'
            }
          },
          {
            phase_number: 5,
            phase_title: 'Deep Learning & NLP',
            estimated_weeks: 'Weeks 9 - 10',
            skills: [
              {
                name: 'PyTorch Neural Networks',
                description: 'Tensors, autograd, custom Dataset and DataLoader classes, training loops, and loss functions.',
                resources: [
                  { title: 'Deep Learning with PyTorch', provider: 'PyTorch.org', type: 'Free', url: 'https://pytorch.org/tutorials' },
                  { title: 'Practical Deep Learning for Coders', provider: 'Fast.ai', type: 'Free', url: 'https://course.fast.ai' }
                ],
                is_completed: false
              },
              {
                name: 'Sentence-Transformers & Text Embeddings',
                description: 'Dense embedding generation, semantic similarity scoring, and transformer attention fundamentals.',
                resources: [
                  { title: 'Hugging Face NLP Course', provider: 'Hugging Face', type: 'Free', url: 'https://huggingface.co/course' }
                ],
                is_completed: false
              }
            ],
            portfolio_project: {
              title: 'Semantic Document Search & Skill Extraction Engine',
              description: 'Implement dense text retrieval utilizing Sentence-BERT embeddings, cosine ranking, and entity extraction.',
              deliverables: ['FastAPI semantic search endpoint', 'Interactive web demo', 'Model card'],
              difficulty: 'Advanced'
            }
          },
          {
            phase_number: 6,
            phase_title: 'Model Deployment & MLOps',
            estimated_weeks: 'Weeks 11 - 12',
            skills: [
              {
                name: 'Docker Microservices Containerization',
                description: 'Dockerfiles, multi-stage builds, container isolation, volume mounts, and Docker Compose orchestration.',
                resources: [
                  { title: 'Docker Getting Started Guide', provider: 'Docker Docs', type: 'Free', url: 'https://docs.docker.com' },
                  { title: 'DevOps with Docker', provider: 'University of Helsinki', type: 'Free', url: 'https://devopswithdocker.com' }
                ],
                is_completed: false
              },
              {
                name: 'FastAPI Production Model Serving',
                description: 'Asynchronous route handlers, Pydantic schemas, dependency injection, and sub-100ms inference caching.',
                resources: [
                  { title: 'FastAPI Official Documentation', provider: 'Tiangolo', type: 'Free', url: 'https://fastapi.tiangolo.com' }
                ],
                is_completed: false
              }
            ],
            portfolio_project: {
              title: 'Production ML Inference Microservice API',
              description: 'Deploy a containerized REST API with Pydantic request validation, background workers, and automated OpenAPI documentation.',
              deliverables: ['Dockerfile + compose file', 'Swagger interactive docs', 'GitHub Actions CI test suite'],
              difficulty: 'Advanced'
            }
          }
        ];
        setPhases(mockPhases);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [targetRole]);

  const toggleSkill = (skillName: string) => {
    const next = !completedSkills[skillName];
    setCompletedSkills({ ...completedSkills, [skillName]: next });
    api.toggleLearningProgress(skillName, next).catch(() => {});
  };

  const totalSkills = phases.reduce((acc, p) => acc + p.skills.length, 0);
  const completedCount = Object.values(completedSkills).filter(Boolean).length;
  const progressPct = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={20} style={{ color: '#155642' }} />
          <h1 className="text-2xl font-bold" style={{ color: '#202A26', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            Personalized Learning Roadmap
          </h1>
        </div>
        <p style={{ color: '#727A75', fontSize: '14px' }}>
          Follow an actionable, phase-by-phase learning path tailored to your target role with curated official resources and portfolio projects.
        </p>
      </div>

      {/* Progress Gauge Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b mb-4" style={{ borderColor: '#F0F5F1' }}>
          <div>
            <div className="text-xs font-semibold text-green-900 uppercase tracking-wide">
              Target Career Milestone
            </div>
            <h2 className="text-lg font-bold" style={{ color: '#202A26', fontFamily: 'Manrope, sans-serif' }}>
              {targetRole}
            </h2>
            <div className="text-xs text-gray-500 mt-0.5">
              {completedCount} of {totalSkills} competencies mastered ({progressPct}% completion)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">Switch target:</span>
            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none"
              style={{ borderColor: '#E5E8E6', background: '#FAFAF8', color: '#155642' }}
            >
              <option>Machine Learning Engineer</option>
              <option>Full Stack Python Developer</option>
              <option>Data Analyst</option>
              <option>DevOps & Cloud Engineer</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: '#155642' }}>
            <span>Roadmap Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#F0F5F1' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, background: '#155642' }}
            />
          </div>
        </div>
      </Card>

      {/* Roadmap Phases Accordion / List */}
      <div className="space-y-4">
        {phases.map(phase => {
          const isExpanded = expandedPhase === phase.phase_number;
          const phaseCompletedSkills = phase.skills.filter(s => completedSkills[s.name]).length;

          return (
            <Card key={phase.phase_number} className="overflow-hidden">
              {/* Phase Header */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? 0 : phase.phase_number)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ background: isExpanded ? '#F8F8F4' : '#FFFFFF' }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                    style={{
                      background: phaseCompletedSkills === phase.skills.length ? '#DCE9DF' : '#F0F5F1',
                      color: '#155642'
                    }}
                  >
                    {phaseCompletedSkills === phase.skills.length ? '✓' : `0${phase.phase_number}`}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: '#202A26' }}>
                      Phase {phase.phase_number}: {phase.phase_title}
                    </h3>
                    <div className="text-[11px] text-gray-500">
                      {phase.estimated_weeks} · {phaseCompletedSkills} of {phase.skills.length} skills completed
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                </div>
              </div>

              {/* Phase Content */}
              {isExpanded && (
                <div className="p-6 border-t space-y-6" style={{ borderColor: '#F0F5F1' }}>
                  {/* Skills List */}
                  <div className="space-y-4">
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                      Core Skills to Master
                    </div>

                    {phase.skills.map(skill => {
                      const isDone = !!completedSkills[skill.name];
                      return (
                        <div
                          key={skill.name}
                          className="p-4 rounded-xl border flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all"
                          style={{
                            background: isDone ? '#F0F5F1' : '#FAFAF8',
                            borderColor: isDone ? '#DCE9DF' : '#E5E8E6',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleSkill(skill.name)}
                              className="mt-0.5 text-green-900 focus:outline-none"
                              aria-label={`Toggle completion for ${skill.name}`}
                            >
                              {isDone ? (
                                <CheckCircle2 size={18} style={{ color: '#155642' }} />
                              ) : (
                                <Circle size={18} className="text-gray-400 hover:text-green-800" />
                              )}
                            </button>
                            <div>
                              <div className={`text-xs font-bold ${isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {skill.name}
                              </div>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {skill.description}
                              </p>
                            </div>
                          </div>

                          {/* Curated Resources */}
                          <div className="flex flex-col gap-1.5 flex-shrink-0 md:min-w-60 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                              Verified Resources:
                            </span>
                            {skill.resources.map((res, i) => (
                              <a
                                key={i}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-green-900 hover:underline font-medium"
                              >
                                <ExternalLink size={10} className="flex-shrink-0" />
                                <span className="truncate">{res.title}</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-green-100 text-green-800 font-bold ml-auto">
                                  {res.provider}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Portfolio Project */}
                  {phase.portfolio_project && (
                    <div className="p-4 rounded-xl border" style={{ background: '#FFFFFF', borderColor: '#E5E8E6' }}>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-1">
                        <FolderGit2 size={15} style={{ color: '#155642' }} />
                        Recommended Portfolio Project: {phase.portfolio_project.title}
                      </div>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        {phase.portfolio_project.description}
                      </p>

                      <div className="text-[11px] font-semibold text-gray-700 mb-1">Deliverables:</div>
                      <ul className="text-xs text-gray-600 space-y-0.5 list-disc pl-4 mb-3">
                        {phase.portfolio_project.deliverables.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span>⚡ Difficulty: {phase.portfolio_project.difficulty}</span>
                        <span>·</span>
                        <span>⏱ Est: 1-2 Weeks</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
