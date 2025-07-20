import { ErrorLayout } from '@/components/layout';

const NotFoundPage = () => {
  return (
    <ErrorLayout
      description="На жаль, сторінка, яку ви шукаєте, не існує або була переміщена."
      title="Сторінку не знайдено"
    />
  );
};

export default NotFoundPage;
