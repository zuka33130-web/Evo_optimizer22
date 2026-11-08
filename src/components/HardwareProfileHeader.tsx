import React, { useState } from 'react';
import { Cpu, HardDrive, Monitor, Sliders, Layers, CheckCircle2 } from 'lucide-react';
import { HardwareProfile } from '../data/optimizerData';

interface HardwareProfileHeaderProps {
  hardware: HardwareProfile;
  setHardware: React.Dispatch<React.SetStateAction<HardwareProfile>>;
}

export const HardwareProfileHeader: React.FC<HardwareProfileHeaderProps> = ({
  hardware,
  setHardware
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const affinityMask = Math.pow(2, hardware.pCores) - 1;
  const affinityHex = '0x' + affinityMask.toString(16).toUpperCase();

  const handlePcoresChange = (val: number) => {
    setHardware(prev => ({
      ...prev,
      pCores: val,
      threads: val + prev.eCores
    }));
  };

  const handleRamChange = (val: number) => {
    setHardware(prev => ({
      ...prev,
      ramGB: val
    }));
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>Hardware Objetivo Optimizado</span>
            <span aria-hidden="true">·</span>
            <span>ASUS ExpertCenter PN64</span>
            <span aria-hidden="true">·</span>
            <span>Alder Lake Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Perfil de Ajuste de Latencia & Frecuencia
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Alineado para eliminar el cuello de botella del Intel Thread Director y fijar el hilo maestro de Source 2 a los núcleos Golden Cove de 4.4 GHz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700/80 rounded-lg border border-neutral-700 transition-colors whitespace-nowrap"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEditing ? 'Guardar Perfil' : 'Personalizar Cores / RAM'}</span>
          </button>
        </div>
      </div>

      {/* Hardware Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Procesador</span>
          </div>
          <div className="text-sm font-semibold text-white truncate" title={hardware.cpuModel}>
            i3-1220P
          </div>
          <div className="text-[11px] text-neutral-500 font-mono tabular-nums">
            {hardware.pCores}P + {hardware.eCores}E ({hardware.threads}T)
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Frecuencia Boost</span>
          </div>
          <div className="text-sm font-semibold text-white font-mono tabular-nums">
            4.4 GHz
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Bloqueado 100%
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Memoria RAM</span>
          </div>
          <div className="text-sm font-semibold text-white font-mono tabular-nums">
            {hardware.ramGB} GB DDR4
          </div>
          <div className="text-[11px] text-neutral-500">
            Dual Channel 3200
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>Almacenamiento</span>
          </div>
          <div className="text-sm font-semibold text-white">
            NVMe PCIe 4.0
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            TRIM Habilitado
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Monitor className="w-3.5 h-3.5 text-emerald-400" />
            <span>Controlador GPU</span>
          </div>
          <div className="text-sm font-semibold text-white truncate" title={hardware.gpuModel}>
            Intel UHD iGPU
          </div>
          <div className="text-[11px] text-amber-400/90 font-mono">
            HAGS Desactivado
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Máscara Afinidad</span>
          </div>
          <div className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">
            {affinityHex}
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            Cores 0 a {hardware.pCores - 1}
          </div>
        </div>
      </div>

      {/* Editing drawer if toggled */}
      {isEditing && (
        <div className="mt-4 pt-4 border-t border-neutral-800/80 bg-neutral-950/40 p-4 rounded-lg">
          <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
            Ajuste Dinámico de Parámetros de Generación
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">
                Núcleos P-Core asignados a CS2:
              </label>
              <div className="flex gap-2">
                {[1, 2, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => handlePcoresChange(num)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border ${
                      hardware.pCores === num
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {num} P-Cores ({num === 2 ? 'i3-1220P' : `${num} Cores`})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1.5">
                Capacidad de Memoria RAM:
              </label>
              <div className="flex gap-2">
                {[8, 16, 32].map(num => (
                  <button
                    key={num}
                    onClick={() => handleRamChange(num)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border ${
                      hardware.ramGB === num
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {num} GB
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="text-xs text-neutral-400">
                Resultado de generación:
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-1">
                CS2 Steam: <span className="text-neutral-200">-threads {hardware.pCores}</span> · Pagefile: <span className="text-neutral-200">4096MB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
