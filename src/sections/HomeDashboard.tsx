import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Clock, 
  CheckCircle, 
  Package,
  TrendingUp,
  Droplets,
  Sparkles,
  Wind,
  AlertTriangle,
  ChevronRight,
  Calendar,
  CalendarDays,
  DollarSign,
  Users,
  Timer
} from 'lucide-react';

// Datos de estadísticas
const statsData = [
  { title: 'Total Hoy', value: '24', icon: Car, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500/10', textColor: 'text-cyan-400' },
  { title: 'En Espera', value: '5', icon: Clock, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500/10', textColor: 'text-amber-400' },
  { title: 'Lavando', value: '8', icon: Droplets, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400' },
  { title: 'Listos', value: '6', icon: CheckCircle, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400' },
  { title: 'Entregados', value: '5', icon: Package, color: 'from-violet-500 to-violet-600', bgColor: 'bg-violet-500/10', textColor: 'text-violet-400' },
  { title: 'Ingresos Hoy', value: '$4,250', icon: DollarSign, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500/10', textColor: 'text-cyan-400' },
  { title: 'Cobrados', value: '$3,800', icon: DollarSign, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400' },
  { title: 'Ticket Prom.', value: '$177', icon: TrendingUp, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500/10', textColor: 'text-amber-400' },
];

// Datos de turnos recientes
const recentTurnos = [
  { id: 'T-001', client: 'Juan Pérez', vehicle: 'Toyota Corolla', plate: 'ABC-123', service: 'Lavado Premium', status: 'washing', time: '10:30 AM', price: 350 },
  { id: 'T-002', client: 'María García', vehicle: 'Honda Civic', plate: 'DEF-456', service: 'Lavado Básico', status: 'completed', time: '10:15 AM', price: 150 },
  { id: 'T-003', client: 'Carlos López', vehicle: 'Ford F-150', plate: 'GHI-789', service: 'Lavado Completo', status: 'pending', time: '10:00 AM', price: 450 },
  { id: 'T-004', client: 'Ana Martínez', vehicle: 'Mazda 3', plate: 'JKL-012', service: 'Lavado Express', status: 'completed', time: '09:45 AM', price: 100 },
  { id: 'T-005', client: 'Pedro Sánchez', vehicle: 'Nissan Sentra', plate: 'MNO-345', service: 'Lavado Premium', status: 'washing', time: '09:30 AM', price: 350 },
];

// Servicios populares
const popularServices = [
  { name: 'Lavado Básico', count: 45, percentage: 35, icon: Droplets, color: 'text-cyan-400', bgColor: 'bg-cyan-500' },
  { name: 'Lavado Premium', count: 32, percentage: 25, icon: Sparkles, color: 'text-amber-400', bgColor: 'bg-amber-500' },
  { name: 'Lavado Completo', count: 28, percentage: 20, icon: Car, color: 'text-emerald-400', bgColor: 'bg-emerald-500' },
  { name: 'Lavado Express', count: 25, percentage: 20, icon: Wind, color: 'text-violet-400', bgColor: 'bg-violet-500' },
];

// Próximas citas
const upcomingCitas = [
  { id: 'C-001', client: 'Roberto Díaz', vehicle: 'Volkswagen Jetta', time: '11:00 AM', service: 'Lavado Premium' },
  { id: 'C-002', client: 'Laura Torres', vehicle: 'Chevrolet Spark', time: '11:30 AM', service: 'Lavado Básico' },
  { id: 'C-003', client: 'Sofía Ramírez', vehicle: 'Kia Rio', time: '12:00 PM', service: 'Lavado Express' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs status-pending">
          <Clock className="w-3 h-3" />
          En Espera
        </span>
      );
    case 'washing':
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs status-washing">
          <Droplets className="w-3 h-3" />
          Lavando
        </span>
      );
    case 'completed':
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs status-completed">
          <CheckCircle className="w-3 h-3" />
          Listo
        </span>
      );
    default:
      return null;
  }
};

export function HomeDashboard() {
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Notifications */}
      {showNotifications && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <div className="flex-1">
              <p className="text-sm text-amber-400">Tu suscripción vence en 7 día(s)</p>
            </div>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-amber-400 hover:text-amber-300"
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <AlertTriangle className="w-5 h-5 text-cyan-400" />
            <div className="flex-1">
              <p className="text-sm text-cyan-400">Verifica tu correo para activar todas las funciones</p>
            </div>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-cyan-400 hover:text-cyan-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="bg-[#0f172a] border-[#1e293b] card-hover group cursor-pointer overflow-hidden"
            >
              <CardContent className="p-3">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 ${stat.textColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-400">{stat.title}</p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Turnos recientes */}
        <Card className="lg:col-span-2 bg-[#0f172a] border-[#1e293b] card-hover">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Turnos Recientes</h3>
              </div>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 text-sm">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentTurnos.map((turno) => (
                <div 
                  key={turno.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center">
                      <Car className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{turno.client}</p>
                      <p className="text-xs text-slate-500">{turno.vehicle} • {turno.plate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{turno.service}</p>
                      <p className="text-xs text-slate-500">{turno.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-cyan-400">${turno.price}</p>
                    </div>
                    {getStatusBadge(turno.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas citas */}
        <Card className="bg-[#0f172a] border-[#1e293b] card-hover">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Próximas Citas</h3>
              </div>
              <Button variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 text-sm">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingCitas.map((cita) => (
                <div 
                  key={cita.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{cita.client}</p>
                      <p className="text-xs text-slate-500">{cita.vehicle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-amber-400">{cita.time}</p>
                    <p className="text-xs text-slate-500">{cita.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Servicios populares */}
        <Card className="bg-[#0f172a] border-[#1e293b] card-hover">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Servicios Populares</h3>
            </div>
            <div className="space-y-4">
              {popularServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${service.color}`} />
                        <span className="text-sm text-slate-300">{service.name}</span>
                      </div>
                      <span className="text-sm text-slate-400">{service.count} ({service.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${service.bgColor} transition-all duration-500`}
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resumen del día */}
        <Card className="bg-[#0f172a] border-[#1e293b] card-hover">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Timer className="w-4 h-4 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Resumen del Día</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#1e293b]/50">
                <p className="text-xs text-slate-400 mb-1">Horas Trabajadas</p>
                <p className="text-2xl font-bold text-cyan-400">6.5h</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1e293b]/50">
                <p className="text-xs text-slate-400 mb-1">Prom. por Hora</p>
                <p className="text-2xl font-bold text-amber-400">$653</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1e293b]/50">
                <p className="text-xs text-slate-400 mb-1">Clientes Nuevos</p>
                <p className="text-2xl font-bold text-emerald-400">8</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1e293b]/50">
                <p className="text-xs text-slate-400 mb-1">Clientes Recurrentes</p>
                <p className="text-2xl font-bold text-violet-400">16</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
