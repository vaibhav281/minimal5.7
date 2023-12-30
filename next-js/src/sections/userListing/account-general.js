import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const Titles = [
  { title: '', label: '', },
  { title: 'Mr', label: 'Mr.', },
  { title: 'Mrs', label: 'Mrs.', },
  { title: 'Ms', label: 'Ms.', },
  { title: 'Miss', label: 'Miss.', },
  { title: 'Dr', label: 'Dr.', },
  { title: 'Prof', label: 'Prof.', },
  { title: 'Rev', label: 'Rev.', },
  { title: 'Hon', label: 'Hon.', },
  { title: 'Sir', label: 'Sir.', },
]

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useMockedUser();

  const UpdateUserSchema = Yup.object().shape({
    f_name: Yup.string().required('First Name is required'),
    m_name: Yup.string().required('Middle Name is required'),
    l_name: Yup.string().required('Last Name is required'),
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    photoURL: Yup.mixed().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    about: Yup.string().required('About is required'),
    // not required
    isPublic: Yup.boolean(),
  });

  const defaultValues = {
    f_name: user?.f_name || '',
    m_name: user?.m_name || '',
    l_name: user?.l_name || '',

    // displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    mobile: user?.mobile || '',
    alt_phone: user?.alt_phone || '',
    // phoneNumber: user?.phoneNumber || '',
    title: user?.title || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
    is_admin: user?.is_admin || '',
    is_staff: user?.is_staff || '',
    is_verified: user?.is_verified || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label="Public Profile"
              sx={{ mt: 5 }}
            />

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete User
            </Button>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >


              <RHFAutocomplete name="title"
                type="title"
                label="Title"
                placeholder="Choose a Title"
                options={Titles.map((option) => option.label)}
                getOptionLabel={(option) => option} />
              <RHFTextField name="f_name" label="First Name" />

              <RHFTextField name="m_name" label="Middle Name" />


            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
              sx={{ pt: 3 }}
            >
              <RHFTextField name="l_name" label="Last Name" />
              {/* <RHFTextField name="displayName" label="Name" /> */}
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="mobile" label="Phone Number" />
              <RHFTextField name="alt_phone" label="Alt Phone Number" />
              <RHFTextField name="address" label="Address" />

              <RHFAutocomplete
                name="country"
                type="country"
                label="Country"
                placeholder="Choose a country"
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
              sx={{ pt: 3 }}
            >
              <RHFSwitch
                name="is_admin"
                labelPlacement="start"
                label="Is Admin"
              // sx={{ mt: 5 }}
              />
              <RHFSwitch
                name="is_staff"
                labelPlacement="start"
                label="Is Staff"
              // sx={{ mt: 5 }}
              />
              <RHFSwitch
                name="is_verified"
                labelPlacement="start"
                label="Is Verified"
              // sx={{ mt: 5 }}
              />
            </Box>


            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />


              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
