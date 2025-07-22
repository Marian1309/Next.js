'use client';

import { useCallback } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

import type { AnimationStart, AnimationVariant } from './utils/theme-animations';
import { createAnimation } from './utils/theme-animations';

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
}

const styleId = 'theme-transition-styles';

const ThemeToggleButton = ({
  variant = 'circle-blur',
  start = 'top-left',
  showLabel = false,
  url = ''
}: ThemeToggleAnimationProps) => {
  const { theme, setTheme } = useTheme();

  const updateStyles = useCallback((css: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const animation = createAnimation(variant, start, url);

    updateStyles(animation.css);

    if (typeof window === 'undefined') {
      return;
    }

    const switchTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme]);

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="group relative h-9 w-9 p-0"
      name="Theme Toggle Button"
    >
      <SunIcon className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Theme Toggle </span>
      {showLabel && (
        <>
          <span className="absolute -top-10 hidden rounded-full border px-2 group-hover:block">
            {' '}
            variant = {variant}
          </span>
          <span className="absolute -bottom-10 hidden rounded-full border px-2 group-hover:block">
            {' '}
            start = {start}
          </span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggleButton;
