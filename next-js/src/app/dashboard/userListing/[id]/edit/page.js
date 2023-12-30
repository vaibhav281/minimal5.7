import PropTypes from 'prop-types';

import { _userList } from 'src/_mock/_user';
import { UserAccountView } from 'src/sections/userListing/view';

// import { UserEditView } from 'src/sections/userListing/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Edit',
};

export default function UserEditPage({ params }) {
  const { id } = params;

  return <UserAccountView id={id} />;
  // return <UserEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
    id: user.id,
  }));
}

UserEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
