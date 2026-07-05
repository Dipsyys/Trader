import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, ResponsiveContainer, XAxis, YAxis,
  Tooltip, ReferenceLine,
} from 'recharts';
import {
  Eye, EyeOff, Info, ChevronDown, ExternalLink,
  Zap, Search, Bell, X, Star,
} from 'lucide-react';

/* ─── Palette ───────────────────────────────────────── */
const PRIMARY  = '#00D9FF';
const GREEN    = '#00E676';
const RED      = '#FF5A7A';
const WARN     = '#FFB84D';
const MUTED_BG = 'rgba(0,217,255,0.07)';

/* ─── Data ──────────────────────────────────────────── */
const equityData = [
  { m:"Jul'23", v:10000 }, { m:"Aug'23", v:12400 }, { m:"Sep'23", v:11800 },
  { m:"Oct'23", v:14200 }, { m:"Nov'23", v:16800 }, { m:"Dec'23", v:19500 },
  { m:"Jan'24", v:22100 }, { m:"Feb'24", v:28400 }, { m:"Mar'24", v:35200 },
  { m:"Apr'24", v:42800 }, { m:"May'24", v:50100 }, { m:"Jun'24", v:57600 },
  { m:"Jul'24", v:62409 },
];

const balanceSpark = [10,14,12,18,22,28,35,43,50,58,62].map((v,i)=>({i,v}));
const pnlSpark     = [0,2,1.5,3,2.8,4,3.5,5,4.8,6.2,6.9].map((v,i)=>({i,v}));
const pfSpark      = [1.8,2.0,1.9,2.1,2.0,2.2,2.1,2.3,2.1,2.2,2.14].map((v,i)=>({i,v}));
const ddSpark      = [-2,-4,-3,-6,-5,-8,-7,-9,-8.5,-8.8,-8.32].map((v,i)=>({i,v}));

const pnlBars = [
  {d:'1 Jul',v:133},{d:'3 Jul',v:-45},{d:'5 Jul',v:281},
  {d:'8 Jul',v:88},{d:'10 Jul',v:223},{d:'12 Jul',v:-18},
  {d:'15 Jul',v:-85},{d:'17 Jul',v:-83},{d:'19 Jul',v:-18},
  {d:'22 Jul',v:193},{d:'24 Jul',v:281},{d:'26 Jul',v:-56},
  {d:'29 Jul',v:121},
];

const assets = [
  { name:'BTC',    pct:45.2, color:PRIMARY },
  { name:'ETH',    pct:20.1, color:'#2563EB' },
  { name:'SOL',    pct:15.6, color:'#8B5CF6' },
  { name:'BNB',    pct:10.3, color:WARN },
  { name:'Others', pct:8.8,  color:'#475569' },
];

type DayVal = number | null;
const calRows: DayVal[][] = [
  [1,2,3,4,5,6,7],
  [8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21],
  [22,23,24,25,26,27,28],
  [29,30,31,null,null,null,null],
];
const dayPnl: Record<number,number> = {
  1:-133, 2:-45, 3:291, 4:98, 5:98,
  8:88, 9:223, 10:-18, 11:135, 12:128,
  15:-35, 16:-23, 17:-18, 18:38, 19:-36,
  22:193, 23:291, 24:-96, 25:121,
  29:215, 30:-89, 31:312,
};

const strategies = [
  { color:PRIMARY,   name:'Breakout Hunter', roi:'+28.45%', wr:'71.2%', pnl:'$2,845.12', pos:true  },
  { color:GREEN,     name:'Trend Following', roi:'+18.32%', wr:'66.7%', pnl:'$1,832.54', pos:true  },
  { color:WARN,      name:'Scalping Pro',    roi:'+12.65%', wr:'61.3%', pnl:'$1,265.21', pos:true  },
  { color:RED,       name:'Mean Reversion',  roi:'-2.14%',  wr:'48.1%', pnl:'-$214.32', pos:false },
];

const recentTrades = [
  { pair:'BTC/USDT', side:'Long',  size:'0.50 BTC', entry:'67,842.10', exit:'68,945.30', pnl:'+$551.60', pct:'+1.62%', date:'Jul 30, 2024 14:23', pos:true  },
  { pair:'ETH/USDT', side:'Long',  size:'5.00 ETH', entry:'3,412.80',  exit:'3,502.40',  pnl:'+$448.00', pct:'+2.62%', date:'Jul 30, 2024 11:05', pos:true  },
  { pair:'SOL/USDT', side:'Short', size:'20.00 SOL',entry:'152.40',    exit:'149.10',    pnl:'+$66.00',  pct:'+2.17%', date:'Jul 29, 2024 21:44', pos:true  },
  { pair:'BNB/USDT', side:'Long',  size:'3.00 BNB', entry:'581.20',    exit:'588.90',    pnl:'+$23.10',  pct:'+1.33%', date:'Jul 29, 2024 16:33', pos:true  },
  { pair:'BTC/USDT', side:'Short', size:'0.30 BTC', entry:'66,210.50', exit:'66,812.40', pnl:'-$180.57', pct:'-0.91%', date:'Jul 28, 2024 09:12', pos:false },
];

const radarData = [
  { s:'Win Rate',    A:66 },
  { s:'Drawdown',    A:35 },
  { s:'Volatility',  A:60 },
  { s:'Consistency', A:70 },
  { s:'Leverage',    A:40 },
];

/* ─── Shared tooltip style ─────────────────────────── */
const TT_STYLE = {
  background:'#0D1E30',
  border:'1px solid rgba(0,217,255,0.25)',
  borderRadius:10,
  fontSize:11,
  color:'#F4F7FA',
  padding:'8px 12px',
};

/* ─── Sparkline ─────────────────────────────────────── */
function Spark({ data, color, h=34 }: { data:any[]; color:string; h?:number }) {
  return (
    <ResponsiveContainer width="100%" height={h}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ─── Circle Gauge ──────────────────────────────────── */
function CircleGauge({ pct, color, size=50 }: { pct:number; color:string; size?:number }) {
  const r = (size-8)/2;
  const c = 2*Math.PI*r;
  return (
    <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={MUTED_BG} strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={c} strokeDashoffset={c-(pct/100)*c} strokeLinecap="round" />
    </svg>
  );
}

/* ─── Stat Card ─────────────────────────────────────── */
function StatCard({
  label, value, change, sub, positive=true, star=false, onClose, children,
}: {
  label:string; value:string; change:string; sub:string;
  positive?:boolean; star?:boolean; onClose?:()=>void; children?:React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0 bg-card trade-card px-4 py-3 flex flex-col gap-2 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{label}</span>
        {star
          ? <Star className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
          : onClose && (
            <button onClick={onClose} className="text-muted-foreground/50 hover:text-foreground transition-colors">
              <X className="w-3 h-3" />
            </button>
          )
        }
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[17px] font-black text-foreground leading-tight tracking-tight">{value}</div>
          <div className={`text-[10px] font-semibold mt-0.5 ${positive ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{change}</div>
          <div className="text-[9px] text-muted-foreground mt-0.5">{sub}</div>
        </div>
        <div className="w-[70px] flex-shrink-0">{children}</div>
      </div>
    </div>
  );
}

/* ─── Card + Section Title ──────────────────────────── */
function Card({ children, className='' }: { children:React.ReactNode; className?:string }) {
  return <div className={`bg-card trade-card ${className}`}>{children}</div>;
}
function SectionTitle({ children, action }: { children:React.ReactNode; action?:React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{children}</span>
      {action}
    </div>
  );
}

/* ─── Equity Curve ──────────────────────────────────── */
function EquityCurve() {
  const [period, setPeriod] = useState('1Y');
  const periods = ['1W','1M','3M','6M','1Y','ALL'];
  return (
    <Card className="p-4 flex flex-col" style={{ minHeight:300 }}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Equity Curve (Compound Growth)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[22px] font-black text-foreground">$62,409.00</span>
            <span className="text-sm font-bold text-[#00E676]">+24.63% (1Y)</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ background:'rgba(0,0,0,0.3)' }}>
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all ${
                period===p
                  ? 'text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={period===p ? { background:'rgba(0,217,255,0.12)' } : undefined}
            >{p}</button>
          ))}
        </div>
      </div>
      <div className="flex-1" style={{ minHeight:210 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={equityData} margin={{ top:8, right:4, left:-18, bottom:0 }}>
            <defs>
              <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#00D9FF" stopOpacity={1} />
                <stop offset="30%"  stopColor="#00879A" stopOpacity={1} />
                <stop offset="65%"  stopColor="#0D2F3A" stopOpacity={1} />
                <stop offset="100%" stopColor="#0B1523" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="m" tick={{ fontSize:9, fill:'#4A6070' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:9, fill:'#4A6070' }} axisLine={false} tickLine={false}
              tickFormatter={v=>`${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={TT_STYLE}
              formatter={(v:number) => [`$${v.toLocaleString()}`, 'Balance']} />
            <Area type="monotone" dataKey="v"
              stroke="#00D9FF" strokeWidth={2.5}
              fill="url(#eqGrad)" fillOpacity={1} dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ─── Performance Calendar ──────────────────────────── */
function PerformanceCalendar() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = Object.values(dayPnl);
  const best  = Math.max(...vals);
  const worst = Math.min(...vals);
  const total = vals.reduce((s,v)=>s+v, 0);

  function cellStyle(val: number | undefined) {
    if (val === undefined) return '';
    if (val > 200) return 'bg-[#00E676]/80 text-white';
    if (val > 0)   return 'bg-[#00E676]/35 text-[#00E676]';
    if (val > -50) return 'bg-[#FF5A7A]/28 text-[#FF5A7A]';
    return 'bg-[#FF5A7A]/55 text-white';
  }

  return (
    <Card className="p-4 flex flex-col h-full">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded-md px-2 py-0.5 hover:border-primary/50 transition-colors">
            This Month <ChevronDown className="w-3 h-3" />
          </button>
        }
      >
        Performance Calendar <Info className="w-3 h-3 inline ml-1 opacity-50" />
      </SectionTitle>
      <p className="text-[11px] font-semibold text-foreground mb-2">July 2024</p>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map(d=><div key={d} className="text-center text-[8px] font-bold text-muted-foreground">{d}</div>)}
      </div>
      {calRows.map((row,ri)=>(
        <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
          {row.map((day,di)=>{
            if (!day) return <div key={di}/>;
            const val = dayPnl[day];
            const hasVal = val !== undefined;
            return (
              <div key={di}
                className={`cal-cell text-center py-1.5 ${hasVal ? cellStyle(val) : 'text-muted-foreground/40'}`}
              >
                <div className="text-[8px] font-semibold">{day}</div>
                {hasVal && (
                  <div className="text-[7px] font-bold leading-tight">{val>0?'+':''}{val}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div className="grid grid-cols-3 gap-2 mt-auto pt-3 border-t border-border/40">
        <div>
          <p className="text-[8px] text-muted-foreground">Best Day</p>
          <p className="text-[11px] font-black text-[#00E676]">+${best}</p>
        </div>
        <div>
          <p className="text-[8px] text-muted-foreground">Worst Day</p>
          <p className="text-[11px] font-black text-[#FF5A7A]">-${Math.abs(worst)}</p>
        </div>
        <div>
          <p className="text-[8px] text-muted-foreground">Total PnL</p>
          <p className="text-[11px] font-black text-[#00E676]">+${total.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}

/* ─── SVG Donut ─────────────────────────────────────── */
function SvgDonut({ data, size=110, inner=36, outer=52 }: {
  data: { pct: number; color: string }[];
  size?: number; inner?: number; outer?: number;
}) {
  const cx = size / 2, cy = size / 2;
  const total = data.reduce((s, d) => s + d.pct, 0);
  const gap = 2; // degrees between segments
  let cursor = -90; // start from top
  const paths = data.map((d) => {
    const sweep = (d.pct / total) * 360 - gap;
    const startRad = (cursor * Math.PI) / 180;
    const endRad   = ((cursor + sweep) * Math.PI) / 180;
    const x1 = cx + outer * Math.cos(startRad);
    const y1 = cy + outer * Math.sin(startRad);
    const x2 = cx + outer * Math.cos(endRad);
    const y2 = cy + outer * Math.sin(endRad);
    const ix1 = cx + inner * Math.cos(endRad);
    const iy1 = cy + inner * Math.sin(endRad);
    const ix2 = cx + inner * Math.cos(startRad);
    const iy2 = cy + inner * Math.sin(startRad);
    const large = sweep > 180 ? 1 : 0;
    const path = `M ${x1} ${y1} A ${outer} ${outer} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${large} 0 ${ix2} ${iy2} Z`;
    cursor += sweep + gap;
    return { path, color: d.color };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths.map((p, i) => <path key={i} d={p.path} fill={p.color} />)}
    </svg>
  );
}

/* ─── Asset Allocation ──────────────────────────────── */
function AssetAllocation() {
  return (
    <Card className="p-4">
      <SectionTitle>Asset Allocation</SectionTitle>
      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width:110, height:110 }}>
          <SvgDonut data={assets} size={110} inner={36} outer={52} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[7px] text-muted-foreground leading-none">Total</span>
            <span className="text-[10px] font-black text-foreground leading-tight">$62,409</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {assets.map((a,i)=>(
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:a.color }} />
              <span className="text-[10px] text-foreground font-medium w-10 flex-shrink-0">{a.name}</span>
              <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all" style={{ width:`${a.pct}%`, background:a.color }} />
              </div>
              <span className="text-[10px] text-muted-foreground w-9 text-right flex-shrink-0">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─── PnL Overview ──────────────────────────────────── */
function PnLOverview() {
  return (
    <Card className="p-4 flex flex-col">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded-md px-2 py-0.5 hover:border-primary/50 transition-colors">
            This Month <ChevronDown className="w-3 h-3" />
          </button>
        }
      >
        PnL Overview
      </SectionTitle>
      <div className="mb-2">
        <span className="text-[12px] font-black text-foreground">Total PnL&nbsp;$6,912.23&nbsp;</span>
        <span className="text-[11px] font-bold text-[#00E676]">+18.23%</span>
      </div>
      <div className="flex-1" style={{ minHeight:130 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pnlBars} barSize={9} margin={{ top:2, right:0, left:-30, bottom:0 }}>
            <XAxis dataKey="d" tick={{ fontSize:7.5, fill:'#4A6070' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:7.5, fill:'#4A6070' }} axisLine={false} tickLine={false} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.06)" />
            <Tooltip contentStyle={TT_STYLE} formatter={(v:number)=>[`${v}`, 'PnL']} />
            <Bar dataKey="v" radius={[4,4,0,0]}>
              {pnlBars.map((d,i)=>(
                <Cell key={i} fill={d.v>=0 ? PRIMARY : RED}
                  style={d.v>=0 ? { filter:'drop-shadow(0 0 4px rgba(0,217,255,0.5))' } : undefined}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ─── Strategy Performance ──────────────────────────── */
function StrategyPerformance() {
  return (
    <Card className="p-4">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-primary hover:underline transition-colors">
            View All <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        Strategy Performance
      </SectionTitle>
      <div className="grid grid-cols-4 gap-2 pb-1.5 border-b border-border/30">
        {['Strategy','ROI','Win Rate','PnL'].map(h=>(
          <span key={h} className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">{h}</span>
        ))}
      </div>
      {strategies.map((s,i)=>(
        <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-border/20 items-center last:border-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-black"
              style={{ background:`${s.color}22`, border:`1px solid ${s.color}55`, color:s.color }}>
              {i+1}
            </span>
            <span className="text-[9px] font-medium text-foreground truncate">{s.name}</span>
          </div>
          <span className={`text-[10px] font-bold ${s.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{s.roi}</span>
          <span className="text-[10px] text-foreground font-medium">{s.wr}</span>
          <span className={`text-[10px] font-bold ${s.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{s.pnl}</span>
        </div>
      ))}
    </Card>
  );
}

/* ─── Recent Trades ─────────────────────────────────── */
function RecentTrades() {
  return (
    <Card className="p-4 flex-1 min-w-0">
      <SectionTitle
        action={
          <button className="flex items-center gap-1 text-[9px] text-muted-foreground border border-border/60 rounded-md px-2 py-0.5 hover:border-primary/50 transition-colors">
            View All Trades <ChevronDown className="w-3 h-3" />
          </button>
        }
      >
        Recent Trades
      </SectionTitle>
      <table className="w-full" style={{ fontSize:10 }}>
        <thead>
          <tr style={{ background:'rgba(5,11,20,0.5)' }}>
            {['Pair','Side','Size','Entry Price','Exit Price','PnL','PL%','Date'].map(c=>(
              <th key={c} className="text-left text-[8px] font-bold text-muted-foreground uppercase tracking-wider py-1.5 pr-3 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentTrades.map((t,i)=>(
            <tr key={i} className="tbl-row border-t" style={{ borderColor:'rgba(0,217,255,0.05)' }}>
              <td className="py-2 pr-3 font-bold text-foreground whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black text-orange-400 flex-shrink-0"
                    style={{ background:'rgba(249,115,22,0.15)' }}>₿</span>
                  {t.pair}
                </div>
              </td>
              <td className="py-2 pr-3">
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                  t.side==='Long' ? 'bg-[#00E676]/15 text-[#00E676]' : 'bg-[#FF5A7A]/15 text-[#FF5A7A]'
                }`}>{t.side}</span>
              </td>
              <td className="py-2 pr-3 text-muted-foreground">{t.size}</td>
              <td className="py-2 pr-3 text-foreground">{t.entry}</td>
              <td className="py-2 pr-3 text-foreground">{t.exit}</td>
              <td className={`py-2 pr-3 font-semibold ${t.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{t.pnl}</td>
              <td className={`py-2 pr-3 font-semibold ${t.pos ? 'text-[#00E676]' : 'text-[#FF5A7A]'}`}>{t.pct}</td>
              <td className="py-2 text-muted-foreground whitespace-nowrap">{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ─── Risk Metrics ──────────────────────────────────── */
function RiskMetrics() {
  return (
    <Card className="p-4" style={{ width:210, flexShrink:0 }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Risk Metrics</span>
        <div>
          <span className="text-[20px] font-black text-primary leading-none">42</span>
          <span className="text-[10px] text-muted-foreground"> / 100</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={168}>
        <RadarChart data={radarData} outerRadius={60} margin={{ top:4, right:14, left:14, bottom:4 }}>
          <PolarGrid stroke="rgba(0,217,255,0.08)" />
          <PolarAngleAxis dataKey="s" tick={{ fontSize:8, fill:'#4A6070' }} />
          <Radar dataKey="A" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.14} strokeWidth={2}
            style={{ filter:'drop-shadow(0 0 5px rgba(0,217,255,0.4))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {radarData.map((d,i)=>(
          <div key={i} className="flex items-center justify-between">
            <span className="text-[8px] text-muted-foreground">{d.s}</span>
            <span className="text-[9px] font-bold text-foreground">{d.A}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── AI Insight + Funding ──────────────────────────── */
function AIInsightFunding() {
  return (
    <div className="flex flex-col gap-3" style={{ width:210, flexShrink:0 }}>
      <Card className="p-4 flex flex-col gap-3 flex-1 ai-card">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background:'rgba(0,217,255,0.15)', border:'1px solid rgba(0,217,255,0.35)', boxShadow:'0 0 12px rgba(0,217,255,0.25)' }}>
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">AI Insight</span>
          <span className="ml-auto text-[7px] font-bold px-1.5 py-0.5 rounded-md"
            style={{ background:'rgba(0,217,255,0.15)', color:PRIMARY, border:'1px solid rgba(0,217,255,0.30)' }}>New</span>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          Your win rate has improved{' '}
          <span className="font-bold text-primary">5.32%</span> this month.
          Consider increasing position size in{' '}
          <span className="text-foreground font-semibold">Trend Following</span>
          {' '}— highest consistency.
        </p>
        <button className="btn-cyan text-[10px] font-bold py-1.5">View Full Insight</button>
      </Card>

      <Card className="p-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Funding Progress</p>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-muted-foreground">Funded 6k / record $10,000</span>
          <span className="text-[10px] font-bold text-primary">72%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width:'72%' }} />
        </div>
      </Card>
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────── */
export default function Dashboard() {
  const [balVis, setBalVis] = useState(true);
  const [closed, setClosed] = useState<Set<number>>(new Set());
  const close = (i:number) => setClosed(s=>new Set([...s,i]));

  const cards = [
    { label:'Total Balance', value:balVis?'$62,409.00':'••••••••', change:'+12.45%', sub:'+$6,912.23 (30D)', pos:true, star:true,
      chart:<Spark data={balanceSpark} color={PRIMARY} /> },
    { label:'Total PnL', value:balVis?'$6,912.23':'••••••', change:'+18.23%', sub:'vs last 30 days', pos:true, star:true,
      chart:<Spark data={pnlSpark} color={GREEN} /> },
    { label:'ROI (Compound)', value:'+24.63%', change:'Annualized 68.21%', sub:'vs last 30 days', pos:true,
      chart:<div className="flex justify-end"><CircleGauge pct={24.63} color={PRIMARY} /></div> },
    { label:'Win Rate', value:'67.89%', change:'+5.32%', sub:'vs last 30 days', pos:true,
      chart:<div className="flex justify-end"><CircleGauge pct={67.89} color={GREEN} /></div> },
    { label:'Profit Factor', value:'2.14', change:'+0.35', sub:'vs last 30 days', pos:true,
      chart:<Spark data={pfSpark} color={PRIMARY} /> },
    { label:'Max Drawdown', value:'-8.32%', change:'-1.25%', sub:'vs last 30 days', pos:false,
      chart:<Spark data={ddSpark} color={RED} /> },
  ];

  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in duration-500">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-black text-foreground tracking-tight">Portfolio Overview</h1>
          <p className="text-[10px] text-muted-foreground mt-0.5">Track your performance and grow your capital with compound trading.</p>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 hover:border-primary/40 transition-colors cursor-text"
            style={{ background:'rgba(11,21,35,0.8)' }}>
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input type="text" placeholder="Search markets, pairs, or assets..."
              className="bg-transparent text-[10px] text-foreground placeholder:text-muted-foreground outline-none w-44" />
          </div>
          {/* Icon buttons */}
          {[Zap, Bell].map((Icon,i)=>(
            <button key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors relative"
              style={{ background:'rgba(11,21,35,0.8)', border:'1px solid rgba(0,217,255,0.12)' }}>
              <Icon className="w-3.5 h-3.5" />
              {i===1 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
          {/* Balance badge */}
          <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl"
            style={{ background:'rgba(11,21,35,0.9)', border:'1px solid rgba(0,217,255,0.15)', boxShadow:'0 0 20px rgba(0,217,255,0.06)' }}>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Total Balance</span>
                <button onClick={()=>setBalVis(v=>!v)} className="text-muted-foreground hover:text-primary transition-colors">
                  {balVis ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                </button>
              </div>
              <div className="text-[14px] font-black text-foreground leading-tight">{balVis?'$62,409.00':'••••••••'}</div>
              <div className="text-[9px] font-semibold text-[#00E676]">+$6,912.23 (30D)</div>
            </div>
            <div style={{ width:60 }}>
              <Spark data={balanceSpark} color={PRIMARY} h={36} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex gap-2.5">
        {cards.map((c,i) => closed.has(i) ? null : (
          <StatCard key={i} label={c.label} value={c.value} change={c.change}
            sub={c.sub} positive={c.pos} star={c.star} onClose={!c.star ? ()=>close(i) : undefined}>
            {c.chart}
          </StatCard>
        ))}
      </div>

      {/* ── Equity (3fr) | Calendar (2fr) ── */}
      <div className="grid gap-3" style={{ gridTemplateColumns:'3fr 2fr' }}>
        <EquityCurve />
        <PerformanceCalendar />
      </div>

      {/* ── Asset | PnL | Strategy ── */}
      <div className="grid grid-cols-3 gap-3">
        <AssetAllocation />
        <PnLOverview />
        <StrategyPerformance />
      </div>

      {/* ── Bottom ── */}
      <div className="flex gap-3">
        <RecentTrades />
        <RiskMetrics />
        <AIInsightFunding />
      </div>

    </div>
  );
}
