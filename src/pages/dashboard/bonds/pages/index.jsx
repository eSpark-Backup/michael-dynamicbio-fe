import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import PagesTab from './pagestab';
import CreatePage from './createPage';
import { useQuery } from '../../../../utils';
import {
  useDeletePageMutation,
  useFollowPageMutation,
  useGetAllPagesQuery,
  useGetFollowedPagesQuery,
  useGetMyPagesQuery,
} from '../../../../services/page';

const Pages = () => {
  const query = useQuery();
  const idEdit = query.get('edit') === 'true';
  const [activeTabLabel, setActiveTabLabel] = useState('Your');

  const {
    data: myPagesData,
    isLoading: isMyPagesLoading,
    isError: isMyPagesError,
    error: myPagesError,
    refetch: myPagesRefetch,
    isFetching: isMyPagesFetcing,
  } = useGetMyPagesQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: allPagesData,
    isLoading: isAllPagesLoading,
    isError: isAllPagesError,
    error: allPagesError,
    refetch: allPagesRefetch,
    isFetching: isAllPagesFetcing,
  } = useGetAllPagesQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: followedPagesData,
    isLoading: isFollowedPagesLoading,
    isError: isFollowedPagesError,
    error: followedPagesError,
    refetch: followPagesRefetch,
    isFetching: isFollowedPagesFetcing,
  } = useGetFollowedPagesQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const [follow, { isLoading: isFollowLoading }] = useFollowPageMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        allPagesRefetch();
        followPagesRefetch();
      }
    });
  };

  const [deletePage, { isLoading: isDeleteLoading }] = useDeletePageMutation();

  const handleDelete = (id) => {
    deletePage(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        myPagesRefetch();
      }
    });
  };

  useEffect(() => {
    if (isMyPagesError) toast.error(myPagesError?.data?.message);
    if (isAllPagesError) toast.error(allPagesError?.data?.message);
    if (isFollowedPagesError) toast.error(followedPagesError?.data?.message);
  }, [isMyPagesError, isAllPagesError, isFollowedPagesError]);

  const { user } = useSelector((state) => state.auth);

  const tabs = useMemo(() => {
    const myPages = myPagesData?.data?.pages || [];
    const allPages = allPagesData?.data?.pages || [];
    const followedPages = followedPagesData?.data?.pages || [];
    const filteredPages = allPages.filter(
      (item) =>
        item?.creatorId !== user?.id &&
        !item?.followers?.some((follower) => follower?.id === user?.id)
    );
    return [
      {
        label: 'Your',
        component: (
          <PagesTab
            isFollowLoading={isFollowLoading}
            handleFollow={handleFollow}
            isDeleteLoading={isDeleteLoading}
            handleDelete={handleDelete}
            showSuggestion
            suggestedPages={filteredPages}
            accounts={myPages}
            type="my-pages"
          />
        ),
      },
      {
        label: 'Followed',
        component: (
          <PagesTab
            isFollowLoading={isFollowLoading}
            handleFollow={handleFollow}
            isDeleteLoading={isDeleteLoading}
            handleDelete={handleDelete}
            accounts={followedPages}
          />
        ),
      },
    ];
  }, [
    myPagesData,
    allPagesData,
    followedPagesData,
    isFollowLoading,
    isDeleteLoading,
  ]);

  const activeTab = tabs.find((tab) => tab.label === activeTabLabel);

  if (
    isMyPagesLoading ||
    isAllPagesLoading ||
    isFollowedPagesLoading ||
    isAllPagesFetcing ||
    isFollowedPagesFetcing ||
    isMyPagesFetcing
  ) {
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

  if (idEdit) return <CreatePage />;

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        sx={{
          background: '#FFF',
          border: '1px solid #E4E4E4',
          borderRadius: '4px',
          padding: '18px 30px',
        }}
      >
        {tabs.map((tab) => (
          <Typography
            sx={{
              cursor: 'pointer',
              position: 'relative',
              background:
                'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:
                tab.label === activeTabLabel ? 'transparent' : '#000',
            }}
            fontSize="14px"
            fontWeight={500}
            onClick={() => setActiveTabLabel(tab.label)}
            key={tab.label}
          >
            {tab.label}
          </Typography>
        ))}
      </Stack>
      {activeTab?.component}
    </>
  );
};

export default Pages;
