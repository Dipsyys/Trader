import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  BookOpen,
  Calendar,
  Moon,
  Sun,
  Globe,
  Monitor,
  Smartphone,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import profilePhoto from '@assets/Regal_portrait_with_ornate_uniform_1783165328394.png';

export default function Sidebar() {
  const { theme, toggleTheme, language, toggleLanguage, sidebarCollapsed, toggleSidebar, t } = useApp();
  const [location, setLocation] = useLocation();
  const collapsed = sidebarCollapsed;

  return (
    <aside
      className={`flex flex-col bg-sidebar border-r border-sidebar-border h-full flex-shrink-0 z-10 relative transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[64px]' : 'w-[220px]'
      }`}
    >
      {/* Logo Area */}
      <div
        className={`flex items-center h-16 flex-shrink-0 overflow-hidden ${
          collapsed ? 'justify-center px-0' : 'justify-between px-5'
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer overflow-hidden"
          onClick={() => setLocation('/')}
        >
          <div className="w-8 h-8 bg-foreground flex items-center justify-center rounded text-background font-bold text-xl flex-shrink-0">
            X
          </div>
          {!collapsed && (
            <span className="text-foreground font-bold tracking-widest text-sm whitespace-nowrap">TRADEFX</span>
          )}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('toggle.sidebar')}
            title={t('toggle.sidebar')}
            onClick={toggleSidebar}
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Monitor className="h-4 w-4" />
          </Button>
        )}
      </div>
      {collapsed && (
        <div className="flex justify-center pb-2 -mt-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('toggle.sidebar')}
            title={t('toggle.sidebar')}
            onClick={toggleSidebar}
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-1 custom-scrollbar">
        <NavItem
          icon={LayoutDashboard}
          label={t('nav.dashboard')}
          collapsed={collapsed}
          isActive={location === '/dashboard'}
          onClick={() => setLocation('/dashboard')}
        />
        <NavItem
          icon={Briefcase}
          label={t('nav.portfolio')}
          collapsed={collapsed}
          isActive={location === '/' || location === ''}
          onClick={() => setLocation('/')}
        />
        <NavItem
          icon={TrendingUp}
          label={t('nav.compound')}
          collapsed={collapsed}
          isActive={location === '/compound'}
          onClick={() => setLocation('/compound')}
        />
        <NavItem
          icon={BookOpen}
          label={t('nav.journal')}
          collapsed={collapsed}
          isActive={location === '/journal'}
          onClick={() => setLocation('/journal')}
        />
        <NavItem
          icon={Calendar}
          label={t('nav.calendar')}
          collapsed={collapsed}
          isActive={location === '/calendar'}
          onClick={() => setLocation('/calendar')}
        />
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col gap-3 p-3 flex-shrink-0">

        {/* PRO PLAN card — hidden when collapsed */}
        {!collapsed && (
          <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2">
            <span className="text-primary text-xs font-bold tracking-wide">{t('plan.pro')}</span>
            <span className="text-muted-foreground text-[10px]">{t('plan.expires')}</span>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-1 border-primary text-primary hover:bg-primary/10 h-7 text-xs"
            >
              {t('plan.upgrade')}
            </Button>
          </div>
        )}

        {/* User mini-profile */}
        <div
          className={`flex items-center bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden ${
            collapsed ? 'justify-center p-1.5' : 'gap-3 p-2'
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 text-xs font-medium border border-border">
            <img src={profilePhoto} alt="DipsxBT" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold truncate">DipsxBT</span>
              <span className="text-[10px] text-muted-foreground truncate">Pro Trader</span>
            </div>
          )}
        </div>

        {/* Utility toggles */}
        <div className={`flex items-center gap-1 ${collapsed ? 'flex-col' : 'justify-between px-0.5'}`}>
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={theme === 'dark' ? t('toggle.theme.light') : t('toggle.theme.dark')}
            title={theme === 'dark' ? t('toggle.theme.light') : t('toggle.theme.dark')}
            onClick={toggleTheme}
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Language toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={`${t('toggle.lang')}: ${language.toUpperCase()}`}
            title={`${t('toggle.lang')}: ${language.toUpperCase()}`}
            onClick={toggleLanguage}
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0 relative"
          >
            <Globe className="h-4 w-4" />
            <span className="absolute bottom-0.5 right-0.5 text-[8px] font-bold text-primary leading-none" aria-hidden="true">
              {language.toUpperCase()}
            </span>
          </Button>

          {/* Chat / support */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Chat"
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  isActive,
  collapsed,
  onClick,
}: {
  icon: any;
  label: string;
  isActive?: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={collapsed ? label : undefined}
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={`flex items-center rounded-md transition-colors w-full group
        ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5 text-left'}
        ${isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`}
        aria-hidden="true"
      />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
