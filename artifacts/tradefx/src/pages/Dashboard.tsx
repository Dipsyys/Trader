import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, ResponsiveContainer, XAxis, YAxis,
  Tooltip, ReferenceLine,
} from 'recharts';
import { Eye, EyeOff, Info, ChevronDown, ExternalLink, Zap, Search, Bell, Zap as Lightning, X } from 'lucide-react';

/* ─── Shared palette ────────────────────────────────── */
const PRIMARY = '#00D9FF';
const GREEN   = '#00E676';
const RED     = '#FF5A7A';
const MUTED   = 'rgba(255,255,255,0.07)';

/* ─── Static data ───────────────────────────────────── */
const equityData = [
  { m: "Jul'23", v: 10000 }, { m: "Aug'23", v: 12400 }, { m: "Sep'23", v: 11800 },
  { m: "Oct'23", v: 14200 }, { m: "Nov'23", v: 16800 }, { m: "Dec'23", v: 19500 },
  { m: "Jan'24", v: 22100 }, { m: "Feb'24", v: 28400 }, { m: "Mar'24", v: 35200 },
  { m: "Apr'24", v: 42800 }, { m: "May'24", v: 50100 }, { m: "Jun'24", v: 57600 },
  { m: "Jul'24", v: 62409 },
];

const balanceSparkline = [10,14,12,18,22,28,35,43,50,58,62].map((v,i) => ({ i, v }));
const pnlSparkline     = [0,2,1.5,3,2.8,4,3.5,5,4.8,6.2,6.9].map((v,i) => ({ i, v }));
const pfSparkline      = [1.8,2.0,1.9,2.1,2.0,2.2,2.1,2.3,2.1,2.2,2.14].map((v,i) => ({ i, v }));
const ddSparkline      = [-2,-4,-3,-6,-5,-8,-7,-9,-8.5,-8.8,-8.32].map((v,i) => ({ i, v }));

const pnlBars = [
  { d:'1 Jul', v:133 }, { d:'3 Jul',  v:-45 }, { d:'5 Jul',  v:281 },
  { d:'8 Jul', v:88  }, { d:'10 Jul', v:223 }, { d:'12 Jul', v:-18 },
  { d:'15 Jul',v:-85 }, { d:'17 Jul', v:-83 }, { d:'19 Jul', v:-18 },
  { d:'22 Jul',v:193 }, { d:'24 Jul', v:281 }, { d:'26 Jul', v:-56 },
  { d:'29 Jul',v:121 },
];

const assets = [
  { name:'BTC',    pct:45.2, color:'#00D9FF' },
  { name:'ETH',    pct:20.1, color:'#2563EB' },
  { name:'SOL',    pct:15.6, color:'#8B5CF6' },
  { name:'BNB',    pct:10.3, color:'#F59E0B' },
  { name:'Others', pct:8.8,  color:'#475569'  },
];

type DayVal = number | null;
const calendarRows: DayVal[][] = [
  [1,2,3,4,5,6,7],
  [8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21],
  [22,23,24,25,26,27,28],
  [29,30,31,null,null,null,null],
];
const dayPnl: Record<number,number> = {
  1:-133, 2:-45, 3:291, 4:98, 5:98,
  8:88,   9:223, 10:-18, 11:135, 12:128,
  15:-35, 16:-23, 17:-18, 18:38, 19:-36,
  22:193, 23:291, 24:-96, 25:121,
  29:215, 30:-89, 31:312,
};

const strategies = [
  { icon:'🔵', name:'Breakout Hunter', roi:'+28.45%', winRate:'71.2%', pnl:'$2,845.12', pos:true  },
  { icon:'🟢', name:'Trend Following', roi:'+18.32%', winRate:'66.7%', pnl:'$1,832.54', pos:true  },
  { icon:'🟡', name:'Scalping Pro',    roi:'+12.65%', winRate:'61.3%', pnl:'$1,265.21', pos:true  },
  { icon:'🔴', name:'Mean Reversion',  roi:'-2.14%',  winRate:'48.1%', pnl:'-$214.32', pos:false },
];

const recentTrades = [
  { pair:'BTC/USDT', side:'Long',  size:'0.50 BTC', entry:'67,842.10', exit:'68,945.30', pnl:'+$551.60', pct:'+1.62%', date:'Jul 30, 2024 14:23', pos:true  },
  { pair:'ETH/USDT', side:'Long',  size:'5.00 ETH', entry:'3,412.80',  exit:'3,502.40',  pnl:'+$448.00', pct:'+2.62%', date:'Jul 30, 2024 11:05', pos:true  },
  { pair:'SOL/USDT', side:'Short', size:'20.00 SOL', entry:'152.40',   exit:'149.10',    pnl:'+$66.00',  pct:'+2.17%', date:'Jul 29, 2024 21:44', pos:true  },
  { pair:'BNB/USDT', side:'Long',  size:'3.00 BNB',  entry:'581.20',   exit:'588.90',    pnl:'+$23.10',  pct:'+1.33%', date:'Jul 29, 2024 16:33', pos:true  },
  { pair:'BTC/USDT', side:'Short', size:'0.30 BTC',  entry:'66,210.50',exit:'66,812.40', pnl:'-$180.57', pct:'-0.91%', date:'Jul 28, 2024 09:12', pos:false },
];

const radarData = [
  { subject:'Win Rate',    A:66 },
  { subject:'Drawdown',    A:35 },
  { subject:'Volatility',  A:60 },
  { subject:'Consistency', A:70 },
  { subject:'Leverage',    A:40 },
];

/* ─── Mini components ───────────────────────────────── */
function MiniSparkline({ data, color, dataKey='v' }: { data:any[]; color:string; dataKey?:string }) {
  return (
    <ResponsiveContainer width="100%" height={34}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CircleGauge({ pct, color, size=52 }: { pct:number; color:string; size?:number }) {
  const r = (size-8)/2;
  const circ = 2*Math.PI*r;
  const offset = circ - (pct/100)*circ;
  return (
    <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={MUTED} strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Stat Card ─────────────────────────────────────── */
type StatCardProps = {
  label:string; value:string; change:string; sub:string;
  positive?:boolean; onClose?:()=>void; children?:React.ReactNode;
};
function StatCard({ label, value, change, sub, positive=true, onClose, children }: StatCardProps) {
  return (
    <div className="flex-1 min-w-0 bg-card trade-card p-3 flex flex-col gap-1.5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors opacity-50 hover:opacity-100">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="flex items-end justify-between gap-1">
        <div className="min-w-0">
          <div className="text-base font-black text-foreground leading-tight">{value}</div>
          <div className={`text-[10px] font-semibold mt-0.5 ${positive ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{change}</div>
          <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{sub}</div>
        </div>
        <div className="w-16 flex-shrink-0">{children}</div>
      </div>
    </div>
  );
}

/* ─── Section helpers ───────────────────────────────── */
function SectionCard({ children, className='' }: { children:React.ReactNode; className?:string }) {
  return <div className={`bg-card trade-card p-3 ${className}`}>{children}</div>;
}
function SectionTitle({ children, action }: { children:React.ReactNode; action?:React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{children}</span>
      {action}
    </div>
  );
}

/* ─── Equity Curve ──────────────────────────────────── */
function EquityCurve() {
  const [period, setPeriod] = useState('1Y');
  return (
    <SectionCard className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-1">
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Equity Curve (Compound Growth)</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-black text-foreground">$62,409.00</span>
            <span className="text-xs font-bold text-[#00E676]">+24.63% (1Y)</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/30 rounded-lg p-0.5">
          {['1W','1M','3M','6M','1Y','ALL'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                period===p
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1" style={{ minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={equityData} margin={{ top:8, right:4, left:-20, bottom:0 }}>
            <defs>
              <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#00D9FF" stopOpacity={0.45} />
                <stop offset="50%"  stopColor="#006080" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#000810" stopOpacity={0.02} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <XAxis dataKey="m" tick={{ fontSize:9, fill:'#556A7F' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:9, fill:'#556A7F' }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background:'#0D1E30', border:'1px solid #00D9FF44', borderRadius:8, fontSize:11, color:'#F4F7FA' }}
              formatter={(v:number) => [`$${v.toLocaleString()}`, 'Balance']}
            />
            <Area type="monotone" dataKey="v" stroke="#00D9FF" strokeWidth={2.5}
              fill="url(#eqGrad)" dot={false}
              style={{ filter:'drop-shadow(0 0 4px rgba(0,217,255,0.6))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

/* ─── Performance Calendar ──────────────────────────── */
function PerformanceCalendar() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const allVals = Object.values(dayPnl);
  const bestDay  = Math.max(...allVals);
  const worstDay = Math.min(...allVals);
  const totalPnl = allVals.reduce((s,v) => s+v, 0);

  function cellColor(val:number): string {
    if (val > 200) return 'bg-[#00E676]/80 text-white';
    if (val > 0)   return 'bg-[#00E676]/40 text-[#00E676]';
    if (val > -50) return 'bg-[#FF5A7A]/30 text-[#FF5A7A]';
    return 'bg-[#FF5A7A]/55 text-white';
  }

  return (
    <SectionCard className="h-full flex flex-col">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 hover:border-primary/50">
            This Month <ChevronDown className="w-2.5 h-2.5" />
          </button>
        }
      >
        Performance Calendar <Info className="w-2.5 h-2.5 inline ml-1 text-muted-foreground" />
      </SectionTitle>
      <div className="text-[10px] font-bold text-muted-foreground mb-1.5">July 2024</div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {days.map(d => <div key={d} className="text-center text-[8px] font-bold text-muted-foreground">{d}</div>)}
      </div>
      {calendarRows.map((row,ri) => (
        <div key={ri} className="grid grid-cols-7 gap-0.5 mb-0.5">
          {row.map((day,di) => {
            if (!day) return <div key={di} />;
            const val = dayPnl[day];
            return (
              <div key={di}
                className={`cal-cell text-center py-1 px-0.5 ${val !== undefined ? cellColor(val) : 'text-muted-foreground'}`}
              >
                <div className="text-[8px] font-bold">{day}</div>
                {val !== undefined && (
                  <div className="text-[7px] font-semibold leading-tight">
                    {val>0?'+':''}{val}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t border-border/40">
        <div>
          <div className="text-[8px] text-muted-foreground">Best Day</div>
          <div className="text-[10px] font-black text-[#00E676]">+${bestDay}</div>
        </div>
        <div>
          <div className="text-[8px] text-muted-foreground">Worst Day</div>
          <div className="text-[10px] font-black text-[#FF5A7A]">-${Math.abs(worstDay)}</div>
        </div>
        <div>
          <div className="text-[8px] text-muted-foreground">Total PnL</div>
          <div className="text-[10px] font-black text-[#00E676]">+${totalPnl.toLocaleString()}</div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ─── Asset Allocation ──────────────────────────────── */
function AssetAllocation() {
  return (
    <SectionCard className="flex flex-col">
      <SectionTitle>Asset Allocation</SectionTitle>
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={assets} dataKey="pct" cx="50%" cy="50%" innerRadius={30} outerRadius={52} paddingAngle={2}>
                {assets.map((a,i) => <Cell key={i} fill={a.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[7px] text-muted-foreground font-medium">Total</span>
            <span className="text-[9px] font-black text-foreground">$62,409</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          {assets.map((a,i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:a.color }} />
              <span className="text-[10px] text-foreground font-medium w-10">{a.name}</span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${a.pct}%`, background:a.color }} />
              </div>
              <span className="text-[10px] text-muted-foreground w-8 text-right">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/* ─── PnL Overview ──────────────────────────────────── */
function PnLOverview() {
  return (
    <SectionCard className="flex flex-col">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 hover:border-primary/50">
            This Month <ChevronDown className="w-2.5 h-2.5" />
          </button>
        }
      >
        PnL Overview
      </SectionTitle>
      <div className="mb-1.5">
        <span className="text-[11px] font-black text-foreground">Total PnL&nbsp;</span>
        <span className="text-sm font-black text-foreground">$6,912.23</span>
        <span className="text-[10px] font-bold text-[#00E676] ml-1.5">+18.23%</span>
      </div>
      <div className="flex-1" style={{ minHeight: 130 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pnlBars} barSize={7} margin={{ top:0, right:0, left:-28, bottom:0 }}>
            <XAxis dataKey="d" tick={{ fontSize:7, fill:'#556A7F' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:7, fill:'#556A7F' }} axisLine={false} tickLine={false} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <Tooltip
              contentStyle={{ background:'#0D1E30', border:'1px solid #00D9FF44', borderRadius:8, fontSize:10, color:'#F4F7FA' }}
              formatter={(v:number) => [`${v}`, 'PnL']}
            />
            <Bar dataKey="v" radius={[3,3,0,0]}>
              {pnlBars.map((d,i) => <Cell key={i} fill={d.v>=0 ? PRIMARY : RED} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

/* ─── Strategy Performance ──────────────────────────── */
function StrategyPerformance() {
  return (
    <SectionCard className="flex flex-col">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-primary hover:underline">
            View All <ExternalLink className="w-2.5 h-2.5" />
          </button>
        }
      >
        Strategy Performance
      </SectionTitle>
      <div className="grid grid-cols-4 gap-1 mb-1.5">
        {['Strategy','ROI','Win Rate','PnL'].map(h => (
          <span key={h} className="text-[8px] font-bold text-muted-foreground uppercase">{h}</span>
        ))}
      </div>
      {strategies.map((s,i) => (
        <div key={i} className="grid grid-cols-4 gap-1 py-1.5 border-t border-border/30 items-center">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs flex-shrink-0">{s.icon}</span>
            <span className="text-[9px] font-medium text-foreground truncate">{s.name}</span>
          </div>
          <span className={`text-[9px] font-bold ${s.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{s.roi}</span>
          <span className="text-[9px] font-medium text-foreground">{s.winRate}</span>
          <span className={`text-[9px] font-bold ${s.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{s.pnl}</span>
        </div>
      ))}
    </SectionCard>
  );
}

/* ─── Recent Trades ─────────────────────────────────── */
function RecentTrades() {
  const cols = ['Pair','Side','Size','Entry Price','Exit Price','PnL','PL%','Date'];
  return (
    <SectionCard className="flex-1 min-w-0">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 hover:border-primary/50">
            View All Trades <ChevronDown className="w-2.5 h-2.5" />
          </button>
        }
      >
        Recent Trades
      </SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c} className="text-left text-[8px] font-semibold text-muted-foreground uppercase pb-1.5 pr-2 whitespace-nowrap tracking-wider">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((t,i) => (
              <tr key={i} className="tbl-row border-t" style={{ borderColor:'rgba(0,217,255,0.06)' }}>
                <td className="py-1.5 pr-2 font-bold text-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-500/20 flex items-center justify-center text-[7px] font-black text-orange-400">₿</span>
                    {t.pair}
                  </div>
                </td>
                <td className="py-1.5 pr-2">
                  <span className={`px-1 py-0.5 rounded text-[8px] font-bold ${t.side==='Long' ? 'bg-[#00E676]/15 text-[#00E676]' : 'bg-[#FF5A7A]/15 text-[#FF5A7A]'}`}>
                    {t.side}
                  </span>
                </td>
                <td className="py-1.5 pr-2 text-muted-foreground">{t.size}</td>
                <td className="py-1.5 pr-2 text-foreground">{t.entry}</td>
                <td className="py-1.5 pr-2 text-foreground">{t.exit}</td>
                <td className={`py-1.5 pr-2 font-semibold ${t.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{t.pnl}</td>
                <td className={`py-1.5 pr-2 font-semibold ${t.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{t.pct}</td>
                <td className="py-1.5 text-muted-foreground whitespace-nowrap">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ─── Risk Metrics ──────────────────────────────────── */
function RiskMetrics() {
  return (
    <SectionCard className="w-52 flex-shrink-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Risk Metrics</span>
        <div>
          <span className="text-lg font-black text-primary">42</span>
          <span className="text-[9px] text-muted-foreground"> / 100</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={155}>
        <RadarChart data={radarData} outerRadius={56} margin={{ top:4, right:12, left:12, bottom:4 }}>
          <PolarGrid stroke="rgba(0,217,255,0.08)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize:7.5, fill:'#556A7F' }} />
          <Radar dataKey="A" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.15} strokeWidth={1.8} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1">
        {radarData.map((d,i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[8px] text-muted-foreground">{d.subject}</span>
            <span className="text-[8px] font-bold text-foreground">{d.A}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ─── AI Insight + Funding ──────────────────────────── */
function AIInsightFunding() {
  return (
    <div className="flex flex-col gap-2.5 w-52 flex-shrink-0">
      <SectionCard className="flex-1 ai-card">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background:'rgba(0,217,255,0.15)', border:'1px solid rgba(0,217,255,0.35)' }}>
            <Zap className="w-3 h-3 text-primary" />
          </div>
          <span className="text-[9px] font-bold text-foreground uppercase tracking-widest">AI Insight</span>
          <span className="px-1 py-0.5 rounded text-[7px] font-bold ml-auto"
            style={{ background:'rgba(0,217,255,0.15)', color:'#00D9FF', border:'1px solid rgba(0,217,255,0.30)' }}>New</span>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed mb-2">
          Your win rate has improved <span className="font-bold" style={{ color:'#00D9FF' }}>5.32%</span> this month.
          Consider increasing position size in{' '}
          <span className="text-foreground font-semibold">Trend Following</span> — highest consistency.
        </p>
        <button className="btn-cyan">View Full Insight</button>
      </SectionCard>

      <SectionCard>
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Funding Progress</span>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground">Funded 6k / record $10,000</span>
          <span className="text-[9px] font-bold text-primary">72%</span>
        </div>
        <div className="progress-track mt-1.5">
          <div className="progress-fill" style={{ width:'72%' }} />
        </div>
      </SectionCard>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────── */
export default function Dashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [closedCards, setClosedCards] = useState<Set<number>>(new Set());

  const closeCard = (i:number) => setClosedCards(s => new Set([...s,i]));

  const statCards = [
    {
      label:'Total Balance', value: balanceVisible ? '$62,409.00' : '••••••••',
      change:'+12.45%', sub:'+$6,912.23 (30D)', positive:true,
      chart: <MiniSparkline data={balanceSparkline} color={PRIMARY} />,
    },
    {
      label:'Total PnL', value: balanceVisible ? '$6,912.23' : '••••••',
      change:'+18.23%', sub:'vs last 30 days', positive:true,
      chart: <MiniSparkline data={pnlSparkline} color={GREEN} />,
    },
    {
      label:'ROI (Compound)', value:'+24.63%',
      change:'Annualized 68.21%', sub:'vs last 30 days', positive:true,
      chart: <div className="flex justify-end"><CircleGauge pct={24.63} color={PRIMARY} /></div>,
    },
    {
      label:'Win Rate', value:'67.89%',
      change:'+5.32%', sub:'vs last 30 days', positive:true,
      chart: <div className="flex justify-end"><CircleGauge pct={67.89} color={GREEN} /></div>,
    },
    {
      label:'Profit Factor', value:'2.14',
      change:'+0.35', sub:'vs last 30 days', positive:true,
      chart: <MiniSparkline data={pfSparkline} color={PRIMARY} />,
    },
    {
      label:'Max Drawdown', value:'-8.32%',
      change:'-1.25%', sub:'vs last 30 days', positive:false,
      chart: <MiniSparkline data={ddSparkline} color={RED} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in duration-500">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-black text-foreground leading-tight">Portfolio Overview</h1>
          <p className="text-[10px] text-muted-foreground mt-0.5">Track your performance and grow your capital with compound trading.</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <div className="flex items-center gap-2 bg-card border border-border/60 rounded-lg px-3 py-1.5 hover:border-primary/40 transition-colors">
            <Search className="w-3 h-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search markets, pairs, or assets..."
              className="bg-transparent text-[10px] text-foreground placeholder:text-muted-foreground outline-none w-44"
            />
          </div>
          {/* Icons */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
            <Lightning className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors relative">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </button>
          {/* Total Balance card */}
          <div className="flex items-center gap-2 bg-card trade-card px-3 py-1.5">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Total Balance</span>
                <button onClick={() => setBalanceVisible(v => !v)} className="text-muted-foreground hover:text-foreground">
                  {balanceVisible ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                </button>
              </div>
              <div className="text-sm font-black text-foreground">{balanceVisible ? '$62,409.00' : '••••••••'}</div>
              <div className="text-[9px] font-semibold text-[#00E676]">+$6,912.23 (30D)</div>
            </div>
            <div className="w-16">
              <MiniSparkline data={balanceSparkline} color={PRIMARY} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex gap-2">
        {statCards.map((c,i) =>
          closedCards.has(i) ? null : (
            <StatCard key={i} label={c.label} value={c.value} change={c.change}
              sub={c.sub} positive={c.positive} onClose={() => closeCard(i)}>
              {c.chart}
            </StatCard>
          )
        )}
      </div>

      {/* ── Main row: Equity (3/5) | Calendar (2/5) ── */}
      <div className="grid gap-3" style={{ gridTemplateColumns:'3fr 2fr' }}>
        <EquityCurve />
        <PerformanceCalendar />
      </div>

      {/* ── Middle row: 3 columns ── */}
      <div className="grid grid-cols-3 gap-3">
        <AssetAllocation />
        <PnLOverview />
        <StrategyPerformance />
      </div>

      {/* ── Bottom row ── */}
      <div className="flex gap-3">
        <RecentTrades />
        <RiskMetrics />
        <AIInsightFunding />
      </div>

    </div>
  );
}
