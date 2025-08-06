import { cn } from '@/lib/cn';

interface Properties {
  className?: string;
}

const Header = ({ className }: Properties) => {
  return <header className={cn(className)}></header>;
};

export default Header;
