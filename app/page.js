export const runtime = "nodejs";

import Link from 'next/link';
import { Mail, GraduationCap, Code2, Briefcase, Github, Linkedin, ArrowRight, Sparkles, Cpu, Globe } from 'lucide-react';

import AnimatedSection from '@/components/AnimatedSection'; // ✅ FIX
import { connectDB } from '@/lib/db';
import Profile from '@/models/Profile';

async function getProfile() {
  try {
    await connectDB();
    const profile = await Profile.findOne({});
    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to fetch profile", error);
    return null;
  }
}

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold">Profile data not found</h1>
        <p className="text-muted-foreground mt-4">
          Please ensure the database is seeded.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-32 pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-50/50 dark:from-teal-900/10 via-transparent to-transparent" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-teal-100/30 dark:bg-teal-900/10 blur-[100px] rounded-full -z-10 animate-pulse" />
      <div className="absolute top-80 left-0 w-96 h-96 bg-cyan-100/20 dark:bg-cyan-900/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center space-y-10 pt-12">
        <AnimatedSection direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-bold border border-teal-100 dark:border-teal-800 mb-6 drop-shadow-sm">
            <Sparkles size={16} />
            <span>Available for new opportunities</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">Future.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
            I am <span className="text-foreground font-bold">{profile.name}</span>, an Electrical Engineering student
            at <span className="text-foreground">NIT Delhi</span>, blending software expertise with electrical innovation.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl hover:bg-teal-600 transition-all duration-300 font-bold text-lg shadow-xl shadow-teal-500/10">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              Let's Connect
            </a>
            <div className="flex items-center gap-3">
              {profile.links?.github && (
                <a href={profile.links.github} target="_blank" className="p-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-2xl border border-transparent hover:border-border transition-all">
                  <Github size={28} />
                </a>
              )}
              {profile.links?.linkedin && (
                <a href={profile.links.linkedin} target="_blank" className="p-4 text-muted-foreground hover:text-teal-600 hover:bg-teal-50 rounded-2xl border border-transparent hover:border-teal-100 transition-all">
                  <Linkedin size={28} />
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Trust/Stats Bar */}
      <AnimatedSection direction="up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white shadow-2xl">
          <div className="text-center space-y-1">
            <div className="text-4xl font-black">10+</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Projects</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-4xl font-black">NIT</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Education</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-4xl font-black">1yr+</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Experience</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-4xl font-black">3+</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Languages</div>
          </div>
        </div>
      </AnimatedSection>

      {/* Expertise & Skills */}
      <section className="space-y-16">
        <AnimatedSection direction="up">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Technical Arsenal</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-2xl hover:shadow-teal-500/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={120} />
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl w-fit mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Code2 size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Software Engineering</h3>
              <p className="text-muted-foreground mb-6">Developing high-performance applications with modern tech stacks and algorithms.</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'C++', 'Data Structures'].map(s => (
                  <span key={s} className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-black uppercase rounded-lg border border-border/50 technical-mono">{s}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
              </div>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-2xl w-fit mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Cpu size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Core Electrical</h3>
              <p className="text-muted-foreground mb-6">Power systems analysis, circuit optimization, energy distribution design.</p>
              <div className="flex flex-wrap gap-2">
                {['Power Electronics', 'MATLAB', 'Circuits', 'Signal Processing'].map(s => (
                  <span key={s} className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-black uppercase rounded-lg border border-border/50 technical-mono">{s}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-2xl hover:shadow-slate-500/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={120} />
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 rounded-2xl w-fit mb-6 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Computer Science Fundamentals</h3>
              <p className="text-muted-foreground mb-6">Strengthened problem-solving skills by implementing core data structures and algorithms, time–space complexity optimization, efficient coding practices.</p>
              <div className="flex flex-wrap gap-2">
                {['Data Structures', 'Algorithms', 'Complexity', 'Coding'].map(s => (
                  <span key={s} className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-black uppercase rounded-lg border border-border/50 technical-mono">{s}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

      </section>

      {/* Featured Projects Highlight */}
      <section className="py-24 px-8 md:px-16 rounded-[3rem] bg-gradient-to-br from-slate-950 to-teal-950 text-white overflow-hidden relative border border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <AnimatedSection direction="left" className="md:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-6xl font-black leading-tight text-white">Engineering Digital <br /> Solutions.</h2>
            <p className="text-teal-100/70 text-xl leading-relaxed">
              Every project is a blend of precision engineering and creative problem-solving.
            </p>
            <Link href="/projects" className="inline-flex items-center gap-3 px-10 py-5 bg-teal-500 text-slate-950 rounded-2xl font-black hover:bg-teal-400 transition-all text-lg active:scale-95">
              View All Projects
              <ArrowRight size={24} />
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right" className="md:w-1/2">
            <div className="relative">
              <div className="w-full aspect-video rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl p-4 rotate-3 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center text-slate-600">
                  <Code2 size={64} opacity={0.3} />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-full aspect-video rounded-3xl bg-teal-600/20 border border-white/5 backdrop-blur-xl -rotate-2 -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education & Experience Timeline-ish */}
      <section className="grid md:grid-cols-2 gap-24">
        <AnimatedSection direction="up" className="space-y-10">
          <h2 className="text-4xl font-black text-foreground flex items-center gap-4">
            <GraduationCap className="text-teal-600" size={40} />
            Education
          </h2>
          <div className="space-y-12 pt-8">
            {profile.education?.map((edu, idx) => (
              <div key={idx} className="group relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border group-hover:bg-teal-600 transition-colors" />
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-teal-600 transition-all transform group-hover:scale-150 shadow-md shadow-white dark:shadow-slate-900" />
                <h3 className="text-2xl font-bold text-foreground mb-1">{edu.institution}</h3>
                <p className="text-lg text-muted-foreground font-medium">{edu.degree}</p>
                <p className="text-sm font-black text-teal-600 mt-2 uppercase tracking-widest bg-teal-50 dark:bg-teal-900/30 w-fit px-3 py-1 rounded-md technical-mono">Class of {edu.year}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2} className="space-y-10">
          <h2 className="text-4xl font-black text-foreground flex items-center gap-4">
            <Briefcase className="text-cyan-600" size={40} />
            Experience
          </h2>
          <div className="space-y-12 pt-8">
            {profile.work?.map((job, idx) => (
              <div key={idx} className="group relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border group-hover:bg-cyan-600 transition-colors" />
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-border group-hover:bg-cyan-600 transition-all transform group-hover:scale-150 shadow-md shadow-white dark:shadow-slate-900" />
                <h3 className="text-2xl font-bold text-foreground mb-1">{job.role}</h3>
                <p className="text-lg text-muted-foreground font-medium">{job.company}</p>
                <p className="text-sm font-black text-cyan-600 mt-2 uppercase tracking-widest bg-cyan-50 dark:bg-cyan-900/30 w-fit px-3 py-1 rounded-md technical-mono">{job.duration}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
