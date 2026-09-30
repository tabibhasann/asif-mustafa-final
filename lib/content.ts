export type PracticeArea = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  scholar: string;
  github: string;
  youtube?: string;
  headline: string;
  introduction: string;
  portrait?: string;
  portraitAlt?: string;
  cvUrl?: string;
  biography: string[];
  metrics: { value: string; label: string }[];
  education: { degree: string; institution: string; note: string; cgpa?: string; tgpa?: string; gradeScale?: string; relevantCourses?: string[] }[];
};

type IntroCopy = {
  eyebrow: string;
  title: string;
  intro: string;
};

export type SiteSettings = {
  seo: {
    title: string;
    description: string;
    socialImage: string;
    socialImageAlt: string;
  };
  home: {
    heroEyebrow: string;
    heroImage: string;
    heroImageAlt: string;
    heroImageLabel: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    profileEyebrow: string;
    profileTitle: string;
    practiceEyebrow: string;
    practiceTitle: string;
    practiceIntro: string;
    practiceAction: string;
    projectsEyebrow: string;
    projectsTitle: string;
    projectsIntro: string;
    projectsAction: string;
    storiesEyebrow: string;
    storiesTitle: string;
    storiesIntro: string;
    storiesAction: string;
    publicationsEyebrow: string;
    publicationsTitle: string;
    publicationsIntro: string;
    publicationsAction: string;
    insightsEyebrow: string;
    insightsTitle: string;
    insightsIntro: string;
    insightsAction: string;
    contextEyebrow: string;
    contextTitle: string;
    contexts: string[];
    venuesLabel: string;
    scholarlyVenues: string[];
  };
  pages: {
    about: IntroCopy;
    practice: IntroCopy;
    experience: IntroCopy;
    projects: IntroCopy;
    publications: IntroCopy;
    stories: IntroCopy;
    insights: IntroCopy;
    blogs: IntroCopy;
    credentials: IntroCopy;
  };
  about: {
    profileEyebrow: string;
    profileTitle: string;
    educationEyebrow: string;
    educationTitle: string;
    educationIntro: string;
    relevantCoursesLabel: string;
    certificationsEyebrow: string;
    certificationsTitle: string;
    certificationsIntro: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principlesIntro: string;
    principles: { title: string; text: string }[];
  };
  footer: {
    eyebrow: string;
    title: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export type Experience = {
  slug: string;
  organization: string;
  role: string;
  period: string;
  engagement: string;
  projectValue?: string;
  description: string;
  impacts: string[];
  contribution?: string;
  result?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  summary: string;
  image: string;
  imageAlt?: string;
  stack: string[];
  featured?: boolean;
  status?: string;
  context: string;
  challenge: string;
  approach: string[];
  outcome: string;
  stakeholders?: string[];
  relevance?: string;
  detailLabels?: Partial<Record<"context" | "challenge" | "approach" | "outcome", string>>;
  detailHeadings?: Partial<Record<"context" | "challenge" | "approach" | "outcome", string>>;
  recordLabels?: Partial<Record<"heading" | "primaryField" | "connectedFields" | "status" | "problem" | "technologies" | "stakeholders" | "relevance", string>>;
  updatedAt?: string;
};

export type ProjectPreview = Pick<
  Project,
  "slug" | "title" | "category" | "categories" | "summary" | "image" | "stack" | "featured" | "updatedAt"
>;

export type Publication = {
  title: string;
  venue: string;
  year: string;
  type: "Journal article" | "Conference paper" | "Dataset" | "Book chapter" | "Working paper";
  status: "Published" | "In press" | "Under review" | "Under submission" | "Submitted" | "Ongoing" | (string & {});
  keywords: string[];
  href?: string;
};

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  featured?: boolean;
  stack: string[];
  intro: string;
  sections: { title: string; body: string }[];
  content?: import("@portabletext/types").PortableTextBlock[];
  publishedAt?: string;
  dateLabel?: string;
  readingTime?: string;
  updatedAt?: string;
};

export type StoryPreview = Pick<
  Story,
  "slug" | "title" | "category" | "excerpt" | "image" | "featured" | "stack" | "publishedAt" | "dateLabel" | "readingTime" | "updatedAt"
>;

export type Insight = {
  slug: string;
  title: string;
  category: string;
  date: string;
  publishedAt?: string;
  readingTime: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  featured?: boolean;
  body: { title: string; paragraphs: string[] }[];
  content?: import("@portabletext/types").PortableTextBlock[];
  updatedAt?: string;
};

export type InsightPreview = Pick<
  Insight,
  "slug" | "title" | "category" | "date" | "publishedAt" | "readingTime" | "excerpt" | "image" | "imageAlt" | "featured" | "updatedAt"
>;

export type Credential = {
  title: string;
  issuer: string;
  area: string;
  year?: string;
  credentialId?: string;
  href?: string;
  stack?: string[];
  courseInfo?: string;
};

export const profile: Profile = {
  name: "Md Asif Mustafa",
  shortName: "Asif Mustafa",
  role: "Researcher · Data Scientist · Technical Advisor",
  location: "Dhaka, Bangladesh",
  email: "pavelasif66@gmail.com",
  phone: "+8801797068057",
  linkedin: "https://www.linkedin.com/in/md-asif-mustafa-426669156/",
  scholar: "https://scholar.google.com/citations?user=FjkMyr8AAAAJ&hl=en",
  github: "https://github.com/Asif-Mustafa-svg",
  headline: "Evidence for better industrial decisions.",
  introduction:
    "I use engineering knowledge, statistics and AI to investigate industrial problems and build tools that support practical decisions.",
  biography: [
    "With a B.Sc. in Leather Engineering and advanced study in Applied Statistics and Data Science, my work has grown from a focused engineering foundation into a multidisciplinary practice spanning manufacturing, data systems, research and sustainability.",
    "I have contributed across leather, textiles, footwear, food and beverage, transportation, software and cyber-physical systems through national and international work. That range has taught me to examine not only a technical problem, but also the people, institutions, processes and environmental conditions around it.",
    "For me, useful innovation is not unnecessary complexity. It is the balance between what is technically possible, what is practically needed and what is responsible for people and the world around us.",
  ],
  metrics: [
    { value: "5+", label: "Years in research" },
    { value: "01", label: "International project" },
    { value: "03", label: "National projects" },
    { value: "B.Sc.", label: "Leather Engineering · KUET" },
  ],
  education: [
    {
      degree: "M.Sc. in Applied Statistics & Data Science",
      institution: "Jahangirnagar University",
      note: "Statistical modelling, machine learning and decision analysis",
    },
    {
      degree: "B.Sc. in Leather Engineering",
      institution: "Khulna University of Engineering & Technology (KUET)",
      note: "Industrial processing, quality, materials and manufacturing systems",
    },
  ],
};

export const siteSettings: SiteSettings = {
  seo: {
    title: "Md Asif Mustafa | Research, Data Science and Industrial Systems",
    description: "Md Asif Mustafa applies engineering knowledge, statistics and AI to practical questions in research and industry.",
    socialImage: "/images/og-asif-mustafa.png",
    socialImageAlt: "Md Asif Mustafa · Research · Data Science · Industrial Systems",
  },
  home: {
    heroEyebrow: "Researcher · Data Scientist · Technical Advisor",
    heroImage: "/images/hero.jpg",
    heroImageAlt: "An engineering researcher reviewing operational data in a modern industrial facility",
    heroImageLabel: "Engineering research and data science for industry",
    heroPrimaryCta: "Selected work",
    heroSecondaryCta: "Professional practice",
    profileEyebrow: "Professional profile",
    profileTitle: "Engineering insight, strengthened by data.",
    practiceEyebrow: "Research & professional practice",
    practiceTitle: "Research and technical practice.",
    practiceIntro: "Research, analysis and engineering across connected areas.",
    practiceAction: "Explore practice",
    projectsEyebrow: "Selected projects",
    projectsTitle: "Selected data and engineering projects.",
    projectsIntro: "Five examples of work in data engineering, search, machine learning, analytics and supply chains.",
    projectsAction: "View all projects",
    storiesEyebrow: "My Stories",
    storiesTitle: "Lessons from fieldwork and implementation.",
    storiesIntro: "Four short cases from industrial research, digital operations, energy audits and environmental studies.",
    storiesAction: "View all stories",
    publicationsEyebrow: "Publications",
    publicationsTitle: "Selected publications and datasets.",
    publicationsIntro: "Research on workplace safety, sustainable manufacturing, machine learning, energy and environmental decisions.",
    publicationsAction: "View all publications",
    insightsEyebrow: "Blogs",
    insightsTitle: "Notes on research and practice.",
    insightsIntro: "Short articles on research methods, data systems and industrial decision-making.",
    insightsAction: "Read all blogs",
    contextEyebrow: "Context of work",
    contextTitle: "Work across manufacturing, public institutions and research.",
    contexts: [
      "Leather & footwear",
      "Manufacturing",
      "Supply chain & logistics",
      "Energy & environment",
      "Public-sector operations",
      "Research institutions",
    ],
    venuesLabel: "Selected research & scholarly venues",
    scholarlyVenues: [
      "Elsevier",
      "Emerald",
      "Springer Nature",
      "IEEE",
      "IEOM Society",
      "UNSW Australia · CIE",
    ],
  },
  pages: {
    about: {
      eyebrow: "About",
      title: "Engineering, evidence and responsible systems.",
      intro: "A multidisciplinary profile spanning industrial engineering, applied statistics, data science and technical advisory work.",
    },
    practice: {
      eyebrow: "Research & professional practice",
      title: "Connected areas of practice.",
      intro: "Research, analytics and engineering applied to practical industrial questions.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Research, advisory and operational work.",
      intro: "Selected international and national contributions across research, digital operations and manufacturing.",
    },
    projects: {
      eyebrow: "Selected projects",
      title: "Applied systems and research.",
      intro: "A filterable record of data, AI, analytics, supply chain and industrial systems work.",
    },
    publications: {
      eyebrow: "Publications",
      title: "Research and scholarly record.",
      intro: "Journal articles, conference papers and datasets across industry, sustainability and intelligent systems.",
    },
    stories: {
      eyebrow: "My Stories",
      title: "Cases from research and practice.",
      intro: "Concise accounts of the setting, decisions and lessons behind selected technical work.",
    },
    insights: {
      eyebrow: "Insights",
      title: "Ideas, experiences and the work behind them.",
      intro: "Blogs and stories on research methods, technical work and decisions shaped by field experience.",
    },
    blogs: {
      eyebrow: "Blogs",
      title: "Articles on research and practice.",
      intro: "Writing on engineering, data science and the questions that connect them.",
    },
    credentials: {
      eyebrow: "Credentials",
      title: "Professional learning and certification.",
      intro: "Selected continuing study across data, artificial intelligence and industrial systems.",
    },
  },
  about: {
    profileEyebrow: "Professional profile",
    profileTitle: "A path from leather engineering to applied statistics and data science.",
    educationEyebrow: "Education",
    educationTitle: "Engineering foundations, advanced through data science.",
    educationIntro: "Formal study provides the technical grounding; applied work connects it to people, organisations and operating systems.",
    relevantCoursesLabel: "Relevant courses",
    certificationsEyebrow: "Professional certifications",
    certificationsTitle: "Continuing study and technical development.",
    certificationsIntro: "Selected certifications across data science, artificial intelligence and industrial systems.",
    principlesEyebrow: "Professional approach",
    principlesTitle: "How I approach the work.",
    principlesIntro: "Engineering context, statistical analysis and practical use shape my research and technical work.",
    principles: [
      { title: "Start with the decision", text: "Define the question, constraints and evidence needed before selecting a technical method." },
      { title: "Keep evidence traceable", text: "Connect recommendations to source records, assumptions and analytical choices." },
      { title: "Design for practical use", text: "Build systems around real responsibilities, workflows and operating conditions." },
      { title: "Measure responsible progress", text: "Treat productivity, safety and environmental impact as connected priorities." },
    ],
  },
  footer: {
    eyebrow: "Research & professional enquiries",
    title: "Discuss a research or data challenge.",
    summary: "Research, data science and industrial systems practice based in Dhaka, Bangladesh.",
    primaryCta: "Start a conversation",
    secondaryCta: "Request CV",
  },
};

export const practiceAreas: PracticeArea[] = [
  {
    number: "01",
    slug: "data-science-analytics",
    title: "Data Science & Analytics",
    summary:
      "Evidence-led analysis for research, operations and management decisions.",
    capabilities: [
      "Quantitative and qualitative analysis",
      "Statistical and multivariate modelling",
      "Predictive analytics and machine learning",
      "Data mining, OLAP and decision analytics",
    ],
  },
  {
    number: "02",
    slug: "ai-data-engineering",
    title: "AI, Data Engineering & Digital Solutions",
    summary:
      "Reliable data foundations and intelligent systems built around real workflows.",
    capabilities: [
      "Cloud data platforms and pipelines",
      "AI and multi-agent systems",
      "RAG, NLP and intelligent automation",
      "APIs, SaaS and digital operations systems",
    ],
  },
  {
    number: "03",
    slug: "industrial-safety-risk",
    title: "Industrial Engineering, Safety & Risk",
    summary:
      "Operational improvement that considers productivity, safety and people together.",
    capabilities: [
      "Lean systems and process optimisation",
      "OHS, ergonomics and risk assessment",
      "KPI development and analysis",
      "Quality management and industrial safety",
    ],
  },
  {
    number: "04",
    slug: "supply-chain-logistics",
    title: "Supply Chain, Logistics & Transportation Systems",
    summary:
      "Analytics and optimisation for complex, connected operational networks.",
    capabilities: [
      "Operations research and stochastic modelling",
      "Optimisation, simulation and digital twins",
      "Forecasting, network design and scheduling",
      "Logistics and transportation analytics",
    ],
  },
  {
    number: "05",
    slug: "sustainability-energy",
    title: "Environmental & Sustainability Systems",
    summary:
      "Practical research for resource efficiency and environmental responsibility.",
    capabilities: [
      "GIS, EIA and life-cycle assessment",
      "Environmental modelling",
      "Resource-efficiency analysis",
      "SEM, FTIR, UV-Vis and analytical testing",
    ],
  },
  {
    number: "06",
    slug: "energy-systems",
    title: "Energy Systems",
    summary: "Analysis and modelling to inform practical energy decisions.",
    capabilities: ["Energy modelling", "Resource-efficiency analysis"],
  },
];

export const experiences: Experience[] = [
  {
    slug: "susleather",
    organization: "DANIDA-funded SusLeather Project · AUST and SDU",
    role: "Research Assistant · Full-time",
    period: "February 2024 to present",
    engagement: "International research collaboration",
    projectValue: "US$660,000 research programme",
    description:
      "Applied research across occupational safety, lean operations, sustainability and data systems for Bangladesh’s leather sector.",
    impacts: [
      "Collected and analysed mixed-method evidence from 200+ stakeholders through interviews, surveys, focus groups and field observation.",
      "Led and supported 30 field studies, 20 audits, 10 training sessions and five workshops with university and industry partners.",
      "Built traceable data-management, analytics and reporting workflows for statistical modelling, machine learning and decision support.",
    ],
  },
  {
    slug: "nbr-double-entry",
    organization: "NBR Double-Entry Data Project",
    role: "Project Lead · Part-time",
    period: "May 2026 to present",
    engagement: "National digital operations programme",
    projectValue: "US$1.3 million national programme",
    description:
      "A distributed management and training platform supporting large-scale tax-entry operations across Bangladesh.",
    impacts: [
      "Led development of a web-based management information system for 900+ operators, 20+ supervisors and 24 regional operations.",
      "Designed data workflows, analytics and reporting for monitoring, coordination and management decisions.",
      "Directed a training platform with operational guidance and practical learning resources for distributed users.",
    ],
  },
  {
    slug: "hexa-engineering",
    organization: "Hexa Engineering Limited",
    role: "Research Advisor · Part-time",
    period: "January 2026 to present",
    engagement: "Industrial research advisory",
    description:
      "Research and analytical support for energy, process and operational improvement questions.",
    impacts: [
      "Conducted industrial field visits and analysed energy-consumption and operational data for audit studies.",
      "Prepared technical energy-audit and optimisation reports identifying efficiency opportunities.",
      "Advised on process optimisation, computational analysis and data-led operational improvement.",
    ],
  },
  {
    slug: "aria-sourcing",
    organization: "ARIA · Sourcing Company",
    role: "Engineering Trainee",
    period: "October 2022 to October 2023",
    engagement: "Footwear and leather-goods sourcing",
    description:
      "Quality, production and supply-chain coordination across multi-factory international orders.",
    impacts: [
      "Supported quality assurance across five manufacturing facilities and monitored materials, specifications and compliance.",
      "Coordinated 10+ international orders from purchasing and production through inspection, shipment and delivery.",
      "Analysed production, purchasing and logistics records to identify quality, scheduling and procurement issues.",
    ],
  },
  {
    slug: "fb-footwear",
    organization: "FB Footwear Limited",
    role: "Assistant Merchandiser",
    period: "August 2022 to October 2022",
    engagement: "Manufacturing and merchandising",
    description:
      "Production planning, costing and coordination between buyers and factories for international footwear orders.",
    impacts: [
      "Prepared 30+ bills of materials covering components, specifications and production requirements.",
      "Coordinated planning and scheduling for three international clients across materials, capacity and delivery.",
      "Supported product costing, engineering alternatives and production-feasibility decisions.",
    ],
  },
  {
    slug: "kuet-ugc",
    organization: "KUET · UGC-funded Research Project",
    role: "Research Assistant",
    period: "December 2021 to July 2022",
    engagement: "Environmental and public-health research",
    description:
      "Environmental impact research on industrial-waste bioaccumulation in the Bhairab River system.",
    impacts: [
      "Conducted an environmental impact assessment and collected evidence from 100+ affected people.",
      "Characterised environmental samples using SEM, FTIR, GC-MS, HPLC and AAS methods.",
      "Applied statistical analysis to connect contaminant evidence with ecosystem and public-health risks.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "tannery-etl-rag-analytics",
    title: "Tannery ETL Pipeline, RAG Chatbot & Analytics Platform",
    category: "Data Systems",
    categories: ["Data Systems", "NLP & Search", "Business Intelligence"],
    summary:
      "An Excel-to-AI pipeline combining structured reporting, retrieval and conversational analysis for tannery operations.",
    image: "/images/fieldwork.jpg",
    stack: ["Python", "PostgreSQL", "LangChain", "FastAPI", "Streamlit"],
    featured: true,
    context:
      "Operational records lived across spreadsheets and manual reporting routines, making consistent monitoring and retrieval difficult.",
    challenge:
      "Create one practical path from raw operational files to searchable evidence, dashboards and grounded questions and answers.",
    approach: [
      "Built a repeatable data-cleaning and transformation flow with Python and Pandas.",
      "Stored structured records in PostgreSQL and retrieval-ready content in ChromaDB.",
      "Connected a FastAPI service, analytics interface and RAG workflow for reporting and conversational exploration.",
    ],
    outcome:
      "The project established a reusable architecture for faster reporting, traceable evidence retrieval and continued operational validation.",
  },
  {
    slug: "amazon-nlp-vector-search",
    title: "Amazon-scale NLP & Vector Search Pipeline",
    category: "NLP & Search",
    categories: ["NLP & Search", "Machine Learning", "Data Systems"],
    summary:
      "A large-scale language-processing workflow for sentiment-rich semantic retrieval across 440,000+ product reviews.",
    image: "/images/semantic-search.jpg",
    stack: ["spaCy", "DistilBERT", "MongoDB Atlas", "SBERT", "FAISS"],
    featured: true,
    context:
      "Large review collections are difficult to explore when keyword search, sentiment and semantic meaning are handled separately.",
    challenge:
      "Prepare a large text corpus for both analytical modelling and fast semantic discovery.",
    approach: [
      "Normalised and enriched review text through a reproducible NLP pipeline.",
      "Combined transformer embeddings with vector indexes for similarity search.",
      "Added sentiment features to support downstream analysis and model development.",
    ],
    outcome:
      "A search-ready, sentiment-aware dataset and retrieval layer for product intelligence experiments.",
  },
  {
    slug: "hybrid-recommendation-system",
    title: "Hybrid Recommendation System",
    category: "Machine Learning",
    categories: ["Machine Learning", "Data Systems"],
    summary:
      "A recommendation engine combining content similarity, sparse collaborative filtering and score fusion.",
    image: "/images/recommendation-system.jpg",
    stack: ["TF-IDF", "NearestNeighbors", "Sparse CF", "Cosine similarity"],
    context:
      "Product-review data contains both descriptive content and behavioural patterns that single-method recommenders can miss.",
    challenge:
      "Balance content-based relevance with collaborative signals across a large, sparse catalogue.",
    approach: [
      "Built content representations from review and product text.",
      "Modelled sparse relationships between users and items for collaborative ranking.",
      "Fused multiple similarity signals into a consistent recommendation score.",
    ],
    outcome:
      "A modular hybrid architecture designed for comparative evaluation and later productisation.",
  },
  {
    slug: "crypto-streaming-anomaly-detection",
    title: "Real-time Streaming & Anomaly Detection Pipeline",
    category: "Streaming Analytics",
    categories: ["Streaming Analytics", "Machine Learning", "Data Systems"],
    summary:
      "A live market-data workflow for detecting price anomalies, regime change and statistical drift.",
    image: "/images/anomaly-detection.jpg",
    stack: ["WebSockets", "Python", "SciPy", "CUSUM", "Isolation Forest"],
    context:
      "Streaming data requires detection methods that remain interpretable while adapting to rapidly changing conditions.",
    challenge:
      "Combine rolling statistical checks, drift detection and machine-learning signals in one observable pipeline.",
    approach: [
      "Ingested live BTC/USDT data through WebSockets.",
      "Applied rolling statistics and CUSUM for short- and medium-term change detection.",
      "Used Isolation Forest as a complementary unsupervised anomaly signal.",
    ],
    outcome:
      "A real-time analytical prototype for comparing anomaly methods under changing market behaviour.",
  },
  {
    slug: "amazon-rag-semantic-search",
    title: "Amazon Review RAG & Semantic Search Workflow",
    category: "NLP & Search",
    categories: ["NLP & Search", "Data Systems", "Machine Learning"],
    summary:
      "A grounded question-answering workflow over product reviews using local language models and vector retrieval.",
    image: "/images/data-systems.jpg",
    stack: ["LangChain", "Llama 3", "MongoDB Vector Search", "FAISS", "SBERT"],
    context:
      "Review analytics often exposes charts but makes it difficult to trace a question back to the underlying customer evidence.",
    challenge:
      "Create conversational exploration that remains anchored to retrieved review content.",
    approach: [
      "Prepared review chunks and embeddings for hybrid vector retrieval.",
      "Orchestrated a local language model with prompts that cite the retrieved source material.",
      "Designed the workflow for comparison across MongoDB Vector Search and FAISS.",
    ],
    outcome:
      "A working prototype for exploring product reviews while keeping answers tied to the source material.",
  },
  {
    slug: "multi-agent-resilient-supply-chains",
    title: "Graph-based Multi-agent RL for Resilient Supply Chains",
    category: "Supply Chain",
    categories: ["Supply Chain", "Machine Learning", "Data Systems"],
    summary:
      "A research system combining graph representation, latent modelling and multi-agent learning for disruption response.",
    image: "/images/supply-chain.jpg",
    stack: ["PyTorch", "VAE", "GIN", "MARL", "Airflow", "Docker"],
    featured: true,
    context:
      "Supply-chain disruptions propagate through connected actors, inventories and decisions rather than isolated time series.",
    challenge:
      "Represent network structure and coordinate adaptive policies under changing disruption scenarios.",
    approach: [
      "Encoded supply-chain relationships with graph neural representations.",
      "Used latent-variable modelling to capture changing operational states.",
      "Trained multi-agent policies and evaluated them against disruption and recovery scenarios.",
    ],
    outcome:
      "A research architecture for studying resilient coordination, shortage exposure and recovery trade-offs.",
  },
  {
    slug: "amazon-review-analytics-dashboard",
    title: "Amazon Review Analytics Dashboard",
    category: "Business Intelligence",
    categories: ["Business Intelligence", "NLP & Search"],
    summary:
      "An interactive dashboard for product performance, sentiment distribution and ASIN-level review exploration.",
    image: "/images/business-intelligence.jpg",
    stack: ["Streamlit", "Matplotlib", "Pandas", "WordCloud"],
    context:
      "Large review datasets need an accessible analytical layer before patterns can inform product or modelling decisions.",
    challenge:
      "Present category, product and sentiment signals without hiding the underlying review distribution.",
    approach: [
      "Built reusable filters and product-level analytical views.",
      "Combined distribution, trend and text-summary visualisations.",
      "Designed the dashboard for fast exploratory analysis across a large review corpus.",
    ],
    outcome:
      "A practical analytical interface supporting product comparison and downstream model discovery.",
  },
  {
    slug: "gcp-churn-analytics-pipeline",
    title: "GCP Churn Prediction & Analytics Pipeline",
    category: "Cloud Data",
    categories: ["Cloud Data", "Machine Learning", "Data Systems"],
    summary:
      "A scalable cloud architecture for customer-data ingestion, transformation, modelling and reporting.",
    image: "/images/cloud-data.jpg",
    stack: ["Google Cloud Storage", "BigQuery", "SQLAlchemy", "Python"],
    context:
      "Customer-churn analysis becomes difficult when source data, feature preparation and reporting are disconnected.",
    challenge:
      "Design a cloud-native path that keeps analytical data, model inputs and business reporting aligned.",
    approach: [
      "Separated raw, curated and analytics-ready data layers.",
      "Designed BigQuery transformations and feature preparation workflows.",
      "Connected modelling outputs to a reporting-ready analytical schema.",
    ],
    outcome:
      "A cloud data flow that supports churn analysis and repeated model testing.",
  },
];

export const publications: Publication[] = [
  {
    title: "Workplace safety barriers in global supply chains: Insights from the leather tanning industry",
    venue: "Journal of Safety and Sustainability",
    year: "2026",
    type: "Journal article",
    status: "Published",
    keywords: ["Occupational safety", "Leather supply chain", "Institutional analysis"],
    href: "https://portal.findresearcher.sdu.dk/da/publications/workplace-safety-barriers-in-global-supply-chain-insights-from-th/",
  },
  {
    title: "A systematic review of occupational health and safety improvements in sustainable leather manufacturing practices",
    venue: "Discover Sustainability · Springer Nature",
    year: "2025",
    type: "Journal article",
    status: "Published",
    keywords: ["OHS", "Sustainable manufacturing", "Systematic review"],
  },
  {
    title: "Involving employees in reducing musculoskeletal discomfort while implementing lean: Insights from the ready-made garments industry",
    venue: "Journal of Productivity and Performance Management · Emerald",
    year: "2025",
    type: "Journal article",
    status: "Published",
    keywords: ["Lean", "Ergonomics", "Employee participation"],
  },
  {
    title: "Implementation of machine learning in product development in the leather manufacturing industry to improve productivity and efficiency",
    venue: "51st International Conference on Computers & Industrial Engineering",
    year: "2024",
    type: "Conference paper",
    status: "Published",
    keywords: ["Machine learning", "Product development", "Manufacturing"],
  },
  {
    title: "Sustainable leather tanning with Pontederia crassipes tannin: A promising eco-friendly alternative",
    venue: "Cleaner Engineering and Technology · Elsevier",
    year: "2024",
    type: "Journal article",
    status: "Published",
    keywords: ["Cleaner production", "Tanning", "Circular materials"],
  },
  {
    title: "Analyzing carbon dioxide emissions and energy sources in Bangladesh using statistical and machine-learning forecasting models",
    venue: "IEOM Society International",
    year: "2024",
    type: "Conference paper",
    status: "Published",
    keywords: ["Forecasting", "Energy systems", "Machine learning"],
    href: "https://ieomsociety.org/proceedings/bangladesh2024/220.pdf",
  },
  {
    title: "Prioritizing environmental management practices in Bangladesh through multi-criteria decision analysis",
    venue: "IEOM Society International",
    year: "2024",
    type: "Conference paper",
    status: "Published",
    keywords: ["MCDA", "Environmental management", "Decision analysis"],
  },
  {
    title: "Towards sustainable tanning: Identifying and prioritizing barriers to achieving LWG certification in Savar Tannery Estate",
    venue: "IEOM Society International",
    year: "2024",
    type: "Conference paper",
    status: "Published",
    keywords: ["Certification", "Sustainable tanning", "Barrier analysis"],
  },
  {
    title: "Recipe and properties of leathers",
    venue: "Mendeley Data",
    year: "2024",
    type: "Dataset",
    status: "Published",
    keywords: ["Leather processing", "Product development", "Experimental data"],
    href: "https://data.mendeley.com/datasets/gwj6y2zt9d/1",
  },
];

export const stories: Story[] = [
  {
    slug: "evidence-for-safer-tannery-operations",
    title: "Building evidence for safer, leaner tannery operations",
    category: "Field research",
    excerpt:
      "How mixed-method research, audits and analytical systems can support responsible industrial improvement.",
    image: "/images/fieldwork.jpg",
    stack: ["Mixed methods", "OHS", "Lean", "Statistical analysis"],
    intro:
      "Industrial improvement is rarely a single-model problem. It requires field evidence, technical analysis and a clear understanding of how people actually work.",
    sections: [
      {
        title: "The setting",
        body: "The SusLeather collaboration brings research institutions and industry together around occupational health, lean operations and sustainability in Bangladesh’s tannery sector.",
      },
      {
        title: "The work",
        body: "The research combines interviews, surveys, field observation, audits, training activities and operational data. The aim is to understand both measurable conditions and the institutional reasons behind them.",
      },
      {
        title: "What the process teaches",
        body: "Useful recommendations emerge when quantitative results are read alongside worker experience, management practice and operational constraints, not when one source is treated as complete evidence.",
      },
    ],
  },
  {
    slug: "distributed-data-operations",
    title: "Designing data operations for a distributed national programme",
    category: "Digital systems",
    excerpt:
      "A management and training platform that gives operators, supervisors and regional teams a shared set of records.",
    image: "/images/data-systems.jpg",
    stack: ["MIS", "Workflow design", "Analytics", "Training systems"],
    intro:
      "A distributed operation needs more than a dashboard. Roles, workflows, training and escalation paths must work together.",
    sections: [
      {
        title: "The operating challenge",
        body: "Hundreds of users across regional teams need consistent processes while supervisors need timely information about volume, quality and exceptions.",
      },
      {
        title: "The system response",
        body: "The programme combines a management information system with structured training content, operational guidance and reporting designed around actual responsibilities.",
      },
      {
        title: "A principle for scale",
        body: "Technology scales when the operating model is clear. A useful platform makes work easier to complete, review and improve, not simply easier to count.",
      },
    ],
  },
  {
    slug: "field-evidence-for-energy-decisions",
    title: "Turning field evidence into practical energy decisions",
    category: "Energy advisory",
    excerpt:
      "Connecting site observations, consumption data and engineering judgement in a clear set of findings and priorities.",
    image: "/images/sustainability.jpg",
    stack: ["Energy audit", "Field study", "Optimisation", "Technical reporting"],
    intro:
      "Energy analysis becomes useful when the numbers remain connected to equipment, operating routines and feasible action.",
    sections: [
      {
        title: "Observe before optimising",
        body: "Field visits establish how assets are used, where losses may occur and which constraints are invisible in monthly totals.",
      },
      {
        title: "Translate evidence",
        body: "Consumption data, process context and engineering calculations are combined into findings that decision-makers can review and prioritise.",
      },
      {
        title: "Keep recommendations implementable",
        body: "A technically ideal recommendation is not useful if it ignores maintenance capacity, production requirements or investment reality.",
      },
    ],
  },
  {
    slug: "environmental-risk-bhairab-river",
    title: "Reading environmental risk across water, industry and public health",
    category: "Environmental research",
    excerpt:
      "A multidisciplinary assessment of industrial waste, bioaccumulation and affected communities around the Bhairab River.",
    image: "/images/bhairab-river-fieldwork.jpg",
    stack: ["EIA", "Chemical analysis", "Public health", "Statistics"],
    intro:
      "Environmental risk is a connected system: industrial discharge, ecological exposure and community health cannot be interpreted in isolation.",
    sections: [
      {
        title: "Multiple forms of evidence",
        body: "The study combined environmental samples, chemical characterisation, bioaccumulation analysis and evidence from affected populations.",
      },
      {
        title: "From contaminants to consequences",
        body: "Laboratory methods helped identify possible contaminants while statistical analysis examined patterns between exposure conditions and reported outcomes.",
      },
      {
        title: "Why integration matters",
        body: "Policy and technical responses become stronger when laboratory evidence, ecosystem effects and human experience are interpreted together.",
      },
    ],
  },
];

export const insights: Insight[] = [
  {
    slug: "evidence-before-automation",
    title: "Evidence before automation",
    category: "Research practice",
    date: "Editorial note",
    readingTime: "4 min read",
    excerpt:
      "Why the quality of definitions, context and source evidence still determines whether an intelligent system is useful.",
    image: "/images/data-systems.jpg",
    featured: true,
    body: [
      {
        title: "Automation inherits the evidence it receives",
        paragraphs: [
          "A fast pipeline cannot repair an unclear question. Before choosing a model or platform, the decision, the evidence and the people who will use the result need to be understood.",
          "This is especially important in industrial and research settings, where the same metric can mean different things across sites, teams and operating conditions.",
        ],
      },
      {
        title: "Design for traceability",
        paragraphs: [
          "A useful analytical system makes it possible to move from a recommendation back to the underlying records, assumptions and transformations.",
          "Traceability supports review, learning and responsible use. It is not a documentation task added after the model; it is part of the system design.",
        ],
      },
    ],
  },
  {
    slug: "mixed-methods-industrial-decisions",
    title: "What mixed methods add to industrial decisions",
    category: "Applied research",
    date: "Editorial note",
    readingTime: "5 min read",
    excerpt:
      "Operational data shows what happened. Interviews and observation often explain why and whether a proposed change can work.",
    image: "/images/fieldwork.jpg",
    body: [
      {
        title: "Different evidence answers different questions",
        paragraphs: [
          "Production records can reveal variation, delay or failure. They rarely explain the local workarounds, incentives and constraints that produced the pattern.",
          "Interviews, observation and participatory analysis add context without replacing quantitative discipline.",
        ],
      },
      {
        title: "Integration is the real method",
        paragraphs: [
          "The value of mixed methods is not the number of instruments used. It is the structured comparison of evidence sources and the clearer decisions that comparison enables.",
        ],
      },
    ],
  },
  {
    slug: "responsible-optimisation",
    title: "Responsible optimisation is a multi-objective problem",
    category: "Industrial systems",
    date: "Editorial note",
    readingTime: "4 min read",
    excerpt:
      "Productivity, safety, cost and environmental responsibility should be modelled as connected priorities, not sequential afterthoughts.",
    image: "/images/sustainability.jpg",
    body: [
      {
        title: "The objective function is never neutral",
        paragraphs: [
          "Optimisation reflects what a team chooses to reward, constrain or ignore. A narrow target can move cost or risk elsewhere in the system.",
          "Industrial decisions improve when productivity, safety, resource use and implementation constraints are made explicit from the beginning.",
        ],
      },
      {
        title: "Make trade-offs visible",
        paragraphs: [
          "Decision support should help people compare scenarios and understand consequences. The strongest model is often the one that clarifies a trade-off rather than pretending it does not exist.",
        ],
      },
    ],
  },
];

export const credentials: Credential[] = [
  { title: "Data Science Professional Certificate", issuer: "IBM", area: "Data science" },
  { title: "Data Analytics Professional Certificate", issuer: "Google", area: "Analytics" },
  { title: "AI Essentials", issuer: "Google", area: "Artificial intelligence" },
  { title: "Generative AI Overview for Learning & Development", issuer: "GSDC · Google Gemini", area: "Generative AI" },
  { title: "Applied Data Science Specialisation", issuer: "IBM", area: "Applied data science" },
  { title: "Supply Chain Analytics Specialisation", issuer: "Rutgers University", area: "Supply chain" },
];
