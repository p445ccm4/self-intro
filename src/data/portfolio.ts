import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Chan Chun Ming, Michael",
    title: "AI Agent Engineer",
    email: "michaelchan@ymail.com",
    phone: "6035 8263",
    whatsapp: "https://wa.me/85260358263",
    linkedin: "https://linkedin.com/in/michael-chanchunming",
    github: "https://github.com/p445ccm4",
    resume: "/Resume 03-2026.pdf",
    summary: "AI Agent Engineer with over 3 years of experience in Machine Learning, Python and Full-Stack Development. Specializes in building Agentic AI systems using LLMs, Vector Databases, and RAG frameworks. Currently developing enterprise meeting assistants at HKT, utilizing React.js and Nest.js within a strict CI/CD environment. Experienced in high-performance backend architecture, including GoLang microservices and gRPC. Adept at translating business needs into technical designs and driving digital transformation for non-technical stakeholders."
  },
  experience: [
    {
      id: "hkt-senior-ai-dev",
      role: "Senior AI Application Developer",
      company: "Hong Kong Telecom",
      period: "November 2025 – Now",
      description: "Develop enterprise-grade GenAI platform and applications for internal use.",
      details: [
        "Developing and maintaining Generative AI solutions within a large-scale enterprise environment.",
        "Collaborating with cross-functional teams to integrate AI tools into the corporate ecosystem.",
        "Adhering to strict GitLab CI/CD workflows and Agile methodologies to ensure code quality and security."
      ]
    },
    {
      id: "oodles-ai-engineer",
      role: "Artificial Intelligence Engineer",
      company: "Oodles Systems Limited, Success Base Engineering Limited",
      period: "October 2024 – October 2025",
      description: "Designed and implemented an AI Agent system to automate workflows for multiple departments.",
      details: [
        "Independently designed, developed and deployed an AI Agent system from scratch, including LLMOps, MCP servers, agent orchestration, vector database, RAG, access management, backend, frontend, CI/CD in a scalable, secure, agile manner.",
        "Kept abreast of SOTA AI models and algorithms, including generative models for text, images, speech-to-text, speech, video, and 3D, as well as model training methods and architectures.",
        "Met regularly with the CEO and Department Heads to align on AI vision and strategies."
      ]
    },
    {
      id: "hku-ai-engineer",
      role: "Artificial Intelligence Engineer",
      company: "Hong Kong Univisual Intelligence Technology, HKU Sports & AI Lab",
      period: "October 2023 – September 2024",
      description: "Researched and implemented computer vision and machine learning algorithms for various projects.",
      details: [
        "Successfully led multiple ICT award-winning projects. Clients include LCSD, OGCIO, MTR, HOHCS, and more.",
        "Successfully handled multiple projects encompassing the entire MLOps lifecycle from data collection, model training and testing, pruning, to deployment and fine-tuning.",
        "Proactively researched and built PoCs for ML/CV related projects, measuring and optimizing performance of data pipelines, model training, and inferencing.",
        "Led a group of interns and collaborated with cross-functional teams, fostering a cooperative environment."
      ]
    },
    {
      id: "thinking-in-reverse-founder",
      role: "Founder & Tutor",
      company: "Thinking in Reverse Learning Centre",
      period: "December 2021 – November 2023",
      description: "Founded and managed a learning centre, building its digital infrastructure from scratch.",
      details: [
        "Managed a team of 5 tutors and served 50 students at peak.",
        "Built the admin, finance, and lesson management system using Excel VBA to streamline operations.",
        "Created the company website using Wix, integrating appointment and inquiry forms with email and WhatsApp automation."
      ]
    },
    {
      id: "friday-web-intern",
      role: "Web Development Intern",
      company: "Friday Company Limited",
      period: "June 2020 – August 2020",
      description: "Frontend development internship.",
      details: [
        "Developed the frontend of the company website",
        "Engaged in business development and marketing meetings"
      ]
    },
    {
      id: "cas-rnd-intern",
      role: "Research and Development Intern",
      company: "Institute of Automation, Chinese Academy of Sciences",
      period: "June 2019 – August 2019",
      description: "R&D internship focusing on sonar data visualising.",
      details: [
        "Researched and implemented Sonar Data Visualization, Cleansing and Denoising Algorithms for an Autonomous Underwater Vehicle project."
      ],
      youtubeLinks: ["https://www.youtube.com/watch?v=wsrc4_r5DRI", "https://www.youtube.com/watch?v=hYieObGts7M"]
    }
  ],
  projects: [
    {
      id: "ai-meeting-summary",
      title: "AI Meeting Summary App",
      role: "Senior AI Application Developer",
      company: "HKT",
      period: "January 2026 - Now",
      description: "A platform to generate summary and insights from meeting recordings",
      details: [
        "Developing an enterprise-grade meeting assistant that transcribes audio (Whisper) and generates summaries, action points and insights.",
        "Engineered an asynchronous task queue system (BullMQ) to handle high-concurrency audio processing."
      ],
      tech: ["Whisper", "BullMQ", "React", "Nest.js", "AI Security", "K8S", "AWS", "CI/CD"]
    },
    {
      id: "hkt-genai-platform",
      title: "Internal GenAI Platform",
      role: "Senior AI Application Developer",
      company: "HKT",
      period: "November 2025 - Now",
      description: "An internal platform integrating various GenAI tools with high security standards for enterprise use.",
      details: [
        "Collaborated on the full SDLC within a strict CI/CD environment."
      ],
      tech: ["GenAI Platform", "React.js", "Nest.js", "Java Spring Boot", "CI/CD", "AWS", "K8S", "API development"]
    },
    {
      id: "enterprise-hrms",
      title: "Enterprise HR Management System",
      company: "Self Project",
      period: "January 2026 - March 2026",
      description: "An Enterprise HRMS built with React.js, GoLang, Microservices and gRPC",
      details: [],
      tech: ["React.js", "GoLang", "Microservices", "gRPC"]
    },
    {
      id: "sb-ai-agent",
      title: "AI Agent",
      role: "Artificial Intelligence Engineer",
      company: "Success Base Engineering Limited",
      period: "March 2025 - October 2025",
      description: "A smart system automating complex tasks without human interference.",
      details: [
        "Designed a fully autonomous agentic system that automates workflows for Tender, HR and Admin depts.",
        "Implemented RAG on NAS servers and orchestrated multiple agents using Model Context Protocol (MCP).",
        "Successfully automated complex tasks like resume filtering and payment voucher processing."
      ],
      tech: ["AI Agent", "RAG", "MCP", "LLMs", "Vector DB", "OCR", "On-premise Deployment", "Python", "React.js", "Docker"],
      githubLinks: ["https://github.com/p445ccm4/AI_Agent", "https://github.com/p445ccm4/ai-agent-frontend-v2", "https://github.com/p445ccm4/Local_Agent", "https://github.com/p445ccm4/comprehension-mcp-server", "https://github.com/p445ccm4/Google-Search-MCP-server-with-Streamable-HTTP"],
      youtubeLinks: ["https://www.youtube.com/watch?v=-MrheQ6qReo", "https://www.youtube.com/watch?v=e3O8_sPGVoc", "https://www.youtube.com/watch?v=fFg6FHFKT_w"]
    },
    {
      id: "ai-youtuber",
      title: "AI YouTuber",
      company: "Self Project",
      period: "November 2024 - October 2025",
      description: "A platform to create and edit long videos with just a few clicks",
      details: [
        "Uses many SOTA AI models to generate script, speech, image and music, then integrate them into wonderful YouTube videos.",
        "Autonomously making 1000+ views per video with super low maintenance."
      ],
      tech: ["GenAI", "Automation", "Open Source SOTA Models", "Python", "Ollama", "Gradio", "Google APIs"],
      githubLinks: ["https://github.com/p445ccm4/AI_YouTuber"]
    },
    {
      id: "oodles-smart",
      title: "Oodles Smart Renovation Simulation Platform",
      role: "Artificial Intelligence Engineer",
      company: "Oodles Systems Limited",
      period: "October 2024 - March 2025",
      description: "A renovation simulation website using computer vision and diffusion models.",
      details: [
        "Researched algorithms for removing furniture, generating empty rooms, and reverse image searching for textures.",
        "Implemented features to replace wallpaper and simulate renovation styles.",
        "Product Website: https://oodles-smart.com/"
      ],
      tech: ["Python", "Computer Vision", "GenAI", "OpenAI CLIP", "Object Segmentation", "Edge Detection", "Stable Diffusion"],
      githubLinks: ["https://github.com/p445ccm4/flux", "https://github.com/p445ccm4/ViewCrafter", "https://github.com/p445ccm4/DimensionX"],
      youtubeLinks: ["https://www.youtube.com/watch?v=aXK1OQNoMDE"]
    },
    {
      id: "customer-attention-tracking",
      title: "Real-time Customer Attention Tracking",
      role: "Artificial Intelligence Engineer",
      company: "Hong Kong Univisual Intelligence Technology",
      period: "April 2024 – May 2024",
      description: "A system to record which products customers are looking at or touching",
      details: [],
      tech: ["Computer Vision", "Real-time Edge Device Inference", "Human Posture Tracking", "Depth Camera", "3D Reconstruction", "Python", "PyTorch", "ONNX", "OpenCV", "Matplotlib"],
      githubLinks: ["https://github.com/p445ccm4/retail-shelf-intersection-frequency-estimation"],
      youtubeLinks: ["https://www.youtube.com/watch?v=9JnbChvqUFE"]
    },
    {
      id: "child-abuse-detection",
      title: "Real-time Child Abuse Detection",
      role: "Artificial Intelligence Engineer",
      company: "Hong Kong Univisual Intelligence Technology",
      period: "November 2023 - January 2024",
      description: "A system to detect fast human motion in real-time",
      details: [
        "Performs object detection for video with 95% accuracy, real-time and low resource",
        "Recommended by OGCIO as the best model in child abuse detection",
        "Now being deployed to multiple childcare homes"
      ],
      tech: ["Python", "OpenCV", "Computer Vision", "TensorRT", "Real-time inference on Edge Device", "Research"],
      githubLinks: ["https://github.com/p445ccm4/YOLO-TSM-2stage-detection", "https://github.com/p445ccm4/yolov7-TSM", "https://github.com/p445ccm4/tsm-tensorrt", "https://github.com/p445ccm4/temporal-shift-module-with-labelling-tools", "https://github.com/p445ccm4/TSM-Labelling-Tools-With-YOLOv7"],
      youtubeLinks: ["https://www.youtube.com/watch?v=ovAKLTOF3ng", "https://www.youtube.com/watch?v=9JnbChvqUFE"]
    },
    {
      id: "drowning-detection",
      title: "Real-time Drowning Detection System",
      role: "Artificial Intelligence Engineer",
      company: "Hong Kong Univisual Intelligence Technology",
      period: "October 2023 – December 2023",
      description: "Real-time drowning detection system implemented by YOLOv7.",
      details: [
        "Participated in the machine learning life cycle: data collection, labelling, training, finetuning, and transformation to TensorRT static models.",
        "Deployed on Nvidia Jetson series edge computers."
      ],
      tech: ["Python", "C++", "OpenCV", "Numpy", "Nvidia Jetson", "TensorRT", "YOLOv7", "Object Detection"],
      githubLinks: ["https://github.com/p445ccm4/yolov7-deepsort", "https://github.com/p445ccm4/yolo_bytetrack_batch_pybind", "https://github.com/p445ccm4/YOLOv7-TRT-multi-threading"],
      youtubeLinks: ["https://www.youtube.com/watch?v=wWwbyJGKAak", "https://www.youtube.com/watch?v=9JnbChvqUFE"]
    },
    {
      id: "momentum-transformer",
      title: "Trading with Momentum Transformer",
      role: "Final Project, Graded A-",
      company: "HKU Master of Science (Computer Science)",
      period: "September 2022 – November 2023",
      description: "An finetuned, optimized transformer model for trading",
      details: [],
      tech: ["Transformer", "FinTech", "Finetuning & Optimization", "Python"]
    },
    {
      id: "lightweight-cnn",
      title: "A light-weight CNN for Object Recognition",
      role: "Final Year Project, Graded A-",
      company: "HKU Bachelor of Engineering (Computer Science)",
      period: "September 2020 – May 2021",
      description: "A mobile app deployed with finetuned MobileNet, ShuffleNet and Xception",
      details: [],
      tech: ["Python", "TensorFlow", "Mobile App Development", "CNN", "MobileNet", "ShuffleNet", "Xception", "Android Studio", "Flutter"]
    }
  ],
  education: [
    {
      id: "hku-msc-cs",
      degree: "Master of Science (Computer Science)",
      school: "University of Hong Kong",
      period: "September 2021 – November 2023"
    },
    {
      id: "hku-beng-cs",
      degree: "Bachelor of Engineering (Computer Science)",
      school: "University of Hong Kong",
      period: "September 2017 – June 2021"
    }
  ],
  milestones: [
    {
      id: 'milestone-manus',
      title: 'Manus Released',
      subtitle: 'Era of AI Agents',
      date: 'March 2025',
      description: "The world's first fully autonomous AI agent, Manus, was released.",
      tags: ['AI Agent', 'Milestone'],
    },
    {
      id: 'milestone-chatgpt',
      title: 'ChatGPT Released',
      subtitle: 'Dawn of Generative AI',
      date: 'November 2022',
      description: "ChatGPT's release revolutionized the world's understanding of GenAI.",
      tags: ['GenAI', 'Milestone'],
    }
  ],
  skills: {
    genAI: ["Agentic Workflows", "RAG", "Prompt Engineering", "MCP"],
    mlOps: ["Python", "PyTorch", "TensorFlow", "FastMCP", "LangChain", "LangGraph", "HuggingFace Libraries", "OpenAI libraries", "ONNX", "TensorRT", "OpenCV", "Numpy", "Pandas"],
    database: ["Vector DB", "SQL", "PostgreSQL", "Milvus", "MySQL", "MongoDB", "Prisma ORM"],
    web: ["React.js", "Nest.js", "GoLang", "Microservices", "gRPC", "FastAPI", "TypeScript", "Java Spring Boot"],
    devOps: ["Docker", "Kubernetes", "GitLab CI/CD", "AWS", "Grafana/Promtail", "SSO/OAuth/KeyCloak"]
  }
};
