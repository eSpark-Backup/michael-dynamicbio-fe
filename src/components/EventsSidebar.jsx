import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { conversation, dummyPhoto } from '../assets'
import { otherEvents } from '../constant'

const EventsSidebar = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Paper>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    <img src={conversation} alt="Image" style={{ width: "60px" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                        <Typography>Host an event on Fusion and invite your network</Typography>
                        <Button sx={{ display: "flex", columnGap: "3px", width: '180px', height: "30px", background: "white !important", border: "1px solid black" }}>
                            <Typography sx={{ color: "black" }}>Create event</Typography>
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Other events for you</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }} variant='gradientText'>See all</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
                    {/*  */}
                    {otherEvents?.map((item, index) => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: '5px' }} key={index}>
                            <img src={item?.image} alt="Image" style={{ width: "50%", height: "100px", borderRadius: "8px" }} />
                            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", }}>
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: item?.time === "Happening now" ? "#01754F" : "#171717" }}>{item?.time}</Typography>
                                <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>
                                    {item?.name?.length > 28 ? `${item.name.slice(0, 28)}...` : item?.name}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                    {item?.eventBy?.length > 28 ? `${item?.eventBy.slice(0, 28)}...` : item?.eventBy}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    )
}

export default EventsSidebar
