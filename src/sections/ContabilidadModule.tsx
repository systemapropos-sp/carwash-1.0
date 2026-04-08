import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Edit,
  Trash2,
  X,
  CheckCircle,
  Printer,
  Download
} from 'lucide-react';

// Datos de cortes
const cortesData = [
  { id: 'C-001', date: '2026-04-05', opening: 1000, income: 4250, expenses: 500, closing: 4750, operator: 'Admin' },
  { id: 'C-002', date: '2026-04-04', opening: 1000, income: 3800, expenses: 300, closing: 4500, operator: 'Admin' },
  { id: 'C-003', date: '2026-04-03', opening: 1000, income: 5200, expenses: 800, closing: 5400, operator: 'Admin' },
];

// Datos de ingresos
const ingresosData = [
  { id: 'I-001', concept: 'Lavado Premium - Juan Pérez', category: 'Servicios', amount: 350, date: '2026-04-05', payment: 'Efectivo' },
  { id: 'I-002', concept: 'Lavado Básico - María García', category: 'Servicios', amount: 150, date: '2026-04-05', payment: 'Tarjeta' },
  { id: 'I-003', concept: 'Aromatizante Venta', category: 'Mostrador', amount: 85, date: '2026-04-05', payment: 'Efectivo' },
  { id: 'I-004', concept: 'Lavado Completo - Carlos López', category: 'Servicios', amount: 450, date: '2026-04-05', payment: 'Tarjeta' },
];

// Datos de gastos
const gastosData = [
  { id: 'G-001', concept: 'Compra de Insumos', category: 'Insumos', amount: 500, date: '2026-04-05', payment: 'Efectivo' },
  { id: 'G-002', concept: 'Pago de Agua', category: 'Servicios', amount: 800, date: '2026-04-04', payment: 'Transferencia' },
  { id: 'G-003', concept: 'Compra de Toallas', category: 'Herramientas', amount: 350, date: '2026-04-03', payment: 'Tarjeta' },
];

// Datos de nómina pagada
const nominaPagadaData = [
  { id: 'N-001', employee: 'Juan López', period: '01-15 Abr 2026', amount: 5000, date: '2026-04-15', status: 'paid' },
  { id: 'N-002', employee: 'Pedro Martínez', period: '01-15 Abr 2026', amount: 4750, date: '2026-04-15', status: 'paid' },
];

export function ContabilidadModule() {
  const [activeTab, setActiveTab] = useState('cortes');
  const [showGastoModal, setShowGastoModal] = useState(false);

  const totalIngresos = ingresosData.reduce((sum, i) => sum + i.amount, 0);
  const totalGastos = gastosData.reduce((sum, g) => sum + g.amount, 0);
  const totalNomina = nominaPagadaData.reduce((sum, n) => sum + n.amount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1e293b]">
        {[
          { id: 'cortes', label: 'Corte de Caja', icon: DollarSign },
          { id: 'ingresos', label: 'Ingresos', icon: TrendingUp },
          { id: 'gastos', label: 'Gastos', icon: TrendingDown },
          { id: 'nomina', label: 'Nómina', icon: Briefcase },
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Ingresos del Mes</p>
            <p className="text-xl font-bold text-emerald-400">${totalIngresos}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Gastos del Mes</p>
            <p className="text-xl font-bold text-red-400">${totalGastos}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Nómina del Mes</p>
            <p className="text-xl font-bold text-amber-400">${totalNomina}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Utilidad Neta</p>
            <p className="text-xl font-bold text-cyan-400">${totalIngresos - totalGastos - totalNomina}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Cortes */}
      {activeTab === 'cortes' && (
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Historial de Cortes</h3>
              <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Apertura</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Ingresos</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Egresos</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Cierre</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Operario</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cortesData.map((corte) => (
                    <tr key={corte.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-100">{corte.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">${corte.opening}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-emerald-400">${corte.income}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-red-400">${corte.expenses}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-cyan-400">${corte.closing}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{corte.operator}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1.5 rounded-lg hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400">
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Ingresos */}
      {activeTab === 'ingresos' && (
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Registro de Ingresos</h3>
              <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Concepto</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Categoría</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Monto</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {ingresosData.map((ingreso) => (
                    <tr key={ingreso.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{ingreso.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-100">{ingreso.concept}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{ingreso.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-emerald-400">+${ingreso.amount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{ingreso.payment}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Gastos */}
      {activeTab === 'gastos' && (
        <>
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowGastoModal(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Gasto
            </Button>
          </div>
          <Card className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e293b]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Concepto</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Categoría</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Monto</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Pago</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gastosData.map((gasto) => (
                      <tr key={gasto.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{gasto.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-100">{gasto.concept}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{gasto.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-red-400">-${gasto.amount}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{gasto.payment}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
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
        </>
      )}

      {/* Tab Nómina */}
      {activeTab === 'nomina' && (
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Pagos de Nómina</h3>
              <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Empleado</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Período</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Monto</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha de Pago</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {nominaPagadaData.map((nomina) => (
                    <tr key={nomina.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-slate-100">{nomina.employee}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{nomina.period}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-slate-100">${nomina.amount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{nomina.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400">
                          Pagado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal Gasto */}
      {showGastoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">Registrar Gasto</h3>
              <button onClick={() => setShowGastoModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Concepto</Label>
                <Input placeholder="Ej: Compra de insumos" className="bg-[#1e293b] border-[#334155] text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Monto</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input type="number" placeholder="0" className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Fecha</Label>
                  <Input type="date" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Categoría</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    <option>Insumos</option>
                    <option>Servicios</option>
                    <option>Herramientas</option>
                    <option>Otros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Método de Pago</Label>
                  <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                    <option>Efectivo</option>
                    <option>Tarjeta</option>
                    <option>Transferencia</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Notas</Label>
                <textarea rows={2} placeholder="Notas adicionales..." className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowGastoModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Registrar Gasto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
