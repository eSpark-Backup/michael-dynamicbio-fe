import { Box, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGetGeneralPageQuery } from "../../../services/general";
import {
  comment,
  downArrowFilled,
  dummyPhoto,
  like,
  reading,
  save,
  saveUnfilled,
  send,
  unlike,
  user,
} from "../../../assets/index.js";
import Button from "../../../components/button";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Header from "../../../layout/private-layout/Header.jsx";
import Navbar from "../../../layout/private-layout/Navbar.jsx";
import { toTitleCase } from "../../../utils/index.js";

const GeneralArticle = () => {
  const encodedData = useMemo(() => {
    const match = window.location.search.match(/data=([^&]*)/);
    return match ? match[1] : null;
  }, []);

  const { data: getGeneralData, isSuccess: getGeneralSuccess } =
    useGetGeneralPageQuery(encodedData, {
      skip: !encodedData,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const [articleContent, setArticleContent] = useState({
    articleImage: null,
    articleTitle: "",
    articleMaker: "",
    articleMakerRole: "",
    time: "",
    content: "",
    articleMakerImage: "",
    authorId: "",
    postId: null,
    isSaved: null,
    bondId: null,
    isFriend: null,
    isFollowed: null,
    pageId: null,
  });
  const [hasLiked, setHasLiked] = useState(false);
  console.log(setHasLiked, "setHasLiked");

  useEffect(() => {
    if (getGeneralData && getGeneralSuccess) {
      setArticleContent((prev) => ({
        ...prev,
        articleImage: getGeneralData?.data?.media["ARTICLES"][0]?.url,
        articleTitle: getGeneralData?.data?.content?.articleTitle,
        articleMaker: getGeneralData?.data?.isPagePost
          ? getGeneralData?.data?.page?.name
          : getGeneralData?.data?.author?.firstName +
            " " +
            getGeneralData?.data?.author?.lastName,
        articleMakerRole: getGeneralData?.data?.isPagePost
          ? getGeneralData?.data?.pageFollowerCount
          : getGeneralData?.data?.author?.company,
        time: dayjs(getGeneralData?.data?.createdAt).format("LL"),
        content: getGeneralData?.data?.content?.content,
        articleMakerImage: getGeneralData?.data?.isPagePost
          ? getGeneralData?.data?.page?.logoUrl
          : getGeneralData?.data?.author?.profileImage,
        authorId: getGeneralData?.data?.author?.id,
        postId: getGeneralData?.data?.id,
        isSaved: getGeneralData?.data?.isSaved,
        bondId: getGeneralData?.data?.bondId,
        isFriend: getGeneralData?.data?.bondId ? true : false,
        isFollowed: getGeneralData?.data?.isPageFollowing,
        pageId: getGeneralData?.data?.page?.id,
      }));
    }
  }, [getGeneralData, getGeneralSuccess]);

  const HandleClick = () => {
    toast.warning("Please login for actions");
  };

  return (
    <>
      <Header />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "10px",
          mt: "20px",
        }}
      >
        <Grid2
          container
          spacing={3}
          sx={{ width: { xs: "98%", md: "85%", lg: "80%" }, py: "25px" }}
        >
          <Grid2 size={{ xs: 12, lg: 8, xl: 9 }}>
            <Paper sx={{ p: "0px" }}>
              <Box
                sx={{
                  paddingTop: "46.25%",
                  backgroundImage: `url("${articleContent?.articleImage ? articleContent?.articleImage : dummyPhoto}")`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "100.1%",
                }}
              ></Box>
              <Box sx={{ p: "30px 20px" }}>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}
                >
                  {articleContent?.articleTitle}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "3px",
                      width: "100%",
                      p: "20px 0px 40px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          columnGap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            articleContent?.articleMakerImage
                              ? articleContent?.articleMakerImage
                              : user
                          }
                          alt="Avatar"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#171717",
                            }}
                          >
                            {toTitleCase(articleContent?.articleMaker)}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#505050",
                            }}
                          >
                            {typeof articleContent?.articleMakerRole ===
                            "string"
                              ? articleContent?.articleMakerRole
                              : `${articleContent?.articleMakerRole} ${articleContent?.articleMakerRole > 1 ? "followers" : "follower"}`}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #E4E4E4",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={reading}
                            alt="Icon"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid #E4E4E4",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={HandleClick}
                        >
                          <img
                            src={articleContent?.isSaved ? save : saveUnfilled}
                            alt="Icon"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}
                >
                  {articleContent?.time}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#171717",
                    pt: "15px",
                  }}
                  dangerouslySetInnerHTML={{ __html: articleContent?.content }}
                ></Typography>
                {
                  <Box sx={{ mt: "20px" }} onClick={HandleClick}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#171717",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      Report this article
                    </Typography>
                  </Box>
                }
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: "10px",
                    }}
                  >
                    <img
                      src={
                        articleContent?.articleMakerImage
                          ? articleContent?.articleMakerImage
                          : user
                      }
                      alt="Avatar"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography sx={{ textAlign: "center" }}>
                      {toTitleCase(articleContent?.articleMaker)}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                      {typeof articleContent?.articleMakerRole === "string"
                        ? articleContent?.articleMakerRole
                        : `${articleContent?.articleMakerRole} ${articleContent?.articleMakerRole > 1 ? "followers" : "follower"}`}
                    </Typography>
                    {articleContent?.authorId &&
                      !getGeneralData?.data?.isPagePost && (
                        <Button
                          onClick={HandleClick}
                          sx={{ width: "150px", height: "36px" }}
                        >
                          {articleContent?.isFriend ? "Unbond" : "Bond"}
                        </Button>
                      )}

                    {articleContent?.authorId &&
                      getGeneralData?.data?.isPagePost && (
                        <Button
                          onClick={HandleClick}
                          sx={{ width: "150px", height: "36px" }}
                        >
                          {articleContent?.isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 4, xl: 3 }}>
            <Paper>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
              >
                Comments
              </Typography>
              <Box
                sx={{
                  borderTop: "1px solid #E4E4E4",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#F8FCFF",
                  height: "50px",
                  px: { xs: "10px", md: "0px" },
                  mt: "25px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    cursor: "pointer",
                    width: { md: "20%" },
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={HandleClick}
                >
                  <img
                    src={user}
                    alt="Image"
                    style={{ width: "27px", height: "24px" }}
                  />
                  <img
                    src={downArrowFilled}
                    alt="Image"
                    style={{ width: "27px", height: "24px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "15px",
                    cursor: "pointer",
                    width: { md: "25%" },
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={HandleClick}
                >
                  <img
                    src={hasLiked ? like : unlike}
                    alt="Like"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: { xs: "none" },
                      color: "#505050",
                      "@media (min-width:1750px)": { display: "block" },
                    }}
                  >
                    {hasLiked ? "Liked" : "Like"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "15px",
                    cursor: "pointer",
                    backgroundColor: "inherit",
                    width: { md: "25%" },
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={HandleClick}
                >
                  <img src={comment} alt="Like" />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: { xs: "none" },
                      color: "#505050",
                      "@media (min-width:1750px)": { display: "block" },
                    }}
                  >
                    Comment
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "15px",
                    cursor: "pointer",
                    width: { md: "25%" },
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={HandleClick}
                >
                  <img src={send} alt="Repost" />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: { xs: "none" },
                      color: "#505050",
                      "@media (min-width:1750px)": { display: "block" },
                    }}
                  >
                    Send
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default GeneralArticle;
