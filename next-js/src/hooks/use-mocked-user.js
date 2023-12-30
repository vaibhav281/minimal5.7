import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {

  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    f_name: 'Vaibhav',
    m_name: 'Dilip',
    l_name: 'Chavan',
    mobile: '7779898989',
    country_code: '+91',
    is_admin: true,
    is_staff: true,
    user_type: 'Admin',
    title: 'Mr',
    dob: '1/1/2023',
    profile_img: _mock.image.avatar(24),
    alt_phone: '7779898983',
    alt_phone_country_code: '+91',
    is_verified: false,
    user_id: 'Vaibhav_user_1',
    profile_completion_percentages: 45,
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };


  // const user = {
  //   id: '8864c717-587d-472a-929a-8e5f298024da-0',
  //   displayName: 'Jaydon Frankie',
  //   email: 'demo@minimals.cc',
  //   password: 'demo1234',
  //   photoURL: _mock.image.avatar(24),
  //   phoneNumber: '+40 777666555',
  //   country: 'United States',
  //   address: '90210 Broadway Blvd',
  //   state: 'California',
  //   city: 'San Francisco',
  //   zipCode: '94116',
  //   about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
  //   role: 'admin',
  //   isPublic: true,
  // };

  return { user };
}
