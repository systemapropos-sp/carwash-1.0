import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Link, 
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Share2,
  CalendarDays,
  Clock,
  Car
} from 'lucide-react';

export function LigaAgendaModule() {
  const [copied, setCopied] = useState(false);
  const [linkData, setLinkData] = useState({
    url: 'https://washpro.app/agenda/carwash-pro',
    enabled: true,
    requirePhone: true,
    allowSameDay: true,
    minAdvanceTime: 30,
    maxAdvanceDays: 14,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(linkData.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Link Card */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Link className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100">Tu Link de Agenda</h3>
              <p className="text-sm text-slate-400">Comparte este link con tus clientes para que agenden citas</p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Input 
                value={linkData.url}
                readOnly
                className="bg-[#1e293b] border-[#334155] text-slate-100 pr-24"
              />
              <Button 
                onClick={handleCopy}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
            <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
              <QrCode className="w-4 h-4 mr-2" />
              Generar QR
            </Button>
            <Button variant="outline" className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Configuración de Agenda</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
                <div>
                  <p className="text-sm font-medium text-slate-100">Agenda habilitada</p>
                  <p className="text-xs text-slate-500">Permitir nuevas citas</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={linkData.enabled}
                    onChange={(e) => setLinkData({...linkData, enabled: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
                <div>
                  <p className="text-sm font-medium text-slate-100">Requerir teléfono</p>
                  <p className="text-xs text-slate-500">Obligar a ingresar número de teléfono</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={linkData.requirePhone}
                    onChange={(e) => setLinkData({...linkData, requirePhone: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e293b]/50">
                <div>
                  <p className="text-sm font-medium text-slate-100">Permitir mismo día</p>
                  <p className="text-xs text-slate-500">Agendar citas para el día actual</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={linkData.allowSameDay}
                    onChange={(e) => setLinkData({...linkData, allowSameDay: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Restricciones de Tiempo</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Tiempo mínimo de anticipación (minutos)</Label>
                <Input 
                  type="number"
                  value={linkData.minAdvanceTime}
                  onChange={(e) => setLinkData({...linkData, minAdvanceTime: parseInt(e.target.value)})}
                  className="bg-[#1e293b] border-[#334155] text-slate-100"
                />
                <p className="text-xs text-slate-500">El cliente debe agendar con al menos {linkData.minAdvanceTime} minutos de anticipación</p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Días máximos de anticipación</Label>
                <Input 
                  type="number"
                  value={linkData.maxAdvanceDays}
                  onChange={(e) => setLinkData({...linkData, maxAdvanceDays: parseInt(e.target.value)})}
                  className="bg-[#1e293b] border-[#334155] text-slate-100"
                />
                <p className="text-xs text-slate-500">El cliente puede agendar hasta {linkData.maxAdvanceDays} días en el futuro</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="bg-[#0f172a] border-[#1e293b]">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Car className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Vista Previa</h3>
          </div>
          
          <div className="border border-[#1e293b] rounded-lg p-4 bg-[#0a0f1a]">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto mb-2">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-slate-100">CarWash Pro</h4>
                <p className="text-sm text-slate-400">Agenda tu cita de lavado</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#1e293b]">
                  <p className="text-xs text-slate-500 mb-1">Servicio</p>
                  <p className="text-sm text-slate-300">Selecciona un servicio...</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1e293b]">
                  <p className="text-xs text-slate-500 mb-1">Fecha y Hora</p>
                  <p className="text-sm text-slate-300">Selecciona fecha y hora...</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1e293b]">
                  <p className="text-xs text-slate-500 mb-1">Tus Datos</p>
                  <p className="text-sm text-slate-300">Nombre y teléfono...</p>
                </div>
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium">
                  Agendar Cita
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
