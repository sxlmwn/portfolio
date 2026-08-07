export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDescription: string;
  category: 'Systems' | 'DSA' | 'AI' | 'Web';
  tech: string[];
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  architectureNotes: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  githubUrl: string;
  liveUrl?: string;
  accentColor: 'teal' | 'coral' | 'dual';
  featured: boolean;
}

export interface LearningTrack {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  color: 'teal' | 'coral' | 'dual';
  progress: number;
  description: string;
  topics: {
    name: string;
    status: 'Mastered' | 'In Progress' | 'Deep Diving';
    description: string;
  }[];
  practicalApplication: string;
}

export interface TechSkill {
  name: string;
  category: 'Languages' | 'Systems & AI' | 'Web & Tools';
  level: string;
  experience: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "Salman Younus",
  handle: "sxlmwn",
  title: "Software Engineering Student & Systems Builder",
  headline: "I build with code, curiosity, and a lot of debugging.",
  subtext: "Engineering high-throughput C++ engines, autonomous AI assistants, and resilient distributed architectures. Driven by first-principles problem solving.",
  location: "Karachi, Pakistan (PKT / UTC+5)",
  email: "salmanyounus13@gmail.com",
  github: "https://github.com/sxlmwn",
  linkedin: "https://linkedin.com/in/sxlmwn",
  status: "Available for Software Engineering Internships & Opportunities",
  stats: [
    { value: "5+", label: "Engineered Systems" },
    { value: "110+", label: "DSA Challenges Solved" },
    { value: "3", label: "Core Focus Tracks" },
    { value: "<12μs", label: "C++ Engine Latency" }
  ]
};

export const TECH_SKILLS: TechSkill[] = [
  { name: "C++", category: "Languages", level: "Advanced", experience: "Order books, DSA simulations, memory management", description: "Modern C++20, templates, pointers, multi-threading, custom data structures, CMake." },
  { name: "Python", category: "Languages", level: "Proficient", experience: "Data processing, AI scripts, automation", description: "Algorithm prototyping, PyTorch / Ollama integration, OSINT tooling, automation pipelines." },
  { name: "JavaScript / TypeScript", category: "Languages", level: "Advanced", experience: "Full-stack apps, Discord & WhatsApp bots", description: "ESNext, asynchronous event loops, Discord.js v14, whatsapp-web.js, typed APIs." },
  { name: "Java", category: "Languages", level: "Proficient", experience: "OOP design patterns, algorithms", description: "Object-oriented architecture, concurrent data structures, unit testing, clean code." },
  { name: "SQL", category: "Languages", level: "Intermediate", experience: "Relational schema design, queries", description: "Schema normalization, indexing, query optimization, joins, SQLite & PostgreSQL." },
  { name: "Bash & Linux", category: "Languages", level: "Advanced", experience: "System administration, scripting", description: "Shell scripting, cron jobs, process management, POSIX tooling, Arch & Ubuntu environments." },
  { name: "React & Vite", category: "Web & Tools", level: "Advanced", experience: "Interactive web applications, UI architecture", description: "Modern React 19, hooks, component composition, state management, performance optimization." },
  { name: "Node.js", category: "Web & Tools", level: "Proficient", experience: "Backend services, bot infrastructure", description: "Event-driven architecture, REST APIs, stream processing, WebSocket connections." },
  { name: "Docker", category: "Systems & AI", level: "Proficient", experience: "Containerization, dev environments", description: "Dockerfile optimization, multi-stage builds, container isolation, volume mounts." },
  { name: "Git & GitHub Actions", category: "Web & Tools", level: "Advanced", experience: "CI/CD pipelines, version control", description: "Automated test suites, GitHub Pages deployment workflows, semantic branching." },
  { name: "Ollama & Local LLMs", category: "Systems & AI", level: "Proficient", experience: "Mistral, Llama local inference", description: "Local model hosting, prompt engineering, context sliding windows, zero-cloud pipelines." },
  { name: "Groq API & LPU", category: "Systems & AI", level: "Proficient", experience: "Ultra-fast streaming AI completions", description: "Hardware-accelerated token streaming, conversational memory, structured tool outputs." }
];

export const PROJECTS: Project[] = [
  {
    id: "altradar",
    title: "AltRadar",
    subtitle: "High-Throughput C++ Terminal Crypto Trading Simulator",
    description: "Real-time cryptocurrency order execution simulator with an in-memory limit order book (L2/L3) and live ANSI terminal dashboard.",
    extendedDescription: "AltRadar is a low-latency cryptocurrency trading simulator designed to test high-frequency market making and momentum strategies. Built from scratch in pure C++20 with zero heavy GUI dependencies, it maintains real-time double-sided price ladders, computes simulated slippage, and executes simulated market and limit orders with microsecond-level precision.",
    category: "Systems",
    tech: ["C++20", "Multi-threading", "Order Book", "ANSI Terminal UI", "CMake"],
    metrics: [
      { label: "Execution Latency", value: "<12μs" },
      { label: "Throughput", value: "10,000+ ord/s" },
      { label: "Memory Footprint", value: "<8MB RAM" }
    ],
    keyFeatures: [
      "In-memory Level 2 / Level 3 double-ended price ladder with instant bid/ask matching",
      "Real-time ANSI terminal dashboard updating at 60 FPS without cursor flicker",
      "Dynamic order placement engine supporting Limit, Market, and Stop-Loss orders",
      "Realistic market making bot simulating order flow, liquidity replenishment, and spread widening",
      "Real-time portfolio P&L tracking, unrealized gain/loss calculation, and trade history ledger"
    ],
    architectureNotes: [
      "Uses std::map and custom price bucket structs for logarithmic price level lookups and constant-time FIFO queue insertions.",
      "Worker thread dispatches simulated order arrivals while main thread renders the formatted terminal dashboard.",
      "Optimized standard output flushing using write buffers for crisp, tear-free terminal telemetry."
    ],
    codeSnippet: {
      language: "cpp",
      filename: "OrderBook.hpp",
      code: `// High-performance matching engine excerpt
void OrderBook::matchOrders() {
    while (!bids.empty() && !asks.empty()) {
        auto bestBid = bids.begin();
        auto bestAsk = asks.begin();
        
        if (bestBid->first < bestAsk->first) break; // No cross
        
        Order& buyOrder = bestBid->second.front();
        Order& sellOrder = bestAsk->second.front();
        
        uint32_t matchedQty = std::min(buyOrder.quantity, sellOrder.quantity);
        double execPrice = sellOrder.price;
        
        executeTrade(buyOrder.id, sellOrder.id, execPrice, matchedQty);
        
        buyOrder.quantity -= matchedQty;
        sellOrder.quantity -= matchedQty;
        
        if (buyOrder.quantity == 0) bestBid->second.pop_front();
        if (sellOrder.quantity == 0) bestAsk->second.pop_front();
        if (bestBid->second.empty()) bids.erase(bestBid);
        if (bestAsk->second.empty()) asks.erase(bestAsk);
    }
}`
    },
    githubUrl: "https://github.com/sxlmwn/altradar",
    accentColor: "teal",
    featured: true
  },
  {
    id: "football-transfer-simulator",
    title: "Football Transfer Market Simulator",
    subtitle: "C++ Data Structures & Graph-Based Market Engine",
    description: "Complex simulation engine modeling club finances, agent negotiations, and player valuations using graphs, priority queues, and BSTs.",
    extendedDescription: "A comprehensive domain-driven simulation engine modeling the multi-variable economics of European football transfer windows. It employs weighted directed graphs for scouting network discovery, min-heap priority queues for deadline-day bidding wars, and balanced binary search trees for logarithmic player indexing and salary-cap verification.",
    category: "DSA",
    tech: ["C++", "Graph Algorithms", "Priority Queues", "Binary Search Trees", "Financial Modeling"],
    metrics: [
      { label: "Algorithms", value: "Graph + Heaps" },
      { label: "Search Complexity", value: "O(log N)" },
      { label: "Simulated Clubs", value: "32+ Teams" }
    ],
    keyFeatures: [
      "Scouting network represented as weighted directed graphs with club-to-agent relationship scores",
      "Transfer deadline day bidding wars orchestrated via min-heap priority queues",
      "Dynamic player valuation algorithm considering age curve, contract length, form index, and team chemistry",
      "Strict Financial Fair Play (FFP) wage-to-revenue ratio verification engine",
      "Interactive CLI with club management mode, transfer negotiation simulator, and squad builder"
    ],
    architectureNotes: [
      "Custom BST implementation for player attribute queries and transfer value range filtering.",
      "Custom Priority Queue managing simultaneous bidding rounds with time-decay priority multipliers.",
      "Modular separation of Club, Player, Agent, and MarketController entities."
    ],
    codeSnippet: {
      language: "cpp",
      filename: "TransferMarket.cpp",
      code: `// Graph traversal for scouting recommendations
std::vector<Player*> ScoutingNetwork::findTargets(Club* buyer, Position pos, double maxBudget) {
    std::vector<Player*> candidates;
    auto agentConnections = getConnectedAgents(buyer->getReputation());
    
    for (auto* agent : agentConnections) {
        for (auto* player : agent->getRepresentedPlayers()) {
            if (player->position == pos && player->marketValue <= maxBudget) {
                if (buyer->verifyFFPCompliance(player->demandedWage)) {
                    candidates.push_back(player);
                }
            }
        }
    }
    std::sort(candidates.begin(), candidates.end(), [](Player* a, Player* b) {
        return a->getPotentialRating() > b->getPotentialRating();
    });
    return candidates;
}`
    },
    githubUrl: "https://github.com/sxlmwn/football-transfer-simulator",
    accentColor: "coral",
    featured: true
  },
  {
    id: "whatsapp-ai-bot",
    title: "WhatsApp AI Autonomous Assistant",
    subtitle: "Local LLM Inference with Ollama & Mistral 7B",
    description: "Privacy-first WhatsApp bot running local AI models with contextual memory, automated message parsing, and zero cloud telemetry.",
    extendedDescription: "A self-hosted, privacy-first conversational assistant running directly over WhatsApp Web protocol. It connects to a local Ollama instance hosting Mistral 7B, allowing users to query, summarize lengthy chat threads, generate contextual replies, and schedule reminders without a single byte of personal chat data leaving the local host.",
    category: "AI",
    tech: ["Node.js", "whatsapp-web.js", "Ollama", "Mistral 7B", "Async Queue"],
    metrics: [
      { label: "Cloud Telemetry", value: "0% (Local)" },
      { label: "Local Latency", value: "<1.2s" },
      { label: "Context Window", value: "8K Tokens" }
    ],
    keyFeatures: [
      "Direct integration with whatsapp-web.js for seamless authentication and QR code pairing",
      "Local model execution via Ollama REST API with streaming response generation",
      "Sliding-window conversation memory maintaining conversational continuity per user/group",
      "Command router supporting !summarize, !explain, !code, and natural conversational chat",
      "Async queue and rate-limiting system to avoid WhatsApp anti-spam triggers"
    ],
    architectureNotes: [
      "In-memory token-bounded conversation buffer with SQLite persistence for user preferences.",
      "Robust headless browser lifecycle management with auto-reconnect and session recovery.",
      "Custom system prompt tuning tailored for concise, mobile-friendly chat responses."
    ],
    codeSnippet: {
      language: "javascript",
      filename: "botEngine.js",
      code: `// Contextual conversation dispatch to local Ollama
async function handleUserMessage(msg, userContext) {
    userContext.appendHistory({ role: 'user', content: msg.body });
    
    const response = await fetch('http://127.0.0.1:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'mistral:latest',
            messages: [
                { role: 'system', content: 'You are an intelligent, concise assistant on WhatsApp.' },
                ...userContext.getTrimmedHistory(6)
            ],
            stream: false
        })
    });
    const data = await response.json();
    userContext.appendHistory({ role: 'assistant', content: data.message.content });
    await msg.reply(data.message.content);
}`
    },
    githubUrl: "https://github.com/sxlmwn/whatsapp-ai-bot",
    accentColor: "teal",
    featured: true
  },
  {
    id: "baymax-discord-bot",
    title: "Baymax Discord Companion Bot",
    subtitle: "Ultra-Fast LLM Inference via Groq LPU API",
    description: "Empathetic conversational companion bot leveraging Groq LPU hardware for sub-200ms token generation and Discord community tooling.",
    extendedDescription: "Inspired by Big Hero 6's personal healthcare companion, Baymax is a Discord bot designed to bring empathetic, highly responsive AI conversation into community servers. Powered by Groq's LPU hardware acceleration running Llama 3 70B, Baymax provides instantaneous answers, study companionship, and moderation assistance.",
    category: "AI",
    tech: ["TypeScript", "Discord.js v14", "Groq API", "Llama 3 70B", "REST APIs"],
    metrics: [
      { label: "Time-to-First-Token", value: "<180ms" },
      { label: "Model", value: "Llama 3 70B" },
      { label: "Uptime", value: "99.9%" }
    ],
    keyFeatures: [
      "Blazing fast sub-200ms streaming text generation via Groq Cloud API",
      "Empathetic persona prompt engineering mimicking Baymax's gentle, reassuring demeanor",
      "Discord Slash Commands (/scan, /care, /study, /explain) and direct mention triggers",
      "Server-wide conversation caching with automatic per-channel context isolation",
      "Voice channel join & leave notification helper and automated text summarization"
    ],
    architectureNotes: [
      "TypeScript codebase leveraging Discord.js v14 gateway clients with rate-limit backoff.",
      "Groq SDK client configured with exponential retry strategies and token quota trackers.",
      "Ephemeral message handling for private mental-health & study check-ins."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "baymaxCompanion.ts",
      code: `// Groq API integration for sub-200ms empathetic responses
export async function generateBaymaxResponse(prompt: string, context: ChatMessage[]) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'Hello, I am Baymax, your personal healthcare and study companion. I speak with calmness, precision, and genuine care.'
            },
            ...context,
            { role: 'user', content: prompt }
        ],
        model: 'llama3-70b-8192',
        temperature: 0.6,
        max_tokens: 500
    });
    return completion.choices[0]?.message?.content || "I cannot scan your request right now.";
}`
    },
    githubUrl: "https://github.com/sxlmwn/baymax-discord-bot",
    accentColor: "coral",
    featured: true
  },
  {
    id: "portfolio-redesign",
    title: "Portfolio 2.0 (This Website)",
    subtitle: "Editorial Dark Personal Portfolio",
    description: "High-performance React & Vite portfolio with a Folioblox-inspired editorial layout, custom design system, and dark aesthetic.",
    extendedDescription: "A ground-up redesign of sxlmwn.github.io built to combine high editorial visual appeal with clean systems architecture. Features an oversized Folioblox-style hero with dual-tone portrait lighting, interactive project deep-dives, live PKT clock, and developer CLI sandbox.",
    category: "Web",
    tech: ["React 19", "Vite", "TypeScript", "Vanilla CSS", "GitHub Actions"],
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Build Time", value: "<1.0s" },
      { label: "Design System", value: "Tailored Vanilla" }
    ],
    keyFeatures: [
      "Folioblox layout structure with oversized bold statement heading and right-side integrated portrait",
      "Tailored dual-tone lighting system (Teal #2dd4bf & Coral #f43f5e) echoing the side-profile photograph",
      "Interactive terminal sandbox with real-time C++ order book matching engine simulation",
      "One-click copy email with confetti celebration and live Karachi (UTC+5) clock",
      "Zero heavy unnecessary runtime animations for instant, crisp page loading"
    ],
    architectureNotes: [
      "Lightweight Vanilla CSS token architecture with zero bulky framework overhead.",
      "Optimized WebP image assets for ultra-fast First Contentful Paint.",
      "Automated CI/CD deployment via GitHub Actions to GitHub Pages."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "Hero.tsx",
      code: `// Folioblox-style editorial Hero layout with dual-tone lighting
export const Hero: React.FC = () => {
    return (
        <section className="hero-grid">
            <div className="hero-left">
                <h1>I build with <span className="text-gradient-teal">code</span>, curiosity, and a lot of <span className="text-gradient-coral">debugging</span>.</h1>
                <p>Engineering high-throughput C++ engines and local AI assistants.</p>
            </div>
            <div className="hero-portrait-frame">
                <img src="/hero-portrait.webp" alt="Salman Younus" className="hero-portrait-img" />
            </div>
        </section>
    );
};`
    },
    githubUrl: "https://github.com/sxlmwn/sxlmwn.github.io",
    liveUrl: "https://sxlmwn.github.io",
    accentColor: "dual",
    featured: true
  }
];

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    tagline: "Local LLM Inference, Agentic Workflows & Vector Systems",
    iconName: "Cpu",
    color: "teal",
    progress: 85,
    description: "Diving deep into deploying and orchestrating machine intelligence locally and in production. Focusing on low-latency inference, context optimization, tool-calling agent pipelines, and embeddings.",
    topics: [
      {
        name: "Local Model Inference (Ollama & vLLM)",
        status: "Mastered",
        description: "Deploying quantized models (Mistral 7B, Llama 3 8B) locally with optimal GPU/CPU memory allocation and custom modelfiles."
      },
      {
        name: "Autonomous Agent Orchestration",
        status: "In Progress",
        description: "Designing multi-step agent reasoning loops, tool-calling pipelines, structured JSON outputs, and self-correcting prompt flows."
      },
      {
        name: "RAG & Vector Embeddings",
        status: "Deep Diving",
        description: "Building semantic search pipelines with vector embeddings, similarity chunking, and contextual re-ranking."
      }
    ],
    practicalApplication: "Powering the WhatsApp AI bot with local Mistral inference and Baymax Discord bot with Groq LPU streaming."
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Containerization, CI/CD Automation & Linux Systems",
    iconName: "Server",
    color: "coral",
    progress: 80,
    description: "Building reliable, automated infrastructure for shipping software. Mastering Linux server environments, multi-stage Docker builds, automated GitHub Actions pipelines, and reverse proxies.",
    topics: [
      {
        name: "Docker & Container Architecture",
        status: "Mastered",
        description: "Creating minimal multi-stage Dockerfiles, optimizing layer caching, managing compose topologies, and securing container boundaries."
      },
      {
        name: "CI/CD & GitHub Actions",
        status: "Mastered",
        description: "Authoring automated test matrices, lint workflows, artifact packaging, and zero-downtime GitHub Pages deployments."
      },
      {
        name: "Linux Administration & Hardening",
        status: "In Progress",
        description: "Managing POSIX systems (Arch / Ubuntu), bash automation, systemd services, SSH hardening, and network firewall configuration."
      }
    ],
    practicalApplication: "Automated deployment pipelines for all GitHub repositories and reproducible Docker containers for bots."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Systems",
    tagline: "Network Security, OSINT & Secure Coding Practices",
    iconName: "Shield",
    color: "dual",
    progress: 75,
    description: "Understanding software from an adversarial perspective to build resilient, hardened systems. Exploring network protocols, intelligence gathering (OSINT), and vulnerability mitigation.",
    topics: [
      {
        name: "OSINT & Intelligence Tooling",
        status: "Mastered",
        description: "Developing automated reconnaissance scripts, metadata extraction, public database querying, and digital footprint mapping."
      },
      {
        name: "Network Protocols & Packet Analysis",
        status: "In Progress",
        description: "Analyzing TCP/IP handshakes, DNS inspection, Wireshark packet captures, and reverse proxy TLS termination."
      },
      {
        name: "Secure Software Design & Cryptography",
        status: "Deep Diving",
        description: "Memory safety mitigations in C++, cryptographic hash functions, symmetric/asymmetric encryption, and input sanitization."
      }
    ],
    practicalApplication: "Hardening C++ memory buffers against overflow vulnerabilities and creating privacy-first bot architectures."
  }
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  "help": "Available commands: \n  - bio          : Display Salman's background\n  - skills       : List technical stack & languages\n  - projects     : List key engineered systems\n  - run altradar : Simulate C++ order book matching engine\n  - learning     : View active self-study tracks\n  - contact      : Show direct links & email\n  - clear        : Clear terminal output",
  "bio": "Salman Younus (sxlmwn)\nSoftware Engineering Student & Systems Builder\nPassionate about low-latency systems, AI engineering, and robust software architecture.",
  "skills": "LANGUAGES:  C++20, Python, TypeScript, Java, SQL, Bash\nFRAMEWORKS: React 19, Node.js, Vite, Discord.js, whatsapp-web.js\nSYSTEMS:    Docker, Linux, Git, Ollama, Groq LPU, CMake, GitHub Actions",
  "projects": "1. AltRadar                     [C++20 | Terminal Crypto Trading Simulator]\n2. Football Transfer Simulator  [C++ | Graph & Priority Queue Market Engine]\n3. WhatsApp AI Bot              [Node.js | Ollama Mistral Local Inference]\n4. Baymax Discord Bot           [TypeScript | Groq LPU Fast LLM Companion]\n5. Portfolio 2.0                [React 19 | Editorial Dark Visual Redesign]",
  "learning": "CURRENT SELF-STUDY TRACKS:\n  [1] AI Engineering   - Local LLM inference, Agentic pipelines, Embeddings\n  [2] Cloud & DevOps   - Docker containerization, CI/CD Actions, Linux admin\n  [3] Cybersecurity    - OSINT tooling, Network security, Secure C++ practices",
  "contact": "Email:    salmanyounus13@gmail.com\nGitHub:   https://github.com/sxlmwn\nLinkedIn: https://linkedin.com/in/sxlmwn\nLocation: Karachi, Pakistan (PKT / UTC+5)"
};
