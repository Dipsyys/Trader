import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  BookOpen,
  Calendar,
  BarChart2,
  Layers,
  FlaskConical,
  Bell,
  FileText,
  Settings,
  Moon,
  Sun,
  Globe,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useLocation } from 'wouter';
import profilePhoto from '@assets/Regal_portrait_with_ornate_uniform_1783165328394.png';

const NAV_MAIN = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/dashboard' },
  { icon: Briefcase,        label: 'Portfolio',  path: '/portfolio' },
  { icon: TrendingUp,       label: 'Compound',   path: '/compound' },
  { icon: BookOpen,         label: 'Journal',    path: '/journal' },
  { icon: BarChart2,        label: 'Analytics',  path: '/analytics' },
  { icon: Layers,           label: 'Strategies', path: '/strategies' },
  { icon: FlaskConical,     label: 'Backtest',   path: '/backtest' },
  { icon: Bell,             label: 'Alerts',     path: '/alerts' },
  { icon: Calendar,         label: 'Calendar',   path: '/calendar' },
  { icon: FileText,         label: 'Reports',    path: '/reports' },
  { icon: Settings,         label: 'Settings',   path: '/settings' },
];

export default function Sidebar() {
  const { theme, toggleTheme, language, toggleLanguage, sidebarCollapsed } = useApp();
  const [location, setLocation] = useLocation();
  const collapsed = sidebarCollapsed;

  return (
    <aside
      className={`flex flex-col bg-sidebar border-r border-sidebar-border h-full flex-shrink-0 z-10 relative transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[64px]' : 'w-[200px]'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 flex-shrink-0 overflow-hidden ${
          collapsed ? 'justify-center px-0' : 'px-4'
        }`}
      >
        <div
          className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
          onClick={() => setLocation('/dashboard')}
        >
          {/* X logo mark */}
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md flex-shrink-0">
            <span className="text-primary-foreground font-black text-base leading-none">✕</span>
          </div>
          {!collapsed && (
            <span className="text-foreground font-extrabold tracking-widest text-sm whitespace-nowrap">
              TRADEFX
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5 custom-scrollbar">
        {NAV_MAIN.map(({ icon: Icon, label, path }) => {
          const isActive = location === path || (path === '/dashboard' && (location === '/' || location === '/dashboard'));
          return (
            <NavItem
              key={path}
              icon={Icon}
              label={label}
              collapsed={collapsed}
              isActive={isActive}
              onClick={() => setLocation(path)}
            />
          );
        })}
      </nav>

      {/* PRO PLAN */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl border border-primary/40 bg-primary/5 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase">Pro Plan</span>
          </div>
          <p className="text-[10px] text-muted-foreground mb-2.5">
            Expires in <span className="text-foreground font-bold">24 Days</span>
          </p>
          <button className="w-full py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Bottom Area */}
      <div className={`flex flex-col gap-2 p-2.5 border-t border-sidebar-border flex-shrink-0`}>
        {/* User */}
        <div
          className={`flex items-center rounded-lg cursor-pointer hover:bg-muted/30 transition-colors overflow-hidden ${
            collapsed ? 'justify-center p-1.5' : 'gap-2.5 px-2 py-2'
          }`}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-border">
            <img src={profilePhoto} alt="DipsXBT" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[11px] font-bold text-foreground truncate">DipsXBT</span>
                <span className="text-[9px] text-muted-foreground truncate">Pro Trader</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            </>
          )}
        </div>

        {/* Utility toggles */}
        <div className={`flex items-center gap-1 ${collapsed ? 'flex-col' : 'justify-center'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="h-7 w-7 text-muted-foreground hover:text-foreground flex-shrink-0 relative"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="absolute bottom-0.5 right-0.5 text-[7px] font-bold text-primary leading-none">
              {language.toUpperCase()}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-7 w-7 text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
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
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={`flex items-center rounded-md transition-all duration-150 w-full group
        ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2 text-left'}
        ${isActive
          ? 'bg-primary/15 text-primary border border-primary/20'
          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground border border-transparent'
        }`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`}
      />
      {!collapsed && (
        <span className={`text-[13px] font-medium ${isActive ? 'text-primary' : ''}`}>{label}</span>
      )}
    </button>
  );
}
