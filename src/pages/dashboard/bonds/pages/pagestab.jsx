import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { PageCard } from '../../../../components';
import { plus } from '../../../../assets';

const PagesTab = ({
  isFollowLoading,
  handleFollow,
  isDeleteLoading,
  handleDelete,
  showSuggestion,
  suggestedPages: suggestedContent,
  accounts,
  type,
}) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [suggestedPages, setSuggestedPages] = useState(
    showAll ? suggestedContent : suggestedContent?.slice(0, 4)
  );

  useEffect(() => {
    setSuggestedPages(
      showAll ? suggestedContent : suggestedContent?.slice(0, 4)
    );
  }, [showAll, suggestedContent]);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        sx={{ width: '100%', maxHeight: '420px', overflow: 'auto' }}
        mt={2}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
      >
        {accounts?.length > 0 ? (
          <Stack
            sx={{ width: '100%' }}
            mt={2}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
          >
            {accounts.map((group) => (
              <PageCard
                isFollowLoading={isFollowLoading}
                handleFollow={handleFollow}
                isDeleteLoading={isDeleteLoading}
                handleDelete={handleDelete}
                type={type}
                key={group.id}
                {...group}
              />
            ))}
          </Stack>
        ) : (
          <Typography>
            {type === 'my-pages'
              ? 'You  don’t have any page'
              : "You  didn't followed any page"}
          </Typography>
        )}
      </Stack>
      {type === 'my-pages' && (
        <Stack
          mt={5}
          sx={{ width: '100%' }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/bonds?sub=page&edit=true')}
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <img width={52} height={52} src={plus} alt="add" />
            <Typography>Create Page</Typography>{' '}
          </Stack>
        </Stack>
      )}
      {showSuggestion && suggestedPages && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mt={2}
          >
            <Typography fontSize="14px">
              Pages you might be interested in
            </Typography>
            {suggestedContent?.length > 4 && (
              <Typography
                onClick={() => setShowAll(!showAll)}
                fontSize="14px"
                variant="gradientText"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {showAll ? 'View less' : 'View all'}
              </Typography>
            )}
          </Stack>

          <Stack
            sx={{ width: '100%', maxHeight: '400px', overflow: 'auto' }}
            mt={2}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
          >
            {suggestedPages.map((group) => (
              <PageCard
                isFollowLoading={isFollowLoading}
                handleFollow={handleFollow}
                isDeleteLoading={isDeleteLoading}
                handleDelete={handleDelete}
                type={type}
                key={group.id}
                {...group}
              />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default PagesTab;
