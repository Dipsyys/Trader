import { Bell, Activity, Search, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const sparkData = [10, 14, 12, 18, 22, 28, 35, 43, 50, 58, 62].map((v, i) => ({ i, v }));

export default function Header() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between px-5 border-b border-border bg-card/60 backdrop-blur-sm z-10 sticky top-0 gap-4">

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search markets, pairs, or assets..."
          className="w-full h-8 bg-muted/50 border border-border rounded-lg pl-8 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/80 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Icon buttons */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
          <Activity className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-border" />

        {/* Total Balance */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-medium">Total Balance</span>
              <button
                onClick={() => setBalanceVisible(v => !v)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {balanceVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-foreground leading-tight">
                {balanceVisible ? '$62,409.00' : '••••••••'}
              </span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#22c55e]" />
                <span className="text-[10px] font-bold text-[#22c55e]">+12.45%</span>
              </div>
            </div>
            <span className="text-[9px] text-muted-foreground">+$6,912.23 (30D)</span>
          </div>

          {/* Mini sparkline */}
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </header>
  );
}
