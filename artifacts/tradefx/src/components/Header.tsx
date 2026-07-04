import { Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm z-10 sticky top-0">
      
      {/* Breadcrumb / Title Area */}
      <div className="flex flex-col justify-center max-w-[30%]">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-foreground">Profile</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">Data Diri</span>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          Kelola informasi pribadi dan pengaturan akun Anda.
        </p>
      </div>

      {/* Tickers */}
      <div className="hidden lg:flex items-center gap-6 overflow-hidden max-w-[40%] text-sm px-4">
        <Ticker pair="BTC/USDT" value="+1.36%" />
        <Ticker pair="ETH/USDT" value="+2.23%" />
        <Ticker pair="SOL/USDT" value="+4.21%" />
        <Ticker pair="XAU/USD" value="+0.82%" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full w-9 h-9">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-medium border border-border group-hover:border-primary/50 transition-colors">
            D
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

function Ticker({ pair, value }: { pair: string, value: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-muted-foreground text-xs font-medium">{pair}</span>
      <span className="text-[#22c55e] text-xs font-semibold">{value}</span>
    </div>
  );
}
