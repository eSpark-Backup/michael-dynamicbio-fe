import { einstein, friend, postPicture, user, userWithCamera, user2 } from "../assets";

export const bondSuggestions = [
    {
        img: user,
        name: "James Bond",
        address: "Karachi, Pakistan",
        role: "UI/UX Designer at “eSpark Consulting Group”"
    },
    {
        img: user,
        name: "James Bond",
        address: "Karachi, Pakistan",
        role: "UI/UX Designer at “eSpark Consulting Group”"
    },
    {
        img: user,
        name: "James Bond",
        address: "Karachi, Pakistan",
        role: "UI/UX Designer at “eSpark Consulting Group”"
    },
]

export const interestSuggestions = [
    {
        img: user2,
        name: "Upwork",
        description: "175,065 members",
    },
    {
        img: user2,
        name: "Skype",
        description: "175,065 members"
    },
    {
        img: user2,
        name: "WhatsApp",
        description: "175,065 members"
    },
    {
        img: user2,
        name: "Facebook",
        description: "175,065 members"
    },
]


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
        commentsContent: []
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
                comment: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
                time: "14min ago"
            },
            {
                userImage: einstein,
                userName: "Albert Einstein",
                comment: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
                time: "14min ago"
            },
        ]
    },

]

export const chatsContent = [
    {
        id: 1,
        image: friend,
        lastMessage: "we will be working on a new project wit.",
        time: "Jan 2",
        name: "Friend"
    },
    {
        id: 2,
        image: friend,
        lastMessage: "Please send details.",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 3,
        image: friend,
        lastMessage: "Done!",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 4,
        image: friend,
        lastMessage: "Ok! Deal",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 5,
        image: friend,
        lastMessage: "Let’s catch!",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 6,
        image: friend,
        lastMessage: ":)",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 7,
        image: friend,
        lastMessage: "we will be working on a new project wit.",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 8,
        image: friend,
        lastMessage: "Close deal!",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 9,
        image: friend,
        lastMessage: "Happy to help!",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 10,
        image: friend,
        lastMessage: "Hi!",
        time: "Jan 2",
        name: "Alex"
    },
    {
        id: 11,
        image: friend,
        lastMessage: "Sent a photo",
        time: "Jan 2",
        name: "Alex"
    },
]

export const messages = [
    {
        id: 1,
        sender: "You",
        text: "Hey Olivia, can you please review the latest design when you can?",
        reactions: [{ count: 1, item: "❤️" }, { count: 2, item: "🔥" }],
        timestamp: "Friday 2:30pm",
        isUser: true,
    },
    {
        id: 2,
        sender: "Phoenix Baker",
        text: "Hey Olivia, can you please review the latest design when you can?",
        reactions: [{ count: 1, item: "❤️" }, { count: 1, item: "🔥" }],
        timestamp: "Friday 2:30pm",
        isUser: false,
        isTyping: false
    },
    {
        id: 3,
        sender: "Phoenix Baker",
        text: ":-•",
        reactions: [],
        timestamp: "",
        isUser: false,
        isTyping: true
    },

];