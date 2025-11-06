import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import FiltrationButton from "./FiltrationButton";
import { Link } from "react-router-dom";
import { arrow, label } from "../../assets";
import { useState } from "react";
import { useGetProductsQuery } from "../../services/product";

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetProductsQuery({ page, pageSize });

  const products = data?.data?.products || [
    {
      createdAt: "2025-11-06T10:39:42.765Z",
      updatedAt: "2025-11-06T10:39:42.765Z",
      id: "0bf741d7-3e40-4bf8-8c43-11561167839f",
      ad_name: "Fusion Ad Testing",
      category: "furniture",
      sub_category: "mobiles",
      brand: "apple",
      model: "model1",
      condition: "USED",
      authenticity: "NO",
      tags: ["Featured", "Member"],
      ad_price: "10.00",
      negotiable: "YES",
      description: "sadf sdfdas",
      features: "asdf sdf sadf ",
      photos: [
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762425580/marketplace/products/wubrwqyhwrgcckogxrct.avif",
      ],
      phone_number: "+923192013292",
      backup_phone_number: "+923192013292",
      email_address: "fusion_ad_testing@yopmail.com",
      website_link: "https://www.google.com/",
      country: "Pakistan",
      city: "Karachi",
      state: "Sindh",
      location: "Karachi",
      map_location: {
        lat: 24.8607,
        lng: 67.0011,
      },
      user: {
        createdAt: "2025-11-06T09:32:14.866Z",
        updatedAt: "2025-11-06T09:33:22.000Z",
        id: "e3654f79-1db0-4184-8aed-3525f37cdd78",
        firstName: "Test",
        lastName: "User",
        email: "goyedi9422@nyfhk.com",
        countryCode: null,
        phoneNumber: null,
        socialId: null,
        profileImage: null,
        about: {
          dob: "1995-05-20",
        },
        coverImage: null,
        imageKey: null,
        coverImageKey: null,
        password:
          "$2a$10$7/828hwE4RINDCPj9ZrL4ODCw5npmYdjpk8Eh5xj1a7CYu3.3NHCG",
        sendEmails: false,
        profile: false,
        userChatId: "690c6b1ecbed4b03f6e3fe24",
        country: null,
        city: null,
        company: null,
        designation: null,
        industry: null,
        isPhoneVerified: false,
        isEmailVerified: true,
        emailLinkExpire: null,
        is2FAEnabled: false,
        secret: null,
        passwordResetExpire: "2025-11-06T10:32:14.888Z",
        role: "USER",
        loginType: "local",
        profileStatus: "none",
        isSocialLogin: false,
        profileSettings: null,
      },
      userId: "e3654f79-1db0-4184-8aed-3525f37cdd78",
    },
    {
      createdAt: "2025-11-06T10:03:30.766Z",
      updatedAt: "2025-11-06T10:03:30.766Z",
      id: "8bb66169-38a3-4dfd-909e-b62d0d2514d8",
      ad_name: "Ad for testing",
      category: "electronics",
      sub_category: "mobiles",
      brand: "apple",
      model: "model1",
      condition: "NEW",
      authenticity: "YES",
      tags: ["Featured", "Member"],
      ad_price: "10.00",
      negotiable: "YES",
      description: "asdf",
      features: "asdf ",
      photos: [
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762423408/marketplace/products/khekjjieqm1idczgqams.jpg",
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762423406/marketplace/products/cadaunjuy5li2bei1skv.jpg",
      ],
      phone_number: "+923192013292",
      backup_phone_number: "+923192013292",
      email_address: "ali@yopmail.com",
      website_link: "https://www.google.com/",
      country: "Pakistan",
      city: "Kotli District",
      state: "Azad Kashmir",
      location: "Karachi",
      map_location: {
        lat: 24.8607,
        lng: 67.0011,
      },
      user: {
        createdAt: "2025-11-06T09:32:14.866Z",
        updatedAt: "2025-11-06T09:33:22.000Z",
        id: "e3654f79-1db0-4184-8aed-3525f37cdd78",
        firstName: "Test",
        lastName: "User",
        email: "goyedi9422@nyfhk.com",
        countryCode: null,
        phoneNumber: null,
        socialId: null,
        profileImage: null,
        about: {
          dob: "1995-05-20",
        },
        coverImage: null,
        imageKey: null,
        coverImageKey: null,
        password:
          "$2a$10$7/828hwE4RINDCPj9ZrL4ODCw5npmYdjpk8Eh5xj1a7CYu3.3NHCG",
        sendEmails: false,
        profile: false,
        userChatId: "690c6b1ecbed4b03f6e3fe24",
        country: null,
        city: null,
        company: null,
        designation: null,
        industry: null,
        isPhoneVerified: false,
        isEmailVerified: true,
        emailLinkExpire: null,
        is2FAEnabled: false,
        secret: null,
        passwordResetExpire: "2025-11-06T10:32:14.888Z",
        role: "USER",
        loginType: "local",
        profileStatus: "none",
        isSocialLogin: false,
        profileSettings: null,
      },
      userId: "e3654f79-1db0-4184-8aed-3525f37cdd78",
    },
    {
      createdAt: "2025-11-06T10:03:30.766Z",
      updatedAt: "2025-11-06T10:03:30.766Z",
      id: "8bb66169-38a3-4dfd-909e-b62d0d2514d8",
      ad_name: "Ad for testing",
      category: "electronics",
      sub_category: "mobiles",
      brand: "apple",
      model: "model1",
      condition: "NEW",
      authenticity: "YES",
      tags: ["Featured", "Member"],
      ad_price: "10.00",
      negotiable: "YES",
      description: "asdf",
      features: "asdf ",
      photos: [
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762423408/marketplace/products/khekjjieqm1idczgqams.jpg",
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762423406/marketplace/products/cadaunjuy5li2bei1skv.jpg",
      ],
      phone_number: "+923192013292",
      backup_phone_number: "+923192013292",
      email_address: "ali@yopmail.com",
      website_link: "https://www.google.com/",
      country: "Pakistan",
      city: "Kotli District",
      state: "Azad Kashmir",
      location: "Karachi",
      map_location: {
        lat: 24.8607,
        lng: 67.0011,
      },
      user: {
        createdAt: "2025-11-06T09:32:14.866Z",
        updatedAt: "2025-11-06T09:33:22.000Z",
        id: "e3654f79-1db0-4184-8aed-3525f37cdd78",
        firstName: "Test",
        lastName: "User",
        email: "goyedi9422@nyfhk.com",
        countryCode: null,
        phoneNumber: null,
        socialId: null,
        profileImage: null,
        about: {
          dob: "1995-05-20",
        },
        coverImage: null,
        imageKey: null,
        coverImageKey: null,
        password:
          "$2a$10$7/828hwE4RINDCPj9ZrL4ODCw5npmYdjpk8Eh5xj1a7CYu3.3NHCG",
        sendEmails: false,
        profile: false,
        userChatId: "690c6b1ecbed4b03f6e3fe24",
        country: null,
        city: null,
        company: null,
        designation: null,
        industry: null,
        isPhoneVerified: false,
        isEmailVerified: true,
        emailLinkExpire: null,
        is2FAEnabled: false,
        secret: null,
        passwordResetExpire: "2025-11-06T10:32:14.888Z",
        role: "USER",
        loginType: "local",
        profileStatus: "none",
        isSocialLogin: false,
        profileSettings: null,
      },
      userId: "e3654f79-1db0-4184-8aed-3525f37cdd78",
    },
    {
      createdAt: "2025-11-03T10:27:01.711Z",
      updatedAt: "2025-11-03T10:27:01.711Z",
      id: "54bdd514-0522-4e0e-b664-f63b66afb86a",
      ad_name: "Sample Product",
      category: "Gadgets",
      sub_category: "Smart Watches",
      brand: "Xiaomi",
      model: "100 Pro",
      condition: "REFURBISHED",
      authenticity: "NO",
      tags: ["computer", "laptop", "smartphone", "mobile", "TV"],
      ad_price: "2999.00",
      negotiable: "NO",
      description: "Latest product in a good condition.",
      features: "Hello World",
      photos: [
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762165619/marketplace/products/swm9tuaqms0kasdvawgw.jpg",
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762165620/marketplace/products/zl8n2wdhxtabelymaff0.jpg",
      ],
      phone_number: "+12345678902",
      backup_phone_number: "+09876543211",
      email_address: "seller@example123.com",
      website_link: "https://apple.com/my_products",
      country: "Pakistan",
      city: "Karachi",
      state: "Sindh",
      location: "Gulshan-e-Iqbal",
      map_location: {
        lat: 40.7128,
        lon: -74.006,
      },
      user: {
        createdAt: "2025-10-24T10:02:42.819Z",
        updatedAt: "2025-10-24T10:02:42.000Z",
        id: "06f726b2-0b98-46e4-bd96-386c9c026ec5",
        firstName: "Test",
        lastName: "User",
        email: "234fdasf@gmail.com",
        countryCode: null,
        phoneNumber: null,
        socialId: null,
        profileImage: null,
        about: {
          dob: "1995-05-20",
        },
        coverImage: null,
        imageKey: null,
        coverImageKey: null,
        password:
          "$2a$10$YGCXkhC5ok28kcwQ.n6iR.yb2dOY18t/2vAN5pVudOrKqv3s2Gu.e",
        sendEmails: false,
        profile: false,
        userChatId: "68fb4ec2823e59f86e567fa9",
        country: null,
        city: null,
        company: null,
        designation: null,
        industry: null,
        isPhoneVerified: false,
        isEmailVerified: false,
        emailLinkExpire: null,
        is2FAEnabled: false,
        secret: null,
        passwordResetExpire: "2025-10-24T11:02:42.830Z",
        role: "USER",
        loginType: "local",
        profileStatus: "none",
        isSocialLogin: false,
        profileSettings: null,
      },
      userId: "06f726b2-0b98-46e4-bd96-386c9c026ec5",
    },
    {
      createdAt: "2025-11-03T10:24:47.035Z",
      updatedAt: "2025-11-03T10:24:47.035Z",
      id: "d8de6473-763a-4f9b-97bd-11e8ff7f541a",
      ad_name: "Sample Product",
      category: "Gadgets",
      sub_category: "Smart Watches",
      brand: "Xiaomi",
      model: "100 Pro",
      condition: "REFURBISHED",
      authenticity: "NO",
      tags: ["computer", "laptop", "smartphone", "mobile", "TV"],
      ad_price: "2999.99",
      negotiable: "NO",
      description: "Latest product in a good condition.",
      features: "Hello World",
      photos: [
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762165483/marketplace/products/odo39ztetqn4nvfbvwyy.jpg",
        "http://res.cloudinary.com/drlvkewbn/image/upload/v1762165484/marketplace/products/j2ermskhgvf7xuo4nntd.jpg",
      ],
      phone_number: "+12345678902",
      backup_phone_number: "+09876543211",
      email_address: "seller@example123.com",
      website_link: "https://apple.com/my_products",
      country: "Pakistan",
      city: "Karachi",
      state: "Sindh",
      location: "Gulshan-e-Iqbal",
      map_location: {
        lat: 40.7128,
        lon: -74.006,
      },
      user: {
        createdAt: "2025-10-24T10:02:42.819Z",
        updatedAt: "2025-10-24T10:02:42.000Z",
        id: "06f726b2-0b98-46e4-bd96-386c9c026ec5",
        firstName: "Test",
        lastName: "User",
        email: "234fdasf@gmail.com",
        countryCode: null,
        phoneNumber: null,
        socialId: null,
        profileImage: null,
        about: {
          dob: "1995-05-20",
        },
        coverImage: null,
        imageKey: null,
        coverImageKey: null,
        password:
          "$2a$10$YGCXkhC5ok28kcwQ.n6iR.yb2dOY18t/2vAN5pVudOrKqv3s2Gu.e",
        sendEmails: false,
        profile: false,
        userChatId: "68fb4ec2823e59f86e567fa9",
        country: null,
        city: null,
        company: null,
        designation: null,
        industry: null,
        isPhoneVerified: false,
        isEmailVerified: false,
        emailLinkExpire: null,
        is2FAEnabled: false,
        secret: null,
        passwordResetExpire: "2025-10-24T11:02:42.830Z",
        role: "USER",
        loginType: "local",
        profileStatus: "none",
        isSocialLogin: false,
        profileSettings: null,
      },
      userId: "06f726b2-0b98-46e4-bd96-386c9c026ec5",
    },
  ];
  const total = data?.data?.total || 0;

  const options = [
    { value: "5", label: "5 per page" },
    { value: "10", label: "10 per page" },
    { value: "21", label: "21 per page" },
  ];

  const handleSelect = (value) => {
    setPageSize(Number(value));
  };

  const ProductCard = ({ product }) => {
    const image = product?.photos[0] || "https://ionicframework.com/docs/img/demos/thumbnail.svg";

    return (
      <Stack
        sx={{
          maxWidth: { xs: "270px", sm: "100%", md: "287px" },
          width: "100%",
          borderRadius: "14px",
          mx: "auto",
          mb: 2.5,
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: { xs: "270px", sm: "100%", md: "287px" },
              height: "195px",
              borderRadius: "7.71px",
              objectFit: "cover",
            }}
            src={image}
            alt={product?.ad_name}
          />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 10,
              backgroundColor: "#1E4084",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
            }}
          >
            Great Price
          </Box>

          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              "&:hover": { backgroundColor: "#f2f2f2" },
            }}
          >
            <Box
              component="img"
              src={label}
              alt="label icon"
              sx={{ width: 12, height: 12 }}
            />
          </IconButton>
        </Box>

        <Stack p={2}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#070E1E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.ad_name || "Untitled Product"}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#9C9C9C",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.category || "No Category"}
          </Typography>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          p={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#070E1E",
            }}
          >
            ${product?.ad_price || "N/A"}
          </Typography>

          <Link
            to={`/market-place/${product?.id}`}
            style={{
              textDecoration: "none",
              color: "#1E4084",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                View Details
              </Typography>
              <Box
                component="img"
                src={arrow}
                alt="arrow icon"
                sx={{ width: 12, height: 12, objectFit: "contain" }}
              />
            </Box>
          </Link>
        </Stack>
      </Stack>
    );
  };

  // 🌀 Loading state
  if (isLoading)
    return (
      <Stack alignItems="center" justifyContent="center" height="60vh">
        <CircularProgress />
      </Stack>
    );

  // ❌ Error state
  // if (isError)
  //   return (
  //     <Typography textAlign="center" color="error" mt={5}>
  //       Failed to load products.
  //     </Typography>
  //   );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        spacing={1}
        pb={2}
      >
        <Stack>
          <Typography>{total} Results Found</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5} justifyContent="center">
          <FiltrationButton label="Latest" onSelect={handleSelect} />
          <FiltrationButton
            label={`${pageSize} per page`}
            options={options}
            onSelect={handleSelect}
          />
        </Stack>
      </Stack>

      <Grid container spacing={2} maxWidth={"1500px"}>
        {products?.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            minWidth={{ xs: "auto", lg: "287px" }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListing;
