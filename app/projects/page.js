export const runtime = "nodejs";

import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import { Github, ExternalLink, Code2, Layers, Filter, Cpu } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

import { connectDB } from '@/lib/db';
import Profile from '@/models/Profile';

/* =========================
   DB DATA FETCHING
   ========================= */

async function getData(searchParams) {
  try {
    await connectDB();

    const profile = await Profile.findOne({});
    if (!profile) {
      return { projects: [], skills: [] };
    }

    let projects = profile.projects || [];
    const skills = profile.skills || [];

    // SEARCH
    if (searchParams?.q) {
      const q = searchParams.q.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    // FILTER
    if (searchParams?.skill) {
      const skill = searchParams.skill.toLowerCase();
      projects = projects.filter(p =>
        p.skills.some(s => s.toLowerCase() === skill)
      );
    }

    return { projects, skills };
  } catch (err) {
    console.error("DB fetch error:", err);
    return { projects: [], skills: [] };
  }
}

/* =========================
   PAGE
   ========================= */

export default async function ProjectsPage({ searchParams }) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;

  const { projects, skills } = await getData(params);

  const isSearching = !!params?.q;
  const isFiltering = !!params?.skill;

  return (
    <div className="space-y-16 pb-24">

      {/* Header */}
      <section className="space-y-10">
        <AnimatedSection direction="down">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                Portfolio
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
                All <span className="text-teal-600">Work.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg font-medium">
                A curated selection of technical projects.
              </p>
            </div>
            <SearchInput />
          </div>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="flex gap-3 overflow-x-auto">
            <Link
              href="/projects"
              className={`px-6 py-2.5 rounded-2xl font-bold ${
                !isFiltering && !isSearching
                  ? 'bg-foreground text-background'
                  : 'bg-card text-muted-foreground'
              }`}
            >
              Everything
            </Link>
            {skills.map(skill => (
              <Link
                key={skill}
                href={`/projects?skill=${encodeURIComponent(skill)}`}
                className={`px-6 py-2.5 rounded-2xl font-bold ${
                  params?.skill === skill
                    ? 'bg-teal-600 text-white'
                    : 'bg-card text-muted-foreground'
                }`}
              >
                {skill}
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects */}
      <section className="grid md:grid-cols-2 gap-12">
        {projects.length === 0 ? (
          <AnimatedSection className="col-span-full py-32 text-center">
            <Code2 size={64} className="mx-auto text-teal-500" />
            <h3 className="text-3xl font-black mt-6">No Projects Found</h3>
          </AnimatedSection>
        ) : (
          projects.map((project, idx) => (
            <AnimatedSection key={idx} direction="up">
              <div className="border rounded-[2rem] p-10 space-y-6">
                <h3 className="text-3xl font-black">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex gap-3">
                  {project.links?.map((link, i) => (
                    <a key={i} href={link} target="_blank">
                      {link.includes('github') ? <Github /> : <ExternalLink />}
                    </a>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map(s => (
                    <span key={s} className="text-xs px-3 py-1 border rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))
        )}
      </section>
    </div>
  );
}
