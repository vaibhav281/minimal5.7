// 'use client';

// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Link from '@mui/material/Link';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function JwtMultipleLoginView() {
//   const { login } = useAuthContext();

//   const router = useRouter();

//   const [errorMsg, setErrorMsg] = useState('');

//   const searchParams = useSearchParams();

//   const returnTo = searchParams.get('returnTo');

//   const password = useBoolean();

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     email: 'demo@minimals.cc',
//     password: 'demo1234',
//   };

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await login?.(data.email, data.password);

//       router.push(returnTo || PATH_AFTER_LOGIN);
//     } catch (error) {
//       console.error(error);
//       reset();
//       setErrorMsg(typeof error === 'string' ? error : error.message);
//     }
//   });

//   const renderHead = (
//     <Stack spacing={2} sx={{ mb: 5 }}>
//       <Typography variant="h4">Sign in to Minimal Vaibhav22</Typography>

//       <Stack direction="row" spacing={0.5}>
//         <Typography variant="body2">New user?</Typography>

//         <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
//           Create an account
//         </Link>
//       </Stack>
//     </Stack>
//   );

//   const renderForm = (
//     <Stack spacing={2.5}>
//       <RHFTextField name="email" label="Email address" />

//       <RHFTextField
//         name="password"
//         label="Password"
//         type={password.value ? 'text' : 'password'}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
//         Forgot password?
//       </Link>

//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//       >
//         Login
//       </LoadingButton>
//     </Stack>
//   );

//   return (
//     <>
//       {renderHead}

//       <Alert severity="info" sx={{ mb: 3 }}>
//         Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
//       </Alert>

//       {!!errorMsg && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {errorMsg}
//         </Alert>
//       )}

//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         {renderForm}
//       </FormProvider>
//     </>
//   );
// }























'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { SentIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { Box } from '@mui/system';


// ----------------------------------------------------------------------

export default function JwtMultipleLoginView() {
  const password = useBoolean();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // const NewPasswordSchema = Yup.object().shape({
  //   code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   password: Yup.string()
  //     .min(6, 'Password must be at least 6 characters')
  //     .required('Password is required'),
  //   confirmPassword: Yup.string()
  //     .required('Confirm password is required')
  //     .oneOf([Yup.ref('password')], 'Passwords must match'),
  // });

  const formSchemas = [
    // Schema for "Login with Phone, OTP"
    Yup.object().shape({
      phone: Yup.string().required('Phone number is required'),
      otp: Yup.string().required('OTP is required'),
    }),

    // Schema for "Login with Mobile, Password, OTP"
    Yup.object().shape({
      mobile: Yup.string().required('Mobile number is required'),
      password: Yup.string().required('Password is required'),
      otp: Yup.string().required('OTP is required'),
    }),

    // Schema for "Login with Email, Password, OTP"
    Yup.object().shape({
      email: Yup.string().required('Email is required').email('Email must be a valid email address'),
      password: Yup.string().required('Password is required'),
      otp: Yup.string().required('OTP is required'),
    }),
  ];

  // const defaultValues = {
  //   code: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  const defaultValues = {
    phone: '',
    otp: '',
    mobile: '',
    password: '',
    email: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchemas),
    // resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   Console.log("data is here", data)
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     console.info('DATA', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });


  const onSubmitPhone = handleSubmit(async (data) => {
    try {
      // Handle submission for "Login with Phone, OTP"
      console.log('Phone Data:', data);
      // Perform API call for phone login using 'data' here
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitMobile = handleSubmit(async (data) => {
    try {
      // Handle submission for "Login with Mobile, Password, OTP"
      console.log('Mobile Data:', data);
      // Perform API call for mobile login using 'data' here
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitEmail = handleSubmit(async (data) => {
    try {
      // Handle submission for "Login with Email, Password, OTP"
      console.log('Email Data:', data);
      // Perform API call for email login using 'data' here
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (

    <Stack spacing={3} alignItems="center">
      {selectedTab === 0 && (
        <>

          <RHFTextField name="phone" label="Phone" />
          {/* <RHFTextField name="otp" label="OTP" /> */}
          <RHFCode name="code" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitPhone} // Submit for Phone
          >
            Update Password
          </LoadingButton>

          <Typography variant="body2">
            {`Don’t have a code? `}
            <Link
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              Resend code
            </Link>
          </Typography>
        </>
      )}
      {selectedTab === 1 && (
        <>

          <RHFTextField name="mobile" label="Mobile" />
          <RHFTextField
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* <RHFTextField
            name="confirmPassword"
            label="Confirm New Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
          <RHFCode name="code" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitMobile} // Submit for Mobile
          >
            Update Password
          </LoadingButton>

          <Typography variant="body2">
            {`Don’t have a code? `}
            <Link
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              Resend code
            </Link>
          </Typography>
        </>
      )}
      {selectedTab === 2 && (
        <>

          <RHFTextField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* <RHFTextField
            name="confirmPassword"
            label="Confirm New Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
          <RHFCode name="code" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmitEmail} // Submit for Email
          >
            Update Password
          </LoadingButton>

          <Typography variant="body2">
            {`Don’t have a code? `}
            <Link
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              Resend code
            </Link>
          </Typography>
        </>
      )}

      <Link
        component={RouterLink}
        href={paths.authDemo.modern.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>


      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h5">Choose login method</Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label=" Phone & OTP" />
            <Tab label=" Mobile & Password" />
            <Tab label=" Email & Password" />
          </Tabs>
        </Box>
      </Stack>
    </>
  );
  // const renderHead = (
  //   <>
  //     {/* <SentIcon sx={{ height: 96 }} /> */}

  //     <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
  //       <Typography variant="h3">Request sent successfully!</Typography>

  //       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //         We&apos;ve sent a 6-digit confirmation email to your email.
  //         <br />
  //         Please enter the code in below box to verify your email.
  //       </Typography>
  //     </Stack>
  //   </>
  // );

  return (
    <FormProvider methods={methods}
    // onSubmit={onSubmit}
    >
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}








// 'use client';

// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Link from '@mui/material/Link';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function JwtMultipleLoginView() {
//   const { login } = useAuthContext();

//   const router = useRouter();

//   const [errorMsg, setErrorMsg] = useState('');

//   const searchParams = useSearchParams();

//   const returnTo = searchParams.get('returnTo');

//   const password = useBoolean();

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     email: 'demo@minimals.cc',
//     password: 'demo1234',
//   };

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await login?.(data.email, data.password);

//       router.push(returnTo || PATH_AFTER_LOGIN);
//     } catch (error) {
//       console.error(error);
//       reset();
//       setErrorMsg(typeof error === 'string' ? error : error.message);
//     }
//   });

//   const renderHead = (
//     <Stack spacing={2} sx={{ mb: 5 }}>
//       <Typography variant="h4">Sign in to Minimal Vaibhav22</Typography>

//       <Stack direction="row" spacing={0.5}>
//         <Typography variant="body2">New user?</Typography>

//         <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
//           Create an account
//         </Link>
//       </Stack>
//     </Stack>
//   );

//   const renderForm = (
//     <Stack spacing={2.5}>
//       <RHFTextField name="email" label="Email address" />

//       <RHFTextField
//         name="password"
//         label="Password"
//         type={password.value ? 'text' : 'password'}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
//         Forgot password?
//       </Link>

//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//       >
//         Login
//       </LoadingButton>
//     </Stack>
//   );

//   return (
//     <>
//       {renderHead}

//       <Alert severity="info" sx={{ mb: 3 }}>
//         Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
//       </Alert>

//       {!!errorMsg && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {errorMsg}
//         </Alert>
//       )}

//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         {renderForm}
//       </FormProvider>
//     </>
//   );
// }