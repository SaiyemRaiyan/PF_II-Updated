// ─────────────────────────────────────────────────────────────
//  ALL portfolio content lives in this one file.
//  When your CV changes, edit here — no component needs touching.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Md Saiyem Raiyan',
  first: 'Saiyem',
  last: 'Raiyan',
  roles: [
    'AI Researcher',
    'ML Engineer',
    'NLP & LLM Enthusiast',
    'Software & Web Developer',
  ],
  tagline:
    'Building trustworthy Generative AI, Agentic AI and Large Language Model systems, with a focus on low-resource Bangla NLP and medical AI.',
  location: '97/4, Shantinagar, Dhaka-1217, Bangladesh',
  email: 'saiyemraiyan435@gmail.com',
  phone: '+8801701305658',
  website: 'https://sraiyan.netlify.app/',
  cv: '/Md_Saiyem_Raiyan_CV.pdf',
  portrait: '/img/portrait.webp',
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/saiyem-raiyan-70806120b/' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/SaiyemRaiyan' },
    { label: 'X / Twitter', icon: 'x', url: 'https://twitter.com/sayem_raiyan' },
    { label: 'Facebook', icon: 'facebook', url: 'https://facebook.com/sayem.raiyan/' },
    { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com/saiyem_raiyan_here_' },
  ],
  objective: [
    'Seeking a challenging position to utilize my skills and abilities that offers professional growth while being resourceful, innovative, and flexible.',
    'I am deeply passionate about Artificial Intelligence, with a particular interest in Generative AI, Agentic AI and Large Language Models (LLMs). I am enthusiastic about exploring emerging AI technologies, pursuing innovative research opportunities and contributing to advancements across diverse areas of AI.',
    'I am a friendly, communicative, enthusiastic, fun-loving and optimistic person with a passion to learn from anything and everything. I try to generate new ideas and views, and to show my talent and creativity through my work and efforts.',
  ],
  motto: '“If someone can do it, I can do it! If no one can do it, I can do it!”',
  stats: [
    { value: 5, suffix: '', label: 'Research papers', emoji: '📄' },
    { value: 2, suffix: '', label: 'IEEE ICCIT publications', emoji: '🏛️' },
    { value: 15, suffix: '', label: 'Projects', emoji: '🚀' },
    { value: 7, suffix: '+', label: 'Years teaching & mentoring', emoji: '🎓' },
  ],
  researchInterests: [
    'Machine Learning', 'Data Science', 'Artificial Intelligence',
    'Pattern Recognition', 'Natural Language Processing',
  ],
  languages: [
    { name: 'Bangla', level: 'Native' },
    { name: 'English', level: 'Good' },
    { name: 'Hindi', level: 'Limited' },
  ],
  interests: [
    { emoji: '📚', label: 'Reading Books' },
    { emoji: '✈️', label: 'Traveling' },
    { emoji: '🎨', label: 'Drawing' },
    { emoji: '🌐', label: 'Web Development' },
    { emoji: '🧩', label: 'UI/UX Design' },
    { emoji: '🤖', label: 'AI' },
  ],
};

// `icon` keys refer to simple-icons (see src/components/Icon.jsx). Missing → emoji.
export const skills = [
  {
    title: 'Artificial Intelligence', emoji: '🧠', accent: 'cyan',
    items: [
      'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Large Language Models',
      'Transformers', { n: 'PyTorch', icon: 'pytorch' }, { n: 'LangChain', icon: 'langchain' },
      'LlamaIndex', 'Prompt Engineering', 'BanglaLM + LLM', 'Explainable AI',
      'Human-Computer Interaction', 'VectorDB', 'RAG', 'Mixture of Experts (MoE)',
      'Vision-Language Models', 'Computer Vision', 'Agentic AI', 'APIs',
      { n: 'Google Cloud', icon: 'googlecloud' },
    ],
  },
  {
    title: 'Programming Languages', emoji: '💻', accent: 'violet',
    items: [
      { n: 'C', icon: 'c' }, { n: 'C++', icon: 'cplusplus' },
      { n: 'Python', icon: 'python' }, { n: 'Java', icon: 'openjdk' },
    ],
  },
  {
    title: 'Web & Applications', emoji: '🌐', accent: 'amber',
    items: [
      'UI/UX', { n: 'HTML', icon: 'html5' }, { n: 'CSS', icon: 'css3' },
      { n: 'Bootstrap', icon: 'bootstrap' }, { n: 'JavaScript', icon: 'javascript' },
      { n: 'Vue.js', icon: 'vuedotjs' }, { n: 'PHP', icon: 'php' }, { n: 'Laravel', icon: 'laravel' },
    ],
  },
  {
    title: 'Database & Spreadsheet', emoji: '🗄️', accent: 'cyan',
    items: [{ n: 'MySQL', icon: 'mysql' }, 'Microsoft Excel', { n: 'Google Sheets', icon: 'googlesheets' }],
  },
  {
    title: 'Document & Presentation', emoji: '📑', accent: 'violet',
    items: ['Microsoft Office', 'Microsoft PowerPoint', { n: 'Overleaf', icon: 'overleaf' }],
  },
  {
    title: 'Engineering Tools', emoji: '🛠️', accent: 'amber',
    items: [
      { n: 'Git', icon: 'git' }, 'Visual Studio Code', { n: 'Code::Blocks', icon: 'codeblocks' },
      { n: 'IntelliJ', icon: 'intellijidea' }, { n: 'Eclipse', icon: 'eclipseide' },
      { n: 'NetBeans', icon: 'apachenetbeanside' }, { n: 'PyCharm', icon: 'pycharm' },
      { n: 'Anaconda Navigator', icon: 'anaconda' }, 'Logisim', 'Multisim', 'Proteus',
      { n: 'AutoCAD', icon: 'autocad' }, { n: 'Colab', icon: 'googlecolab' }, { n: 'Kaggle', icon: 'kaggle' },
    ],
  },
];

export const experience = [
  {
    role: 'Research Assistant', org: 'ELITE Research Lab LLC', place: 'Queens, New York, USA · Remote',
    period: '2026 – Present', current: true, emoji: '🔬', type: 'Research',
    points: [
      'Working with Machine Learning, Natural Language Processing and Large Language Models, especially in Generative AI.',
    ],
    tags: ['ML', 'NLP', 'Gen AI', 'Transformer SLM', 'LLM', 'RAG', 'CAG', 'Healthcare ML Benchmark', 'SOTA',
      'Reasoning', 'Bias/Fairness', 'Multi-label QA', 'Multi-Modal Language', 'ML+NLP', 'BanglaLM+LLM',
      'BanglaQA', 'MedicalQA', 'XAI', 'AI Agents', 'LIME', 'VLM', 'CV', 'HCI', 'BM-AI'],
  },
  {
    role: 'Web Developer', org: 'SchoolWits', place: 'Basundhara R/A, Dhaka · Remote',
    period: '2026 – Present', current: true, emoji: '🏫', type: 'Engineering',
    points: [
      'SchoolWits is an EdTech and coaching platform for English-medium students.',
      'Developed the student portal for uploading materials, lecture content, worksheets, module creation and exam-question systems for EM secondary-level students.',
      'Built the dashboard and the admin portal for enrolment; contributed to assignment assessment, planning and quality assurance of teaching materials.',
    ],
    tags: ['Web Platform', 'Student Portal', 'Admin Portal', 'EdTech'],
  },
  {
    role: 'External Team Consultant, Health Record Software Development', org: 'Amader Gram Cancer Care and Research Center',
    place: 'Bangladesh · Remote', period: 'Jan 2025 – Present', current: true, emoji: '🏥', type: 'Healthcare AI',
    points: [
      'Amader Gram (“our village”) is building a scalable model health system for the climate-threatened, resource-poor people of southern Bangladesh.',
      'Design, develop and implement Electronic Medical Record (EMR) systems and data analytics.',
      'Maintain the database, web development and data integration; work as a software developer and medical AI researcher.',
    ],
    tags: ['EMR', 'Database', 'Data Analytics', 'Medical AI'],
  },
  {
    role: 'ML Engineer', org: 'Bangla Trac Ltd. (BanglaCAT)', place: 'Bangladesh',
    period: 'Jan – Apr 2026', emoji: '⚙️', type: 'Industry ML',
    points: [
      'Proof-of-concept failure-prediction system built on machine fault-code data and the Customer Visit Record Service.',
      'Built models using machine learning and large language models, with thorough data analysis and segmentation.',
    ],
    tags: ['Predictive Maintenance', 'LLMs', 'Data Analysis', 'Segmentation'],
  },
  {
    role: 'Researcher', org: 'ResearchBuddy', place: 'Bangladesh',
    period: 'Jun – Dec 2025', emoji: '🧪', type: 'Research',
    points: [
      'Research collaborator in Machine Learning, Deep Learning and Natural Language Processing.',
      'Evaluated new models, especially for NLP tasks.',
    ],
    tags: ['ML', 'DL', 'NLP', 'Model Evaluation'],
  },
  {
    role: 'Tutor', org: 'SSC & HSC Students', place: 'Bangladesh',
    period: '2019 – 2026', emoji: '📐', type: 'Teaching',
    points: [
      'Math, Physics and ICT instructor offering flexible scheduling, exam preparation and targeted support.',
    ],
    tags: ['Mathematics', 'Physics', 'ICT'],
  },
  {
    role: 'Examiner', org: 'Udvash Academic and Admission Care', place: 'Bangladesh',
    period: '2019 – 2020', emoji: '📝', type: 'Teaching',
    points: [
      'Assessed students’ answer scripts, assigned grades on response quality and provided feedback on academic performance.',
    ],
    tags: ['Assessment', 'Feedback'],
  },
];

export const publications = [
  {
    title: 'BHRE-RAG: A Benchmark and Retrieval-Augmented Framework for Advancing Comprehension-Based Question Answering in Bangla',
    venue: '28th International Conference on Computer and Information Technology (ICCIT)',
    status: 'Published', publisher: 'IEEE', url: 'https://ieeexplore.ieee.org/document/11491594',
  },
  {
    title: 'SumLLM: Performance Evaluation and The Judgment of Large Language Models in Bengali Abstractive News Summarization',
    venue: '28th International Conference on Computer and Information Technology (ICCIT)',
    status: 'Published', publisher: 'IEEE', url: 'https://ieeexplore.ieee.org/document/11491391',
  },
  {
    title: 'MixLnSENT-Bench: A Unified Empirical Benchmark of Fine-Tuned Encoders, Few-Shot Learners and Prompted Large Language Models for Bangla Code-Mixed Text Classification',
    venue: 'Natural Language Processing Journal (Q1)', status: 'Submitted',
  },
  {
    title: 'EpiGround-VLM: Causal Stress Testing of Visual Grounding, Epistemic Reliability, and Benchmark Contamination in Medical Vision–Language Models',
    venue: 'Q1 Journal', status: 'Submitted',
  },
  {
    title: 'BanglaHumanAI: A Dataset for Benchmarking Human–AI Text Detection in Bangla Through Zero-Shot Fine-Tuned Transformers and Large Language Models',
    venue: '', status: 'Under Review',
  },
];

// category: research | ml | web | systems   (drives the filter chips)
// cover: an image in /public/img, or `gen` = procedurally drawn cover (no photo needed)
const gh = (r) => `https://github.com/SaiyemRaiyan/${r}`;
export const projects = [
  {
    title: 'MixLnSENT-Bench', subtitle: 'Three-track Bangla Code-Mixed Text Classification Benchmark & Explainable AI Framework',
    period: 'Aug – Nov 2026', category: 'research', emoji: '🔀', featured: true, gen: 'mix',
    desc: 'Benchmark evaluating pretrained encoders, few-shot learning and instruction-tuned LLMs for Bangla–English code-mixed text classification across four NLP tasks, with prompt ablation and explainability to analyse prediction behaviour and linguistic influences.',
    tags: ['LLMs', 'Few-shot', 'XAI', 'Code-Mixing', 'Benchmark'],
  },
  {
    title: 'EpiGround-VLM', subtitle: 'Causal Stress Testing of Visual Grounding, Epistemic Reliability & Benchmark Contamination in Medical VLMs',
    period: 'Sep – Nov 2026', category: 'research', emoji: '🩻', featured: true, gen: 'vlm',
    desc: 'Stress-testing framework for medical vision-language models across MedGemma, Gemma and LLaVA on three medical VQA datasets — counterfactual image interventions, uncertainty estimation, confidence calibration and contamination detection.',
    tags: ['VLM', 'MedGemma', 'LLaVA', 'Calibration', 'Medical VQA'],
  },
  {
    title: 'BanglaHumanAI', subtitle: 'Benchmarking Human–AI Text Detection in Bangla',
    period: 'Apr – Sep 2026', category: 'research', emoji: '🕵️', featured: true, gen: 'detect',
    desc: 'A 2,000-text Bangla news dataset for detecting human-written vs AI-generated text, evaluating transformers and LLMs under zero-shot and fine-tuned settings. Task-specific fine-tuning substantially improves detection.',
    tags: ['Dataset', 'Transformers', 'Zero-shot', 'Fine-tuning'],
  },
  {
    title: 'BHRE-RAG', subtitle: 'Benchmark & Retrieval-Augmented Framework for Bangla Comprehension QA',
    period: 'Aug – Sep 2025', category: 'research', emoji: '📚', featured: true, gen: 'rag',
    desc: 'Bangla Holistic Reasoning Evaluation — a zero/few-shot benchmark on BanglaRQA evaluating 6 LLMs over 3,000 passages and 14,889 QA pairs, plus a RAG framework that significantly lifts accuracy in low-resource settings.',
    tags: ['RAG', 'LLMs', 'QA', 'Bangla', 'IEEE ICCIT'],
    link: 'https://ieeexplore.ieee.org/document/11491594', linkLabel: 'IEEE Xplore',
  },
  {
    title: 'LLMs in Summarizing & Semantic Analysis', subtitle: 'Prompt Engineering + Mixture of Experts with Multiple Models',
    period: 'Apr – Dec 2024', category: 'research', emoji: '🧩', img: '/img/llm-summarizing.webp',
    desc: 'LM/LLM summarization system integrating RAG and a Mixture-of-Experts approach for contextual understanding and semantic accuracy, compared via ROUGE, readability and cosine similarity.',
    tags: ['RAG', 'MoE', 'ROUGE', 'Prompt Eng.'],
    link: gh('How-LLMs-are-Good-in-Summarizing-with-Prompt-Engineering-Techniques-with-Multiple-Models'),
  },
  {
    title: 'SummaryScribe', subtitle: 'Transformative Meeting Summarization using Prompt Engineering',
    period: 'Aug 2023 – May 2024', category: 'research', emoji: '🎙️', img: '/img/summaryscribe.webp',
    desc: 'Generates contextual summaries from news or long meeting transcripts with a fine-tuned model, prompt engineering and RAG; low-cost fine-tuning preserves semantics.',
    tags: ['NLP', 'Fine-tuning', 'RAG', 'Prompt Eng.'],
    link: gh('How-LLMs-are-Good-in-Summarizing-with-Prompt-Engineering-Techniques-with-Multiple-Models'),
  },
  {
    title: 'Breast Cancer Classification', subtitle: 'Neural Networks & Deep Learning',
    period: 'Jun – Jul 2024', category: 'ml', emoji: '🎗️', gen: 'cells',
    desc: 'Detecting and classifying breast cancer with neural networks and deep-learning methods.',
    tags: ['Deep Learning', 'Neural Networks', 'Medical'],
  },
  {
    title: 'LPG Gas Leakage Detection', subtitle: 'Proteus & Arduino UNO',
    period: 'May 2024', category: 'systems', emoji: '🔥', img: '/img/lpg-detector.webp',
    desc: 'Automated LPG-leak detector using an Arduino Uno and an MQ-series gas sensor that continuously monitors the air, with a sensor library for accurate readings.',
    tags: ['Arduino', 'Microcontroller', 'Proteus'],
    link: gh('LPG-GAS-LEAKAGE-DETECTOR-ft-Microcontroller-x-Proteus'),
  },
  {
    title: 'Heart Disease Detection', subtitle: 'Machine Learning with GUI',
    period: 'Jan – Feb 2024', category: 'ml', emoji: '❤️', img: '/img/heart-disease.webp',
    desc: 'Heart-disease prediction with machine-learning algorithms behind a graphical user interface.',
    tags: ['Python', 'ML', 'GUI'], link: gh('Any-Heart-Disease-'),
  },
  {
    title: 'Object Detection in Self-Driving Car', subtitle: 'Computer Vision',
    period: 'Oct 2023', category: 'ml', emoji: '🚗', img: '/img/object-detection.webp',
    desc: 'Identifies and tracks vehicles, pedestrians, cyclists, traffic lights and obstacles to support safer driving decisions; dataset collected from Bing images with raw annotation.',
    tags: ['PyTorch', 'CNN', 'Detection'], link: gh('Object-Detection-in-Self-Driving-Car'),
  },
  {
    title: 'CholoGhuri', subtitle: 'Event Organizer & Travel-Mate Matching',
    period: 'Sep 2023', category: 'web', emoji: '🧳', img: '/img/cholo-ghuri.webp',
    desc: 'Arrange workshops, organise events, find travel partners and get partial support for self-run events or trips.',
    tags: ['Vue.js', 'JavaScript', 'HTML/CSS'],
    link: gh('CholoGhuri--Event-Organizer-and-Travel-Mate-Matching-System'),
  },
  {
    title: 'Diabetes Prediction', subtitle: 'A Machine Learning Approach',
    period: 'Jun 2023', category: 'ml', emoji: '🩸', img: '/img/diabetes.webp',
    desc: 'Predicts diabetes from patient data with k-fold validation and an 80-20 split, comparing Decision Tree, KNN, Naive Bayes and an ANN.',
    tags: ['Python', 'Keras', 'k-fold'], link: gh('Diabetes-Prediction---A-Machine-Learning-approach'),
  },
  {
    title: 'Poth Nirdeshika', subtitle: 'Path Destination with In-App Calling & Messaging',
    period: 'Feb – Jun 2023', category: 'web', emoji: '🗺️', img: '/img/poth-nirdeshika.webp',
    desc: 'Multi-platform web app showing every route and the optimal path between places via Google Maps, with calling or messaging local experts.',
    tags: ['PHP', 'MySQL', 'Google Maps API'],
    link: gh('Poth-Nirdeshika--Path-Destination-in-App-Calling-and-Messeging'),
  },
  {
    title: 'CPU Scheduling Simulator', subtitle: 'Operating Systems',
    period: 'Aug 2022', category: 'systems', emoji: '⏱️', img: '/img/cpu-scheduling.webp',
    desc: 'Simulates FCFS, SJF, Priority and Round Robin scheduling algorithms.',
    tags: ['Java', 'GUI', 'OS'], link: gh('Operating-System---CPU-Scheduling-Simulator'),
  },
  {
    title: 'Vaccination Information System', subtitle: 'COVID vaccination for universities',
    period: 'Nov – Dec 2021', category: 'web', emoji: '💉', img: '/img/vaccination.webp',
    desc: 'Students, faculty and admins register with NID or birth certificate, update their status after vaccination, and officials verify records when needed.',
    tags: ['PHP', 'Laravel', 'MySQL'], link: gh('Vaccination-Information-System-Database'),
  },
  {
    title: 'ATM Interface', subtitle: 'Object-Oriented Java',
    period: 'Dec 2020', category: 'systems', emoji: '🏧', img: '/img/atm.webp',
    desc: 'Deposit and withdrawal with history persisted to the file system, using encapsulation, inheritance, interfaces and abstract classes.',
    tags: ['Java', 'OOP', 'File I/O'], link: gh('atmInterface'),
  },
];

export const projectFilters = [
  { key: 'all', label: 'All', emoji: '✨' },
  { key: 'research', label: 'AI Research', emoji: '🧠' },
  { key: 'ml', label: 'ML & Vision', emoji: '👁️' },
  { key: 'web', label: 'Web Apps', emoji: '🌐' },
  { key: 'systems', label: 'Systems & Hardware', emoji: '🔌' },
];

export const education = [
  {
    degree: 'B.Sc. in Computer Science and Engineering (CSE)', school: 'North South University, Dhaka',
    period: '2020 – 2024', score: 'CGPA 3.4 / 4.0', emoji: '🎓',
    coursework: ['C', 'Discrete Mathematics', 'Java', 'Data Structures', 'Digital Logic Design', 'Calculus',
      'Database Management Systems', 'Computer Architecture', 'Microprocessor & Embedded Systems', 'Electrical Circuits',
      'Linear Algebra', 'Probability & Statistics', 'Engineering Drawing', 'Operating Systems', 'Software Engineering',
      'Analog Electronics', 'Theory of Computation', 'Design & Analysis of Algorithms', 'Artificial Intelligence',
      'Machine Learning', 'Pattern Recognition & Neural Networks', 'Junior & Senior Design Projects'],
  },
  { degree: 'Higher Secondary Certificate (HSC) · Science', school: 'Dhaka College, Dhaka', period: '2019', score: 'GPA 5.00 / 5.00', emoji: '🏫' },
  { degree: 'Secondary School Certificate (SSC) · Science', school: 'Ideal School and College, Dhaka', period: '2017', score: 'GPA 5.00 / 5.00', emoji: '📘' },
];

export const awards = [
  { emoji: '🏆', title: 'Merit-Based Scholarship', detail: 'Undergraduate Program (CSE), North South University' },
  { emoji: '🥇', title: 'Scholarship', detail: 'Secondary School Certificate (SSC)' },
  { emoji: '🥈', title: 'Scholarship', detail: 'Junior School Certificate (JSC)' },
  { emoji: '🌟', title: 'Talentpool Scholarship', detail: 'Welfare Association of Model Institution' },
];

export const activities = [
  {
    role: 'Sub Executive, Administration Coordinator & Incharge', org: 'NSU ACM Student Chapter', period: '2020 – 2023', emoji: '💠',
    desc: 'Student chapter of ACM, the world’s largest educational and scientific computing society — seminars, lectures, co-learning programs, competitions and networking.',
    wins: ['Promoted Member → Incharge → Sub Executive; Moderator → Coordinator', 'BEST Member ×2 — Summer 2020, Spring 2021'],
  },
  {
    role: 'Core Volunteer', org: 'IEEE NSU & IEEE NSU PES Student Branch', period: '2021 – 2022', emoji: '⚡',
    desc: 'Technical sub-unit of IEEE societies connecting student members with IEEE resources and professional networks.',
    wins: ['BEST Member Award — Fall 2021'],
  },
  {
    role: 'Core Volunteer', org: 'UNICEF Bangladesh', period: '2019 – 2022', emoji: '🤝',
    desc: 'Child-welfare programs, awareness campaigns and children’s-rights initiatives.',
    wins: [],
  },
  {
    role: 'Senior Member', org: 'Dhaka College Science Club (DCSC)', period: '2018 – 2019', emoji: '🔭',
    desc: 'Science and technology platform; volunteered at the 6th DCSC National Science Fest.',
    wins: ['Recognised as one of the best members'],
  },
  {
    role: 'Joint Secretary of Planning & Development', org: 'ISTARC, Ideal School and College', period: '2015 – 2016', emoji: '🧭',
    desc: 'Ideal Science and Technology Aiming Research Council — the school’s most distinguished co-curricular club.',
    wins: [],
  },
];

// logo: simple-icons key, or an image path, or `txt` fallback
export const certificates = [
  { title: 'AI Agents and Agentic AI with Python & Generative AI', issuer: 'Vanderbilt University', logoImg: '/img/issuer-vanderbilt.webp', url: 'https://coursera.org/share/21f1d6a62273d06300ebf1efa916efaa' },
  { title: 'Generative AI Language Modeling with Transformers', issuer: 'IBM', txt: 'IBM', url: 'https://coursera.org/share/da8c12a032db077594b84ef0b9277aef' },
  { title: 'Generative AI and LLMs: Architecture and Data Preparation', issuer: 'IBM', txt: 'IBM', url: 'https://coursera.org/share/ebf3eae2140073ba871e2a9c0cc8491f' },
  { title: 'Gen AI Foundational Models for NLP & Language', issuer: 'IBM', txt: 'IBM', url: 'https://coursera.org/share/6623c1bcc597c8c7a4ecc1b36c342ca6' },
  { title: 'Large Language Model', issuer: 'Google', icon: 'googlecloud', url: 'https://www.cloudskillsboost.google/public_profiles/b44badab-c331-42d4-a636-19d29c485919/badges/13618346' },
  { title: 'Generative AI', issuer: 'Google', icon: 'googlecloud', url: 'https://www.cloudskillsboost.google/public_profiles/b44badab-c331-42d4-a636-19d29c485919/badges/13618374' },
  { title: 'Gemini', issuer: 'Google', icon: 'googlecloud', url: 'https://www.cloudskillsboost.google/public_profiles/b44badab-c331-42d4-a636-19d29c485919/badges/13618311' },
  { title: 'Introduction to Data Analytics', issuer: 'Meta', icon: 'meta', url: 'https://coursera.org/share/21f1d6a62273d06300ebf1efa916efaa' },
  { title: 'Introduction to Prompt Engineering', issuer: 'SkillUp Online', logoImg: '/img/issuer-skillup.webp', url: 'https://simpli-web.app.link/e/FsucSEYidQb' },
];

export const sections = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'about', label: 'About', emoji: '👤' },
  { id: 'experience', label: 'Experience', emoji: '💼' },
  { id: 'research', label: 'Research', emoji: '📄' },
  { id: 'projects', label: 'Projects', emoji: '🚀' },
  { id: 'skills', label: 'Skills', emoji: '🧠' },
  { id: 'education', label: 'Education', emoji: '🎓' },
  { id: 'leadership', label: 'Leadership', emoji: '🏅' },
  { id: 'certificates', label: 'Certificates', emoji: '📜' },
  { id: 'contact', label: 'Contact', emoji: '✉️' },
];
