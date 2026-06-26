export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  results: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; level: number }[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  status: string;
  about: {
    bio: string[];
    strengths: { label: string; description: string }[];
    workStyle: string[];
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  contact: {
    wechat: string;
    email: string;
    phone: string;
  };
  life: {
    hobbies: { name: string; emoji: string; description: string }[];
    personality: string[];
    quote: string;
  };
}

const profile: Profile = {
  name: "Alex Chen",
  title: "Frontend Developer & UI Designer",
  tagline:
    "Building beautiful, performant web experiences with product thinking.",
  status: "Available for work",
  about: {
    bio: [
      "黄家兴，北京化工大学在读，2023级（2027年毕业），主修国际贸易专业，系统掌握国际贸易实务等专业知识，辅修法学专业。",
      "已通过大学英语四级、六级，使用过Codex、Claude Code等主流AI智能工具，可完成文案撰写、资料整理、数据梳理、内容优化、问题分析等工作，擅长借助智能化工具提升工作效率。",
      "获北京化工大学萌芽杯校级三等奖，在校级科创竞赛中，通过团队调研、课题研究、成果打磨，锻炼了扎实的数据分析、问题探究、团队协作和文案撰写能力。",
    ],
    strengths: [],
    workStyle: [],
  },
  experience: [
    {
      id: "exp-1",
      company: "北京化工大学交通管理部门",
      role: "校内学生工作",
      period: "2023年9月 — 至今",
      description:
        "日常负责校园班车运营秩序维护，每日值守班车站点，引导师生有序排队、文明乘车，及时疏导人流，避免拥挤混乱情况，保障班车通行效率与出行安全。",
      results: [
        "负责师生班车刷卡核验工作，精准完成刷卡登记、人员核对，耐心解答师生关于班车时刻表、路线调整、乘车规范等各类咨询问题",
        "定期配合部门完成班车运营数据统计、秩序优化建议梳理等工作",
        "长期的一线服务工作，极大锻炼了现场应变能力、沟通协调能力和责任心，能够高效应对人流高峰等突发场景，养成了严谨细致、踏实负责的工作态度",
      ],
      techStack: ["现场管理", "沟通协调", "数据统计", "服务统筹"],
    },
    {
      id: "exp-2",
      company: "学校精工工厂",
      role: "校内实训实践",
      period: "2025年6月",
      description:
        "参与学校组织的精工工厂实习，系统观摩并学习化工工厂基础生产运作流程、车间安全规范、设备基础操作原理及生产运维标准。",
      results: [
        "跟随工作人员熟悉化工生产工序、物料流转、车间管控及质量核查基础工作，了解工业生产标准化、规范化作业模式",
        "掌握基础工厂操作流程与安全作业准则",
        "打破纯理论学习局限，积累了工业实操经验，培养了严谨、规范、恪守流程的工作思维，提升了细节把控、规则执行和现场学习落地的能力",
      ],
      techStack: ["生产流程", "安全规范", "质量管控", "实操能力"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Design System",
      description:
        "A comprehensive component library with 50+ accessible, themeable UI components. Used across 3 product teams.",
      techStack: ["React", "TypeScript", "Storybook", "TailwindCSS"],
      highlights: ["50+ components", "Full accessibility", "Tree-shakeable"],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-2",
      name: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts, customizable widgets, and role-based access control.",
      techStack: ["Next.js", "D3.js", "WebSocket", "PostgreSQL"],
      highlights: [
        "Real-time updates",
        "Drag-and-drop layout",
        "Export to PDF",
      ],
      github: "https://github.com",
    },
    {
      id: "proj-3",
      name: "E-commerce Platform",
      description:
        "Full-featured e-commerce platform with cart, checkout, payment integration, and admin dashboard.",
      techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      highlights: [
        "SSR optimized",
        "SEO score 98",
        "3s time-to-interactive",
      ],
      github: "https://github.com",
      demo: "https://demo.example.com",
    },
    {
      id: "proj-4",
      name: "Developer CLI Tool",
      description:
        "A CLI tool for scaffolding projects, generating components, and managing config — used by 200+ developers.",
      techStack: ["Node.js", "TypeScript", "Commander.js"],
      highlights: [
        "200+ weekly downloads",
        "Plugin system",
        "Auto-completion",
      ],
      github: "https://github.com",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "TailwindCSS", level: 95 },
        { name: "Framer Motion", level: 85 },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git", level: 90 },
        { name: "Figma", level: 80 },
        { name: "Storybook", level: 85 },
        { name: "CI/CD", level: 80 },
      ],
    },
    {
      category: "Design",
      items: [
        { name: "UI Design", level: 85 },
        { name: "Design Systems", level: 90 },
        { name: "Prototyping", level: 75 },
        { name: "Motion Design", level: 80 },
      ],
    },
  ],
  contact: {
    wechat: "wxid_81mrkaebk44k22",
    email: "tacqing@gmail.com",
    phone: "13086999074",
  },
  life: {
    hobbies: [
      { name: "拍照", emoji: "📷", description: "" },
      { name: "羽毛球", emoji: "🏸", description: "" },
      { name: "健身", emoji: "💪", description: "" },
      { name: "阅读", emoji: "📚", description: "" },
      { name: "音乐", emoji: "🎵", description: "" },
    ],
    personality: [
      "性格开朗乐观",
      "待人真诚",
      "沟通表达能力强",
      "抗压能力强",
      "乐于接受新鲜事物",
      "主动学习",
      "羽毛球",
      "健身",
      "踏实稳重",
      "责任心强",
      "团队配合意识好",
    ],
    quote: "The best way to predict the future is to create it.",
  },
};

export default profile;
