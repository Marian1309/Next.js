import { cn } from '@/lib/cn';

interface Properties {
  className?: string;
}

const Footer = ({ className }: Properties) => {
  return <footer className={cn(className)}></footer>;
};

export default Footer;
