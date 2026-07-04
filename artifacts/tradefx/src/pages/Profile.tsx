import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pencil, 
  BadgeCheck, 
  User, 
  AtSign, 
  Mail, 
  Phone, 
  Calendar as CalendarIcon, 
  Globe, 
  Clock, 
  Trophy, 
  Target, 
  PieChart, 
  DollarSign, 
  Quote, 
  ExternalLink,
  Settings
} from 'lucide-react';
import { FaInstagram, FaYoutube, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Data Diri');
  
  const tabs = ['Data Diri', 'Keamanan', 'Preferensi', 'Integrasi', 'Notifikasi'];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Tabs Row */}
      <div className="flex items-center justify-between mb-8 border-b border-border pb-px relative">
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground h-9 text-xs font-semibold gap-2 ml-4">
          <Pencil className="w-3.5 h-3.5" />
          Edit Profile
        </Button>
      </div>

      {/* Content Area */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          {activeTab === 'Data Diri' && (
            <motion.div 
              key="data-diri"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6"
            >
              
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">
                
                {/* Profile Card */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent"></div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                    {/* Avatar */}
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-background border-[3px] border-primary/80 shadow-[0_0_15px_rgba(0,212,200,0.3)] flex items-center justify-center text-4xl font-bold text-foreground">
                        D
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {/* Info */}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                          DipsxBT
                          <BadgeCheck className="w-5 h-5 text-[#3b82f6]" />
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full border border-primary/50 text-primary text-[10px] font-bold tracking-widest bg-primary/10">
                          PRO TRADER
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                        Trader compound jangka panjang yang fokus pada konsistensi, manajemen risiko, dan pertumbuhan eksponensial.
                      </p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
                    <div className="flex flex-col gap-1 border-r border-border/50 last:border-0 sm:border-r">
                      <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Bergabung Sejak</span>
                      <span className="text-sm font-bold text-foreground">12 Jan 2024</span>
                    </div>
                    <div className="flex flex-col gap-1 sm:border-r border-border/50">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Negara</span>
                      <span className="text-sm font-medium text-foreground">🇮🇩 Indonesia</span>
                    </div>
                    <div className="flex flex-col gap-1 border-r border-border/50">
                      <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Waktu Lokal</span>
                      <span className="text-sm font-bold text-primary">13:45 WIB</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status Akun</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                        <span className="text-sm font-medium text-[#22c55e]">Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informasi Pribadi */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Informasi Pribadi
                  </h3>
                  
                  <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
                    <InfoRow icon={User} label="Nama Lengkap" value="DipsxBT" highlight />
                    <InfoRow icon={AtSign} label="Username" value="@dipsxbt" />
                    <InfoRow icon={Mail} label="Email" value="dipsxbt@gmail.com" />
                    <InfoRow icon={Phone} label="Nomor Telepon" value="+62 812-3456-7890" />
                    <InfoRow icon={CalendarIcon} label="Tanggal Lahir" value="14 Februari 2002" />
                    <InfoRow icon={User} label="Jenis Kelamin" value="Laki-laki" />
                    <InfoRow icon={Globe} label="Bahasa" value="Bahasa Indonesia" />
                    <InfoRow icon={Clock} label="Zona Waktu" value="(GMT+07:00) Jakarta" />
                  </div>

                  <Button className="w-full mt-2" variant="outline" color="primary">
                    Simpan Perubahan
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                
                {/* Level Trader */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                  
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Level Trader
                  </h3>
                  
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-5xl font-black text-foreground tracking-tight">Lv. 7</span>
                    <span className="text-sm font-medium text-muted-foreground pb-1.5">Elite Trader</span>
                  </div>

                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-muted-foreground">EXP 12,450 / 20,000</span>
                      <span className="text-primary">62%</span>
                    </div>
                    <Progress value={62} className="h-2 bg-muted" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <StatCard icon={Trophy} label="Total Trades" value="1,248" />
                    <StatCard icon={Target} label="Win Rate" value="67.89%" />
                    <StatCard icon={PieChart} label="Profit Factor" value="2.14" />
                    <StatCard icon={DollarSign} label="Total PnL" value="+$62,409.00" valueColor="text-[#22c55e]" />
                  </div>
                </div>

                {/* Tentang Saya */}
                <div className="bg-card border border-border rounded-xl p-6 relative">
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-primary rounded-r"></div>
                  
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2 pl-3">
                    Tentang Saya
                  </h3>
                  
                  <div className="pl-3 relative">
                    <Quote className="w-8 h-8 text-muted/30 absolute -top-2 -left-2 rotate-180" />
                    <p className="text-sm text-foreground/90 leading-relaxed relative z-10 italic">
                      "Disiplin, konsisten, dan selalu belajar. Fokus pada strategi compound trading untuk mencapai kebebasan finansial."
                    </p>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Media Sosial
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SocialLink icon={FaInstagram} platform="Instagram" handle="@dipsxbt" />
                    <SocialLink icon={FaXTwitter} platform="X (Twitter)" handle="@dipsxbt" />
                    <SocialLink icon={FaTelegram} platform="Telegram" handle="@dipsxbt_channel" />
                    <SocialLink icon={FaYoutube} platform="YouTube" handle="DipsxBT Trading" />
                  </div>
                </div>

                {/* Preferensi Trading */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Preferensi Trading
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <PreferenceRow label="Tipe Akun" value="Real Account" />
                    <PreferenceRow label="Leverage Default" value="10x" />
                    <PreferenceRow label="Mata Uang" value="USDT" />
                    <PreferenceRow label="Notifikasi Trading" value="Aktif" hasToggle defaultToggle={true} />
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab !== 'Data Diri' && (
            <motion.div 
              key="other-tabs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-64 border border-dashed border-border rounded-xl bg-card/30"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Settings className="w-8 h-8 opacity-50 mb-2" />
                <p className="text-sm font-medium">Halaman {activeTab} sedang dalam pengembangan</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, highlight = false }: { icon: any, label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors group">
      <div className="flex items-center gap-3 w-1/3 min-w-[140px]">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="flex items-center justify-between flex-1 pl-4">
        <span className={`text-sm font-medium truncate ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-background">
          <Pencil className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, valueColor = "text-foreground" }: { icon: any, label: string, value: string, valueColor?: string }) {
  return (
    <div className="bg-background border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase">{label}</span>
        <span className={`text-lg font-bold ${valueColor}`}>{value}</span>
      </div>
    </div>
  );
}

function SocialLink({ icon: Icon, platform, handle }: { icon: any, platform: string, handle: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 hover:border-border transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-medium">{platform}</span>
          <span className="text-xs font-semibold text-primary hover:underline">{handle}</span>
        </div>
      </div>
      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
    </div>
  );
}

function PreferenceRow({ label, value, hasToggle = false, defaultToggle = false }: { label: string, value: string, hasToggle?: boolean, defaultToggle?: boolean }) {
  const [isOn, setIsOn] = useState(defaultToggle);
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 relative pl-4">
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary/50 rounded-r"></div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-primary">{value}</span>
        {hasToggle && (
          <Switch checked={isOn} onCheckedChange={setIsOn} className="data-[state=checked]:bg-primary" />
        )}
      </div>
    </div>
  );
}
