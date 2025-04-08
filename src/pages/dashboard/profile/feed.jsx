import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { CustomizeTabs, PostCard, SuggestionPost } from "../../../components";
import { settings, user } from "../../../assets";
import { useGetMyPostQuery } from "../../../services/post";
import { suggestionPostContent } from "../../../constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Feed = ({ isPublicView }) => {
  const tabOptions = ["Posts", "Collaborations", "Events"];
  const { data, error, isLoading, isSuccess } = useGetMyPostQuery();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error])

  useEffect(() => {
    if (isSuccess && data?.data) {
      const allPosts = data?.data?.posts?.map((item) => {
        const postImages = item?.media["IMAGES"]?.map((mediaItem) => mediaItem?.url) || [];
        const pollOptions = item?.type === "POLL" ? [
          { id: 1, value: item?.content?.opt1, isChecked: false, numbersVoted: 0 },
          { id: 2, value: item?.content?.opt2, isChecked: false, numbersVoted: 0 },
          ...item?.content?.options?.map((option, index) => ({
            id: index + 3,
            value: option,
            isChecked: false,
            numbersVoted: 0,
          }))
        ] : [];
        return {
          userName: item?.author?.firstName + item?.author?.lastName,
          userRole: item?.author?.company,
          postTime: dayjs(item?.createdAt).fromNow(),
          userImage: item?.author?.profileImage,
          numberofLikes: 0,
          isLiked: false,
          comments: 0,
          activity: "Suggestion for you to create bonds",
          postPic: postImages,
          postContent: item?.content?.title,
          commentsContent: [],
          type: item?.type === "IMAGE" ? "normal" : item?.type === "VIDEO" ? "video" : item?.type === "TEXT" ? "normal" : item?.type === "POLL" ? "poll" : item?.type === "EVENT" ? "event" : "",
          videoUrl: item?.type === "VIDEO" ? item?.media["VIDEOS"][0]?.url : '',
          thumbnail: item?.type === "VIDEO" ? item?.media["THUMBNAILS"][0]?.url : '',
          question: item?.type === "POLL" ? item?.content?.question : "",
          options: pollOptions,
          isVoted: false,
          eventName: item?.content?.name,
          eventImage: item?.type === "EVENT" && item?.media["EVENTS"][0]?.url,
          startTime: item?.content?.startTime,
          endTime: item?.content?.showEndTime && item?.content?.endTime,
          eventType: item?.content?.eventType,
          eventLink: item?.content?.externalLink,
          attendees: [{ image: user }],
          eventPost: "bringback",
          id: item ?.id
      }
      })
      setPosts(allPosts)
    }
  }, [data, isSuccess])

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        {[
          { title: "Bonds", count: 0 },
          { title: "Your Groups", count: 0 },
          { title: "Joined Groups", count: 0 },
        ].map((item) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              key={item.title}
              sx={{
                width: "315px",
                height: "61px",
                borderRadius: "4px",
                background: "#FFF",
              }}
            >
              <Typography
                sx={{ color: "#171717" }}
                fontSize="14px"
                fontWeight={500}
              >
                {item.count}
              </Typography>
              <Typography
                sx={{ color: "#505050" }}
                fontSize="14px"
                fontWeight={400}
              >
                {item.title}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="14px" fontWeight={400}>
            Activity
          </Typography>
          {!isPublicView && (
            <img
              style={{ cursor: "pointer", width: "24px", height: "24px" }}
              src={settings}
              alt={"settings"}
            />
          )}
        </Stack>
        <CustomizeTabs tabs={tabOptions} />
        {!isPublicView && <PostCard />}
        {isLoading ? (
          <LinearProgress />
        ) : data?.data?.posts?.length > 0 ?
          posts?.map((item, index) => (
            <SuggestionPost
              userName={item?.userName}
              userImage={item?.userImage}
              userRole={item?.userRole}
              postTime={item?.postTime}
              numberofLikes={item?.numberofLikes}
              isLiked={item?.isLiked}
              comments={item?.comments}
              activity={item?.activity}
              postPic={item?.postPic}
              postContent={item?.postContent}
              commentsContent={item?.commentsContent}
              key={index}
              index={index}
              length={suggestionPostContent?.length}
              type={item?.type}
              videoUrl={item?.videoUrl}
              thumbnail={item?.thumbnail}
              question={item?.question}
              options={item?.options}
              isVoted={item?.isVoted}
              eventName={item?.eventName}
              eventImage={item?.eventImage}
              startTime={item?.startTime}
              endTime={item?.endTime}
              eventType={item?.eventType}
              eventLink={item?.eventLink}
              attendees={item?.attendees}
              eventPosts={item?.eventPost}
              id={item?.id}
            />
          )) : (
            <Typography my={2} textAlign="center" fontSize="18px" fontWeight={700}>
              No posts available
            </Typography>
          )}
      </Paper>
    </>
  );
};
export default Feed;
