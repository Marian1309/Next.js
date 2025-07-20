import { getSession } from '@/actions/auth';

import SignOut from './sign-out';

const HomePage = async () => {
  const session = await getSession();

  return <SignOut session={session} />;
};

export default HomePage;
