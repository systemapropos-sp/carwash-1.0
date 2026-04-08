import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Store, 
  DollarSign, 
  Bell, 
  Shield, 
  Users,
  Car,
  Save,
  Check,
  Edit,
  Upload,
  Plus
} from 'lucide-react';

// Monedas disponibles
const currencies = [
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: '$', rate: 1 },
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸', symbol: '$', rate: 0.054 },
  { code: 'DOP', name: 'Peso Dominicano', flag: '🇩🇴', symbol: 'RD$', rate: 3.21 },
  { code: 'CHF', name: 'Franco Suizo', flag: '🇨🇭', symbol: 'Fr', rate: 0.048 },
];

export function ConfiguracionModule() {
  const [activeTab, setActiveTab] = useState('general');
  const [selectedCurrency, setSelectedCurrency] = useState('MXN');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'currency', label: 'Moneda', icon: DollarSign },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'users', label: 'Usuarios', icon: Users },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <Card className="lg:w-64 bg-[#0f172a] border-[#1e293b] h-fit">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-slate-400 hover:bg-[#1e293b] hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === 'general' && (
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Store className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-100">Configuración General</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Logo upload */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                      <Car className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100 mb-1">Logo del Negocio</p>
                      <p className="text-xs text-slate-500 mb-2">Recomendado: 200x200px, PNG o JPG</p>
                      <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b] text-sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Cambiar Logo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Nombre del Negocio</Label>
                      <Input defaultValue="CarWash Pro" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Teléfono</Label>
                      <Input defaultValue="555-123-4567" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-slate-300">Dirección</Label>
                      <Input defaultValue="Av. Principal #123, Ciudad de México" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Correo Electrónico</Label>
                      <Input type="email" defaultValue="contacto@carwashpro.com" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Horario de Atención</Label>
                      <Input defaultValue="Lun - Dom: 8:00 AM - 8:00 PM" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Descuento Cliente Frecuente (%)</Label>
                    <Input type="number" defaultValue="10" className="bg-[#1e293b] border-[#334155] text-slate-100 w-32" />
                    <p className="text-xs text-slate-500">Descuento automático para clientes con más de 10 visitas</p>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Currency Settings */}
          {activeTab === 'currency' && (
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-100">Configuración de Moneda</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-slate-300">Moneda Principal</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => setSelectedCurrency(currency.code)}
                          className={`p-4 rounded-lg border transition-all text-left ${
                            selectedCurrency === currency.code
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-[#334155] bg-[#1e293b]/50 hover:border-cyan-500/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{currency.flag}</span>
                            <div>
                              <p className="font-medium text-slate-100">{currency.name}</p>
                              <p className="text-sm text-slate-400">{currency.code} ({currency.symbol})</p>
                            </div>
                            {selectedCurrency === currency.code && (
                              <Check className="w-5 h-5 text-cyan-400 ml-auto" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1e293b]/50 border border-[#334155]">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Tasas de Cambio (Referencia)</h4>
                    <div className="space-y-2">
                      {currencies.filter(c => c.code !== selectedCurrency).map((currency) => {
                        const baseCurrency = currencies.find(c => c.code === selectedCurrency);
                        return (
                          <div key={currency.code} className="flex items-center justify-between py-2 border-b border-[#334155] last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{currency.flag}</span>
                              <span className="text-sm text-slate-300">1 {baseCurrency?.code} =</span>
                            </div>
                            <span className="text-sm font-medium text-cyan-400">
                              {(currency.rate / (baseCurrency?.rate || 1)).toFixed(4)} {currency.code}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-100">Notificaciones</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Nueva orden recibida', desc: 'Recibir notificación cuando se cree una nueva orden', default: true },
                    { label: 'Orden completada', desc: 'Notificar cuando una orden finalice', default: true },
                    { label: 'Stock bajo', desc: 'Alerta cuando un producto tenga stock crítico', default: true },
                    { label: 'Nueva cita agendada', desc: 'Notificación de nuevas citas', default: true },
                    { label: 'Corte de caja', desc: 'Recordatorio para realizar corte de caja', default: true },
                    { label: 'Reporte diario', desc: 'Resumen diario de ventas por correo', default: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
                      <div>
                        <p className="text-sm font-medium text-slate-100">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-100">Seguridad</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-300">Cambiar Contraseña</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-sm">Contraseña Actual</Label>
                        <Input type="password" placeholder="••••••••" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-sm">Nueva Contraseña</Label>
                        <Input type="password" placeholder="••••••••" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-sm">Confirmar Nueva Contraseña</Label>
                        <Input type="password" placeholder="••••••••" className="bg-[#1e293b] border-[#334155] text-slate-100" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1e293b]/50 border border-[#334155]">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Autenticación de Dos Factores</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Protege tu cuenta con 2FA</p>
                        <p className="text-xs text-slate-500">Requiere código adicional al iniciar sesión</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Settings */}
          {activeTab === 'users' && (
            <Card className="bg-[#0f172a] border-[#1e293b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-100">Gestión de Usuarios</h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Administrador', email: 'admin@carwashpro.com', role: 'Admin', status: 'active' },
                    { name: 'Juan Pérez', email: 'juan@carwashpro.com', role: 'Operador', status: 'active' },
                    { name: 'María García', email: 'maria@carwashpro.com', role: 'Operador', status: 'inactive' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-100">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'Admin' 
                            ? 'bg-violet-500/10 text-violet-400' 
                            : 'bg-cyan-500/10 text-cyan-400'
                        }`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-slate-500/10 text-slate-400'
                        }`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                        <button className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#1e293b]">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white btn-shine">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Usuario
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
