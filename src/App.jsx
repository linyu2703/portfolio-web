import React, { useState, useEffect, useCallback } from 'react';
// Re-importing Lucide icons needed for section headers
import { Menu, X, Mail, Linkedin, Github, FileText, Briefcase, GraduationCap, Code } from 'lucide-react'; 
import pfp from "/src/source/pfp.jpg";

// ===========================================
// I. DATA DEFINITIONS
// ===========================================

const experienceData = [
  {
    title: 'Analyst',
    duration: 'Jun 2024 - Present',
    organization: 'Stony Brook Southampton Hospital',
    iconClass: 'fa-hospital', // Icon for healthcare/hospital
    details: [
      'Developed an ETL workflow using Spark SQL and Excel VBA, resulting in a 30% decrease in data processing time.',
      'Optimized data pipelines using MS Fabric for seamless data ingestion and accelerating analytical workflows.',
      'Automated high-volume email reporting using Power Automate, improving processing efficiency by 90% by converting attachments into structured files.',
      'Built interactive Tableau dashboards, empowering data-driven decisions across 6+ sub-departments.',
    ],
  },
  {
    title: 'Teaching Assistant',
    duration: 'Jan 2024 - May 2024',
    organization: "Stony Brook University's Computer Science Department",
    iconClass: 'fa-chalkboard-user', // Icon for teaching/education
    details: [
      'Assisted in teaching CSE101 to a cohort of 50+ students, providing instructional feedback and support.',
      'Led weekly lab sessions, advancing practical understanding of core Python concepts.',
    ],
  },
  {
  title: 'Analytics Intern',
    duration: 'Jan 2023 - May 2023',
    organization: "Stony Brook University's Ombuds Office",
    iconClass: 'fa-code', // Retained fa-code icon from earlier request
    details: [
      'Streamlined data collection utilizing Google Forms, capturing 300+ student data points with 100% accuracy.',
      'Conducted comprehensive data analysis of 200+ student forms using Google Sheets, identifying key trends that shaped the Ombuds\' workshop topics.',
    ],
  },
];

const projectsData = [
  {
    title: 'SBU Food Exploratory Analysis',
    imageUrl: 'https://placehold.co/600x300/10B981/FFFFFF?text=Food+Analysis+Dashboard', // Green placeholder
    tools: ['Pandas', 'NumPy', 'Matplotlib', 'Excel', 'Tableau'],
    githubLink: 'https://github.com/linyu2703/sbu-food-analysis', // Placeholder GitHub link
    details: [
      'Assessed data from 500+ food items on the university dining website using Python to identify healthy options aligned with students\' nutritional goals.',
      'Developed a data visualization dashboard to present and summarize key findings, promoting healthier dietary decisions for students on campus.',
    ],
  },
  {
    title: 'Financial Crisis Analysis',
    imageUrl: 'https://placehold.co/600x300/EF4444/FFFFFF?text=Financial+Crisis+Heatmap', // Red placeholder
    tools: ['Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    githubLink: 'https://github.com/linyu2703/financial-crisis-analysis', // Placeholder GitHub link
    details: [
      'Analyzed stock price data from 6 major banks using Python, identifying outliers, patterns, and trends to assess the impact of stock price magnitudes on return correlations during the financial crisis.',
      'Generated heat maps, cluster maps, and pairplots to uncover trends and insights into the relationship between stock prices and returns.',
    ],
  },
  {
    title: 'Healthcare Trend Analysis',
    imageUrl: 'https://placehold.co/600x300/3B82F6/FFFFFF?text=Healthcare+Trends+Report', // Blue placeholder
    tools: ['R', 'Tableau', 'SQL', 'EHR Data'],
    githubLink: 'https://github.com/linyu2703/healthcare-trends', // Placeholder GitHub link
    details: [
      'Utilized R programming to process and clean large datasets from simulated Electronic Health Records (EHR) to identify seasonal trends in patient admissions.',
      'Constructed predictive models for resource allocation based on historical patient volume, leading to a projected 15% improvement in operational efficiency.',
    ],
  },
  {
    title: 'Investment Portfolio Optimization',
    imageUrl: 'https://placehold.co/600x300/F59E0B/FFFFFF?text=Portfolio+Optimization+Chart', // Amber placeholder
    tools: ['Python', 'SciPy', 'Pandas', 'Monte Carlo'],
    githubLink: 'https://github.com/linyu2703/portfolio-optimizer', // Placeholder GitHub link
    details: [
      'Implemented Markowitz portfolio theory using Python and the SciPy library to calculate the efficient frontier for a basket of 10 stocks.',
      'Developed a Monte Carlo simulation to forecast potential portfolio returns and risks, aiding in asset diversification strategies.',
    ],
  },
];

const skillsData = [
  // Updated to use Font Awesome 6 classes
  { name: 'Python', icon: () => <i className="fa-brands fa-python fa-xl text-blue-600"></i> }, 
  { name: 'SQL', icon: () => <i className="fa-solid fa-database fa-xl text-gray-700"></i> }, 
  { name: 'Tableau', icon: () => <i className="fa-solid fa-chart-bar fa-xl text-sky-700"></i> },
  { name: 'Power BI', icon: () => <i className="fa-solid fa-chart-area fa-xl text-amber-600"></i> }, // Changed to chart-area for visualization
  { name: 'Excel VBA', icon: () => <i className="fa-solid fa-file-excel fa-xl text-green-600"></i> },
  { name: 'EHR Systems', icon: () => <i className="fa-solid fa-hospital fa-xl text-red-600"></i> }, // Changed to hospital for healthcare/EHR
];

// Color maps for consistency
const iconColorMap = {
  education: 'text-sky-600',   
  experience: 'text-green-600', 
  projects: 'text-amber-600',   
};

const socialColorMap = {
  mail: 'text-red-600',        
  linkedin: 'text-blue-600',   
  github: 'text-gray-900',     
  resume: 'text-green-600',    
};

// ===========================================
// II. UTILITY COMPONENTS (Typewriter)
// ===========================================

const Typewriter = React.memo(({ text, typingDelay = 100, deletingDelay = 50, loopDelay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    const fullText = text;

    if (!isDeleting && index < fullText.length) {
      // Typing phase: Add one character
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(prev => prev + 1);
      }, typingDelay);
    } else if (!isDeleting && index === fullText.length) {
      // Pause after typing
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, loopDelay);
    } else if (isDeleting && index > 0) {
      // Deleting phase: Remove one character
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, index - 1));
        setIndex(prev => prev - 1);
      }, deletingDelay);
    } else if (isDeleting && index === 0) {
      // Finished deleting, restart loop
      setIsDeleting(false);
      // Short delay before starting to type again
      timeout = setTimeout(() => {}, typingDelay * 5); 
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, typingDelay, deletingDelay, loopDelay]);

  return (
    // Caret blink style is defined in the SkillCircles component's style block
    <span className="text-gray-900 border-r-4 border-gray-900 animate-pulse-caret">
      {displayText}
    </span>
  );
});

// ===========================================
// III. LAYOUT COMPONENTS (Header, Footer, Sections)
// ===========================================

// Reverted SectionHeader to use the Lucide icon component (Icon)
const SectionHeader = ({ id, title, icon: Icon }) => {
  const iconColor = iconColorMap[id] || 'text-gray-600';
  return (
    <h2 id={id} className="pt-8 mb-6 text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-gray-200 pb-4 flex items-center gap-3 sticky top-0 bg-white z-10">
      {Icon && <Icon className={`w-8 h-8 ${iconColor}`} />}
      {title}
    </h2>
  );
};

const MobileMenu = ({ isOpen, toggleMenu, sections }) => (
  <div
    className={`fixed inset-0 z-40 bg-white transform ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } transition-transform duration-300 ease-in-out md:hidden`}
  >
    <div className="flex justify-end p-6">
      <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
        <X className="w-8 h-8 text-gray-900" />
      </button>
    </div>
    <div className="flex flex-col items-center space-y-6 text-xl font-medium pt-10">
      {sections.map(({ id, name }) => (
        <a key={id} href={`#${id}`} onClick={toggleMenu} className="hover:text-gray-600 transition duration-300 py-2 w-full text-center text-gray-900">
          {name}
        </a>
      ))}
    </div>
  </div>
);

const Header = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          {/* Updated link to point to the new #about anchor */}
          <a href="#about" className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition duration-300">
            YL
          </a>
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            {sections.map(({ id, name }) => (
              <a key={id} href={`#${id}`} className="text-gray-800 hover:text-gray-600 transition duration-300">
                {name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} sections={sections} />
    </header>
  );
};

const HeroSection = () => (
  // Anchor ID is now on the section container, and scroll-mt-20 is added 
  // to offset the sticky header when navigating to this ID.
  <section 
    id="about" 
    className="pt-16 pb-4 md:pt-24 md:pb-6 scroll-mt-20"
  >
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:justify-start gap-6 w-full">
          
          {/* Profile Image - Large, Round, and with the requested thin black border */}
          <div 
            // SIZE: w-48 h-48 on mobile, w-64 h-64 on small screens and up
            className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 mb-6 md:mb-0" 
            id="profile-picture-container"
          >
            <img 
              src={pfp} 
              alt="Yu Lin Profile Photo" 
              // *** Updated for thin black border ***
              className="w-full h-full object-cover rounded-full shadow-2xl border-2 border-gray-900"
            />
          </div>
          
          {/* Introductory Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              <Typewriter text="Hi, I'm Yu Lin" typingDelay={100} loopDelay={2000} />
            </h1>
            <p className="mt-2 text-xl sm:text-2xl text-gray-800 font-medium">
              Health Informatics Analyst & Data Enthusiast
            </p>
          </div>
        </div>
        
        {/* Description and Contact Links */}
        {/* Removed id="about" from this p-tag as the parent section now holds it */}
        <p className="mt-8 text-lg text-gray-700 max-w-xl text-center md:text-left md:mt-10 mx-auto md:mx-0">
          An aspiring analyst experienced in working with big healthcare data.
        </p>
        
        {/* Contact links with individual icon colors */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium">
          <a href="mailto:yu.lin@stonybrookmedicine.edu" className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition duration-300">
            <Mail className={`w-5 h-5 ${socialColorMap.mail}`} />
            <span>Email</span>
          </a>
          <a href="https://linkedin.com/in/yu-lin-cs" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition duration-300">
            <Linkedin className={`w-5 h-5 ${socialColorMap.linkedin}`} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/linyu2703" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition duration-300">
            <Github className={`w-5 h-5 ${socialColorMap.github}`} />
            <span>GitHub</span>
          </a>
          <a href="Yu_Lin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition duration-300">
            <FileText className={`w-5 h-5 ${socialColorMap.resume}`} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

const SkillCircles = ({ skillsData }) => (
  <section id="skill-circles" className="pt-8 pb-16 md:pb-20">
    {/* Style block for the Typewriter caret only. Blob animation CSS has been removed. */}
    <style jsx="true">{`
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #111827; } /* gray-900 */
        }
        .animate-pulse-caret {
          animation: blink 0.7s step-end infinite;
        }
    `}</style>
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
      {skillsData.map((skill) => (
        <div 
          key={skill.name} 
          // ** Added group and set layout for vertical stacking **
          className="flex flex-col items-center group w-20 text-center"
        >
          <div
            // ** Increased size slightly for better visuals (w-14/h-14) **
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center 
                       border-2 border-gray-200 shadow-md transition duration-300 group-hover:border-gray-900" 
          >
            {/* The icon() function now returns a Font Awesome <i> tag */}
            {skill.icon()}
          </div>
          {/* Skill Name (appears on hover) */}
          <span 
            className="mt-2 text-xs font-semibold text-gray-800 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          >
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </section>
);


const EducationSection = () => (
  <section id="education" className="py-16 md:py-20 border-b-4 border-gray-200">
    {/* Reverted to Lucide Icon: GraduationCap */}
    <SectionHeader id="education" title="Education" icon={GraduationCap} /> 
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl border-t-4 border-gray-700 shadow-xl w-full">
      <div className="space-y-8">
        {/* Master's Degree */}
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <p className="text-xl font-bold text-gray-900">Master of Science, Applied Health Informatics</p>
            <p className="text-xs text-gray-600 font-medium mt-1 sm:mt-0 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">May 2025</p>
          </div>
          <p className="text-md text-gray-700 font-semibold mt-1">Stony Brook University</p>
        </div>

        {/* Bachelor's Degree */}
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <p className="text-xl font-bold text-gray-900">Bachelor of Science, Information Systems</p>
            <p className="text-xs text-gray-600 font-medium mt-1 sm:mt-0 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">Dec 2024</p>
          </div>
          <p className="text-md text-gray-700 font-semibold mt-1">Stony Brook University</p>
        </div>
      </div>
    </div>
  </section>
);

const ExperienceSection = ({ data }) => (
  <section id="experience" className="py-16 md:py-20 border-b-4 border-gray-200">
    {/* Reverted to Lucide Icon: Briefcase */}
    <SectionHeader id="experience" title="Experience" icon={Briefcase} />

    <div className="timeline-container max-w-4xl mx-auto">
      {data.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-10 pb-8 last:pb-0">
          {/* Vertical Line */}
          <div className="absolute top-0 left-3 md:left-4 w-1 bg-gray-200 h-full"></div>
          
          {/* Timeline Dot with Icon (75% Larger) */}
          <div 
            // W-14 H-14 is 75% larger than W-8 H-8. 
            // Positioning is adjusted to center the dot (7 units wide) over the vertical line (at left-3/left-4).
            className="absolute top-0 -left-4 md:-left-3 w-14 h-14 rounded-full bg-gray-700 border-4 border-white z-10 flex items-center justify-center shadow-md"
          >
            <i className={`fa-solid ${item.iconClass} text-white text-xl`} />
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.01] ml-4 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <span className="text-xs text-gray-600 font-medium mt-1 sm:mt-0 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">{item.duration}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-4">{item.organization}</p>
            <ul className="list-disc ml-6 space-y-3 text-gray-800 text-sm">
              {item.details.map((detail, dIndex) => (
                <li key={dIndex} dangerouslySetInnerHTML={{ __html: detail }} />
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({ data }) => (
  <section id="projects" className="py-16 md:py-20">
    {/* Reverted to Lucide Icon: Code */}
    <SectionHeader id="projects" title="Projects" icon={Code} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {data.map((project, index) => (
        <a 
          key={index} 
          href={project.githubLink} // Make the entire project card a link
          target="_blank" 
          rel="noopener noreferrer" 
          className="block h-full" // Ensure the link takes up full space
        >
          <div 
            className="h-full p-6 bg-white rounded-xl border-t-4 border-gray-700 shadow-xl 
                       transition duration-300 hover:shadow-2xl hover:scale-[1.02] 
                       border border-gray-100 cursor-pointer"
          >
            
            {/* Project Preview Image */}
            <div className="mb-4 flex justify-center">
              <img 
                src={project.imageUrl}
                alt={`Preview of ${project.title}`}
                className="w-full h-auto max-h-48 object-cover rounded-lg shadow-md border border-gray-200 transition duration-300 group-hover:shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x300/F9FAFB/374151?text=Preview+Unavailable` }}
              />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center justify-between">
                {project.title}
                {/* GitHub Icon to signal the link */}
                <Github className="w-6 h-6 text-gray-500 transition duration-300 group-hover:text-blue-600" />
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tools.map((tool, tIndex) => (
                <span 
                  key={tIndex} 
                  className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>

            <ul className="list-disc ml-5 space-y-2 text-gray-800">
              {project.details.map((detail, dIndex) => (
                <li key={dIndex} dangerouslySetInnerHTML={{ __html: detail }} />
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  </section>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-lg mb-4 font-semibold">Let's Connect.</p>

        {/* Map Embed Container: Reduced max-width to max-w-md */}
        <div className="mb-8 flex justify-center mx-auto max-w-md w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.35377212727!2d-74.0516318508202!3d40.75903219750165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1764724471478!5m2!1sen!2sus" 
            title="Location in Manhattan, NY"
            // Reduced height from 320px to 200px
            width="100%" 
            height="200" 
            // Reduced Tailwind height class from h-80 to h-52
            className="w-full h-52 rounded-xl shadow-2xl transition duration-300 border-4 border-gray-700" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="flex justify-center space-x-6 text-xl">
          <a href="https://linkedin.com/in/yu-lin-cs" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/linyu2703" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400 transition duration-300" aria-label="GitHub">
            <Github className="w-6 h-6" />
          </a>
          <a href="mailto:yu.lin@stonybrookmedicine.edu" className="text-gray-300 hover:text-red-400 transition duration-300" aria-label="Email">
            <Mail className="w-6 h-6" />
          </a>
          <a href="Yu_Lin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition duration-300" aria-label="Resume">
            <FileText className="w-6 h-6" />
          </a>
        </div>
        <p className="mt-8 text-sm text-gray-400">&copy; {currentYear} Yu Lin. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ===========================================
// IV. MAIN APPLICATION COMPONENT
// ===========================================

const App = () => {
  const sections = [
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Education' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
  ];

  // Apply base styles, font globally, and inject Font Awesome CDN
  useEffect(() => {
    document.body.className = 'antialiased text-gray-900 bg-gray-50';
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.fontFamily = 'Inter, sans-serif';

    // Inject Font Awesome 6 CDN stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(link);

    // Clean up on unmount
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header sections={sections} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <SkillCircles skillsData={skillsData} />
        <EducationSection />
        <ExperienceSection data={experienceData} />
        <ProjectsSection data={projectsData} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;