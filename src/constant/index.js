import { einstein, postPicture, user, userWithCamera } from "../assets";

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
        img: userWithCamera,
        name: "ScienceLab",
        description: "115+ Members",
        address: "Delhi, India"
    },
    {
        img: userWithCamera,
        name: "ScienceLab",
        description: "115+ Members",
        address: "Delhi, India"
    },
    {
        img: userWithCamera,
        name: "ScienceLab",
        description: "115+ Members",
        address: "Delhi, India"
    },
    {
        img: userWithCamera,
        name: "ScienceLab",
        description: "115+ Members",
        address: "Delhi, India"
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