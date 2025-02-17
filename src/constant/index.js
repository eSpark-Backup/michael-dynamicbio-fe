import { einstein, postPicture, user, userWithCamera } from "../assets";

export const bondSuggestions = [
    {
        img: user,
        name: "Albert Einstein",
        address: "XYZ Company, USA"
    },
    {
        img: user,
        name: "Albert Einstein",
        address: "XYZ Company, USA"
    },
    {
        img: user,
        name: "Albert Einstein",
        address: "XYZ Company, USA"
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
        userName: "Albert Einstein",
        userRole: "Heading liner",
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
        userName: "Albert Einstein",
        userRole: "Heading liner",
        postTime: "2h ago",
        userImage: user,
        numberofLikes: 4,
        isLiked: true,
        comments: 2,
        activity: "Areeba Shakeel likes this post",
        postPic: null,
        postContent: `#Hashtag <br/> <br/> Develop modern apps with the languages, frameworks, and databases of your choice.I vividly remember those hours spent waiting at Dubai airport...more`,
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