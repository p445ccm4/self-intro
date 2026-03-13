import { useParams, Link, useLocation } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';
import { ArrowLeft, Calendar, Briefcase, Code, GraduationCap, Github, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const getEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = new RegExp(regExp).exec(url);
  return (match?.[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

export const DetailPage = () => {
  const { id } = useParams();
  const { pathname, state } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const isProject = pathname.startsWith('/project/');
  const isExperience = pathname.startsWith('/experience/');
  const isEducation = pathname.startsWith('/education/');

  const project = isProject ? portfolioData.projects.find((p) => p.id === id) : null;
  const work = isExperience ? portfolioData.experience.find((e) => e.id === id) : null;
  const education = isEducation ? portfolioData.education.find((e) => e.id === id) : null;

  const item = project || work || education;

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Item Not Found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  // Normalize data for display
  const title = project ? project.title : work?.role || education?.degree || '';
  const subtitle = project ? project.company : work?.company || education?.school || '';
  const date = project ? project.period : work?.period || education?.period || '';
  const description = project ? project.description : work?.description || [];
  const details = project ? project.details : work?.details || [];
  const tech = project ? project.tech : [];
  const role = project ? project.role : work?.role || '';
  const githubLinks = project?.githubLinks || work?.githubLinks || [];
  const youtubeLinks = project?.youtubeLinks || work?.youtubeLinks || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link
        to={state?.scrollToId ? `/#${state.scrollToId}` : '/'}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        
        <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
          <div className="flex items-center gap-2">
            {education ? <GraduationCap size={20} className="text-green-400" /> : <Briefcase size={20} className="text-blue-400" />}
            <span className="text-xl">{subtitle}</span>
          </div>
          {role && role !== title && (
             <div className="flex items-center gap-2">
             <Briefcase size={20} className="text-blue-400" />
             <span className="text-xl">{role}</span>
           </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-400" />
            <span className="text-xl">{date}</span>
          </div>
        </div>

        {tech.length > 0 && (
          <div className="section-card">
            <h2 className="section-title">
              <Code className="text-blue-400" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {tech.map((t, i) => (
                <span key={i} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {githubLinks && githubLinks.length > 0 && (
          <div className="section-card">
            <h2 className="section-title">
              <Github className="text-blue-400" /> GitHub Repositories
            </h2>
            <div className="flex flex-col gap-3">
              {githubLinks.map((link: string, i: number) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-item"
                >
                  <Github size={16} />
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        {youtubeLinks && youtubeLinks.length > 0 && (
          <div className="section-card">
            <h2 className="section-title">
              <Youtube className="text-red-500" /> YouTube Demos
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {youtubeLinks.map((link: string, i: number) => {
                 const embedUrl = getEmbedUrl(link);
                 if (!embedUrl) return null;
                 return (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-card-border bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={`YouTube video player ${i}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                 );
              })}
            </div>
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Details</h2>
          
          {/* Description handling */}
          {Array.isArray(description) ? (
             <ul className="space-y-4 mb-8">
             {description.map((desc, i) => (
               <li key={i} className="bullet-list-item">
                 <span className="bullet-point bg-blue-500" />
                 <span>{desc}</span>
               </li>
             ))}
           </ul>
          ) : (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
          )}
          
          {/* Details (if any) */}
          {details && details.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              <ul className="space-y-4">
                {details.map((detail, i) => (
                  <li key={i} className="bullet-list-item text-base">
                    <span className="bullet-point bg-purple-500" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
