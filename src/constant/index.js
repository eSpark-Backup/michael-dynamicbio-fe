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
  profilePicture
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
    postPic: postPicture,
    postContent: null,
    commentsContent: [],
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
  },
];

export const chatsContent = [
  {
    id: 1,
    image: friend,
    lastMessage: "we will be working on a new project wit.",
    time: "Jan 2",
    name: "Friend",
  },
  {
    id: 2,
    image: friend,
    lastMessage: "Please send details.",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 3,
    image: friend,
    lastMessage: "Done!",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 4,
    image: friend,
    lastMessage: "Ok! Deal",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 5,
    image: friend,
    lastMessage: "Let’s catch!",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 6,
    image: friend,
    lastMessage: ":)",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 7,
    image: friend,
    lastMessage: "we will be working on a new project wit.",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 8,
    image: friend,
    lastMessage: "Close deal!",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 9,
    image: friend,
    lastMessage: "Happy to help!",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 10,
    image: friend,
    lastMessage: "Hi!",
    time: "Jan 2",
    name: "Alex",
  },
  {
    id: 11,
    image: friend,
    lastMessage: "Sent a photo",
    time: "Jan 2",
    name: "Alex",
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
    timestamp: "Friday 2:30pm",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 2,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 3,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 4,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
  {
    id: 5,
    userImage: profilePicture,
    userRole: "Founder & CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tortor tristique varius tincidunt.",
    time: "34m ago",
  },
]
