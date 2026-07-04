import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type Language = 'id' | 'en';

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    'nav.dashboard': 'Dashboard',
    'nav.portfolio': 'Portfolio',
    'nav.compound': 'Compound',
    'nav.journal': 'Journal',
    'nav.calendar': 'Calendar',
    // Header
    'header.profile': 'Profile',
    'header.dataDiri': 'Data Diri',
    'header.subtitle': 'Kelola informasi pribadi dan pengaturan akun Anda.',
    // PRO plan
    'plan.pro': 'PRO PLAN',
    'plan.expires': 'Kedaluwarsa dalam 24 hari',
    'plan.upgrade': 'Upgrade Sekarang',
    // Tooltip labels
    'toggle.theme.dark': 'Mode Gelap',
    'toggle.theme.light': 'Mode Terang',
    'toggle.lang': 'Bahasa',
    'toggle.sidebar': 'Toggle Sidebar',
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.portfolio': 'Portfolio',
    'nav.compound': 'Compound',
    'nav.journal': 'Journal',
    'nav.calendar': 'Calendar',
    'header.profile': 'Profile',
    'header.dataDiri': 'Personal Info',
    'header.subtitle': 'Manage your personal information and account settings.',
    'plan.pro': 'PRO PLAN',
    'plan.expires': 'Expires in 24 Days',
    'plan.upgrade': 'Upgrade Now',
    'toggle.theme.dark': 'Dark Mode',
    'toggle.theme.light': 'Light Mode',
    'toggle.lang': 'Language',
    'toggle.sidebar': 'Toggle Sidebar',
  },
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('id');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(l => l === 'id' ? 'en' : 'id');
  const toggleSidebar = () => setSidebarCollapsed(c => !c);

  const t = (key: string) => translations[language][key] ?? key;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, sidebarCollapsed, toggleSidebar, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
