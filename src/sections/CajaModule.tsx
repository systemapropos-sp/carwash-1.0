import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calendar,
  History,
  Lock,
  X,
  CheckCircle,
  Printer
} from 'lucide-react';

// Datos de transacciones del día
const transaccionesData = [
  { id: 'T-001', concept: 'Lavado Premium - Juan Pérez', type: 'income', amount: 350, time: '10:30', payment: 'Efectivo' },
  { id: 'T-002', concept: 'Lavado Básico - María García', type: 'income', amount: 150, time: '10:15', payment: 'Tarjeta' },
  { id: 'T-003', concept: 'Aromatizante Venta', type: 'income', amount: 85, time: '10:00', payment: 'Efectivo' },
  { id: 'T-004', concept: 'Compra de Insumos', type: 'expense', amount: 500, time: '09:30', payment: 'Efectivo' },
  { id: 'T-005', concept: 'Lavado Completo - Carlos López', type: 'income', amount: 450, time: '09:15', payment: 'Tarjeta' },
];

// Historial de cortes
const cortesData = [
  { id: 'C-001', date: '2026-04-04', opening: 1000, income: 8500, expenses: 1200, closing: 8300, operator: 'Admin' },
  { id: 'C-002', date: '2026-04-03', opening: 1000, income: 7200, expenses: 800, closing: 7400, operator: 'Admin' },
  { id: 'C-003', date: '2026-04-02', opening: 1000, income: 9100, expenses: 1500, closing: 8600, operator: 'Admin' },
];

export function CajaModule() {
  const [activeTab, setActiveTab] = useState('actual');
  const [showCorteModal, setShowCorteModal] = useState(false);

  const totalIngresos = transaccionesData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalEgresos = transaccionesData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIngresos - totalEgresos;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1e293b]">
        {[
          { id: 'actual', label: 'Día Actual', icon: Calendar },
          { id: 'historial', label: 'Historial de Cortes', icon: History },
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

      {/* Tab Día Actual */}
      {activeTab === 'actual' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Ingresos</p>
                    <p className="text-xl font-bold text-emerald-400">${totalIngresos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Egresos</p>
                    <p className="text-xl font-bold text-red-400">${totalEgresos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Balance</p>
                    <p className="text-xl font-bold text-cyan-400">${balance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Fondo de Caja</p>
                    <p className="text-xl font-bold text-amber-400">$1,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transacciones */}
          <Card className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-100">Transacciones del Día</h3>
                <Button 
                  onClick={() => setShowCorteModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Corte de Caja
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e293b]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Hora</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Concepto</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Tipo</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Monto</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaccionesData.map((trans) => (
                      <tr key={trans.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{trans.time}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-100">{trans.concept}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${trans.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {trans.type === 'income' ? 'Ingreso' : 'Egreso'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm font-semibold ${trans.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {trans.type === 'income' ? '+' : '-'}${trans.amount}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{trans.payment}</span>
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

      {/* Tab Historial */}
      {activeTab === 'historial' && (
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Historial de Cortes</h3>
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

      {/* Modal Corte de Caja */}
      {showCorteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">Corte de Caja</h3>
              <button onClick={() => setShowCorteModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-emerald-500/10">
                  <p className="text-xs text-emerald-400">Total Ingresos</p>
                  <p className="text-xl font-bold text-emerald-400">${totalIngresos}</p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10">
                  <p className="text-xs text-red-400">Total Egresos</p>
                  <p className="text-xl font-bold text-red-400">${totalEgresos}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-cyan-500/10">
                <p className="text-xs text-cyan-400">Balance del Día</p>
                <p className="text-2xl font-bold text-cyan-400">${balance}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Efectivo en Caja</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="number"
                    defaultValue={balance + 1000}
                    className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Diferencia</Label>
                <Input 
                  value="$0"
                  readOnly
                  className="bg-[#1e293b] border-[#334155] text-emerald-400" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Notas</Label>
                <textarea 
                  rows={2}
                  placeholder="Notas del corte..."
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowCorteModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Realizar Corte
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
