import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check,
  AlertTriangle,
  Calendar,
  Star,
  Zap,
  Crown
} from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 299,
    period: 'mes',
    description: 'Ideal para pequeños negocios',
    icon: Zap,
    features: [
      'Hasta 100 turnos/mes',
      'Gestión de servicios',
      'Reportes básicos',
      '1 usuario',
      'Soporte por email',
    ],
    color: 'from-slate-500 to-slate-600',
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 599,
    period: 'mes',
    description: 'Para negocios en crecimiento',
    icon: Star,
    features: [
      'Turnos ilimitados',
      'Gestión de citas',
      'Control de inventario',
      'Módulo de nómina',
      '5 usuarios',
      'Soporte prioritario',
      'Reportes avanzados',
    ],
    color: 'from-cyan-500 to-cyan-600',
    current: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999,
    period: 'mes',
    description: 'Para cadenas de car wash',
    icon: Crown,
    features: [
      'Todo lo del plan Pro',
      'Múltiples sucursales',
      'API access',
      'Usuarios ilimitados',
      'Soporte 24/7',
      'Personalización completa',
    ],
    color: 'from-amber-500 to-amber-600',
    current: false,
  },
];

export function SuscripcionModule() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Current subscription alert */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <div className="flex-1">
          <p className="text-sm text-amber-400">Tu suscripción vence en 7 día(s)</p>
          <p className="text-xs text-amber-300/70">Renueva ahora para evitar la interrupción del servicio</p>
        </div>
        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          Renovar Ahora
        </Button>
      </div>

      {/* Current plan info */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Plan Actual</p>
                <h3 className="text-2xl font-bold text-slate-100">WashPro Pro</h3>
                <p className="text-sm text-cyan-400">$599/mes</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate-400">Próximo pago</p>
                <p className="text-sm text-slate-100">12 de Abril, 2026</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate-400">Método de pago</p>
                <p className="text-sm text-slate-100">•••• 4242</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-slate-100">Historial de Pagos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Descripción</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Monto</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '05 Mar 2026', desc: 'WashPro Pro - Mensual', amount: 599, status: 'paid' },
                  { date: '05 Feb 2026', desc: 'WashPro Pro - Mensual', amount: 599, status: 'paid' },
                  { date: '05 Ene 2026', desc: 'WashPro Pro - Mensual', amount: 599, status: 'paid' },
                ].map((payment, index) => (
                  <tr key={index} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-400">{payment.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-100">{payment.desc}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-slate-100">${payment.amount}</span>
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

      {/* Plans */}
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Planes Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`bg-[#0f172a] border-[#1e293b] card-hover ${plan.current ? 'ring-2 ring-cyan-500' : ''}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-100">{plan.name}</h4>
                      <p className="text-xs text-slate-400">{plan.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-100">${plan.price}</span>
                    <span className="text-slate-400">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {plan.current ? (
                    <Button disabled className="w-full bg-cyan-500/20 text-cyan-400 cursor-default">
                      <Check className="w-4 h-4 mr-2" />
                      Plan Actual
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full bg-gradient-to-r ${plan.color} text-white`}
                    >
                      Seleccionar Plan
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Cancel subscription */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-100">Cancelar Suscripción</h4>
              <p className="text-xs text-slate-500">Tu suscripción se mantendrá activa hasta el final del período</p>
            </div>
            <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
              Cancelar Suscripción
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
