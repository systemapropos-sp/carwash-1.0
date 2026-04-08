import { useState } from 'react';
import { Plus, Calendar, CalendarDays, RotateCcw, X } from 'lucide-react';

interface FloatingButtonProps {
  onAction?: (action: string) => void;
}

export function FloatingButton({ onAction }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { 
      id: 'new-turno', 
      icon: Calendar, 
      label: 'Nuevo Turno', 
      color: 'from-cyan-500 to-cyan-600',
      onClick: () => onAction?.('new-turno')
    },
    { 
      id: 'new-cita', 
      icon: CalendarDays, 
      label: 'Nueva Cita', 
      color: 'from-amber-500 to-amber-600',
      onClick: () => onAction?.('new-cita')
    },
    { 
      id: 'refresh', 
      icon: RotateCcw, 
      label: 'Actualizar', 
      color: 'from-violet-500 to-violet-600',
      onClick: () => window.location.reload()
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick actions menu */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 group transition-all duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-sm text-slate-300 bg-[#1e293b] px-3 py-1.5 rounded-lg border border-[#334155] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {action.label}
              </span>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover-glow`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-110 hover-glow ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
