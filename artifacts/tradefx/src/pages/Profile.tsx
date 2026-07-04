import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil,
  BadgeCheck,
  Mail,
  Calendar as CalendarIcon,
  Globe,
  Clock,
  Trophy,
  Target,
  PieChart,
  DollarSign,
  Quote,
  ExternalLink,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  MessageSquare,
  MapPin,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  Key,
} from 'lucide-react';
import { FaInstagram, FaTelegram, FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { SiBinance, SiOkx, SiTradingview } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import profilePhoto from '@assets/Regal_portrait_with_ornate_uniform_1783165328394.png';

/* ─────────────────────────────────────── helpers ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
      {children}
    </h3>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────── tab panels ─── */

/* ── Keamanan ──────────────────────────────────────── */
function KeamananPanel() {
  const { t } = useApp();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Security Score */}
      <Card>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-primary/50 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
              {t('security.score.label')}
            </p>
            <p className="text-xl font-bold text-foreground">{t('security.score.status')}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-primary rounded-full" />
              </div>
              <span className="text-sm font-bold text-primary">92%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Ubah Password */}
      <Card>
        <SectionTitle>{t('security.changePassword')}</SectionTitle>
        <div className="flex flex-col gap-4">
          <PasswordField
            id="current-pw"
            label={t('security.currentPassword')}
            placeholder={t('security.currentPassword.ph')}
            show={showCurrent}
            onToggle={() => setShowCurrent(v => !v)}
            showLabel={t('security.showPassword')}
            hideLabel={t('security.hidePassword')}
          />
          <PasswordField
            id="new-pw"
            label={t('security.newPassword')}
            placeholder={t('security.newPassword.ph')}
            show={showNew}
            onToggle={() => setShowNew(v => !v)}
            showLabel={t('security.showPassword')}
            hideLabel={t('security.hidePassword')}
          />
          <PasswordField
            id="confirm-pw"
            label={t('security.confirmPassword')}
            placeholder={t('security.confirmPassword.ph')}
            show={showConfirm}
            onToggle={() => setShowConfirm(v => !v)}
            showLabel={t('security.showPassword')}
            hideLabel={t('security.hidePassword')}
          />
          <Button className="w-full mt-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground" variant="outline">
            {t('security.changePassword.btn')}
          </Button>
        </div>
      </Card>

      {/* 2FA */}
      <Card>
        <SectionTitle>{t('security.2fa.title')}</SectionTitle>
        <p className="text-xs text-muted-foreground mb-4">{t('security.2fa.desc')}</p>
        <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
          <TwoFARow icon={Smartphone} label="Google Authenticator" activeLabel={t('common.active')} active />
          <TwoFARow icon={MessageSquare} label="SMS Authentication" activeLabel={t('common.active')} active />
          <TwoFARow icon={Mail} label="Email Authentication" activeLabel={t('common.active')} active />
        </div>
      </Card>

      {/* Login Activity */}
      <Card>
        <SectionTitle>{t('security.loginActivity')}</SectionTitle>
        <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
          <LoginRow location="Jakarta, Indonesia" device="Windows · Chrome" time={t('security.currentlyActive')} isActive />
          <LoginRow location="Surabaya, Indonesia" device="iOS · Safari" time={t('security.hoursAgo')} />
          <LoginRow location="Bandung, Indonesia" device="Android · Chrome" time={t('security.dayAgo')} />
        </div>
        <button className="mt-4 flex items-center gap-2 text-primary text-xs font-semibold hover:underline">
          {t('security.viewAll')} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </Card>
    </div>
  );
}

function PasswordField({
  id, label, placeholder, show, onToggle, showLabel, hideLabel,
}: {
  id: string; label: string; placeholder: string; show: boolean;
  onToggle: () => void; showLabel: string; hideLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground font-medium">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className="pr-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 text-sm"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? hideLabel : showLabel}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function TwoFARow({ icon: Icon, label, active, activeLabel }: { icon: any; label: string; active?: boolean; activeLabel: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {active && <span className="text-xs font-bold text-primary">{activeLabel}</span>}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}

function LoginRow({ location, device, time, isActive }: { location: string; device: string; time: string; isActive?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">{location}</span>
          <span className="text-[11px] text-muted-foreground">{device}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{time}</span>
    </div>
  );
}

/* ── Preferensi ─────────────────────────────────────── */
function PreferensiPanel() {
  const { t, theme, toggleTheme } = useApp();
  const [showTutorial, setShowTutorial] = useState(true);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const [confirmExec, setConfirmExec] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Preferensi Trading */}
      <Card>
        <SectionTitle>{t('pref.trading.title')}</SectionTitle>
        <div className="flex flex-col gap-4">
          <SelectRow label={t('pref.accountType')} defaultValue="real">
            <SelectItem value="real">Real Account</SelectItem>
            <SelectItem value="demo">Demo Account</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.currency')} defaultValue="usdt">
            <SelectItem value="usdt">USDT</SelectItem>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.leverage')} defaultValue="10x">
            <SelectItem value="1x">1x</SelectItem>
            <SelectItem value="5x">5x</SelectItem>
            <SelectItem value="10x">10x</SelectItem>
            <SelectItem value="20x">20x</SelectItem>
            <SelectItem value="50x">50x</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.priceDisplay')} defaultValue="last">
            <SelectItem value="last">Last Price</SelectItem>
            <SelectItem value="mark">Mark Price</SelectItem>
            <SelectItem value="index">Index Price</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.chartSize')} defaultValue="medium">
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.barCount')} defaultValue="200">
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="200">200</SelectItem>
            <SelectItem value="500">500</SelectItem>
          </SelectRow>

          {/* Color Theme — wired to global theme */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground font-medium">{t('pref.colorTheme')}</span>
            <div className="flex gap-3">
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-border/80'}`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-border/80'}`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferensi Tampilan */}
      <Card>
        <SectionTitle>{t('pref.display.title')}</SectionTitle>
        <div className="flex flex-col gap-4">
          <SelectRow label={t('pref.language')} defaultValue="id">
            <SelectItem value="id">Bahasa Indonesia</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.timezone')} defaultValue="jakarta">
            <SelectItem value="jakarta">(GMT+07:00) Jakarta</SelectItem>
            <SelectItem value="utc">UTC</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.numberFormat')} defaultValue="comma">
            <SelectItem value="comma">1,234.56</SelectItem>
            <SelectItem value="dot">1.234,56</SelectItem>
          </SelectRow>
          <SelectRow label={t('pref.dateFormat')} defaultValue="dd-mmm-yyyy">
            <SelectItem value="dd-mmm-yyyy">DD MMM YYYY</SelectItem>
            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
          </SelectRow>

          <div className="flex flex-col gap-3">
            <ColorPickerRow label={t('pref.upColor')} color="#22c55e" />
            <ColorPickerRow label={t('pref.downColor')} color="#ef4444" />
          </div>
        </div>
      </Card>

      {/* Preferensi Lainnya */}
      <Card>
        <SectionTitle>{t('pref.other.title')}</SectionTitle>
        <div className="flex flex-col gap-1 divide-y divide-border/30">
          <ToggleRow label={t('pref.showTutorial')} value={showTutorial} onChange={setShowTutorial} />
          <ToggleRow label={t('pref.beginnerMode')} value={beginnerMode} onChange={setBeginnerMode} />
          <ToggleRow label={t('pref.confirmExec')} value={confirmExec} onChange={setConfirmExec} />
          <ToggleRow label={t('pref.hideBalance')} value={hideBalance} onChange={setHideBalance} />
        </div>
      </Card>
    </div>
  );
}

function SelectRow({ label, defaultValue, children }: { label: string; defaultValue: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-foreground font-medium min-w-[140px]">{label}</span>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="flex-1 bg-background/50 border-border text-foreground text-sm h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border text-foreground">
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}

function ColorPickerRow({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground font-medium">{label}</span>
      <div className="w-10 h-8 rounded-lg border border-border cursor-pointer" style={{ backgroundColor: color }} />
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground font-medium">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:bg-primary" />
    </div>
  );
}

/* ── Integrasi ─────────────────────────────────────── */
function IntegrasiPanel() {
  const { t } = useApp();
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Exchange Terhubung */}
      <Card>
        <SectionTitle>{t('integ.exchanges.title')}</SectionTitle>
        <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden mb-4">
          <IntegrationRow icon={SiBinance} name="Binance" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={BybitIcon} name="Bybit" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={SiOkx} name="OKX" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={BitgetIcon} name="Bitget" connectedLabel={t('common.connected')} connected />
        </div>
        <Button variant="outline" className="w-full border-border text-foreground hover:border-primary hover:text-primary text-sm">
          {t('integ.exchanges.manage')}
        </Button>
      </Card>

      {/* Platform & Tools */}
      <Card>
        <SectionTitle>{t('integ.platforms.title')}</SectionTitle>
        <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden mb-4">
          <IntegrationRow icon={TvIcon} name="TradingView" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={FaDiscord} name="Discord" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={FaTelegram} name="Telegram" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={CalendarIcon} name="Google Calendar" connectedLabel={t('common.connected')} connected />
          <IntegrationRow icon={NotionIcon} name="Notion" connectedLabel={t('common.connected')} connected />
        </div>
        <Button variant="outline" className="w-full border-border text-foreground hover:border-primary hover:text-primary text-sm">
          {t('integ.platforms.manage')}
        </Button>
      </Card>

      {/* API Management */}
      <Card>
        <SectionTitle>{t('integ.api.title')}</SectionTitle>
        <p className="text-xs text-muted-foreground mb-4">{t('integ.api.desc')}</p>
        <Button variant="outline" className="w-full border-border text-foreground hover:border-primary hover:text-primary text-sm flex items-center gap-2">
          <Key className="w-4 h-4" />
          {t('integ.api.btn')}
        </Button>
      </Card>
    </div>
  );
}

function TvIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v12h16V4H4zm6 14h4v2h-4v-2z"/>
    </svg>
  );
}

function NotionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  );
}

function BybitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <text x="2" y="17" fontSize="13" fontWeight="bold" fontFamily="sans-serif">BYB</text>
    </svg>
  );
}

function BitgetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7l-8 4-8-4v-7l8-4.32z"/>
    </svg>
  );
}

function IntegrationRow({ icon: Icon, name, connected, connectedLabel }: {
  icon: any; name: string; connected?: boolean; connectedLabel: string;
}) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      {connected && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary">{connectedLabel}</span>
          <span className="w-2 h-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}

/* ── Notifikasi ─────────────────────────────────────── */
function NotifikasiPanel() {
  const { t } = useApp();
  const [prefs, setPrefs] = useState({
    alertHarga: true,
    eksekusiOrder: true,
    takeProfitStop: true,
    depositBerhasil: true,
    penarikanBerhasil: true,
    updateSistem: true,
    laporanHarian: true,
    newsletter: false,
  });

  function toggle(key: keyof typeof prefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Channel Notifikasi */}
      <Card>
        <SectionTitle>{t('notif.channels.title')}</SectionTitle>
        <div className="flex flex-col gap-0 divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
          <NotifChannelRow icon={Bell} label="In-App" sublabel="" activeLabel={t('common.active')} active />
          <NotifChannelRow icon={Mail} label="Email" sublabel="dipsxbt@gmail.com" activeLabel={t('common.active')} active />
          <NotifChannelRow icon={MessageSquare} label="SMS" sublabel="+62 812-3456-7890" activeLabel={t('common.active')} active />
          <NotifChannelRow icon={FaTelegram} label="Telegram" sublabel="@dipsxbt_channel" activeLabel={t('common.active')} active />
          <NotifChannelRow icon={FaDiscord} label="Discord" sublabel="DipsxBT#1234" activeLabel={t('common.active')} active />
        </div>
      </Card>

      {/* Preferensi Notifikasi */}
      <Card>
        <SectionTitle>{t('notif.prefs.title')}</SectionTitle>
        <div className="flex flex-col gap-0 divide-y divide-border/30">
          <NotifPrefRow label={t('notif.alertHarga')} value={prefs.alertHarga} onChange={() => toggle('alertHarga')} />
          <NotifPrefRow label={t('notif.eksekusiOrder')} value={prefs.eksekusiOrder} onChange={() => toggle('eksekusiOrder')} />
          <NotifPrefRow label={t('notif.takeProfitStop')} value={prefs.takeProfitStop} onChange={() => toggle('takeProfitStop')} />
          <NotifPrefRow label={t('notif.depositBerhasil')} value={prefs.depositBerhasil} onChange={() => toggle('depositBerhasil')} />
          <NotifPrefRow label={t('notif.penarikanBerhasil')} value={prefs.penarikanBerhasil} onChange={() => toggle('penarikanBerhasil')} />
          <NotifPrefRow label={t('notif.updateSistem')} value={prefs.updateSistem} onChange={() => toggle('updateSistem')} />
          <NotifPrefRow label={t('notif.laporanHarian')} value={prefs.laporanHarian} onChange={() => toggle('laporanHarian')} />
          <NotifPrefRow label={t('notif.newsletter')} value={prefs.newsletter} onChange={() => toggle('newsletter')} />
        </div>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <SectionTitle>{t('notif.quietHours.title')}</SectionTitle>
        <p className="text-xs text-muted-foreground mb-4">{t('notif.quietHours.desc')}</p>
        <div className="grid grid-cols-2 gap-6">
          <TimeField label={t('notif.quietHours.start')} defaultValue="22:00" />
          <TimeField label={t('notif.quietHours.end')} defaultValue="07:00" />
        </div>
      </Card>

      <Button className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold" variant="outline">
        {t('notif.save')}
      </Button>
    </div>
  );
}

function NotifChannelRow({ icon: Icon, label, sublabel, active, activeLabel }: {
  icon: any; label: string; sublabel: string; active?: boolean; activeLabel: string;
}) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {sublabel && <span className="text-[11px] text-muted-foreground">{sublabel}</span>}
        </div>
      </div>
      {active && <span className="text-xs font-bold text-primary">{activeLabel}</span>}
    </div>
  );
}

function NotifPrefRow({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground font-medium">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:bg-primary" />
    </div>
  );
}

function TimeField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="relative">
        <Input
          type="time"
          defaultValue={defaultValue}
          className="bg-background/50 border-border text-foreground text-sm pr-8"
        />
        <Clock className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────── main component ─── */

const TAB_KEYS = ['data-diri', 'keamanan', 'preferensi', 'integrasi', 'notifikasi'] as const;
type TabKey = typeof TAB_KEYS[number];

const TAB_TRANS: Record<TabKey, string> = {
  'data-diri': 'tab.dataDiri',
  'keamanan': 'tab.keamanan',
  'preferensi': 'tab.preferensi',
  'integrasi': 'tab.integrasi',
  'notifikasi': 'tab.notifikasi',
};

export default function Profile() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>('data-diri');

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto animate-in fade-in duration-500">

      {/* Tabs Row */}
      <div className="flex items-center justify-between mb-8 border-b border-border pb-px relative">
        <div className="flex items-center gap-6 overflow-x-auto">
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(TAB_TRANS[key])}
              {activeTab === key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground h-9 text-xs font-semibold gap-2 ml-4">
          <Pencil className="w-3.5 h-3.5" />
          {t('common.editProfile')}
        </Button>
      </div>

      {/* Content Area */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">

          {activeTab === 'data-diri' && (
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
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-background border-[3px] border-primary/80 shadow-[0_0_15px_rgba(0,212,200,0.3)] overflow-hidden flex items-center justify-center text-4xl font-bold text-foreground">
                        <img src={profilePhoto} alt="DipsxBT" className="w-full h-full object-cover" />
                      </div>
                      <button aria-label="Edit avatar" className="absolute bottom-0 right-0 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
                        {t('profile.bio')}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
                    <div className="flex flex-col gap-1 border-r border-border/50 sm:border-r">
                      <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">{t('profile.joinDate.label')}</span>
                      <span className="text-sm font-bold text-foreground">{t('profile.joinDate.value')}</span>
                    </div>
                    <div className="flex flex-col gap-1 sm:border-r border-border/50">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t('profile.country.label')}</span>
                      <span className="text-sm font-medium text-foreground">{t('profile.country.value')}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-r border-border/50">
                      <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">{t('profile.localTime.label')}</span>
                      <span className="text-sm font-bold text-primary">13:45 WIB</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t('profile.accountStatus.label')}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-sm font-medium text-[#22c55e]">{t('profile.accountStatus.value')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {t('social.title')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SocialLink icon={FaInstagram} platform="Instagram" handle="@alwaysdips" href="https://www.instagram.com/alwaysdips" />
                    <SocialLink icon={FaTelegram} platform="Telegram" handle="@alwaysdips" href="https://t.me/alwaysdips" />
                    <SocialLink icon={FaXTwitter} platform="X (Twitter)" handle="@andrewstocklan" href="https://x.com/andrewstocklan" />
                  </div>
                </div>

                {/* Info Trading */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {t('tradingInfo.title')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SocialLink icon={SiTradingview} platform="TradingView" handle="tradingview.com" href="https://www.tradingview.com/" />
                    <SocialLink icon={Globe} platform="Investing.com" handle="investing.com" href="https://www.investing.com/" />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* Level Trader */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {t('level.title')}
                  </h3>
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-5xl font-black text-foreground tracking-tight">Lv. 7</span>
                    <span className="text-sm font-medium text-muted-foreground pb-1.5">{t('level.elite')}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-muted-foreground">EXP 12,450 / 20,000</span>
                      <span className="text-primary">62%</span>
                    </div>
                    <Progress value={62} className="h-2 bg-muted" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard icon={Trophy} label={t('level.totalTrades')} value="1,248" />
                    <StatCard icon={Target} label={t('level.winRate')} value="67.89%" />
                    <StatCard icon={PieChart} label={t('level.profitFactor')} value="2.14" />
                    <StatCard icon={DollarSign} label={t('level.totalPnl')} value="+$62,409.00" valueColor="text-[#22c55e]" />
                  </div>
                </div>

                {/* Tentang Saya */}
                <div className="bg-card border border-border rounded-xl p-6 relative">
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-primary rounded-r" />
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2 pl-3">
                    {t('about.title')}
                  </h3>
                  <div className="pl-3 relative">
                    <Quote className="w-8 h-8 text-muted/30 absolute -top-2 -left-2 rotate-180" />
                    <p className="text-sm text-foreground/90 leading-relaxed relative z-10 italic">
                      {t('about.quote')}
                    </p>
                  </div>
                </div>

                {/* Preferensi Trading */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {t('tradingPref.title')}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <PreferenceRow label={t('tradingPref.accountType')} value="Real Account" />
                    <PreferenceRow label={t('tradingPref.leverage')} value="10x" />
                    <PreferenceRow label={t('tradingPref.currency')} value="USDT" />
                    <PreferenceRow label={t('tradingPref.notifications')} value={t('common.active')} hasToggle defaultToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'keamanan' && (
            <motion.div key="keamanan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <KeamananPanel />
            </motion.div>
          )}

          {activeTab === 'preferensi' && (
            <motion.div key="preferensi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <PreferensiPanel />
            </motion.div>
          )}

          {activeTab === 'integrasi' && (
            <motion.div key="integrasi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <IntegrasiPanel />
            </motion.div>
          )}

          {activeTab === 'notifikasi' && (
            <motion.div key="notifikasi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <NotifikasiPanel />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────── shared sub-components ─── */

function InfoRow({ icon: Icon, label, value, highlight = false }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors group">
      <div className="flex items-center gap-3 w-1/3 min-w-[140px]">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="flex items-center justify-between flex-1 pl-4">
        <span className={`text-sm font-medium truncate ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</span>
        <button aria-label={`Edit ${label}`} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-background">
          <Pencil className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, valueColor = 'text-foreground' }: { icon: any; label: string; value: string; valueColor?: string }) {
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

function SocialLink({ icon: Icon, platform, handle, href }: { icon: any; platform: string; handle: string; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 hover:border-border transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-medium">{platform}</span>
          <span className="text-xs font-semibold text-primary">{handle}</span>
        </div>
      </div>
      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
    </a>
  );
}

function PreferenceRow({ label, value, hasToggle = false, defaultToggle = false }: {
  label: string; value: string; hasToggle?: boolean; defaultToggle?: boolean;
}) {
  const [isOn, setIsOn] = useState(defaultToggle);
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 relative pl-4">
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary/50 rounded-r" />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-primary">{value}</span>
        {hasToggle && (
          <Switch
            checked={isOn}
            onCheckedChange={setIsOn}
            className="data-[state=checked]:bg-primary scale-75"
          />
        )}
      </div>
    </div>
  );
}
