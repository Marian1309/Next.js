'use client';

import { useRouter } from 'next/navigation';

import { useIsMounted } from '@pidchashyi/hooks';
import { FileQuestion, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface Properties {
  title: string;
  description: string;
}

const ErrorLayout = (params: Properties) => {
  const {
    title = 'Сторінку не знайдено',
    description = 'На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.'
  } = params;

  const router = useRouter();

  const isMounted = useIsMounted();

  const lang = isMounted ? (document.documentElement.lang as 'uk' | 'en') : 'en';

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <Card className="border-primary/50 w-full max-w-2xl shadow-lg">
        <CardHeader className="pb-4 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <FileQuestion className="text-primary h-10 w-10" />
          </div>
          <CardTitle className="text-primary text-2xl font-semibold">
            {title || (lang === 'uk' ? 'Сторінку не знайдено' : 'Page not found')}
          </CardTitle>
          <CardDescription className="text-base">
            {description ||
              (lang === 'uk'
                ? 'На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.'
                : 'Unfortunately, the page you are looking for does not exist or has been moved.')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="gap-2" onClick={() => router.back()} size="lg">
              <Search className="h-4 w-4" />
              {lang === 'uk' ? 'Повернутися назад' : 'Go back'}
            </Button>

            <Button
              className="gap-2"
              onClick={() => router.push('/')}
              size="lg"
              variant="outline"
            >
              <Home className="h-4 w-4" />
              {lang === 'uk' ? 'На головну' : 'Go to home'}
            </Button>
          </div>

          <div className="text-muted-foreground border-t pt-4 text-center text-sm">
            <p>
              {lang === 'uk'
                ? 'Якщо ви вважаєте, що це помилка, напишіть на '
                : 'If you believe this is an error, please write to '}
              <span className="cursor-pointer transition-all after:w-0 hover:underline">
                pidchashymaryan@gmail.com
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorLayout;
