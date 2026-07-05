import { Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import profilePhoto from '@assets/Regal_portrait_with_ornate_uniform_1783165328394.png';

function getPageTitleKey(location: string): string {
  if (location === '/dashboard' || location === '/') return 'header.page.dashboard';
  if (location === '/profile') return 'header.page.portfolio';
  if (location === '/compound') return 'header.page.compound';
  if (location === '/journal') return 'header.page.journal';
  if (location === '/calendar') return 'header.page.calendar';
  return 'header.page.dashboard';
}

export default function Header() {
  const { t } = useApp();
  const [location] = useLocation();

  const pageTitle = t(getPageTitleKey(location));

  return (
    <header className="header-glass h-16 flex-shrink-0 flex items-center justify-between px-6 z-10 sticky top-0">

      {/* Page Title */}
      <div className="flex flex-col justify-center max-w-[40%]">
        <h1 className="text-base font-bold text-foreground tracking-tight">{pageTitle}</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full w-9 h-9">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 text-xs font-medium border border-border group-hover:border-primary/50 transition-colors">
            <img src={profilePhoto} alt="DipsxBT" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">DipsxBT</span>
            <span className="text-[10px] text-muted-foreground">Pro Trader</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground ml-1" />
        </div>
      </div>

    </header>
  );
}
