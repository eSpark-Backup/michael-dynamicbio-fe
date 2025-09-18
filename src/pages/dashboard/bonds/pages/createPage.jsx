import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { CreatePageForm } from '../../../../components';
import { useQuery } from '../../../../utils';
import { pageTypes } from '../../../../constant';

const CreatePage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const pageType = query.get('pageType');

  return (
    <>
      <Stack
        sx={{ padding: '18px 30px' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Create Page</Typography>
        {pageType && (
          <Typography
            onClick={() => navigate('/bonds?sub=page&edit=true')}
            sx={{ cursor: 'pointer' }}
          >
            Change page type
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E4E4E4',
          borderRadius: '4px',
        }}
      >
        <Typography sx={{ padding: '18px 30px' }}>
          Expand and engage with clients, employees, and the community. Select
          the type of page first.
        </Typography>
        {pageType ? (
          <Stack
            sx={{ width: '100%', padding: '18px 30px' }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <CreatePageForm pageType={pageType} />
          </Stack>
        ) : (
          <Stack
            sx={{ padding: '18px 30px' }}
            direction={{ xs: 'column', lg: 'row' }}
            alignItems="center"
            justifyContent="center"
            gap="34px"
          >
            {pageTypes.map((item) => {
              return (
                <Box
                  key={item?.title}
                  onClick={item?.link ? () => navigate(item?.link) : () => {}}
                  sx={{
                    width: '300px',
                    height: '160px',
                    boxShadow: '0px 0px 6.1px 0px #00000026',
                    borderRadius: '4px',
                    background: '#F2F8FD',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                >
                  <img src={item?.icon} alt={item?.alt} />
                  <Typography textAlign="center" fontSize={21} fontWeight={700}>
                    {item?.title}
                  </Typography>
                  <Typography textAlign="center" fontSize={17} fontWeight={300}>
                    {item?.desc}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </>
  );
};
export default CreatePage;
