import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  ShoppingCart,
  Package,
  History,
  Edit,
  Trash2,
  Minus,
  DollarSign,
  X,
  CheckCircle,
  User
} from 'lucide-react';

// Datos de productos
const productosData = [
  { id: 1, name: 'Aromatizante Fresh', description: 'Aromatizante para auto, fragancia fresh', price: 85, stock: 45, category: 'Accesorios' },
  { id: 2, name: 'Toalla de Microfibra', description: 'Toalla premium para secado', price: 120, stock: 30, category: 'Herramientas' },
  { id: 3, name: 'Shampoo para Autos', description: 'Shampoo concentrado 1L', price: 150, stock: 25, category: 'Productos' },
  { id: 4, name: 'Cera Líquida', description: 'Cera para protección de pintura', price: 200, stock: 18, category: 'Productos' },
  { id: 5, name: 'Limpia Vidrios', description: 'Limpiador de vidrios 500ml', price: 95, stock: 40, category: 'Productos' },
  { id: 6, name: 'Esponja de Lavado', description: 'Esponja suave para lavado', price: 45, stock: 60, category: 'Herramientas' },
];

// Historial de ventas
const ventasData = [
  { id: 'V-001', client: 'Juan Pérez', items: 2, total: 170, date: '2026-04-05 10:30', payment: 'Efectivo' },
  { id: 'V-002', client: 'María García', items: 1, total: 85, date: '2026-04-05 10:15', payment: 'Tarjeta' },
  { id: 'V-003', client: 'Carlos López', items: 3, total: 365, date: '2026-04-05 09:45', payment: 'Efectivo' },
  { id: 'V-004', client: 'Ana Martínez', items: 1, total: 120, date: '2026-04-05 09:30', payment: 'Tarjeta' },
];

export function MostradorModule() {
  const [activeTab, setActiveTab] = useState('vender');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProductos = productosData.filter(producto => 
    producto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (producto: any) => {
    const existing = cart.find(item => item.id === producto.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === producto.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...producto, quantity: 1 }]);
    }
  };

  const removeFromCart = (productoId: number) => {
    setCart(cart.filter(item => item.id !== productoId));
  };

  const updateQuantity = (productoId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productoId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleEditProduct = (producto: any) => {
    setEditingProduct(producto);
    setShowProductModal(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1e293b]">
        {[
          { id: 'vender', label: 'Vender', icon: ShoppingCart },
          { id: 'productos', label: 'Productos', icon: Package },
          { id: 'historial', label: 'Historial', icon: History },
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

      {/* Tab Vender */}
      {activeTab === 'vender' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products list */}
          <div className="lg:col-span-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredProductos.map((producto) => (
                <button
                  key={producto.id}
                  onClick={() => addToCart(producto)}
                  className="p-4 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-cyan-500/50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-2">
                    <Package className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-100">{producto.name}</p>
                  <p className="text-xs text-slate-500">{producto.category}</p>
                  <p className="text-lg font-bold text-cyan-400 mt-2">${producto.price}</p>
                  <p className="text-xs text-slate-500">Stock: {producto.stock}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <Card className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-slate-100">Carrito</h3>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">El carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-[#1e293b]/50">
                        <div>
                          <p className="text-sm text-slate-100">{item.name}</p>
                          <p className="text-xs text-cyan-400">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-[#334155] text-slate-300 hover:bg-[#475569]"
                          >
                            <Minus className="w-3 h-3 mx-auto" />
                          </button>
                          <span className="text-sm text-slate-100 w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-[#334155] text-slate-300 hover:bg-[#475569]"
                          >
                            <Plus className="w-3 h-3 mx-auto" />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 ml-2"
                          >
                            <Trash2 className="w-3 h-3 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-[#1e293b] pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400">Total:</span>
                      <span className="text-2xl font-bold text-cyan-400">${cartTotal}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input placeholder="Nombre del cliente (opcional)" className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Cobrar
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Productos */}
      {activeTab === 'productos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100 w-64"
              />
            </div>
            <Button onClick={handleNewProduct} className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
          
          <Card className="bg-[#0f172a] border-[#1e293b]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e293b]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Producto</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Categoría</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Precio</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Stock</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductos.map((producto) => (
                      <tr key={producto.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-slate-100">{producto.name}</p>
                            <p className="text-xs text-slate-500">{producto.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-400">{producto.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-cyan-400">${producto.price}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${producto.stock < 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {producto.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleEditProduct(producto)}
                              className="p-1.5 rounded-lg hover:bg-amber-500/20 text-slate-400 hover:text-amber-400"
                            >
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
        </div>
      )}

      {/* Tab Historial */}
      {activeTab === 'historial' && (
        <Card className="bg-[#0f172a] border-[#1e293b]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Venta</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Cliente</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Productos</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Total</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Pago</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasData.map((venta) => (
                    <tr key={venta.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-cyan-400">{venta.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-100">{venta.client}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{venta.items} productos</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-cyan-400">${venta.total}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{venta.payment}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{venta.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal Nuevo/Editar Producto */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-slate-100">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre</Label>
                <Input 
                  defaultValue={editingProduct?.name || ''}
                  placeholder="Nombre del producto" 
                  className="bg-[#1e293b] border-[#334155] text-slate-100" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Descripción</Label>
                <textarea 
                  defaultValue={editingProduct?.description || ''}
                  rows={2}
                  placeholder="Descripción del producto..."
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
                      defaultValue={editingProduct?.price || ''}
                      placeholder="0" 
                      className="pl-10 bg-[#1e293b] border-[#334155] text-slate-100" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Stock</Label>
                  <Input 
                    type="number"
                    defaultValue={editingProduct?.stock || ''}
                    placeholder="0" 
                    className="bg-[#1e293b] border-[#334155] text-slate-100" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Categoría</Label>
                <select className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 text-slate-100">
                  <option>Accesorios</option>
                  <option>Herramientas</option>
                  <option>Productos</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-[#1e293b]">
              <Button variant="outline" onClick={() => setShowProductModal(false)} className="border-[#334155] text-slate-400 hover:bg-[#1e293b]">
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Producto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
