import { Box, Drawer, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { copyResponse, hamburger, happy, history, horizontalDots, hydrogen, icon, logout, negative, newChat, notTyping, positive, sad } from '../../assets'
import Input from '../../components/Input'
import { ddtContent, historyChats } from '../../constant'
import ConfirmationModal from '../../components/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DDT = () => {
    const [message, setMessage] = useState("")
    const [hasHydrogen, setHasHydrogen] = useState(message.toLowerCase().split(/\s+/).some((item) => item.startsWith("hyd")))
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate()
    const { user: userData } = useSelector((state) => state.auth);

    useEffect(() => {
        setHasHydrogen(message.toLowerCase().split(/\s+/).some((item) => item.startsWith("hyd")))
    }, [message])

    return (
        <Box
            sx={{
                height: "100vh",
                background: "radial-gradient(109.07% 109.03% at 50% 2.5%, #37A1F7 2.4%, #37A1F7 14.4%, #288DF5 48.45%, #519EEF 55.82%, #1358A5 68.4%, #002A60 100%)"

            }}
        >
            <Box
                sx={{
                    backgroundColor: "#FDF8F2",
                    display: "flex",
                    justifyContent: "space-between",
                    py: "5px",
                    pr: "30px",
                    pl: { xs: "30px", md: "0px" }
                }}
            >
                <Box sx={{ width: { xs: "0%", md: "50%" }, visibility: "hidden" }}>

                </Box>
                <Box sx={{ width: { xs: "100%", md: "50%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <img src={icon} alt="Icon" />
                    <img src={logout} alt="Icon" onClick={() => setShowConfirmModal(true)} style={{ cursor: "pointer" }} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "30px",
                    py: "15px"
                }}
            >
                <img src={hydrogen} alt="Icon" />
                <img src={history} alt="Icon" style={{ cursor: "pointer" }} onClick={() => setDrawerOpen(true)} />
            </Box>
            <Box
                sx={{
                    mx: { xs: "10px", md: "35px", lg: "150px" },
                    // border: "1px solid red",
                    height: { xs: "72vh", md: "65vh" },
                    overflowY: "auto",
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                    pb: "15px",
                }}
            >
                {ddtContent?.map((item, index) => (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: item?.response ? "flex-start" : "flex-end",
                            // rowGap: '100px',
                            flexDirection: "column",
                            alignItems: item?.response ? "flex-start" : "flex-end",
                        }}
                    >
                        <Box
                            sx={{
                                background: item?.response ? "linear-gradient(0deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.64))" : "#FCFCFC",
                                boxShadow: item?.response ? "0px 1px 10px 12px #1018280F" : "0px 1px 2px 0px #1018280F",
                                p: "10px 14px",
                                borderBottomLeftRadius: "8px",
                                borderBottomRightRadius: "8px",
                                borderTopLeftRadius: item?.response ? "0px" : "0px",
                                borderTopRightRadius: item?.response ? "8px" : "0px",
                                width: "fit-content",
                                mt: index == 0 ? "0px" : "25px"
                            }}
                            key={index}
                        >
                            <Typography
                                sx={{ fontSize: "16px", fontWeight: "400", color: "#000000" }}
                                dangerouslySetInnerHTML={{ __html: item?.content }}
                            />
                        </Box>
                        {item?.response &&

                            <Box sx={{ display: "flex", columnGap: "10px", pl: "10px", mt: "10px", alignItems: "center" }}>
                                <img src={copyResponse} alt="Icon" style={{ cursor: "pointer" }} />
                                <img src={positive} alt="Icon" style={{ cursor: "pointer" }} />
                                <img src={negative} alt="Icon" style={{ cursor: "pointer" }} />
                            </Box>
                        }
                    </Box>
                ))}
            </Box>
            <Box sx={{
                display: "flex",
                columnGap: "15px",
                mx: { xs: "10px", md: "35px", lg: "150px" },
                mt: { xs: "15px", md: "10px" },
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                {/*  */}
                <Box sx={{ width: { md: "10%", lg: "5%" }, display: { xs: "none", md: "block" }, height: "137px" }}>
                    {message?.length === 0
                        ?
                        <Box sx={{ width: "100%" }}></Box>
                        :
                        <img src={hasHydrogen ? happy : sad} alt="Icon" style={{ width: "100%" }} />
                    }
                </Box>
                <Box
                    sx={{
                        // height: "100%",
                        width: { xs: "100%", md: "90%", lg: "95%" },
                        backgroundColor: "#25252580",
                        backdropFilter: "blur(80px)",
                        borderRadius: "24px",
                        display: "flex"
                    }}
                >
                    <Input
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "none",
                                color: "#fff",
                                backgroundColor: "transparent",
                                height: "65px",
                                // width: "95%"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "& .MuiInputBase-input": {
                                color: "#fff",
                                "&::placeholder": {
                                    color: "#fff",
                                    opacity: 1,
                                },
                            },
                        }}
                        placeholder="Write here"
                        handleChange={(e) => setMessage(e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pr: { xs: "5px", md: "10px" } }}>
                        <img src={notTyping} alt="Icon" style={{
                            cursor: "pointer",
                            transform: `rotate(${message?.length > 0 ? "-90deg" : "0deg"})`,
                            transition: "all 0.3s ease-in-out"
                        }} />
                    </Box>
                </Box>
            </Box>
            <ConfirmationModal
                open={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                title={"Leave H+"}
                acceptButtonText={"Leave"}
                handleAccept={() => navigate(`/profile/${userData?.id}`)}
            >
                <Typography
                    sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}
                >
                    Are you sure you want to end this chat and go back to your account?
                </Typography>
            </ConfirmationModal>

            <Box sx={{ position: "absolute", right: "0px", height: "100%", top: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Drawer
                    anchor={"right"}
                    open={drawerOpen} onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            height: "90%",
                            top: "5vh",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                            background: "linear-gradient(180deg, #18375B 0%, #19395D 100%)",
                            border: "none",
                            boxShadow: "none",
                            width: "242px"
                        },
                    }}
                >
                    <Box sx={{ display: "flex", columnGap: "10px", mt: '20px' }}>
                        <img src={hamburger} alt="Icon" style={{ cursor: "pointer" }} onClick={() => setDrawerOpen(false)} />
                        <Typography sx={{ fontSize: "29px", fontWeight: "400", color: "#FFFFFF" }}>History</Typography>
                    </Box>
                    <Box sx={{ borderBottom: "1px solid #FFFFFF", height: "65px", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "10px", mt: "20px" }}>
                        <Typography sx={{ fontSize: "21px", fontWeight: "300", color: "#FFFFFF" }}>New Chat</Typography>
                        <img src={newChat} alt="Icon" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", mt: "10px" }}>
                        {
                            historyChats?.map((item, index) => (
                                <Box sx={{ height: "65px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "0px" }}
                                    key={index}
                                >
                                    <Typography sx={{ fontSize: "17px", fontWeight: "300", color: "#FFFFFF" }}>
                                        {item?.chat?.length > 17 ? item?.chat?.slice(0, 18) + "..." : item?.chat}
                                    </Typography>
                                    <img src={horizontalDots} alt="Icon" />
                                </Box>
                            ))
                        }
                    </Box>
                </Drawer>
            </Box>
        </Box >
    )
}

export default DDT

// backdrop-filter: blur(80px)

