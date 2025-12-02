import React, { useState, useEffect, useCallback } from 'react';
// Re-importing Lucide icons needed for section headers
import { Menu, X, Mail, Linkedin, Github, FileText, Briefcase, GraduationCap, Code } from 'lucide-react'; 

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
          <a href="#hero" className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition duration-300">
            Yu Lin
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
  <section id="hero" className="pt-16 pb-4 md:pt-24 md:pb-6">
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center md:flex-row md:justify-start gap-6 w-full">
          
          {/* Profile Image with Dynamic Wavy Border */}
          <div 
            className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 mb-6 md:mb-0 shadow-2xl transition duration-500 hover:scale-[1.05]"
            id="profile-picture-container"
          >
            <div className="w-full h-full blob-wrapper">
              <img 
                src="https://placehold.co/160x160/4f46e5/ffffff?text=YL" 
                alt="Yu Lin Profile Photo" 
                className="blob-image"
              />
            </div>
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
        <p id="about" className="mt-8 text-lg text-gray-700 max-w-xl text-center md:text-left md:mt-10 mx-auto md:mx-0">
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
    {/* Style block for both Typewriter caret and Wavy Blob animation */}
    <style jsx="true">{`
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #111827; } /* gray-900 */
        }
        .animate-pulse-caret {
          animation: blink 0.7s step-end infinite;
        }

        /* Wavy Blob Animation - Creates the moving organic shape */
        @keyframes wobble {
          0%, 100% {
            clip-path: polygon(50% 0%, 80% 10%, 100% 30%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 30%, 20% 10%);
          }
          33% {
            clip-path: polygon(65% 5%, 95% 25%, 90% 55%, 70% 85%, 40% 95%, 20% 80%, 5% 50%, 15% 20%);
          }
          66% {
            clip-path: polygon(40% 5%, 85% 15%, 85% 40%, 75% 75%, 50% 95%, 15% 70%, 10% 45%, 20% 15%);
          }
        }

        /* Wrapper for the "border" effect (background color) */
        .blob-wrapper {
            background: linear-gradient(135deg, #10B981, #3B82F6); /* Green and Blue gradient for border */
            border-radius: 9999px; /* Fallback for older browsers (not used due to clip-path) */
            padding: 5px; /* Border thickness */
            transition: transform 0.3s ease-in-out;
            will-change: transform;
        }

        /* Image element with the actual animated clip-path */
        .blob-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: wobble 15s ease-in-out infinite alternate;
            clip-path: polygon(50% 0%, 80% 10%, 100% 30%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 30%, 20% 10%);
            display: block;
        }
    `}</style>
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
      {skillsData.map((skill) => (
        <div 
          key={skill.name} 
          className="group relative flex flex-col items-center"
        >
          <div
            // Size is small: w-10 h-10 sm:w-12 sm:h-12
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center 
                       border-2 border-gray-200 shadow-md transition-all duration-300 
                       hover:shadow-lg hover:border-gray-400 group-hover:bg-gray-50 
                       transform group-hover:scale-110" 
          >
            {/* The icon() function now returns a Font Awesome <i> tag */}
            {skill.icon()}
          </div>
          <p className="mt-2 text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition duration-200 absolute -bottom-4 sm:-bottom-5 whitespace-nowrap">
            {skill.name}
          </p>
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
  const mapUrl = "https://www.google.com/maps/place/Manhattan,+New+York,+NY/@40.759089,-73.985227,14z/data=!4m6!3m5!1s0x89c2588f046ee661:0xa0b3281fcecc08c!8m2!3d40.7831!4d-73.9712!16zL2m/MDJwbDM?hl=en";
  const mapImageUrl = "https://placehold.co/400x200/222222/60A5FA?text=+++%0A__+%0A+++%0A__+%0A+++&font=roboto";

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-lg mb-4 font-semibold">Let's Connect.</p>

        <div className="mb-8 flex justify-center">
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" 
             className="block rounded-lg overflow-hidden shadow-2xl transition duration-300 hover:scale-[1.02] hover:shadow-white/30 max-w-xs w-full">
            <img 
              src={mapImageUrl} 
              alt="Click to view Manhattan, NY on Google Maps" 
              className="w-full h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/4B5563/FFFFFF?text=View%20Location%20on%20Map` }}
            />
          </a>
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