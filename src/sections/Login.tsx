import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Car, Droplets, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0a0f1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo section */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse-glow">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">WashPro</h1>
          <p className="text-slate-400">Sistema de gestión de lavado de vehículos</p>
        </div>

        {/* Login card */}
        <Card className="bg-[#0f172a]/90 border-[#1e293b] backdrop-blur-sm animate-fadeIn shadow-2xl shadow-black/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center text-slate-100">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1e293b] border-[#334155] text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#1e293b] border-[#334155] text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-[#334155] bg-[#1e293b] text-cyan-500 focus:ring-cyan-500/20" />
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Recordarme</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold py-2.5 btn-shine hover-glow"
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-[#1e293b]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center mx-auto mb-2 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                    <Car className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">Gestión de Vehículos</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center mx-auto mb-2 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">Servicios de Lavado</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center mx-auto mb-2 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">Calidad Premium</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          © 2026 WashPro. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
