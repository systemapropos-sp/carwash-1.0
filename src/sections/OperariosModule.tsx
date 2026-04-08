import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Users,
  Edit,
  Trash2,
  Car,
  DollarSign,
  X,
  CheckCircle,
  User
} from 'lucide-react';

// Datos de operarios
const operariosData = [
  { id: 1, name: 'Juan López', phone: '555-1001', email: 'juan.lopez@email.com', role: 'Lavador', status: 'active', carsToday: 8, carsTotal: 245, earnings: 3500 },
  { id: 2, name: 'Pedro Martínez', phone: '555-1002', email: 'pedro.martinez@email.com', role: 'Lavador', status: 'active', carsToday: 6, carsTotal: 189, earnings: 2800 },
  { id: 3, name: 'Carlos Ruiz', phone: '555-1003', email: 'carlos.ruiz@email.com', role: 'Lavador', status: 'active', carsToday: 5, carsTotal: 156, earnings: 2200 },
  { id: 4, name: 'Miguel Santos', phone: '555-1004', email: 'miguel.santos@email.com', role: 'Detallista', status: 'inactive', carsToday: 0, carsTotal: 98, earnings: 1800 },
  { id: 5, name: 'Roberto Díaz', phone: '555-1005', email: 'roberto.diaz@email.com', role: 'Lavador', status: 'active', carsToday: 4, carsTotal: 134, earnings: 1900 },
];

const roles = ['Lavador', 'Detallista', 'Supervisor', 'Recepcionista'];

export function OperariosModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOperario, setEditingOperario] = useState<any>(null);

  const filteredOperarios = operariosData.filter(operario => 
    operario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operario.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (operario: any) => {
    setEditingOperario(operario);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingOperario(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button 
          onClick={handleNew}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Operario
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar operario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100 w-64"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Operarios</p>
                <p className="text-2xl font-bold text-slate-100">{operariosData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Activos</p>
                <p className="text-2xl font-bold text-emerald-400">{operariosData.filter(o => o.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Lavados Hoy</p>
                <p className="text-2xl font-bold text-amber-400">{operariosData.reduce((acc, o) => acc + o.carsToday, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Comisiones Hoy</p>
                <p className="text-2xl font-bold text-violet-400">${operariosData.reduce((acc, o) => acc + o.earnings, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operarios grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOperarios.map((operario) => (
          <Card key={operario.id} className={`bg-[#0f172a] border-[#1e293b] card-hover ${operario.status === 'inactive' ? 'opacity-60' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{operario.name}</h3>
                    <p className="text-sm text-slate-400">{operario.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEdit(operario)}
                    className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-[#1e293b]/50">
                  <p className="text-lg font-bold text-amber-400">{operario.carsToday}</p>
                  <p className="text-xs text-slate-500">Hoy</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#1e293b]/50">
                  <p className="text-lg font-bold text-cyan-400">{operario.carsTotal}</p>
                  <p className="text-xs text-slate-500">Total</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[#1e293b]/50">
                  <p className="text-lg font-bold text-emerald-400">${operario.earnings}</p>
                  <p className="text-xs text-slate-500">Ganado</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{operario.phone}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  operario.status === 'active' 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {operario.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Nuevo/Editar Operario */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">
                {editingOperario ? 'Editar Operario' : 'Nuevo Operario'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    defaultValue={editingOperario?.name || ''}
                    placeholder="Juan López" 
                    className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Teléfono</Label>
                  <Input 
                    defaultValue={editingOperario?.phone || ''}
                    placeholder="555-0101" 
                    className="bg-[#1e293b] border-[#334155] text-slate-100" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Correo</Label>
                  <Input 
                    type="email"
                    defaultValue={editingOperario?.email || ''}
                    placeholder="correo@email.com" 
                    className="bg-[#1e293b] border-[#334155] text-slate-100" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Rol</Label>
                <select 
                  defaultValue={editingOperario?.role || 'Lavador'}
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100"
                >
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  defaultChecked={editingOperario?.status === 'active' || !editingOperario}
                  className="rounded border-[#334155] bg-[#1e293b] text-cyan-500 focus:ring-cyan-500/20" 
                />
                <Label className="text-slate-300">Operario activo</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Operario
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
