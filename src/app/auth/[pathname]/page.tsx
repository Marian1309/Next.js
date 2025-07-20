import { AuthCard } from '@daveyplate/better-auth-ui';
import { authViewPaths } from '@daveyplate/better-auth-ui/server';

export const generateStaticParams = () => {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
};

interface Properties {
  params: Promise<{ pathname: string }>;
}

const AuthPage = async ({ params }: Properties) => {
  const { pathname } = await params;

  return (
    <div className="mx-auto flex min-h-dvh items-center justify-center">
      <AuthCard
        classNames={{
          form: {
            forgotPasswordLink: 'text-black dark:text-white',
            error: 'text-left'
          }
        }}
        socialLayout="grid"
        pathname={pathname}
      />
    </div>
  );
};

export default AuthPage;
