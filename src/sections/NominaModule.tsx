import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Users,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  X,
  User
} from 'lucide-react';

// Datos de empleados
const empleadosData = [
  { id: 1, name: 'Juan López', phone: '555-1001', email: 'juan@email.com', position: 'Lavador', salary: 8000, commission: 15, status: 'active' },
  { id: 2, name: 'Pedro Martínez', phone: '555-1002', email: 'pedro@email.com', position: 'Lavador', salary: 8000, commission: 15, status: 'active' },
  { id: 3, name: 'Carlos Ruiz', phone: '555-1003', email: 'carlos@email.com', position: 'Detallista', salary: 9000, commission: 10, status: 'active' },
  { id: 4, name: 'Ana García', phone: '555-1004', email: 'ana@email.com', position: 'Recepcionista', salary: 10000, commission: 0, status: 'active' },
];

// Datos de nómina
const nominaData = [
  { id: 'N-001', employee: 'Juan López', period: '01-15 Abr 2026', baseSalary: 4000, commission: 1200, bonus: 0, deductions: 200, total: 5000, status: 'paid' },
  { id: 'N-002', employee: 'Pedro Martínez', period: '01-15 Abr 2026', baseSalary: 4000, commission: 950, bonus: 0, deductions: 200, total: 4750, status: 'paid' },
  { id: 'N-003', employee: 'Carlos Ruiz', period: '01-15 Abr 2026', baseSalary: 4500, commission: 800, bonus: 0, deductions: 225, total: 5075, status: 'pending' },
  { id: 'N-004', employee: 'Ana García', period: '01-15 Abr 2026', baseSalary: 5000, commission: 0, bonus: 500, deductions: 250, total: 5250, status: 'pending' },
];

const positions = ['Lavador', 'Detallista', 'Supervisor', 'Recepcionista', 'Gerente'];

export function NominaModule() {
  const [activeTab, setActiveTab] = useState('empleados');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState<any>(null);

  const filteredEmpleados = empleadosData.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1e293b]">
        {[
          { id: 'empleados', label: 'Empleados', icon: Users },
          { id: 'nomina', label: 'Nómina', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Empleados */}
      {activeTab === 'empleados' && (
        <>
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar empleado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100 w-64"
              />
            </div>
            <Button 
              onClick={() => { setEditingEmpleado(null); setShowEmpleadoModal(true); }}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Empleado
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmpleados.map((empleado) => (
              <Card key={empleado.id} className="bg-[#0f172a] border-[#1e293b] card-hover">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100">{empleado.name}</h3>
                        <p className="text-sm text-slate-400">{empleado.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => { setEditingEmpleado(empleado); setShowEmpleadoModal(true); }}
                        className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Salario Base:</span>
                      <span className="text-slate-100">${empleado.salary}/mes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Comisión:</span>
                      <span className="text-cyan-400">{empleado.commission}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Teléfono:</span>
                      <span className="text-slate-100">{empleado.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[#1e293b]">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      empleado.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {empleado.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Tab Nómina */}
      {activeTab === 'nomina' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <select className="bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 text-sm">
                <option>Abril 2026</option>
                <option>Marzo 2026</option>
                <option>Febrero 2026</option>
              </select>
              <select className="bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 text-sm">
                <option>Quincena 1 (1-15)</option>
                <option>Quincena 2 (16-30)</option>
              </select>
            </div>
            <Button 
              onClick={() => setShowPagoModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Procesar Nómina
            </Button>
          </div>

          <Card className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e293b]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Empleado</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Período</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Salario Base</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Comisión</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Bono</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Deducciones</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Total</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nominaData.map((n) => (
                      <tr key={n.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-slate-100">{n.employee}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{n.period}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">${n.baseSalary}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-cyan-400">${n.commission}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-emerald-400">${n.bonus}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-red-400">-${n.deductions}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-slate-100">${n.total}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            n.status === 'paid' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {n.status === 'paid' ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Modal Empleado */}
      {showEmpleadoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">
                {editingEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}
              </h3>
              <button onClick={() => setShowEmpleadoModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre Completo</Label>
                <Input defaultValue={editingEmpleado?.name || ''} placeholder="Juan López" className="bg-[#1e293b] border-[#334155] text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Teléfono</Label>
                  <Input defaultValue={editingEmpleado?.phone || ''} placeholder="555-0101" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Correo</Label>
                  <Input type="email" defaultValue={editingEmpleado?.email || ''} placeholder="correo@email.com" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Puesto</Label>
                  <select defaultValue={editingEmpleado?.position || 'Lavador'} className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    {positions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Salario Mensual</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input type="number" defaultValue={editingEmpleado?.salary || ''} placeholder="8000" className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Porcentaje de Comisión (%)</Label>
                <Input type="number" defaultValue={editingEmpleado?.commission || ''} placeholder="15" className="bg-[#1e293b] border-[#334155] text-slate-100" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowEmpleadoModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pago */}
      {showPagoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">Procesar Nómina</h3>
              <button onClick={() => setShowPagoModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-lg bg-cyan-500/10">
                <p className="text-sm text-cyan-400">Total a Pagar</p>
                <p className="text-2xl font-bold text-cyan-400">$20,075</p>
                <p className="text-xs text-slate-500">4 empleados</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Fecha de Pago</Label>
                <Input type="date" className="bg-[#1e293b] border-[#334155] text-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Método de Pago</Label>
                <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                  <option>Transferencia Bancaria</option>
                  <option>Efectivo</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Notas</Label>
                <textarea rows={2} placeholder="Notas adicionales..." className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowPagoModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <DollarSign className="w-4 h-4 mr-2" />
                Confirmar Pago
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
