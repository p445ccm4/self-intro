export const portfolioData = {
  personal: {
    name: "Chan Chun Ming, Michael",
    title: "AI Agent Engineer",
    email: "michaelchan@ymail.com",
    phone: "6035 8263",
    whatsapp: "https://wa.me/85260358263",
    linkedin: "https://linkedin.com/in/michael-chanchunming",
    github: "https://github.com/p445ccm4",
    summary: "AI Agent Engineer with over 3 years of experience in Machine Learning, Python and Full-Stack Development. Specializes in building Agentic AI systems using LLMs, Vector Databases, and RAG frameworks. Currently developing enterprise meeting assistants at HKT, utilizing React.js and Nest.js within a strict CI/CD environment. Experienced in high-performance backend architecture, including GoLang microservices and gRPC. Adept at translating business needs into technical designs and driving digital transformation for non-technical stakeholders."
  },
  experience: [
    {
      id: 1,
      role: "Senior AI Application Developer",
      company: "Hong Kong Telecom",
      period: "November 2025 – Now",
      description: [
        "Developing and maintaining Generative AI solutions within a large-scale enterprise environment.",
        "Collaborating with cross-functional teams to integrate AI tools into the corporate ecosystem.",
        "Adhering to strict GitLab CI/CD workflows and Agile methodologies to ensure code quality and security."
      ]
    },
    {
      id: 2,
      role: "Artificial Intelligence Engineer",
      company: "Oodles Systems Limited, Success Base Engineering Limited",
      period: "October 2024 – October 2025",
      description: [
        "Independently designed, developed and deployed an AI Agent system from scratch, including LLMOps, MCP servers, agent orchestration, vector database, RAG, access management, backend, frontend, CI/CD in a scalable, secure, agile manner.",
        "Kept abreast of SOTA AI models and algorithms, including generative models for text, images, speech-to-text, speech, video, and 3D, as well as model training methods and architectures.",
        "Met regularly with the CEO and Department Heads to align on AI vision and strategies."
      ]
    },
    {
      id: 3,
      role: "Artificial Intelligence Engineer",
      company: "Hong Kong Univisual Intelligence Technology, HKU Sports & AI Lab",
      period: "October 2023 – September 2024",
      description: [
        "Successfully led multiple ICT award-winning projects. Clients include LCSD, OGCIO, MTR, HOHCS, and more.",
        "Successfully handled multiple projects encompassing the entire MLOps lifecycle from data collection, model training and testing, pruning, to deployment and fine-tuning.",
        "Proactively researched and built PoCs for ML/CV related projects, measuring and optimizing performance of data pipelines, model training, and inferencing.",
        "Led a group of interns and collaborated with cross-functional teams, fostering a cooperative environment."
      ]
    },
    {
      id: 4,
      role: "Web Development Intern",
      company: "Friday Company Limited",
      period: "June 2020 – August 2020",
      description: [
        "Developed the frontend of the company website",
        "Engaged in business development and marketing meetings"
      ]
    },
    {
      id: 5,
      role: "Research and Development Intern",
      company: "Institute of Automation, Chinese Academy of Sciences",
      period: "June 2019 – August 2019",
      description: [
        "Researched and implemented Sonar Data Visualization, Cleansing and Denoising Algorithms for an Autonomous Underwater Vehicle project."
      ]
    }
  ],
  projects: [
    {
      id: "ai-meeting-summary",
      title: "AI Meeting Summary App",
      role: "Senior AI Application Developer",
      company: "HKT",
      year: "2026",
      description: "A platform to generate summary and insights from meeting recordings",
      details: [
        "Developing an enterprise-grade meeting assistant that transcribes audio (Whisper) and generates summaries, action points and insights.",
        "Engineered an asynchronous task queue system (BullMQ) to handle high-concurrency audio processing."
      ],
      tech: ["Whisper", "BullMQ", "React", "Nest.js", "AI Security", "K8S", "AWS", "CI/CD"]
    },
    {
      id: "enterprise-hrms",
      title: "Enterprise HR Management System",
      company: "Self Project",
      year: "2026",
      description: "An Enterprise HRMS built with React.js, GoLang, Microservices and gRPC",
      details: [],
      tech: ["React.js", "GoLang", "Microservices", "gRPC"]
    },
    {
      id: "ai-agent",
      title: "AI Agent",
      role: "Artificial Intelligence Engineer",
      company: "Oodles Systems",
      year: "2025",
      description: "A smart system automating complex tasks without human interference.",
      details: [
        "Designed a fully autonomous agentic system that automates workflows for Tender, HR and Admin depts.",
        "Implemented RAG on NAS servers and orchestrated multiple agents using Model Context Protocol (MCP).",
        "Successfully automated complex tasks like resume filtering and payment voucher processing."
      ],
      tech: ["AI Agent", "RAG", "MCP", "LLMs", "Vector DB", "OCR", "On-premise Deployment", "Python", "React.js", "Docker"]
    },
    {
      id: "ai-youtuber",
      title: "AI YouTuber",
      company: "Self Project",
      year: "2025",
      description: "A platform to create and edit long videos with just a few clicks",
      details: [
        "Uses many SOTA AI models to generate script, speech, image and music, then integrate them into wonderful YouTube videos.",
        "Autonomously making 1000+ views per video with super low maintenance."
      ],
      tech: ["GenAI", "Automation", "Open Source SOTA Models", "Python", "Ollama", "Gradio", "Google APIs"]
    },
    {
      id: "child-abuse-detection",
      title: "Real-time Child Abuse Detection",
      role: "Artificial Intelligence Engineer",
      company: "HKU Sports & AI Lab",
      year: "2024",
      description: "A system to detect fast human motion in real-time",
      details: [
        "Performs object detection for video with 95% accuracy, real-time and low resource",
        "Recommended by OGCIO as the best model in child abuse detection",
        "Now being deployed to multiple childcare homes"
      ],
      tech: ["Python", "OpenCV", "Computer Vision", "TensorRT", "Real-time inference on Edge Device", "Research"]
    },
    {
      id: "customer-attention-tracking",
      title: "Real-time Customer Attention Tracking",
      role: "Artificial Intelligence Engineer",
      company: "HKU Sports & AI Lab",
      year: "2024",
      description: "A system to record which products customers are looking at or touching",
      details: [],
      tech: ["Computer Vision", "Real-time Edge Device Inference", "Human Posture Tracking", "Depth Camera", "3D Reconstruction", "Python", "PyTorch", "ONNX", "OpenCV", "Matplotlib"]
    },
    {
      id: "momentum-transformer",
      title: "Trading with Momentum Transformer",
      role: "Final Project, Graded A-",
      company: "HKU Master of Science (Computer Science)",
      year: "2023",
      description: "An finetuned, optimized transformer model for trading",
      details: [],
      tech: ["Transformer", "FinTech", "Finetuning & Optimization", "Python"]
    },
    {
      id: "lightweight-cnn",
      title: "A light-weight CNN for Object Recognition",
      role: "Final Year Project, Graded A-",
      company: "HKU Bachelor of Engineering (Computer Science)",
      year: "2021",
      description: "A mobile app deployed with finetuned MobileNet, ShuffleNet and Xception",
      details: [],
      tech: ["Python", "TensorFlow", "Mobile App Development", "CNN", "MobileNet", "ShuffleNet", "Xception", "Android Studio", "Flutter"]
    }
  ],
  education: [
    {
      degree: "Master of Science (Computer Science)",
      school: "University of Hong Kong",
      period: "September 2021 – November 2023"
    },
    {
      degree: "Bachelor of Engineering (Computer Science)",
      school: "University of Hong Kong",
      period: "September 2017 – June 2021"
    }
  ],
  skills: {
    genAI: ["Agentic Workflows", "RAG", "Prompt Engineering", "MCP"],
    mlOps: ["Python", "PyTorch", "TensorFlow", "FastMCP", "LangChain", "LangGraph", "HuggingFace Libraries", "OpenAI libraries", "ONNX", "TensorRT", "OpenCV", "Numpy", "Pandas"],
    database: ["Vector DB", "SQL", "PostgreSQL", "Milvus", "MySQL", "MongoDB", "Prisma ORM"],
    web: ["React.js", "Nest.js", "GoLang", "Microservices", "gRPC", "FastAPI", "TypeScript", "Java Srping Boot"],
    devOps: ["Docker", "Kubernetes", "GitLab CI/CD", "AWS", "Grafana/Promtail", "SSO/OAuth/KeyCloak"]
  }
};
