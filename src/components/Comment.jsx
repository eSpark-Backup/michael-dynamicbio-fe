import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { einstein, like, three_vertical_dots, unlike, user } from '../assets'
import dayjs from 'dayjs'
import { useLikeMutation } from '../services/interaction'
import { useSelector } from 'react-redux'
import DynamicModal from './dynamic-modal'
import ShowLikesModal from './ShowLikesModal'

const Comment = ({ userImage, userName, comment, time, hasLiked, likesCount, allLikes, commentId }) => {
    const theme = useTheme()
    const [isUserLiked, setIsUserLiked] = useState(hasLiked);
    const [totalLikes, setTotalLikes] = useState(likesCount);
    const [likesData, setLikesData] = useState(allLikes)
    const [showLikesModal, setShowLikesModal] = useState(false)

    const { user: userData } = useSelector((state) => state.auth);

    useEffect(() => {
        setIsUserLiked(hasLiked);
        setTotalLikes(likesCount);
        setLikesData(allLikes);
    }, [hasLiked, likesCount, allLikes]);



    const [likeData, { data, isSuccess, isError, error, isLoading }] = useLikeMutation()

    const LikeHandler = (id) => {
        likeData({ entityId: id, type: "COMMENT" });
        const newLiked = !isUserLiked;
        setIsUserLiked(newLiked);
        setTotalLikes(prevLikes => newLiked ? prevLikes + 1 : prevLikes - 1);
        const newUser = {
            id: userData?.id,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            profileImage: userData?.profileImage,
            designation: userData?.designation,
            isBound: false
        };
        if (newLiked) {
            setLikesData([...likesData, newUser])
        }
        else {
            const users = likesData?.filter((item) => item?.id !== userData?.id)
            setLikesData(users)
        }
    }


    useEffect(() => {
        if (isError && error?.data?.status === false) {
            const newLiked = !isUserLiked;
            setIsUserLiked(newLiked);
            setTotalLikes(prevLikes => newLiked ? prevLikes + 1 : prevLikes - 1);
            const newUser = {
                id: userData?.id,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                profileImage: userData?.profileImage,
                designation: userData?.designation,
                isBound: false,
            };
            if (newLiked) {
                setLikesData([...likesData, newUser])
            }
            else {
                const users = likesData?.filter((item) => item?.id !== userData?.id)
                setLikesData(users)
            }
        }
    }, [error, isError]);

    return (
        <Box sx={{ backgroundColor: "#F2F8FD", py: "10px", display: "flex", px: "4px", justifyContent: 'flex-start', columnGap: "5px", flexDirection: { xs: "column", sm: "row" }, alignItems: 'flex-start' }}>
            <Avatar
                src={userImage ? userImage : einstein}
                alt="User"
                sx={{ width: 43, height: 43, objectFit: "fill !important" }}
            />
            <Box flex={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#171717", fontSize: "18px", fontWeight: 500 }}>{userName}</Typography>
                    <Box display={"flex"} alignContent={"center"} columnGap={2}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#71717A" }}>
                            {dayjs(time).fromNow()}
                        </Typography>
                        <img src={three_vertical_dots} alt="three_vertical_dots" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                    </Box>
                </Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#18181B", pr: '4px', whiteSpace: 'pre-line', }}>
                    {comment}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#71717A", cursor: "pointer" }}
                        onClick={isLoading ? () => { } : () => LikeHandler(commentId)}
                    >
                        {isUserLiked ? "Liked" : "Like"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: "3px" }}>
                        <img src={isUserLiked ? like : unlike} alt="Like" style={{ height: "12px", width: "13.5", cursor: "pointer" }}
                            onClick={isLoading ? () => { } : () => LikeHandler(commentId)}
                        />
                        <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#71717A", cursor: totalLikes > 0 ? "pointer" : "text" }} onClick={(totalLikes > 0 && !isLoading) ? () => setShowLikesModal(true) : () => { }}>
                            {totalLikes}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <DynamicModal open={showLikesModal} handleClose={() => setShowLikesModal(false)} title={"Likes"} hideFooter={true} smallModal={true} styledHeader={true}>
                <ShowLikesModal allLikes={likesData} />
            </DynamicModal>
        </Box>
    )
}

export default Comment

