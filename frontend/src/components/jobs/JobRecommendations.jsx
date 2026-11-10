import React, { useState } from 'react';
import { 
  Compass, 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  Sparkles,
  Search,
  Building2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function JobRecommendations() {
  const { setActiveTab, setCurrentMatch, addNotification } = useApp();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const realTimeJobs = [
    {
      id: 1,
      title: "Senior Technical Project Manager",
      company: "Swiggy / Instamart",
      location: "Bengaluru, Karnataka (Hybrid)",
      salary: "₹28 - ₹42 LPA",
      type: "Full-Time",
      experience: "5-8 Years",
      posted: "2 hours ago",
      matchScore: 85,
      description: "Leading Agile engineering teams across food delivery & supply chain microservices. Responsible for sprint ceremonies, Jira workflows, Python CI/CD pipelines, and stakeholder delivery.",
      tags: ["Python", "Agile", "Scrum", "Jira", "CI/CD", "Leadership"],
      category: "Management",
      city: "Bengaluru",
      jd_text: "Job Title: Senior Technical Project Manager\nCompany: Swiggy\nLocation: Bengaluru\nRequirements: 5-8 years leading agile technical teams. Strong background with Python, Jira, sprint ceremonies, cross-functional stakeholder management, and scalable cloud deployments."
    },
    {
      id: 2,
      title: "AI / LLM Application Engineer",
      company: "Razorpay",
      location: "Bengaluru, Karnataka (Hybrid)",
      salary: "₹24 - ₹38 LPA",
      type: "Full-Time",
      experience: "2-5 Years",
      posted: "Just now",
      matchScore: 88,
      description: "Building production Generative AI & agentic payment dispute workflows. Integrating Gemini and open-source models with FastAPI, React, Redis caching, and low-latency microservices.",
      tags: ["FastAPI", "Python", "React", "Gemini API", "Docker", "SQL"],
      category: "AI / ML",
      city: "Bengaluru",
      jd_text: "Job Title: AI / LLM Application Engineer\nCompany: Razorpay\nRequirements: 2+ years building production applications with Python, FastAPI, React, LLM APIs (Gemini/OpenAI), vector search, and scalable REST services."
    },
    {
      id: 3,
      title: "Full Stack Engineer (React + Python/FastAPI)",
      company: "CRED",
      location: "Bengaluru, Karnataka (On-site)",
      salary: "₹22 - ₹35 LPA",
      type: "Full-Time",
      experience: "3-6 Years",
      posted: "5 hours ago",
      matchScore: 84,
      description: "Architect high-performance member experiences on React 18 frontend with asynchronous Python FastAPI services, PostgreSQL pooling, and Redis caching.",
      tags: ["React", "FastAPI", "Python", "TypeScript", "SQL", "Tailwind CSS"],
      category: "Engineering",
      city: "Bengaluru",
      jd_text: "Job Title: Full Stack Engineer\nCompany: CRED\nRequirements: React, TypeScript, Python, FastAPI, relational databases, clean architectural patterns, high performance, and low-latency UI delivery."
    },
    {
      id: 4,
      title: "Machine Learning & NLP Engineer",
      company: "Zomato",
      location: "Gurugram, NCR (Hybrid)",
      salary: "₹26 - ₹40 LPA",
      type: "Full-Time",
      experience: "3-7 Years",
      posted: "1 day ago",
      matchScore: 81,
      description: "Design real-time search ranking, review sentiment analysis, and recommendation engines using PyTorch, Scikit-learn, and transformer architectures.",
      tags: ["Machine Learning", "NLP", "Python", "PyTorch", "Scikit-Learn"],
      category: "AI / ML",
      city: "Gurugram",
      jd_text: "Job Title: Machine Learning & NLP Engineer\nCompany: Zomato\nRequirements: Strong computer science background, NLP algorithms, PyTorch/TensorFlow, model training, evaluation, and latency optimization."
    },
    {
      id: 5,
      title: "Cloud & DevOps Infrastructure Lead",
      company: "Freshworks",
      location: "Chennai / Hyderabad (Remote - India)",
      salary: "₹20 - ₹34 LPA",
      type: "Full-Time",
      experience: "4-8 Years",
      posted: "3 hours ago",
      matchScore: 78,
      description: "Manage AWS/GCP Kubernetes clusters, automated zero-downtime CI/CD pipelines via GitHub Actions, and Terraform infrastructure as code.",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
      category: "DevOps",
      city: "Remote",
      jd_text: "Job Title: Cloud & DevOps Infrastructure Lead\nCompany: Freshworks\nRequirements: Docker, Kubernetes, AWS, Terraform, automation scripting with Python/Bash, and 99.99% uptime maintenance."
    },
    {
      id: 6,
      title: "Data Platform Engineer",
      company: "Flipkart",
      location: "Bengaluru, Karnataka (On-site)",
      salary: "₹25 - ₹36 LPA",
      type: "Full-Time",
      experience: "3-6 Years",
      posted: "1 day ago",
      matchScore: 82,
      description: "Build petabyte-scale big data ETL pipelines with SQL, Spark, Kafka, and Snowflake for supply-chain analytics and dynamic marketplace pricing.",
      tags: ["SQL", "Data Pipelines", "ETL", "Python", "BigQuery"],
      category: "Data",
      city: "Bengaluru",
      jd_text: "Job Title: Data Platform Engineer\nCompany: Flipkart\nRequirements: Advanced SQL, Python ETL pipelines, distributed systems (Spark/Kafka), and data warehouse modeling."
    },
    {
      id: 7,
      title: "Associate AI Software Engineer (Campus & Fresh Grad)",
      company: "Infosys Digital / TCS Digital",
      location: "Pune / Hyderabad, India",
      salary: "₹9 - ₹15 LPA",
      type: "Full-Time",
      experience: "0-2 Years",
      posted: "2 days ago",
      matchScore: 89,
      description: "Entry-to-mid engineering opportunity for graduates skilled in Python, React, and modern web frameworks. Dedicated mentorship and fast-track career path.",
      tags: ["Python", "React", "JavaScript", "SQL", "Git"],
      category: "Engineering",
      city: "Pune",
      jd_text: "Job Title: Associate AI Software Engineer\nCompany: Infosys Digital\nRequirements: B.Tech / M.Tech / MSc in Computer Science or related degree. Strong foundations in Python, Object-Oriented Design, React, and SQL."
    },
    {
      id: 8,
      title: "Product Operations & Strategy Lead",
      company: "InMobi / Glance",
      location: "Bengaluru, Karnataka",
      salary: "₹18 - ₹28 LPA",
      type: "Full-Time",
      experience: "3-6 Years",
      posted: "4 hours ago",
      matchScore: 79,
      description: "Align engineering releases with global enterprise client roadmaps, evaluate operational metrics, and streamline cross-functional delivery.",
      tags: ["Project Management", "Agile", "Stakeholder Management", "Data Analysis"],
      category: "Management",
      city: "Bengaluru",
      jd_text: "Job Title: Product Operations & Strategy Lead\nCompany: InMobi\nRequirements: Experience in ad-tech or high-growth tech platforms. Strong analytical ability, stakeholder governance, and Agile delivery."
    }
  ];

  const filteredJobs = realTimeJobs.filter(job => {
    const matchesCategory = selectedFilter === "All" || job.category === selectedFilter;
    const matchesLocation = selectedLocation === "All" || job.city === selectedLocation;
    const matchesSearch = !searchQuery.trim() || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const handleMatchWithThisJob = (job) => {
    addNotification(`Loaded "${job.title} (${job.company})" into Matcher!`, 'success');
    setActiveTab('match');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Real-Time Indian Tech Job Opportunities</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active verified openings across Bengaluru, Hyderabad, Gurugram, Pune & Remote with competitive packages in <strong>Indian Rupees (₹ LPA)</strong>.
          </p>
        </div>

        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Openings Active Today</span>
        </div>
      </div>

      {/* Search & Location Filter Bar */}
      <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company (Swiggy, Razorpay, CRED...), or skill (Python, React)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Indian Hubs</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Gurugram">Gurugram (NCR)</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote (India)</option>
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          {["All", "AI / ML", "Engineering", "Management", "DevOps", "Data"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Top Meta: Title, Company, Match Score */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{job.company}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
                    <Sparkles className="w-3 h-3 fill-current" />
                    {job.matchScore}% Match
                  </span>
                </div>
              </div>

              {/* Badges: Salary (INR LPA), Location, Experience, Posted */}
              <div className="flex flex-wrap items-center gap-2 text-xs mt-3">
                <span className="flex items-center gap-1 font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{job.salary}</span>
                </span>
                
                <span className="flex items-center gap-1 text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {job.location}
                </span>

                <span className="px-2 py-1 rounded-lg bg-slate-900 text-slate-400 text-[11px] border border-slate-800 font-mono">
                  {job.experience}
                </span>

                <span className="flex items-center gap-1 text-[11px] text-slate-500 ml-auto">
                  <Clock className="w-3 h-3" />
                  {job.posted}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {job.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Verified package & active recruiters
              </span>

              <button
                onClick={() => handleMatchWithThisJob(job)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-95 transition-all"
              >
                <span>Analyze Match with My Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
