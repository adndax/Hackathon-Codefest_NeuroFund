{/*Navbar*/}
export const navItemsUnloggedIn = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
];

// Function to get nav items based on role
export const navItemsLoggedIn = (isLoggedIn: boolean, role?: "Researcher" | "Investor") => [
    { 
        name: "Home", 
        link: (() => {
            if (!isLoggedIn) return "/";
            return role === "Investor" ? "/investor" : "/researcher";
        })()
    },
    { name: "About", link: "/about" },
    { 
        name: "Research", 
        link: role === "Investor" ? "/investor-research" : "/researcher-research" 
    },
];

export const researcherIcons = [
    {
        name: "Edit",
        src: "/Edit.png",
        alt: "Edit",
        link: "/upload-researcher"
    },
    {
        name: "Message",
        src: "/Message.png",
        alt: "Message",
        link: "#"
    },
    {
      name: "Notifications",
      src: "/bell_ring.svg",
      alt: "Notifications",
      link: "#",
      isDropdown: true // Flag untuk mengidentifikasi dropdown
  },
];

export const investorIcons = [
    {
        name: "Wallet",
        src: "/wallet.svg",
        alt: "Wallet",
        link: "/investor-wallet"
    },
    {
        name: "Message",
        src: "/chat_round_line.svg",
        alt: "Message",
        link: "#"
    },
    {
      name: "Notifications",
      src: "/bell_ring.svg",
      alt: "Notifications",
      link: "#",
      isDropdown: true // Flag untuk mengidentifikasi dropdown
    },
];


  
{/*About Page*/}
export const benefitsData = [
  {
    type: "Investor",
    items: [
      {
        title: "Exclusive Access",
        desc: "Discover high-potential research early",
        icon: "asset8.png",
      },
      {
        title: "Vetted Opportunities",
        desc: "Engage with credible, curated projects",
        icon: "asset5.png",
      },
      {
        title: "Impact Investment",
        desc: "Support innovation and societal progress",
        icon: "asset2.png",
      },
      {
        title: "Seamless Funding",
        desc: "Invest easily through our secure platform",
        icon: "asset3.png",
      },
    ],
  },
  {
    type: "Researcher",
    items: [
      {
        title: "Funding Access",
        desc: "Connect with investors passionate about research",
        icon: "asset7.png",
      },
      {
        title: "Research Focus",
        desc: "Secure funding and focus on impactful work",
        icon: "asset1.png",
      },
      {
        title: "Partnership Growth",
        desc: "Build lasting, supportive relationships",
        icon: "asset6.png",
      },
      {
        title: "Enhanced Visibility",
        desc: "Showcase your research to a wider audience",
        icon: "asset4.png",
      },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "This platform gave me access to promising research projects I would have never discovered elsewhere. The process was seamless, transparent, and truly empowering.",
    name: "Adinda Putri",
    role: "Investor",
    title: "“A Bridge Between Innovation and Opportunity”",
  },
  {
    quote:
      "Through the support I received here, I was able to bring my research to publication and beyond. The platform connects you with people who genuinely believe in your work.",
    name: "Fajar Asyraf R.",
    role: "Researcher",
    title: "“Turning Vision Into Reality”",
  },
  {
    quote:
      "Efficient, reliable, and thoughtfully curated. This is more than just a funding platform; it’s a community dedicated to advancing science and innovation.",
    name: "Helenishahira Faiz",
    role: "Investor",
    title: "“A New Standard for Research Funding”",
  },
];


export const researchList = [
  {
    id: 1,
    title: "Statistical Learning-Based Analysis of Human Driver Model Parameters",
    description: "This research focuses on modeling driver behavior using machine learning techniques to enhance autonomous vehicle safety. Real-world datasets were analyzed to identify variability in human response under different traffic conditions.",
    author: "Adinda Putri",
    date: "28 April 2025",
    likes: 105,
  },
  {
    id: 2,
    title: "Optimizing Smart Grid Systems with Reinforcement Learning",
    description: "The paper explores reinforcement learning algorithms to optimize power distribution in smart grids, aiming to reduce energy waste and improve efficiency across residential zones.",
    author: "Fajar Asyraf R.",
    date: "2 May 2025",
    likes: 123,
  },
  {
    id: 3,
    title: "Real-Time Object Detection in Drone Surveillance",
    description: "This study implements YOLOv8 for aerial surveillance tasks using drones in disaster-prone areas. The results show significant improvements in real-time object recognition speed and accuracy.",
    author: "Nadine K. Saputra",
    date: "17 April 2025",
    likes: 98,
  },
  {
    id: 4,
    title: "Natural Language Processing for Bahasa Indonesia",
    description: "The project develops a sentiment analysis model tailored for Bahasa Indonesia using BERT and IndoNLU datasets, achieving 91% accuracy on multi-domain reviews.",
    author: "Rifqi Ramadhan",
    date: "20 March 2025",
    likes: 110,
  },
  {
    id: 5,
    title: "Edge Computing for Health Monitoring Systems",
    description: "This research proposes a lightweight edge computing framework for wearable health devices, reducing latency and improving real-time response in critical health scenarios.",
    author: "Anindya Prameswari",
    date: "11 May 2025",
    likes: 107,
  },
];
