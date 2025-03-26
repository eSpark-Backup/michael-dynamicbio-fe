import { Box, Paper, Typography } from "@mui/material";
import { Button } from "../../../components";
import { copyToClipboard } from "../../../utils";
import { copy } from "../../../assets";

const RightBar = () => {
  const url = "www.fnkdfhudfhidjfvhdfkvgjdhfkbhkfddsfd/jdsfiods.com";
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          px: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            Language
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            English
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          px: "20px",
          mt: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            URL
          </Typography>
          <img
            onClick={() => copyToClipboard(url)}
            style={{ cursor: "pointer" }}
            src={copy}
            alt="copy"
          />
        </Box>
        <Box
          sx={{
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {url}
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          px: "20px",
          mt: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
          >
            Analytics
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }}
            variant="gradientText"
          >
            View all
          </Typography>
        </Box>
        {[1, 2]?.map((item, index) => {
          return (
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                {index === 0 ? "Profile views" : "Post impression"}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    textAlign: "right",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: (theme) => theme.palette.primary.dark,
                  }}
                >
                  0
                </Typography>
                {index === 1 && (
                  <Typography
                    sx={{
                      textAlign: "right",
                      fontSize: "10px",
                      fontWeight: 300,
                      color: (theme) => theme.palette.primary.dark,
                    }}
                  >
                    Last 7 days
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
        <Button
          sx={{
            height: "40px",
            fontSize: "14px",
            fontWeight: 400,
            color: "#171717",
          }}
        >
          Manage
        </Button>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          px: "20px",
          mt: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
          >
            Research
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }}
            variant="gradientText"
          >
            View all
          </Typography>
        </Box>
        {[1, 2]?.map((item, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                border: "1px solid #E4E4E4",
                p: "10px 5px 15px 5px",
                borderRadius: "4px",
                flexDirection: "column",
                rowGap: "5px",
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  Hydrogen discovery
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#505050",
                  }}
                >
                  {index === 0 ? "Author" : "Member"}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #E4E4E4",
                  borderRadius: "4px",
                  p: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  Approvals
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 300,
                    color: (theme) => theme.palette.primary.dark,
                  }}
                >
                  0
                </Typography>
              </Box>
            </Box>
          );
        })}
        <Button
          sx={{
            height: "40px",
            fontSize: "14px",
            fontWeight: 400,
            color: "#171717",
          }}
        >
          Manage
        </Button>
      </Paper>
    </>
  );
};

export default RightBar;
