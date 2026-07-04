import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  BarChart2, 
  Lightbulb, 
  FlaskConical, 
  Bell, 
  Calendar, 
  FileText, 
  Settings,
  Moon,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  return (
    <aside className="w-[200px] sm:w-[240px] flex flex-col bg-sidebar border-r border-sidebar-border h-full flex-shrink-0 z-10 transition-all duration-300 relative">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 h-16 flex-shrink-0">
        <div className="w-8 h-8 bg-foreground flex items-center justify-center rounded text-background font-bold text-xl">
          X
        </div>
        <span className="text-foreground font-bold tracking-widest text-sm">TRADEFX</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
        <NavItem icon={LayoutDashboard} label="Dashboard" />
        <NavItem icon={Briefcase} label="Portfolio" />
        <NavItem icon={TrendingUp} label="Compound" />
        <NavItem icon={BookOpen} label="Journal" />
        <NavItem icon={BarChart2} label="Analytics" />
        <NavItem icon={Lightbulb} label="Strategies" />
        <NavItem icon={FlaskConical} label="Backtest" />
        <NavItem icon={Bell} label="Alerts" />
        <NavItem icon={Calendar} label="Calendar" />
        <NavItem icon={FileText} label="Reports" />
        <NavItem icon={Settings} label="Settings" isActive />
      </div>

      {/* Bottom Area */}
      <div className="p-4 flex flex-col gap-4 flex-shrink-0">
        {/* Pro Plan Card */}
        <div className="bg-card border border-border p-3 rounded-lg flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-primary text-xs font-bold tracking-wide">PRO PLAN</span>
          </div>
          <span className="text-muted-foreground text-[10px]">Expires in 24 Days</span>
          <Button variant="outline" size="sm" className="w-full mt-1 border-primary text-primary hover:bg-primary/10 h-7 text-xs">
            Upgrade Now
          </Button>
        </div>

        {/* User Mini Profile */}
        <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-medium border border-border">
            D
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold truncate">DipsxBT</span>
            <span className="text-[10px] text-muted-foreground truncate">Pro Trader</span>
          </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center justify-between px-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, isActive }: { icon: any, label: string, isActive?: boolean }) {
  return (
    <button className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full text-left group ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
