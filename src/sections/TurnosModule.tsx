import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Car,
  User,
  Phone,
  Clock,
  CheckCircle,
  Droplets,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

// Datos de turnos
const turnosData = [
  { id: 'T-001', client: 'Juan Pérez', phone: '555-0101', vehicle: 'Toyota Corolla', plate: 'ABC-123', color: 'Blanco', type: 'Sedan', service: 'Lavado Premium', status: 'washing', time: '10:30', price: 350, notes: '' },
  { id: 'T-002', client: 'María García', phone: '555-0102', vehicle: 'Honda Civic', plate: 'DEF-456', color: 'Negro', type: 'Sedan', service: 'Lavado Básico', status: 'completed', time: '10:15', price: 150, notes: '' },
  { id: 'T-003', client: 'Carlos López', phone: '555-0103', vehicle: 'Ford F-150', plate: 'GHI-789', color: 'Rojo', type: 'Camioneta', service: 'Lavado Completo', status: 'pending', time: '10:00', price: 450, notes: 'Cliente frecuente' },
  { id: 'T-004', client: 'Ana Martínez', phone: '555-0104', vehicle: 'Mazda 3', plate: 'JKL-012', color: 'Azul', type: 'Sedan', service: 'Lavado Express', status: 'completed', time: '09:45', price: 100, notes: '' },
  { id: 'T-005', client: 'Pedro Sánchez', phone: '555-0105', vehicle: 'Nissan Sentra', plate: 'MNO-345', color: 'Gris', type: 'Sedan', service: 'Lavado Premium', status: 'washing', time: '09:30', price: 350, notes: '' },
];

const services = [
  { name: 'Lavado Básico', price: 150 },
  { name: 'Lavado Premium', price: 350 },
  { name: 'Lavado Completo', price: 450 },
  { name: 'Lavado Express', price: 100 },
];

const vehicleTypes = ['Sedan', 'Camioneta', 'SUV', 'Compacto', 'Van'];

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

export function TurnosModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredTurnos = turnosData.filter(turno => 
    turno.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turno.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turno.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Turno
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1e293b] rounded-lg p-1">
            <button onClick={() => changeDate(-1)} className="p-1.5 rounded hover:bg-[#334155] text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-300 px-2">{formatDate(currentDate)}</span>
            <button onClick={() => changeDate(1)} className="p-1.5 rounded hover:bg-[#334155] text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar turno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Total Turnos</p>
            <p className="text-2xl font-bold text-slate-100">24</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">En Espera</p>
            <p className="text-2xl font-bold text-amber-400">5</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Lavando</p>
            <p className="text-2xl font-bold text-cyan-400">8</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Completados</p>
            <p className="text-2xl font-bold text-emerald-400">11</p>
          </CardContent>
        </Card>
      </div>

      {/* Turnos list */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Hora</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Cliente</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Vehículo</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Servicio</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Precio</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTurnos.map((turno) => (
                  <tr key={turno.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-300">{turno.time}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-slate-100">{turno.client}</p>
                        <p className="text-xs text-slate-500">{turno.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-100">{turno.vehicle}</p>
                          <p className="text-xs text-slate-500">{turno.plate} • {turno.color}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-300">{turno.service}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-cyan-400">${turno.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(turno.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30">
                          Iniciar
                        </button>
                        <button className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30">
                          Listo
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Nuevo Turno */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">Nuevo Turno</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Placa</Label>
                  <Input placeholder="ABC-123" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Tipo de Vehículo</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    {vehicleTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Color</Label>
                  <Input placeholder="Blanco" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Servicio</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    {services.map(s => <option key={s.name} value={s.name}>{s.name} - ${s.price}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Nombre del Cliente</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Juan Pérez" className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="555-0101" className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Notas</Label>
                <textarea 
                  rows={3}
                  placeholder="Notas adicionales..."
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white">
                Guardar Turno
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
