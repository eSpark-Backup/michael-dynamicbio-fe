import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import SuggestionPost from './SuggestionPost';
import {
  useGetGroupPendingPostQuery,
  useUpdateGroupPendingPostMutation,
} from '../services/group';
import { getDaysLeft } from '../utils';

const GroupContentSection = () => {
  const { id } = useParams();

  const tabs = [
    {
      label: 'Pending Posts',
      component: <></>,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [posts, setPosts] = useState([]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetGroupPendingPostQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  useEffect(() => {
    if (!data?.data) {
      setPosts([]);
      return;
    }

    const newPosts = transformPosts(data.data);

    setPosts(newPosts);
  }, [data]);

  const transformPosts = (posts) => {
    return posts.map(({ post: item, id, user }) => {
      return {
        reqId: id,
        isPending: true,
        userId: user?.id,
        userName: `${user?.firstName} ${user?.lastName}`,
        userRole: user?.company,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: user?.profileImage,
        activity: '',
        postPic: item?.media?.IMAGES?.map((mediaItem) => mediaItem?.url) || [],
        postContent: item?.content?.title,
        type: getPostType(item?.type),
        videoUrl: item?.type === 'VIDEO' ? item?.media['VIDEOS'][0]?.url : '',
        thumbnail:
          item?.type === 'VIDEO' ? item?.media['THUMBNAILS'][0]?.url : '',
        question: item?.type === 'POLL' ? item?.poll?.question : '',
        options: getPollOptions(item),
        voteCount: item?.poll?.votes?.length || 0,
        endDate: item?.poll?.endDate ? getDaysLeft(item?.poll?.endDate) : '',
        pollId: item?.poll?.id || '',
        eventName: item?.content?.name,
        eventImage: item?.type === 'EVENT' && item?.media['EVENTS'][0]?.url,
        startTime: item?.content?.startTime,
        endTime: item?.content?.showEndTime && item?.content?.endTime,
        eventType: item?.content?.eventType,
        eventLink: item?.content?.externalLink,
        attendees: [{ image: user }],
        eventPost: 'bringback',
        id: item?.id,
        articleImage:
          item?.type === 'ARTICLE' ? item?.media['ARTICLES'][0]?.url : '',
        articleTitle: item?.type === 'ARTICLE' && item?.content?.articleTitle,
        articleDescription: item?.type === 'ARTICLE' && item?.content?.content,
        commentVisibility: false,
        canComment: false,
      };
    });
  };

  const getPostType = (type) => {
    const typeMap = {
      IMAGE: 'normal',
      VIDEO: 'video',
      TEXT: 'normal',
      POLL: 'poll',
      EVENT: 'event',
      ARTICLE: 'article',
    };
    return typeMap[type] || '';
  };

  const getPollOptions = (item) => {
    if (item?.type !== 'POLL') return [];
    return [
      ...(item?.poll?.options?.map((option, index) => ({
        id: index + 3,
        value: option,
        isChecked: false,
        numbersVoted: 0,
        voteBy: [],
      })) || []),
    ];
  };

  const [update] = useUpdateGroupPendingPostMutation();
  const [isUpdateLoading, setIsUpdateLoading] = useState({
    id: null,
    action: null,
  });

  const handleResponse = (id, action) => {
    const credentials = {
      action,
      rejectionReason:
        action === 'reject' ? 'This post violates group rules' : '',
    };
    setIsUpdateLoading({
      id,
      action,
    });
    update({ id, credentials }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        setIsUpdateLoading({
          id: null,
          action: null,
        });
        refetch();
      }
    });
  };

  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 150px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#1877F2' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: '20px 25px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          rowGap: '20px',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '30%', lg: '20%' } }}>
          <Paper sx={{ p: '0px' }}>
            {tabs?.map((item, index) => {
              const isActive = item.label === activeTab.label;
              return (
                <Box
                  key={index}
                  onClick={() => setActiveTab(item)}
                  sx={{
                    p: '15px 30px',
                    cursor: 'pointer',
                    position: 'relative',
                    background:
                      'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': isActive
                      ? 'transparent'
                      : '#000',
                    '&::after': {
                      content: '""',
                      display: isActive ? 'block' : 'none',
                      width: '6px',
                      height: '100%',
                      background:
                        'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)',
                      position: 'absolute',
                      bottom: '0px',
                      left: '0px',
                      borderRadius: '2px',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#171717',
                      lineHeight: 'normal',
                    }}
                    variant={isActive ? 'gradientText' : 'subtitle2'}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Paper>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '65%', lg: '78%' },
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
          >
            {posts?.length > 0 ? (
              posts.map((item) => (
                <SuggestionPost
                  key={item.id}
                  {...item}
                  handleResponse={handleResponse}
                  isUpdateLoading={isUpdateLoading}
                />
              ))
            ) : (
              <Paper>
                <Typography textAlign="center">
                  No pending posts available
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupContentSection;
