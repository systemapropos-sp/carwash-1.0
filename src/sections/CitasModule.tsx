import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  CalendarDays,
  User,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle
} from 'lucide-react';

// Datos de citas
const citasData = [
  { id: 'C-001', client: 'Roberto Díaz', phone: '555-0201', vehicle: 'Volkswagen Jetta', plate: 'PQR-678', color: 'Plata', type: 'Sedan', service: 'Lavado Premium', date: '2026-04-05', time: '11:00', status: 'confirmed' },
  { id: 'C-002', client: 'Laura Torres', phone: '555-0202', vehicle: 'Chevrolet Spark', plate: 'STU-901', color: 'Rojo', type: 'Compacto', service: 'Lavado Básico', date: '2026-04-05', time: '11:30', status: 'confirmed' },
  { id: 'C-003', client: 'Sofía Ramírez', phone: '555-0203', vehicle: 'Kia Rio', plate: 'VWX-234', color: 'Azul', type: 'Sedan', service: 'Lavado Express', date: '2026-04-05', time: '12:00', status: 'pending' },
  { id: 'C-004', client: 'Miguel Hernández', phone: '555-0204', vehicle: 'Toyota RAV4', plate: 'YZA-567', color: 'Negro', type: 'SUV', service: 'Lavado Completo', date: '2026-04-06', time: '09:00', status: 'confirmed' },
  { id: 'C-005', client: 'Patricia Vega', phone: '555-0205', vehicle: 'Honda CR-V', plate: 'BCD-890', color: 'Blanco', type: 'SUV', service: 'Lavado Premium', date: '2026-04-06', time: '10:00', status: 'confirmed' },
];

const services = [
  { name: 'Lavado Básico', price: 150 },
  { name: 'Lavado Premium', price: 350 },
  { name: 'Lavado Completo', price: 450 },
  { name: 'Lavado Express', price: 100 },
];

const vehicleTypes = ['Sedan', 'Camioneta', 'SUV', 'Compacto', 'Van'];
const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Clock className="w-3 h-3" />
          Pendiente
        </span>
      );
    case 'confirmed':
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle className="w-3 h-3" />
          Confirmada
        </span>
      );
    default:
      return null;
  }
};

export function CitasModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredCitas = citasData.filter(cita => 
    cita.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const hasCita = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return citasData.some(c => c.date === dateStr);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white btn-shine"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1e293b] rounded-lg p-1">
            <button onClick={() => changeDate(-30)} className="p-1.5 rounded hover:bg-[#334155] text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-300 px-2">
              {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => changeDate(30)} className="p-1.5 rounded hover:bg-[#334155] text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar cita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <span key={day} className="text-xs text-slate-500">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                    day === null 
                      ? 'invisible' 
                      : hasCita(day)
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                          ? 'bg-cyan-500 text-white'
                          : 'bg-[#1e293b] text-slate-300 hover:bg-[#334155]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#1e293b]">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-500/20"></div>
                  <span className="text-slate-400">Con citas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-cyan-500"></div>
                  <span className="text-slate-400">Seleccionado</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Citas list */}
        <Card className="lg:col-span-2 bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Citas del Día</h3>
            <div className="space-y-3">
              {filteredCitas.filter(c => c.date === selectedDate).map((cita) => (
                <div 
                  key={cita.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-amber-400">{cita.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{cita.client}</p>
                      <p className="text-xs text-slate-500">{cita.vehicle} • {cita.plate}</p>
                      <p className="text-xs text-amber-400">{cita.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(cita.status)}
                    <button className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30">
                      Confirmar
                    </button>
                  </div>
                </div>
              ))}
              {filteredCitas.filter(c => c.date === selectedDate).length === 0 && (
                <div className="text-center py-8">
                  <CalendarDays className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">No hay citas para este día</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Nueva Cita */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">Nueva Cita</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Placa</Label>
                  <Input placeholder="ABC-123" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Color</Label>
                  <Input placeholder="Blanco" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Tipo de Vehículo</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    {vehicleTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
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
                  <Label className="text-slate-300">Fecha</Label>
                  <Input type="date" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Hora</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
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
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white">
                Guardar Cita
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
