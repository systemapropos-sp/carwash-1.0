import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Sparkles,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  X,
  CheckCircle
} from 'lucide-react';

// Datos de servicios
const serviciosData = [
  { id: 1, name: 'Lavado Básico', description: 'Lavado exterior con shampoo y secado', price: 150, duration: '20 min', active: true, count: 245 },
  { id: 2, name: 'Lavado Premium', description: 'Lavado exterior, interior, aspirado y aromatizante', price: 350, duration: '45 min', active: true, count: 178 },
  { id: 3, name: 'Lavado Completo', description: 'Lavado premium + encerado y protección de pintura', price: 450, duration: '60 min', active: true, count: 142 },
  { id: 4, name: 'Lavado Express', description: 'Lavado rápido solo exterior', price: 100, duration: '10 min', active: true, count: 198 },
  { id: 5, name: 'Encerado', description: 'Aplicación de cera para protección', price: 200, duration: '30 min', active: false, count: 45 },
  { id: 6, name: 'Limpieza de Tapicería', description: 'Limpieza profunda de asientos y alfombras', price: 500, duration: '90 min', active: true, count: 67 },
];

export function ServiciosModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const filteredServicios = serviciosData.filter(servicio => 
    servicio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (servicio: any) => {
    setEditingService(servicio);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingService(null);
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
          Nuevo Servicio
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar servicio..."
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
            <p className="text-xs text-slate-400">Total Servicios</p>
            <p className="text-2xl font-bold text-slate-100">{serviciosData.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Activos</p>
            <p className="text-2xl font-bold text-emerald-400">{serviciosData.filter(s => s.active).length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Inactivos</p>
            <p className="text-2xl font-bold text-slate-500">{serviciosData.filter(s => !s.active).length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-4">
            <p className="text-xs text-slate-400">Total Realizados</p>
            <p className="text-2xl font-bold text-cyan-400">{serviciosData.reduce((acc, s) => acc + s.count, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServicios.map((servicio) => (
          <Card key={servicio.id} className={`bg-[#0f172a] border-[#1e293b] card-hover ${!servicio.active ? 'opacity-60' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEdit(servicio)}
                    className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-1">{servicio.name}</h3>
              <p className="text-sm text-slate-400 mb-3">{servicio.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <DollarSign className="w-4 h-4" />
                    ${servicio.price}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-4 h-4" />
                    {servicio.duration}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  servicio.active 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {servicio.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-[#1e293b]">
                <p className="text-xs text-slate-500">{servicio.count} veces solicitado</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Nuevo/Editar Servicio */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre del Servicio</Label>
                <Input 
                  defaultValue={editingService?.name || ''}
                  placeholder="Ej: Lavado Premium" 
                  className="bg-[#1e293b] border-[#334155] text-slate-100" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Descripción</Label>
                <textarea 
                  defaultValue={editingService?.description || ''}
                  rows={3}
                  placeholder="Describe el servicio..."
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Precio</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      type="number"
                      defaultValue={editingService?.price || ''}
                      placeholder="350" 
                      className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Duración</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      defaultValue={editingService?.duration || ''}
                      placeholder="45 min" 
                      className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" 
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  defaultChecked={editingService?.active ?? true}
                  className="rounded border-[#334155] bg-[#1e293b] text-cyan-500 focus:ring-cyan-500/20" 
                />
                <Label className="text-slate-300">Servicio activo</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Servicio
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
