import { Avatar, Box, Grid2, LinearProgress, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { user } from '../../../assets'
import BoxWithTextIcon from '../../../components/BoxWithTextIcon'
import { usePublicProfileMutation } from '../../../services/user'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RightSideBar } from '../../../components'
import { useSendBondReqMutation, useUpdateBondReqMutation } from '../../../services/bonds'

const UserBonds = () => {
    const { id } = useParams();
    const [bondsData, setBondsData] = useState([]);
    const { user: userData } = useSelector((state) => state.auth);
    const [userBonds, { isLoading }] = usePublicProfileMutation();
    const navigate = useNavigate()
    const [sendReq, { isLoading: isReqLoading }] = useSendBondReqMutation();
    const [updateReq, { isLoading: isUpdateReqLoading }] =
        useUpdateBondReqMutation();
    const [selectedId, setSelctedId] = useState("")


    const fetchUserBonds = async (id, userBonds, userData, setBondsData) => {
        try {
            const res = await userBonds({ id: id, bond: true });
            if (res?.error) {
                toast.error(res?.error?.data?.message);
                return;
            }

            const transformData = res?.data?.data?.map((item) => ({
                profileImg: item?.otherUser?.profileImage,
                name: item?.otherUser?.firstName + " " + item?.otherUser?.lastName,
                bio: item?.otherUser?.bio?.bio,
                city: item?.otherUser?.city,
                country: item?.otherUser?.country,
                isUser: item?.otherUser?.id === userData?.id,
                isMutual: item?.isMutual,
                id: item?.otherUser?.id,
                isPending: item?.isPending,
                bondId: item?.mutualBondId
            }));

            setBondsData(transformData);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        if (id) {
            fetchUserBonds(id, userBonds, userData, setBondsData)
        }
    }, [id]);

    const handleSendBondReq = (recipientId) => {
        setSelctedId(recipientId)
        const bodyToSend = {
            recipientId: recipientId,
        };
        sendReq(bodyToSend).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message);
                setSelctedId("")
                return;
            }
            if (res) {
                toast.success("Your Request sent successfully");
                setSelctedId("")
                fetchUserBonds(id, userBonds, userData, setBondsData)
            }
        });
    };

    const handleBondReq = (bondId) => {
        setSelctedId(bondId)
        const bodyToSend = {
            bondId: bondId,
            action: "unfriend",
        };
        updateReq(bodyToSend).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message);
                setSelctedId("")
                return;
            }
            if (res) {
                setSelctedId("")
                fetchUserBonds(id, userBonds, userData, setBondsData)
            }
        });
    };

    if (isLoading) {
        return (
            <LinearProgress />
        )
    }
    return (
        <Box sx={{ p: "20px" }}>
            <Grid2 container spacing={5}>
                <Grid2 size={{ xs: 12, lg: 9 }}>
                    <Paper sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
                            {bondsData?.map((item, index) => (
                                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "flex-start", flexDirection: { xs: "column", sm: "row" } }} key={index}>
                                    <Avatar
                                        src={item?.profileImg ? item?.profileImg : user}
                                        alt="User"
                                        sx={{ width: 50, height: 50, objectFit: "fill", mt: "10px", cursor: "pointer" }}
                                        onClick={() => navigate(`/profile/${item?.id}`)}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px", width: "100%", borderBottom: "1px solid #E4E4E4", pb: '10px' }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                                            <Typography
                                                sx={{ fontSize: "20px", fontWeight: "500", color: "#171717", cursor: "pointer" }}
                                                onClick={() => navigate(`/profile/${item?.id}`)}
                                            >
                                                {item?.name}
                                            </Typography>
                                            {!item?.isUser && <Box sx={{ width: "180px", display: { xs: "none", sm: "block" } }}>
                                                <BoxWithTextIcon
                                                    onClick={
                                                        item?.isPending ? () => { }
                                                            :
                                                            !item?.isMutual ? () => handleSendBondReq(item?.id)
                                                                :
                                                                () => handleBondReq(item?.bondId)
                                                    }
                                                    text={item?.isMutual ? "Unbond" : item?.isPending ? "Pending" : "Bond"}
                                                    isLoading={(isReqLoading && selectedId === item?.id) || (isUpdateReqLoading && selectedId === item?.bondId)}
                                                />
                                            </Box>}
                                        </Box>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>{item?.bio}</Typography>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>
                                            {item?.city ? item?.city : ""}{(item?.city && item?.country) && ", "} {item?.country ? item?.country : ""}
                                        </Typography>
                                        {!item?.isUser && <Box sx={{ width: "100%", display: { xs: "block", sm: "none" } }}>
                                            <BoxWithTextIcon
                                                onClick={
                                                    item?.isPending ? () => { }
                                                        :
                                                        !item?.isMutual ? () => handleSendBondReq(item?.id)
                                                            :
                                                            () => handleBondReq(item?.bondId)
                                                }
                                                text={item?.isMutual ? "Unbond" : item?.isPending ? "Pending" : "Bond"}
                                                isLoading={(isReqLoading && selectedId === item?.id) || (isUpdateReqLoading && selectedId === item?.bondId)}
                                            />
                                        </Box>}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 3 }}>
                    <RightSideBar />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default UserBonds
