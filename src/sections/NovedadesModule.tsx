import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Info,
  Trash2,
  Check
} from 'lucide-react';

// Datos de novedades
const novedadesData = [
  { 
    id: 1, 
    type: 'alert', 
    title: 'Suscripción por vencer', 
    message: 'Tu suscripción vence en 7 día(s). Renueva para continuar usando todas las funciones.',
    date: '2026-04-05 10:30',
    read: false 
  },
  { 
    id: 2, 
    type: 'warning', 
    title: 'Verifica tu correo', 
    message: 'Verifica tu correo para activar todas las funciones del sistema.',
    date: '2026-04-05 09:15',
    read: false 
  },
  { 
    id: 3, 
    type: 'info', 
    title: 'Nueva cita agendada', 
    message: 'Roberto Díaz ha agendado una cita para el 05 de Abril a las 11:00 AM.',
    date: '2026-04-05 08:45',
    read: true 
  },
  { 
    id: 4, 
    type: 'success', 
    title: 'Turno completado', 
    message: 'El turno T-002 de María García ha sido completado exitosamente.',
    date: '2026-04-05 08:30',
    read: true 
  },
  { 
    id: 5, 
    type: 'info', 
    title: 'Stock bajo', 
    message: 'El producto "Aromatizante Fresh" tiene stock bajo (8 unidades).',
    date: '2026-04-04 18:00',
    read: true 
  },
  { 
    id: 6, 
    type: 'success', 
    title: 'Corte de caja realizado', 
    message: 'El corte de caja del día 04 de Abril se realizó exitosamente. Total: $4,500',
    date: '2026-04-04 20:00',
    read: true 
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="w-5 h-5 text-red-400" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    case 'info':
      return <Info className="w-5 h-5 text-cyan-400" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    default:
      return <Bell className="w-5 h-5 text-slate-400" />;
  }
};

const getBgColor = (type: string) => {
  switch (type) {
    case 'alert':
      return 'bg-red-500/10 border-red-500/30';
    case 'warning':
      return 'bg-amber-500/10 border-amber-500/30';
    case 'info':
      return 'bg-cyan-500/10 border-cyan-500/30';
    case 'success':
      return 'bg-emerald-500/10 border-emerald-500/30';
    default:
      return 'bg-[#1e293b] border-[#334155]';
  }
};

export function NovedadesModule() {
  const [novedades, setNovedades] = useState(novedadesData);
  const [filter, setFilter] = useState('all');

  const filteredNovedades = novedades.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const markAsRead = (id: number) => {
    setNovedades(novedades.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNovedades(novedades.map(n => ({ ...n, read: true })));
  };

  const deleteNovedad = (id: number) => {
    setNovedades(novedades.filter(n => n.id !== id));
  };

  const unreadCount = novedades.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-cyan-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Novedades</h3>
            <p className="text-sm text-slate-400">{unreadCount} sin leer</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 text-sm"
          >
            <option value="all">Todas</option>
            <option value="unread">Sin leer</option>
            <option value="read">Leídas</option>
          </select>
          <Button 
            onClick={markAllAsRead}
            variant="outline" 
            className="border-[#334155] text-slate-400 hover:bg-[#1e293b]"
          >
            <Check className="w-4 h-4 mr-2" />
            Marcar todas
          </Button>
        </div>
      </div>

      {/* Novedades list */}
      <div className="space-y-3">
        {filteredNovedades.map((novedad) => (
          <Card 
            key={novedad.id} 
            className={`bg-[#0f172a] border ${getBgColor(novedad.type)} ${!novedad.read ? 'ring-1 ring-cyan-500/30' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center flex-shrink-0">
                  {getIcon(novedad.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`text-sm font-semibold ${!novedad.read ? 'text-slate-100' : 'text-slate-400'}`}>
                        {novedad.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">{novedad.message}</p>
                      <p className="text-xs text-slate-500 mt-2">{novedad.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!novedad.read && (
                        <button 
                          onClick={() => markAsRead(novedad.id)}
                          className="p-1.5 rounded-lg hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400"
                          title="Marcar como leída"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNovedad(novedad.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNovedades.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-400 mb-2">No hay novedades</h3>
            <p className="text-sm text-slate-500">No tienes notificaciones en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}
