import {
  olivia,
  pheonix,
  einstein,
  postPicture,
  user,
  user2,
  friend,
  heart,
  best,
  userAvatar,
  profilePicture,
  company,
  school,
  dummyPhoto,
} from "../assets";

export const bondSuggestions = [
  {
    img: user,
    name: "James Bond",
    address: "Karachi, Pakistan",
    role: "UI/UX Designer at “eSpark Consulting Group”",
  },
  {
    img: user,
    name: "James Bond",
    address: "Karachi, Pakistan",
    role: "UI/UX Designer at “eSpark Consulting Group”",
  },
  {
    img: user,
    name: "James Bond",
    address: "Karachi, Pakistan",
    role: "UI/UX Designer at “eSpark Consulting Group”",
  },
];

export const interestSuggestions = [
  {
    img: user2,
    name: "Upwork",
    description: "175,065 members",
  },
  {
    img: user2,
    name: "Skype",
    description: "175,065 members",
  },
  {
    img: user2,
    name: "WhatsApp",
    description: "175,065 members",
  },
  {
    img: user2,
    name: "Facebook",
    description: "175,065 members",
  },
];

export const suggestionPostContent = [
  {
    userName: "James Bond",
    userRole: "UI/UX Designer at “eSpark Consulting Group”",
    postTime: "2h ago",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "Suggestion for you to create bonds",
    postPic: [postPicture, postPicture, postPicture, postPicture, postPicture],
    postContent: null,
    commentsContent: [],
    type: "normal",
    isFriendPost: true,
    pinned: true,
    groupPost: true,
    isAdminPost: true,
  },
  {
    userName: "James Bond",
    userRole: "UI/UX Designer at “eSpark Consulting Group”",
    postTime: "2h ago",
    userImage: user,
    numberofLikes: 4,
    isLiked: true,
    comments: 2,
    activity: "Areeba Shakeel likes this post",
    postPic: null,
    postContent: `<p style="font-size:18px; font-weight:300; color:#505050;">#Hashtag</p><br/> Develop modern apps with the languages, frameworks, and databases of your choice.I vividly remember those hours spent waiting at Dubai airport...more`,
    commentsContent: [
      {
        userImage: einstein,
        userName: "Albert Einstein",
        comment:
          "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
        time: "14min ago",
      },
      {
        userImage: einstein,
        userName: "Albert Einstein",
        comment:
          "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
        time: "14min ago",
      },
    ],
    type: "normal",
    isFriendPost: true,
    groupPost: true,
    isAdminPost: true,
  },
  {
    userName: "Gerry’s International",
    userRole: "5,365 followers",
    postTime: "4d•",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "Albert Einstein reposted this",
    postPic: [],
    postContent: `<p style="font-size:18px; font-weight:300; color:#505050;">#Hashtag</p><br/> Develop modern apps with the languages, frameworks, and databases of your choice.I vividly remember those hours spent waiting at Dubai airport...more`,
    commentsContent: [],
    type: "video",
    videoUrl:
      "http://res.cloudinary.com/driaxcout/video/upload/v1743780393/Post/Dana_Benjamin/r3d7j9naicbumlifaync.mp4",
    thumbnail:
      "http://res.cloudinary.com/driaxcout/image/upload/v1743780395/Post/Dana_Benjamin/fajc4jkh1igmfwoajcnt.jpg",
    isFriendPost: true,
    groupPost: true,
    isAdminPost: true,
  },
  {
    userName: "Gerry’s International",
    userRole: "5,365 followers",
    postTime: "4d•",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "",
    postPic: [],
    postContent: `<p style="font-size:18px; font-weight:300; color:#505050;">#Hashtag</p><br/> Develop modern apps with the languages, frameworks, and databases of your choice.I vividly remember those hours spent waiting at Dubai airport...more`,
    commentsContent: [],
    type: "poll",
    question: "How do you commute ar work?",
    options: [
      {
        id: 1,
        value: "Public transport",
        isChecked: true,
        numbersVoted: 163,
      },
      {
        id: 2,
        value: "Drive myself",
        isChecked: false,
        numbersVoted: 120,
      },
    ],
    isVoted: true,
    isFriendPost: true,
    groupPost: true,
    isAdminPost: true,
  },
  {
    userName: "rotten ria",
    userRole: "--",
    postTime: "34m ago",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "",
    postPic: [],
    postContent: "Bring Back",
    commentsContent: [],
    type: "event",
    eventStartTime: "2025-04-03T20:00:00Z",
    eventEndTime: "2025-04-03T21:00:00Z",
    eventName: "mocking",
    eventFormat: "online",
    eventLink: "https://www.linkedin.com/feed",
    attendees: [{ image: user }],
    eventPost: "bringback",
    eventImage: dummyPhoto,
    id: 123,
    isFriendPost: true,
    groupPost: true,
    isAdminPost: true,
  },
  {
    userName: "rotten ria",
    userRole: "--",
    postTime: "34m ago",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "",
    postPic: [],
    postContent: "Sample article",
    commentsContent: [],
    type: "article",
    id: 123,
    articleImage: dummyPhoto,
    articleTitle: "Lorem Ipsum",
    articleDescription:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isFriendPost: true,
    groupPost: true,
    isAdminPost: true,
  },
];

export const chatsContent = [
  {
    id: 1,
    image: friend,
    lastMessage: "we will be working on a new project wit.",
    time: "Jan 2",
    name: "Friend",
    type: "personal",
  },
  {
    id: 2,
    image: friend,
    lastMessage: "Please send details.",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 3,
    image: friend,
    lastMessage: "Done!",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 4,
    image: friend,
    lastMessage: "Ok! Deal",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 5,
    image: friend,
    lastMessage: "Let’s catch!",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 6,
    image: friend,
    lastMessage: ":)",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 7,
    image: friend,
    lastMessage: "we will be working on a new project wit.",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 8,
    image: friend,
    lastMessage: "Close deal!",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 9,
    image: friend,
    lastMessage: "Happy to help!",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 10,
    image: friend,
    lastMessage: "Hi!",
    time: "Jan 2",
    name: "Alex",
    type: "personal",
  },
  {
    id: 11,
    image: friend,
    lastMessage: "Sent a photo",
    time: "Jan 2",
    name: "John Smith, Bob Brown, and you",
    type: "group",
  },
];

export const messages = [
  {
    id: 1,
    sender: "You",
    text: "Hey Olivia, can you please review the latest design when you can?",
    reactions: [
      { count: 1, item: heart },
      { count: 2, item: best },
    ],
    timestamp: "Friday 2:29pm",
    isUser: true,
  },
  {
    id: 2,
    sender: "Phoenix Baker",
    text: "Hey Olivia, can you please review the latest design when you can?",
    reactions: [
      { count: 1, item: heart },
      { count: 1, item: best },
    ],
    timestamp: "Friday 2:30pm",
    isUser: false,
    isTyping: false,
  },
  {
    id: 3,
    sender: "Phoenix Baker",
    text: ":-•",
    reactions: [],
    timestamp: "",
    isUser: false,
    isTyping: true,
  },
];
export const suggestedBonds = [
  {
    label: "People you may know from eSpark Consulting Group",
    accounts: [
      {
        id: 1,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 2,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 3,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 4,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
    ],
  },
  {
    label: "People you may know from University of Karachi",
    accounts: [
      {
        id: 5,
        profileImage: pheonix,
        name: "Pheonix Baker",
        desc: "Lorem ipsum dolor sit amet, consectetur",
        orgination: "ScienceLab",
        place: "Delhi, India",
        members: "115+ Members",
        isPage: true,
      },
      {
        id: 6,
        profileImage: pheonix,
        name: "Pheonix Baker",
        desc: "Lorem ipsum dolor sit amet, consectetur",
        orgination: "ScienceLab",
        place: "Delhi, India",
        members: "115+ Members",
        isPage: true,
      },
      {
        id: 7,
        profileImage: pheonix,
        name: "Pheonix Baker",
        desc: "Lorem ipsum dolor sit amet, consectetur",
        orgination: "ScienceLab",
        place: "Delhi, India",
        members: "115+ Members",
        isPage: true,
      },
      {
        id: 8,
        profileImage: pheonix,
        name: "Pheonix Baker",
        desc: "Lorem ipsum dolor sit amet, consectetur",
        orgination: "ScienceLab",
        place: "Delhi, India",
        members: "115+ Members",
        isPage: true,
      },
    ],
  },
  {
    label: "People you may know in similar roles",
    accounts: [
      {
        id: 9,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 10,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 11,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 12,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
    ],
  },
];

export const groupsData = [
  {
    id: 1,
    userImage: userAvatar,
    title: "User Experience & Trends",
    desc: "175,065",
  },
  {
    id: 2,
    userImage: userAvatar,
    title: "User Experience & Trends",
    desc: "175,065",
  },
  {
    id: 3,
    userImage: userAvatar,
    title: "User Experience & Trends",
    desc: "175,065",
  },
  {
    id: 4,
    userImage: userAvatar,
    title: "User Experience & Trends",
    desc: "175,065",
  },
];

export const pulseCardContent = [
  {
    id: 1,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 2,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 3,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 4,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 5,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
];

export const pageTypes = [
  {
    title: "Company",
    desc: "Small, medium, & large business",
    icon: company,
    alt: "company",
    link: "/bonds?sub=page&edit=true&pageType=company",
  },
  // {
  //   title: "Educational Institute",
  //   desc: "School and universities",
  //   icon: school,
  //   alt: "school",
  //   link: null,
  // },
];

export const timezoneOptions = [
  {
    label: "(UTC-12:00) International Date Line West",
    value: "UTC-12:00",
  },
  {
    label: "(UTC-11:00) Midway Island, Samoa",
    value: "UTC-11:00",
  },
  {
    label: "(UTC-10:00) Hawaii",
    value: "UTC-10:00",
  },
  {
    label: "(UTC-09:30) Marquesas Islands",
    value: "UTC-09:30",
  },
  {
    label: "(UTC-09:30) Marquesas Islands",
    value: "UTC-09:30",
  },
];

export const shareModalContent = [
  {
    id: 1,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 2,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 3,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 4,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 5,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 6,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
  {
    id: 7,
    image: profilePicture,
    name: "Areeba Shakeel",
    designation: "UI | UX Designer at eSpark Consulting Group",
    education: "University of Karachi",
  },
];

export const groupsCOntent = [
  {
    id: 1,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 2,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 3,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 4,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 5,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 6,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
  {
    id: 7,
    name: "Group name",
    status: "Public",
    picture: profilePicture,
  },
];

export const eventDuration = [
  { label: "1 day", value: 1 },
  { label: "3 days", value: 3 },
  { label: "1 week", value: 7 },
  { label: "2 weeks", value: 14 },
];
export const suggestedSearchBonds = [
  {
    label: "You might be interested in bonding with following people",
    accounts: [
      {
        id: 1,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 2,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 3,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
      {
        id: 4,
        profileImage: olivia,
        name: "Olivia Rhye",
        role: "Founder & CEO",
        desc: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
        isPage: false,
      },
    ],
  },
];

export const suggestionSearchPostContent = [
  {
    userName: "Albert Einstein",
    userRole: "Heading liner",
    postTime: "2h ago",
    userImage: user,
    numberofLikes: 0,
    isLiked: false,
    comments: 0,
    activity: "Posts with “Albert”",
    postPic: postPicture,
    postContent: null,
    commentsContent: [],
  },
];

export const groupMembers = [
  {
    image: user,
    name: "John Doe",
    role: "Developer",
    id: 1,
  },
  {
    image: profilePicture,
    name: "Jan Smith",
    role: "--",
    id: 2,
  },
  {
    image: userAvatar,
    name: "Bob Brown",
    role: "UI / UX Designer",
    id: 3,
  },
];

export const pageStats = [
  {
    value: 0,
    name: "Search appearance",
    description: "last 7 days",
  },
  {
    value: 0,
    name: "New followers",
    description: "N/A",
  },
  {
    value: 0,
    name: "Post impressions",
    description: "N/A",
  },
  {
    value: 0,
    name: "Page visitors",
    description: "N/A",
  },
];

export const otherEvents = [
  {
    image: dummyPhoto,
    time: "Happening now",
    name: "DC and Master Trust Symposium managemnet",
    eventBy: "Pesnions Management",
  },
  {
    image: dummyPhoto,
    time: "Happening now",
    name: "Rebound obsolescences",
    eventBy: "Rebound Electic",
  },
  {
    image: dummyPhoto,
    time: "Today, 1:30 PM",
    name: "Navigating New Employment Law: ",
    eventBy: "GM Business Group",
  },
  {
    image: dummyPhoto,
    time: "Happening now",
    name: "Swiss Rhinoplasty Masterclass",
    eventBy: "Dr. med. Mesutution",
  },
  {
    image: dummyPhoto,
    time: "Happening now",
    name: "Mindset & Action Live",
    eventBy: "Donna Eade",
  },
];

export const articleDummyContent = `<h1>What is Lorem Ipsum?</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    
    <h2>Why do we use it?</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
    
    <h2>Where does it come from?</h2>
    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>`;

export const reportArticleChoices = [
  {
    value: "Illegal goods and services",
    description:
      "Content that attempts to sell illegal or regulated goods and services, including solicitation of escort services, prostitution and content that depicts and/or promotes sex trafficking or human trafficking",
  },
  {
    value: "Fraud or scam",
    description:
      "Illegal activities, malware, or promotion of illegal products or services",
  },
  {
    value: "Spam",
    description:
      "Irrelevant, repititive content intended to artificially increase engagement, or other inappropirate promotional content",
  },
  {
    value: "Misinformation",
    description:
      "False content or information, including news stories, that present untrue facts or events as though they are true or likely to be true",
  },
  {
    value: "Fake account",
    description:
      "Inaccurate or misleading representation of a person or organization",
  },
  {
    value: "Harassment",
    description:
      "Attacks or intimidation toward others with abusive language or deliberately and repeatedly disrupting conversations, including revealing others’ personal or sensitive information. This includes unwanted romantic advances, sexual remarks and or requests for sexual favors.",
  },
  {
    value: "Hateful speech",
    description:
      "Attacks or incitement of violence against individuals or groups based on their actual or perceived traits, or any other speech that promotes hatred",
  },
  {
    value: "Graphic content",
    description: "Excessively gruesome or graphic material",
  },
  {
    value: "Sexual content",
    description: "Nudity or other content that’s sexual in nature",
  },
  {
    value: "Dangerous or extremist organizations",
    description:
      "Depicting or encouraging terrorist acts or severe harm, or promoting terrorist organizations or violent extremist groups",
  },
  {
    value: "Threats or violence",
    description:
      "Content that promotes or encourages violence or criminal activity, or depicts extreme violence",
  },
  {
    value: "Self-harm",
    description:
      "Promotion, encouragement or any portrayal of suicide or self-harm",
  },
  {
    value: "Hacked account",
    description: "Unauthorized account takeover",
  },
  {
    value: "Impersonation",
    description:
      "Pretending to be someone else, such as using someone's else's profile photo or name as your own",
  },
  {
    value: "Child exploitation",
    description:
      "Material that features or promotes child exploitation or nudity",
  },
  {
    value: "Infringement",
    description:
      "Attacks or incitement of violence against individuals or group based on their actual or perceived traits, or any other speech that promotes hatred",
  },
];

export const relatedGroups = [
  {
    name: "Graphic Design Freelancers",
    followers: "99,517 members",
  },
  {
    name: "Freelance Graphic Designer",
    followers: "198,860 members",
  },
  {
    name: "Digital Marketing Group - #1 Internet Online Advertising SEO Social Media Mobile",
    followers: "460,543 members",
  },
  {
    name: "The Social Media Marketing Group",
    followers: "2,884,864 members",
  },
  {
    name: "Fiverr Gigs Marketing & Promotion (world-wide) <Buyer 👉 Seller>",
    followers: "31,603 members",
  },
];

export const inviteMembers = [
  {
    id: 1,
    name: "Abdul Rehman",
    role: "Junior React js Developer",
  },
  {
    id: 2,
    name: "Saad Zafar",
    role: "SQA Engineer",
  },
  {
    id: 3,
    name: "Muhammad Ahsan Badami",
    role: "Backend Developer",
  },
  {
    id: 4,
    name: "Areeba Shakeel",
    role: "UI | UX Designer",
  },
];

export const groupMembersData = [
  {
    name: "Areeba Shakeel",
    role: "UI/UX Designer | Product Designer | Figma",
    groupRole: "member",
  },
  {
    name: "rotten ria",
    role: "--",
    groupRole: "owner",
  },
];

export const groupAdminsData = [
  {
    name: "Areeba Shakeel",
    role: "UI/UX Designer | Product Designer | Figma",
    groupRole: "admin",
    madeBy: "rotten ria",
  },
  {
    name: "rotten ria",
    role: "--",
    groupRole: "owner",
  },
];

export const groupBlockedData = [
  {
    name: "Areeba Shakeel",
    role: "UI/UX Designer | Product Designer | Figma",
    groupRole: "admin",
    madeBy: "rotten ria",
  },
];

export const sizeOptions = [
  { label: "0-1 employees", value: "ZERO_TO_ONE" },
  { label: "2-10 employees", value: "TWO_TO_TEN" },
  { label: "11-50 employees", value: "ELEVEN_TO_FIFTY" },
  { label: "51-200 employees", value: "FIFTY_ONE_TO_TWO_HUNDRED" },
  { label: "201-500 employees", value: "TWO_HUNDRED_ONE_TO_FIVE_HUNDRED" },
  { label: "501-1,000 employees", value: "FIVE_HUNDRED_ONE_TO_ONE_THOUSAND" },
  {
    label: "1,001-5,000 employees",
    value: "ONE_THOUSAND_ONE_TO_FIVE_THOUSAND",
  },
  {
    label: "5,001-10,000 employees",
    value: "FIVE_THOUSAND_ONE_TO_TEN_THOUSAND",
  },
  { label: "10,000+ employees", value: "TEN_THOUSAND_PLUS" },
];

export const typeOptions = [
  { label: "Public company", value: "PUBLIC_COMPANY" },
  { label: "Self-employed", value: "SELF_EMPLOYED" },
  { label: "Government agency", value: "GOVERNMENT_AGENCY" },
  { label: "Nonprofit", value: "NONPROFIT" },
  { label: "Sole proprietorship", value: "SOLE_PROPRIETORSHIP" },
  { label: "Privately held", value: "PRIVATELY_HELD" },
  { label: "Partnership", value: "PARTNERSHIP" },
];

export const industryTypeOptions = [
  { label: "Production", value: "PRODUCTION" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Storage", value: "STORAGE" },
  { label: "Miscellaneous services", value: "OTHER" },
];

export const monthOptions = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const ddtContent = [
  {
    id: 1,
    content: "What is the charge of hydrogen atom?",
  },
  {
    id: 2,
    content: `A hydrogen ion, typically represented as H+ \\text{H}^+, has a charge of +1. This positive charge comes from the ion having lost its single electron, leaving only the proton. So, it's essentially just a proton floating around. <br/> Anything else you're curious about? Maybe something related to chemistry or another topic entirely? 😄 hydrogen atom?`,
    response: true,
  },
];

export const historyChats = [
  {
    chat: "Chat1",
  },
  {
    chat: "Hydrogen indangering",
  },
  {
    chat: "Reply to govt email is new",
  },
];

export const productData = {
  sideNavData: {
    navItems: {
      text: ["Market Place", "Product Listing", "Market Place"],
      tabs: [
        { tab: "Newly Listed Product", path: "/market-place" },
        {
          tab: "Create a New Product Listing",
          path: "/create-product",
          innerTabs: [
            {
              tab: "Create a New Product Listing",
              path: "/create-product",
            },
            { tab: "My Products", path: "/create-product/my-products" },
            { tab: "Message Center", path: "/create-product/message-center" },
          ],
        },
        { tab: "Favourite", path: "/favourite" },
      ],
    },
  },
  adsInformationData: {
    fields: [
      {
        label: "Ad name",
        name: "ad_name",
        placeholder: "Ad name",
        type: "text",
        size: 11.82,
      },
      {
        label: "Category",
        name: "category",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "electronics", label: "Electronics" },
          { value: "furniture", label: "Furniture" },
          { value: "vehicles", label: "Vehicles" },
        ],
      },
      {
        label: "Subcategory",
        name: "sub_category",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "mobiles", label: "Mobiles" },
          { value: "laptops", label: "Laptops" },
          { value: "tablets", label: "Tablets" },
        ],
      },
      {
        label: "Brand",
        name: "brand",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "apple", label: "Apple" },
          { value: "samsung", label: "Samsung" },
          { value: "dell", label: "Dell" },
        ],
      },
      {
        label: "Model",
        name: "model",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "model1", label: "Model 1" },
          { value: "model2", label: "Model 2" },
          { value: "model3", label: "Model 3" },
        ],
      },
      {
        label: "Conditions",
        name: "condition",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "NEW", label: "New" },
          { value: "USED", label: "Used" },
          { value: "REFURBISHED", label: "Refurbished" },
        ],
      },
      {
        label: "Authenticity",
        name: "authenticity",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "YES", label: "YES" },
          { value: "NO", label: "NO" },
        ],
      },
      {
        label: "Tags",
        name: "tags",
        placeholder: "Ads tag...",
        type: "select",
        size: 11.82,
        options: [
          { value: "Featured", label: "Featured" },
          { value: "Member", label: "Member" },
          { value: "Verified Seller", label: "Verified Seller" },
        ],
      },
      {
        label: "Ad prices",
        name: "ad_price",
        placeholder: "Select...",
        type: "text",
        size: 5.8,
      },

      {
        label: "Negotiable",
        name: "negotiable",
        placeholder: "Select...",
        type: "select",
        size: 5.8,
        options: [
          { value: "YES", label: "YES" },
          { value: "NO", label: "NO" },
        ],
      },
    ],
  },
  featureAndImagesData: {
    fields: [
      {
        label: "Description",
        name: "description",
        placeholder: "Ad description",
        type: "text",
        size: 11.82,
      },
      {
        label:
          'Feature <span style="color:#939AAD; font-weight:400;">(Optional)</span>',
        name: "features",
        placeholder: "Write a feature in each line eg.",
        type: "text",
        size: 11.82,
      },
      {
        label: "Upload Photos",
        name: "upload_photos",
        type: "upload",
        size: 11.82,
      },
    ],
  },
  postAdsData: {
    fields: [
      {
        label: "Phone Number",
        name: "phone_number",
        placeholder: "Phone",
        type: "phone_number",
        size: 5.8,
      },
      {
        label: `Backup Phone Number <span style="color:#939AAD; font-weight:400;">(Optional)</span>`,
        name: "backup_phone_number",
        placeholder: "Phone",
        type: "phone_number",
        size: 5.8,
      },
      {
        label: "Email Address",
        name: "email_address",
        placeholder: "Email address",
        type: "email",
        size: 5.8,
      },
      {
        label:
          'Website Link <span style="color:#939AAD; font-weight:400;">(Optional)</span>',
        name: "website_link",
        type: "text",
        placeholder: "Your website url",
        size: 5.8,
      },
      {
        label: "Country",
        name: "country",
        type: "select",
        placeholder: "Select...",
        size: 4,
      },
      {
        label:
          'City <span style="color:#939AAD; font-weight:400;">(Optional)</span>',
        name: "city",
        type: "text",
        placeholder: "Select...",
        size: 4,
      },
      {
        label:
          'State <span style="color:#939AAD; font-weight:400;">(Optional)</span>',
        name: "state",
        type: "text",
        placeholder: "Select...",
        size: 4,
      },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Your location",
        size: 5.8,
      },
      {
        label:
          'Map Location <span style="color:#939AAD; font-weight:400;">(Optional)</span>',
        name: "map_location",
        type: "text",
        placeholder: "Map location",
        size: 5.8,
        disabled: true,
      },
    ],
  },
};
