import { Avatar, Box, Grid2, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { earth, save, three_vertical_dots, user } from '../../../assets'
import { SavedItemCard } from '../../../components/index.js'
import { useGetSavedPostsQuery } from '../../../services/post.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const SavedPosts = () => {
    const [selectedChoice, setSelectedChoice] = useState("All")
    const [showMore, setShowMore] = useState(false);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { data, error, isLoading, isSuccess, isFetching, refetch } = useGetSavedPostsQuery(
        { page, limit: 15 },
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );


    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {

            if (!data?.data) {
                setPosts([]);
                setHasMore(false);
                return;
            }
            console.log(data?.data)
            const newPosts = transformPosts(data.data?.savedPosts);

            if (page === 1) {
                setPosts(newPosts);
            } else {
                const existingIds = new Set(posts.map(p => p.id));
                const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post.id));
                setPosts(prev => [...prev, ...uniqueNewPosts]);
            }

            setHasMore(
                data.data.pagination.currentPage < data.data.pagination.totalPages
            );
        }
    }, [data, isSuccess, page]);

    const fetchMoreData = () => {
        if (!isLoading) {
            setPage(prev => prev + 1);
        }
    };

    const transformPosts = (posts) => {
        return posts?.map((item) => {
            const now = dayjs();
            const post = item?.post;
            let pollTimeLeft = "";

            if (post?.type === "POLL") {
                const endDate = dayjs(post?.poll?.endDate);

                if (endDate.isBefore(now)) {
                    pollTimeLeft = "Poll expired";
                } else {
                    const diffInMs = endDate.diff(now);
                    const humanDiff = dayjs.duration(diffInMs).humanize();
                    pollTimeLeft = `Ends in ${humanDiff}`;
                }
            }

            // Determine postImage based on post type
            let postImage = "";
            if (post?.type === "IMAGE") {
                postImage = post?.media?.IMAGES?.[0]?.url || "";
            } else if (post?.type === "VIDEO") {
                postImage = post?.media?.THUMBNAILS?.[0]?.url || "";
            } else if (post?.type === "ARTICLE") {
                postImage = post?.media?.ARTICLES?.[0]?.url || "";
            }

            return {
                userImage: post?.author?.profileImage,
                userName: `${post?.author?.firstName} ${post?.author?.lastName}`,
                role: post?.author?.role,
                time: dayjs(post?.createdAt).fromNow(),
                type: getPostType(post?.type),
                text: post?.content?.title,
                question: post?.type === "POLL" && post?.poll?.question,
                totalVotes: post?.type === "POLL" && post?.pollStats?.totalVotes,
                pollTimeLeft,
                postImage,
                articleTitle: post?.type === "ARTICLE" && post?.content?.articleTitle,
                id: post?.id
            };
        });
    };


    const getPostType = (type) => {
        const typeMap = {
            IMAGE: "normal",
            VIDEO: "video",
            TEXT: "normal",
            POLL: "poll",
            EVENT: "event",
            ARTICLE: "article"
        };
        return typeMap[type] || "";
    };

    useEffect(() => { console.log(posts) }, [posts])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid2
                container spacing={3} sx={{
                    width: { xs: "98%", md: "85%", lg: "70%" }, py: "25px",
                }}
            >
                <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box sx={{ display: "flex", columnGap: "10px", p: "15px" }}>
                            <img src={save} alt="Icon" />
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>My items</Typography>
                        </Box>
                        <Box
                            sx={{
                                p: "15px",
                                cursor: "pointer",
                                position: "relative",
                                background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                "-webkit-background-clip": "text",
                                "-webkit-text-fill-color": "transparent",
                                "&::after": {
                                    content: '""',
                                    display: "block",
                                    width: "6px",
                                    height: "100%",
                                    background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                    position: "absolute",
                                    bottom: "0px",
                                    left: "0px",
                                    borderRadius: "2px",
                                },
                                display: "flex",
                                justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E4E4E4"
                            }}
                        >
                            <Typography sx={{ fontSize: "16px", fontWeight: "400" }} variant='gradientText'>Saved posts and articles</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>3</Typography>
                        </Box>

                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8, lg: 8 }}>
                    <Paper sx={{ px: "0px" }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: "200", color: "#171717", px: "15px" }}>Saved Posts</Typography>
                        <Box sx={{ display: "flex", columnGap: "15px", mt: "10px", px: '15px' }}>
                            <Box sx={{ height: "32px", borderRadius: "1.59rem", fontSize: "1.2rem", padding: "1.2rem", color: selectedChoice === "All" ? "white" : "#505050", border: selectedChoice === "All" ? "none" : "1px solid #E4E4E4", display: "flex", justifyContent: "center", alignItems: "center", background: selectedChoice === "All" ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "transparent", cursor: "pointer" }} onClick={() => setSelectedChoice("All")}>
                                All
                            </Box>
                            <Box sx={{ height: "32px", borderRadius: "1.59rem", fontSize: "1.2rem", padding: "1.2rem", color: selectedChoice === "Articles" ? "white" : "#505050", border: selectedChoice === "Articles" ? "none" : "1px solid #E4E4E4", display: "flex", justifyContent: "center", alignItems: "center", background: selectedChoice === "Articles" ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "transparent", cursor: "pointer" }} onClick={() => setSelectedChoice("Articles")}>
                                Articles
                            </Box>
                        </Box>
                        {/* <Box sx={{ mt: "10px" }}>
                            <SavedItemCard />
                        </Box> */}
                        <Box sx={{ mt: "10px" }}>
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={(isLoading || isFetching) && <LinearProgress />}
                                endMessage={
                                    <Typography my={2} textAlign="center" fontSize="18px" fontWeight={700}>
                                        {posts.length === 0 ? 'No posts available' : 'No more posts'}
                                    </Typography>
                                }
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                                    {posts.map((item) => (
                                        <SavedItemCard key={item.id} {...item} />
                                    ))}
                                </Box>
                            </InfiniteScroll>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default SavedPosts
