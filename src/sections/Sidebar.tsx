import { 
  LayoutDashboard, 
  Calendar, 
  CalendarDays, 
  Sparkles, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Link, 
  Briefcase, 
  BarChart3, 
  Bell, 
  Settings, 
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Car
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'turnos', label: 'Turnos', icon: Calendar },
  { id: 'citas', label: 'Citas', icon: CalendarDays },
  { id: 'servicios', label: 'Servicios', icon: Sparkles },
  { id: 'mostrador', label: 'Mostrador', icon: ShoppingCart },
  { id: 'caja', label: 'Caja del Día', icon: DollarSign },
  { id: 'operarios', label: 'Operarios', icon: Users },
  { id: 'liga-agenda', label: 'Liga Agenda', icon: Link },
  { id: 'nomina', label: 'Nómina', icon: Briefcase },
  { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3 },
  { id: 'novedades', label: 'Novedades', icon: Bell },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
  { id: 'suscripcion', label: 'Mi Suscripción', icon: CreditCard },
];

export function Sidebar({ 
  collapsed, 
  onToggle, 
  activeSection, 
  onSectionChange,
  onLogout 
}: SidebarProps) {
  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-[#0f172a] border-r border-[#1e293b] z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1e293b]">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-slideIn">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-100">WashPro</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto">
            <Car className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-110 z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Menu */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-8rem)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500' 
                  : 'text-slate-400 hover:bg-[#1e293b] hover:text-slate-200'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}></div>
              
              <Icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : ''}`} />
              
              {!collapsed && (
                <span className="relative z-10 text-sm font-medium animate-slideIn">{item.label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e293b] text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-[#334155]">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#1e293b]">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
          {!collapsed && <span className="text-sm font-medium">Cerrar Sesión</span>}
          
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e293b] text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-[#334155]">
              Cerrar Sesión
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
