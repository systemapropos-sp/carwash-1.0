import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { FloatingButton } from './FloatingButton';
import { HomeDashboard } from './HomeDashboard';
import { TurnosModule } from './TurnosModule';
import { CitasModule } from './CitasModule';
import { ServiciosModule } from './ServiciosModule';
import { MostradorModule } from './MostradorModule';
import { CajaModule } from './CajaModule';
import { OperariosModule } from './OperariosModule';
import { LigaAgendaModule } from './LigaAgendaModule';
import { NominaModule } from './NominaModule';
import { ContabilidadModule } from './ContabilidadModule';
import { NovedadesModule } from './NovedadesModule';
import { ConfiguracionModule } from './ConfiguracionModule';
import { SuscripcionModule } from './SuscripcionModule';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#0a0f1a]">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
      />

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="h-16 bg-[#0f172a]/80 backdrop-blur-sm border-b border-[#1e293b] flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'turnos' && 'Turnos'}
              {activeSection === 'citas' && 'Citas'}
              {activeSection === 'servicios' && 'Servicios'}
              {activeSection === 'mostrador' && 'Mostrador'}
              {activeSection === 'caja' && 'Caja del Día'}
              {activeSection === 'operarios' && 'Operarios'}
              {activeSection === 'liga-agenda' && 'Liga Agenda'}
              {activeSection === 'nomina' && 'Nómina'}
              {activeSection === 'contabilidad' && 'Contabilidad'}
              {activeSection === 'novedades' && 'Novedades'}
              {activeSection === 'configuracion' && 'Configuración'}
              {activeSection === 'suscripcion' && 'Mi Suscripción'}
            </h1>
            <p className="text-xs text-slate-400">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-100">Administrador</p>
              <p className="text-xs text-slate-400">admin@washpro.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <span className="text-white font-semibold">AD</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'dashboard' && <HomeDashboard />}
          {activeSection === 'turnos' && <TurnosModule />}
          {activeSection === 'citas' && <CitasModule />}
          {activeSection === 'servicios' && <ServiciosModule />}
          {activeSection === 'mostrador' && <MostradorModule />}
          {activeSection === 'caja' && <CajaModule />}
          {activeSection === 'operarios' && <OperariosModule />}
          {activeSection === 'liga-agenda' && <LigaAgendaModule />}
          {activeSection === 'nomina' && <NominaModule />}
          {activeSection === 'contabilidad' && <ContabilidadModule />}
          {activeSection === 'novedades' && <NovedadesModule />}
          {activeSection === 'configuracion' && <ConfiguracionModule />}
          {activeSection === 'suscripcion' && <SuscripcionModule />}
        </div>
      </main>

      {/* Floating button */}
      <FloatingButton onAction={(action) => {
        if (action === 'new-turno') setActiveSection('turnos');
        if (action === 'new-cita') setActiveSection('citas');
      }} />
    </div>
  );
}
