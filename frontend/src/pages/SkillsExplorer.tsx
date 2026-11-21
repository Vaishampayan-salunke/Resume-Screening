import { useState, useEffect } from 'react';
import { BookOpen, Search, ExternalLink, Tag } from 'lucide-react';
import { api } from '../api/client';
import { Card } from '../components/ui/Card';
import { ImportanceBadge } from '../components/ui/Badge';

interface SkillItem {
  key: string;
  canonical_name: string;
  category: string;
  importance: string;
  why_required: string;
  resources: string[];
}

export default function SkillsExplorer() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getSkills();
        setSkills(data as unknown as SkillItem[]);
        const cats = Array.from(new Set(data.map((s: { category?: string }) => s.category || 'General')));
        setCategories(cats);
      } catch {
        // Fallback default ESCO items for frontend resilience
        setSkills([
          {
            key: 'python',
            canonical_name: 'Python',
            category: 'Programming Languages',
            importance: 'Critical',
            why_required: 'Core language for data science, machine learning backend development, and script automation.',
            resources: ['Official Python Docs (python.org)', 'Real Python (realpython.com)', 'LeetCode Python Track']
          },
          {
            key: 'sql',
            canonical_name: 'SQL',
            category: 'Data & Databases',
            importance: 'Critical',
            why_required: 'Essential for querying, aggregating, and extracting structured relational data from enterprise databases.',
            resources: ['Mode Analytics SQL Tutorial', 'SQLBolt', 'LeetCode Database 50']
          },
          {
            key: 'machine learning',
            canonical_name: 'Machine Learning',
            category: 'Machine Learning & AI',
            importance: 'Critical',
            why_required: 'Core discipline for developing predictive models, pattern classifiers, and automated scoring systems.',
            resources: ["Andrew Ng's Machine Learning Specialization", 'Fast.ai Practical Deep Learning', 'Hands-On Machine Learning (Géron)']
          },
          {
            key: 'pytorch',
            canonical_name: 'PyTorch',
            category: 'Machine Learning & AI',
            importance: 'Critical',
            why_required: 'De facto industry standard framework for deep learning research and production neural network training.',
            resources: ['PyTorch.org Tutorials', 'Deep Learning with PyTorch Book', 'Aladdin Persson PyTorch Series']
          },
          {
            key: 'docker',
            canonical_name: 'Docker',
            category: 'Cloud & DevOps',
            importance: 'Critical',
            why_required: 'Guarantees reproducible runtime environments across developer machines, CI/CD, and production nodes.',
            resources: ['Docker Getting Started Guide', 'Docker Mastery by Bret Fisher']
          },
          {
            key: 'fastapi',
            canonical_name: 'FastAPI',
            category: 'Web & Backend',
            importance: 'High',
            why_required: 'Modern, high-performance asynchronous Python web framework for microservices and ML inference endpoints.',
            resources: ['Official FastAPI Tutorial (tiangolo.com)', 'TestDriven.io FastAPI Guide']
          }
        ]);
        setCategories(['Programming Languages', 'Machine Learning & AI', 'Data & Databases', 'Cloud & DevOps', 'Web & Backend', 'Soft Skills']);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = skills.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.canonical_name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.why_required && item.why_required.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} style={{ color: '#174C3C' }} />
          <h1 className="text-2xl font-bold" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            ESCO Standardized Skill Taxonomy
          </h1>
        </div>
        <p style={{ color: '#727A75', fontSize: '14px' }}>
          Explore the canonical skills, role competencies, and curated learning paths that power our normalization engine.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between mb-3">
          <div className="relative w-full sm:w-96">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9BA5A0' }} />
            <input
              type="text"
              placeholder="Search skill (e.g. PyTorch, Docker, SQL)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs rounded-lg pl-9 pr-3 py-2 outline-none"
              style={{ background: '#F8F8F4', border: '1px solid #E5E8E6', color: '#202723' }}
            />
          </div>

          <div className="text-xs self-start sm:self-auto" style={{ color: '#9BA5A0' }}>
            Showing {filtered.length} competencies
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
            style={{
              background: selectedCategory === 'All' ? '#174C3C' : '#F0F5F1',
              color: selectedCategory === 'All' ? '#fff' : '#727A75',
              border: selectedCategory === 'All' ? '1px solid #174C3C' : '1px solid #E5E8E6'
            }}
          >
            All Categories
          </button>
          {categories.map(cat => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                style={{
                  background: active ? '#174C3C' : '#F0F5F1',
                  color: active ? '#fff' : '#727A75',
                  border: active ? '1px solid #174C3C' : '1px solid #E5E8E6'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Grid of Skills */}
      {loading ? (
        <div className="py-24 text-center text-xs" style={{ color: '#9BA5A0' }}>
          Loading taxonomy knowledge base...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-xs" style={{ color: '#9BA5A0' }}>No competencies match your search.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <Card key={item.key || item.canonical_name} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="text-sm font-bold" style={{ color: '#202723' }}>
                    {item.canonical_name}
                  </h2>
                  <ImportanceBadge importance={item.importance} />
                </div>

                <div className="inline-flex items-center gap-1 text-xs mb-3 px-2 py-0.5 rounded" style={{ background: '#F0F5F1', color: '#174C3C' }}>
                  <Tag size={10} />
                  <span>{item.category}</span>
                </div>

                <p className="text-xs mb-4" style={{ color: '#727A75', lineHeight: 1.6 }}>
                  {item.why_required}
                </p>
              </div>

              {item.resources && item.resources.length > 0 && (
                <div className="pt-3 border-t" style={{ borderColor: '#F0F5F1' }}>
                  <div className="text-xs font-semibold mb-1.5" style={{ color: '#3A4440' }}>
                    Curated Resources
                  </div>
                  <div className="space-y-1">
                    {item.resources.slice(0, 2).map((res, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs truncate" style={{ color: '#9BA5A0' }}>
                        <ExternalLink size={10} className="flex-shrink-0" />
                        <span className="truncate">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
