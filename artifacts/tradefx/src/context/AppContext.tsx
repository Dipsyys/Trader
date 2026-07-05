import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'dark' | 'light';
export type Language = 'id' | 'en';
export type AccountType = 'real' | 'demo';
export type Currency = 'usdt' | 'btc' | 'eth';
export type Leverage = string; // e.g. '10x', '75x', custom numeric

const BALANCE_STORAGE_KEY = 'tradefx_custom_balance';
const DEFAULT_BALANCE = 62409.00;

function loadStoredBalance(): number {
  if (typeof window === 'undefined') return DEFAULT_BALANCE;
  const raw = window.localStorage.getItem(BALANCE_STORAGE_KEY);
  const parsed = raw !== null ? parseFloat(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : DEFAULT_BALANCE;
}

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  t: (key: string) => string;
  // Trading preferences
  accountType: AccountType;
  setAccountType: (v: AccountType) => void;
  currency: Currency;
  setCurrency: (v: Currency) => void;
  leverage: Leverage;
  setLeverage: (v: Leverage) => void;
  tradingNotifications: boolean;
  setTradingNotifications: (v: boolean) => void;
  balance: number;
  setBalance: (v: number) => void;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // ── Sidebar / nav ──────────────────────────────────
    'nav.dashboard': 'Dashboard',
    'nav.portfolio': 'Portfolio',
    'nav.compound': 'Compound',
    'nav.journal': 'Journal',
    'nav.calendar': 'Calendar',
    'plan.pro': 'PRO PLAN',
    'plan.expires': 'Kedaluwarsa dalam 24 hari',
    'plan.upgrade': 'Upgrade Sekarang',
    'toggle.theme.toLight': 'Mode Terang',
    'toggle.theme.toDark': 'Mode Gelap',
    'toggle.lang': 'Bahasa',
    'toggle.sidebar': 'Toggle Sidebar',

    // ── Header ─────────────────────────────────────────
    'header.profile': 'Profile',
    'header.dataDiri': 'Data Diri',
    'header.subtitle': 'Kelola informasi pribadi dan pengaturan akun Anda.',
    'header.page.dashboard': 'Dashboard Overview',
    'header.page.portfolio': 'Portfolio Overview',
    'header.page.compound': 'Compound',
    'header.page.journal': 'Journal',
    'header.page.calendar': 'Calendar',

    // ── Tabs ───────────────────────────────────────────
    'tab.dataDiri': 'Data Diri',
    'tab.keamanan': 'Keamanan',
    'tab.preferensi': 'Preferensi',
    'tab.integrasi': 'Integrasi',
    'tab.notifikasi': 'Notifikasi',

    // ── Common ─────────────────────────────────────────
    'common.active': 'Aktif',
    'common.connected': 'Terhubung',
    'common.editProfile': 'Edit Profile',
    'common.saveChanges': 'Simpan Perubahan',

    // ── Data Diri ──────────────────────────────────────
    'profile.bio': 'Trader compound jangka panjang yang fokus pada konsistensi, manajemen risiko, dan pertumbuhan eksponensial.',
    'profile.joinDate.label': 'Bergabung Sejak',
    'profile.joinDate.value': '12 Jan 2024',
    'profile.country.label': 'Negara',
    'profile.country.value': '🇮🇩 Indonesia',
    'profile.localTime.label': 'Waktu Lokal',
    'profile.accountStatus.label': 'Status Akun',
    'profile.accountStatus.value': 'Aktif',

    'info.title': 'Informasi Pribadi',
    'info.fullName': 'Nama Lengkap',
    'info.username': 'Username',
    'info.email': 'Email',
    'info.phone': 'Nomor Telepon',
    'info.birthdate': 'Tanggal Lahir',
    'info.birthdate.value': '14 Februari 2002',
    'info.gender': 'Jenis Kelamin',
    'info.gender.value': 'Laki-laki',
    'info.language': 'Bahasa',
    'info.language.value': 'Bahasa Indonesia',
    'info.timezone': 'Zona Waktu',

    'level.title': 'Level Trader',
    'level.elite': 'Elite Trader',
    'level.totalTrades': 'Total Trades',
    'level.winRate': 'Win Rate',
    'level.profitFactor': 'Profit Factor',
    'level.totalPnl': 'Total PnL',

    'about.title': 'Tentang Saya',
    'about.quote': '"Disiplin, konsisten, dan selalu belajar. Fokus pada strategi compound trading untuk mencapai kebebasan finansial."',

    'social.title': 'Media Sosial',

    'tradingInfo.title': 'Info Trading',

    'tradingPref.title': 'Preferensi Trading',
    'tradingPref.accountType': 'Tipe Akun',
    'tradingPref.leverage': 'Leverage Default',
    'tradingPref.currency': 'Mata Uang',
    'tradingPref.notifications': 'Notifikasi Trading',

    // ── Keamanan ───────────────────────────────────────
    'security.score.label': 'Security Score',
    'security.score.status': 'Sangat Kuat',
    'security.changePassword': 'Ubah Password',
    'security.currentPassword': 'Password Saat Ini',
    'security.newPassword': 'Password Baru',
    'security.confirmPassword': 'Konfirmasi Password Baru',
    'security.currentPassword.ph': 'Masukkan password saat ini',
    'security.newPassword.ph': 'Masukkan password baru',
    'security.confirmPassword.ph': 'Konfirmasi password baru',
    'security.changePassword.btn': 'Ubah Password',
    'security.2fa.title': 'Two-Factor Authentication (2FA)',
    'security.2fa.desc': 'Lindungi akun Anda dengan 2FA untuk keamanan ekstra.',
    'security.loginActivity': 'Login Activity',
    'security.viewAll': 'Lihat Semua Aktivitas',
    'security.currentlyActive': 'Sedang Aktif',
    'security.hoursAgo': '2 jam yang lalu',
    'security.dayAgo': '1 hari yang lalu',
    'security.showPassword': 'Tampilkan password',
    'security.hidePassword': 'Sembunyikan password',

    // ── Preferensi ─────────────────────────────────────
    'pref.trading.title': 'Preferensi Trading',
    'pref.accountType': 'Tipe Akun',
    'pref.currency': 'Mata Uang',
    'pref.leverage': 'Leverage Default',
    'pref.priceDisplay': 'Tampilan Harga',
    'pref.chartSize': 'Ukuran Chart Default',
    'pref.barCount': 'Jumlah Bar Chart',
    'pref.colorTheme': 'Color Theme',
    'pref.display.title': 'Preferensi Tampilan',
    'pref.language': 'Bahasa',
    'pref.timezone': 'Zona Waktu',
    'pref.numberFormat': 'Format Angka',
    'pref.dateFormat': 'Format Tanggal',
    'pref.upColor': 'Warna Naik',
    'pref.downColor': 'Warna Turun',
    'pref.other.title': 'Preferensi Lainnya',
    'pref.showTutorial': 'Tampilkan Tutorial',
    'pref.beginnerMode': 'Mode Pemula',
    'pref.confirmExec': 'Konfirmasi Sebelum Eksekusi',
    'pref.hideBalance': 'Sembunyikan Saldo Kecil',

    // ── Integrasi ──────────────────────────────────────
    'integ.exchanges.title': 'Exchange Terhubung',
    'integ.exchanges.manage': 'Kelola Exchange',
    'integ.platforms.title': 'Platform & Tools',
    'integ.platforms.manage': 'Kelola Integrasi',
    'integ.api.title': 'API Management',
    'integ.api.desc': 'Kelola API key untuk integrasi dengan platform pihak ketiga.',
    'integ.api.btn': 'Kelola API Key',

    // ── Notifikasi ─────────────────────────────────────
    'notif.channels.title': 'Channel Notifikasi',
    'notif.prefs.title': 'Preferensi Notifikasi',
    'notif.alertHarga': 'Alert Harga',
    'notif.eksekusiOrder': 'Eksekusi Order',
    'notif.takeProfitStop': 'Take Profit / Stop Loss',
    'notif.depositBerhasil': 'Deposit Berhasil',
    'notif.penarikanBerhasil': 'Penarikan Berhasil',
    'notif.updateSistem': 'Update Sistem',
    'notif.laporanHarian': 'Laporan Harian',
    'notif.newsletter': 'Newsletter',
    'notif.quietHours.title': 'Quiet Hours',
    'notif.quietHours.desc': 'Tidak menerima notifikasi di luar jam berikut.',
    'notif.quietHours.start': 'Mulai',
    'notif.quietHours.end': 'Selesai',
    'notif.save': 'Simpan Pengaturan Notifikasi',
  },

  en: {
    // ── Sidebar / nav ──────────────────────────────────
    'nav.dashboard': 'Dashboard',
    'nav.portfolio': 'Portfolio',
    'nav.compound': 'Compound',
    'nav.journal': 'Journal',
    'nav.calendar': 'Calendar',
    'plan.pro': 'PRO PLAN',
    'plan.expires': 'Expires in 24 Days',
    'plan.upgrade': 'Upgrade Now',
    'toggle.theme.toLight': 'Light Mode',
    'toggle.theme.toDark': 'Dark Mode',
    'toggle.lang': 'Language',
    'toggle.sidebar': 'Toggle Sidebar',

    // ── Header ─────────────────────────────────────────
    'header.profile': 'Profile',
    'header.dataDiri': 'Personal Info',
    'header.subtitle': 'Manage your personal information and account settings.',
    'header.page.dashboard': 'Dashboard Overview',
    'header.page.portfolio': 'Portfolio Overview',
    'header.page.compound': 'Compound',
    'header.page.journal': 'Journal',
    'header.page.calendar': 'Calendar',

    // ── Tabs ───────────────────────────────────────────
    'tab.dataDiri': 'Personal Info',
    'tab.keamanan': 'Security',
    'tab.preferensi': 'Preferences',
    'tab.integrasi': 'Integrations',
    'tab.notifikasi': 'Notifications',

    // ── Common ─────────────────────────────────────────
    'common.active': 'Active',
    'common.connected': 'Connected',
    'common.editProfile': 'Edit Profile',
    'common.saveChanges': 'Save Changes',

    // ── Data Diri ──────────────────────────────────────
    'profile.bio': 'Long-term compound trader focused on consistency, risk management, and exponential growth.',
    'profile.joinDate.label': 'Member Since',
    'profile.joinDate.value': 'Jan 12, 2024',
    'profile.country.label': 'Country',
    'profile.country.value': '🇮🇩 Indonesia',
    'profile.localTime.label': 'Local Time',
    'profile.accountStatus.label': 'Account Status',
    'profile.accountStatus.value': 'Active',

    'info.title': 'Personal Information',
    'info.fullName': 'Full Name',
    'info.username': 'Username',
    'info.email': 'Email',
    'info.phone': 'Phone Number',
    'info.birthdate': 'Date of Birth',
    'info.birthdate.value': 'February 14, 2002',
    'info.gender': 'Gender',
    'info.gender.value': 'Male',
    'info.language': 'Language',
    'info.language.value': 'English',
    'info.timezone': 'Time Zone',

    'level.title': 'Trader Level',
    'level.elite': 'Elite Trader',
    'level.totalTrades': 'Total Trades',
    'level.winRate': 'Win Rate',
    'level.profitFactor': 'Profit Factor',
    'level.totalPnl': 'Total PnL',

    'about.title': 'About Me',
    'about.quote': '"Discipline, consistency, and continuous learning. Focused on compound trading strategy to achieve financial freedom."',

    'social.title': 'Social Media',

    'tradingInfo.title': 'Trading Info',

    'tradingPref.title': 'Trading Preferences',
    'tradingPref.accountType': 'Account Type',
    'tradingPref.leverage': 'Default Leverage',
    'tradingPref.currency': 'Currency',
    'tradingPref.notifications': 'Trading Notifications',

    // ── Keamanan ───────────────────────────────────────
    'security.score.label': 'Security Score',
    'security.score.status': 'Very Strong',
    'security.changePassword': 'Change Password',
    'security.currentPassword': 'Current Password',
    'security.newPassword': 'New Password',
    'security.confirmPassword': 'Confirm New Password',
    'security.currentPassword.ph': 'Enter current password',
    'security.newPassword.ph': 'Enter new password',
    'security.confirmPassword.ph': 'Confirm new password',
    'security.changePassword.btn': 'Change Password',
    'security.2fa.title': 'Two-Factor Authentication (2FA)',
    'security.2fa.desc': 'Protect your account with 2FA for extra security.',
    'security.loginActivity': 'Login Activity',
    'security.viewAll': 'View All Activity',
    'security.currentlyActive': 'Currently Active',
    'security.hoursAgo': '2 hours ago',
    'security.dayAgo': '1 day ago',
    'security.showPassword': 'Show password',
    'security.hidePassword': 'Hide password',

    // ── Preferensi ─────────────────────────────────────
    'pref.trading.title': 'Trading Preferences',
    'pref.accountType': 'Account Type',
    'pref.currency': 'Currency',
    'pref.leverage': 'Default Leverage',
    'pref.priceDisplay': 'Price Display',
    'pref.chartSize': 'Default Chart Size',
    'pref.barCount': 'Chart Bar Count',
    'pref.colorTheme': 'Color Theme',
    'pref.display.title': 'Display Preferences',
    'pref.language': 'Language',
    'pref.timezone': 'Time Zone',
    'pref.numberFormat': 'Number Format',
    'pref.dateFormat': 'Date Format',
    'pref.upColor': 'Up Color',
    'pref.downColor': 'Down Color',
    'pref.other.title': 'Other Preferences',
    'pref.showTutorial': 'Show Tutorial',
    'pref.beginnerMode': 'Beginner Mode',
    'pref.confirmExec': 'Confirm Before Execution',
    'pref.hideBalance': 'Hide Small Balances',

    // ── Integrasi ──────────────────────────────────────
    'integ.exchanges.title': 'Connected Exchanges',
    'integ.exchanges.manage': 'Manage Exchanges',
    'integ.platforms.title': 'Platforms & Tools',
    'integ.platforms.manage': 'Manage Integrations',
    'integ.api.title': 'API Management',
    'integ.api.desc': 'Manage API keys for third-party platform integrations.',
    'integ.api.btn': 'Manage API Keys',

    // ── Notifikasi ─────────────────────────────────────
    'notif.channels.title': 'Notification Channels',
    'notif.prefs.title': 'Notification Preferences',
    'notif.alertHarga': 'Price Alert',
    'notif.eksekusiOrder': 'Order Execution',
    'notif.takeProfitStop': 'Take Profit / Stop Loss',
    'notif.depositBerhasil': 'Deposit Successful',
    'notif.penarikanBerhasil': 'Withdrawal Successful',
    'notif.updateSistem': 'System Update',
    'notif.laporanHarian': 'Daily Report',
    'notif.newsletter': 'Newsletter',
    'notif.quietHours.title': 'Quiet Hours',
    'notif.quietHours.desc': 'Do not receive notifications outside these hours.',
    'notif.quietHours.start': 'Start',
    'notif.quietHours.end': 'End',
    'notif.save': 'Save Notification Settings',
  },
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('id');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>('real');
  const [currency, setCurrency] = useState<Currency>('usdt');
  const [leverage, setLeverage] = useState<Leverage>('10x');
  const [tradingNotifications, setTradingNotifications] = useState(true);
  const [balance, setBalanceState] = useState<number>(loadStoredBalance);

  const setBalance = (v: number) => {
    setBalanceState(v);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(BALANCE_STORAGE_KEY, String(v));
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const toggleLanguage = () => setLanguage(l => (l === 'id' ? 'en' : 'id'));
  const toggleSidebar = () => setSidebarCollapsed(c => !c);

  const t = (key: string): string => translations[language][key] ?? key;

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, toggleLanguage,
      sidebarCollapsed, toggleSidebar,
      t,
      accountType, setAccountType,
      currency, setCurrency,
      leverage, setLeverage,
      tradingNotifications, setTradingNotifications,
      balance, setBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
