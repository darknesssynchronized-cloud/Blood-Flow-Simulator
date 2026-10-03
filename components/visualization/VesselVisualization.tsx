'use client';

import React, { useRef, useEffect } from 'react';

interface VesselVisualizationProps {
  radiusMm: number;
  velocity: number; // m/s
  flowRateMls: number; // mL/s
  reynoldsNumber: number;
}

export function VesselVisualization({
  radiusMm,
  velocity,
  flowRateMls,
  reynoldsNumber,
}: VesselVisualizationProps) {
  // แก้ไขจุดนี้: เปลี่ยนจาก <HTMLCanvasElement null |> เป็น <HTMLCanvasElement | null>
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const rbcRadius = 4.5;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerY = canvasHeight / 2;

    const minVesselH = 16;
    const maxVesselH = 170;
    const vesselHeight = Math.max(
      minVesselH,
      Math.min(maxVesselH, ((radiusMm - 0.1) / (15 - 0.1)) * (maxVesselH - minVesselH) + minVesselH)
    );

    const halfVesselH = vesselHeight / 2;

    const particleDensityFactor = 0.035;
    const particleCount = Math.max(
      8,
      Math.floor(vesselHeight * (canvasWidth / 20) * particleDensityFactor)
    );

    const basePxSpeed = Math.min(Math.max(velocity * 12, 0.4), 14);

    interface RBC {
      x: number;
      yRel: number;
      rotation: number;
      rotSpeed: number;
    }

    const particles: RBC[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvasWidth,
        yRel: (Math.random() * 2 - 1) * 0.82,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const vesselGradient = ctx.createLinearGradient(0, centerY - halfVesselH, 0, centerY + halfVesselH);
      vesselGradient.addColorStop(0, '#2d0a0e');
      vesselGradient.addColorStop(0.15, '#450a0a');
      vesselGradient.addColorStop(0.5, '#7f1d1d');
      vesselGradient.addColorStop(0.85, '#450a0a');
      vesselGradient.addColorStop(1, '#2d0a0e');

      ctx.fillStyle = vesselGradient;
      ctx.fillRect(0, centerY - halfVesselH, canvasWidth, vesselHeight);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f43f5e';
      ctx.shadowColor = '#e11d48';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(0, centerY - halfVesselH);
      ctx.lineTo(canvasWidth, centerY - halfVesselH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, centerY + halfVesselH);
      ctx.lineTo(canvasWidth, centerY + halfVesselH);
      ctx.stroke();

      ctx.shadowBlur = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const parabolicFactor = Math.max(0.15, 1 - Math.pow(p.yRel, 2));
        const speed = basePxSpeed * parabolicFactor;

        p.x += speed;
        p.rotation += p.rotSpeed * (speed / 2);

        if (p.x > canvasWidth + rbcRadius * 2) {
          p.x = -rbcRadius * 2;
          p.yRel = (Math.random() * 2 - 1) * 0.82;
        }

        const particleY = centerY + p.yRel * (halfVesselH - rbcRadius - 1);

        ctx.save();
        ctx.translate(p.x, particleY);
        ctx.rotate(p.rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, rbcRadius * 1.3, rbcRadius * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, rbcRadius * 0.5, rbcRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#9f1239';
        ctx.fill();

        ctx.restore();
      }

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvasWidth, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [radiusMm, velocity, flowRateMls, reynoldsNumber]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <h2 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-bold">
            Dynamic Blood Vessel Cross-Section
          </h2>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-slate-400">
            Radius (<span className="text-cyan-400 font-bold">{radiusMm.toFixed(2)} mm</span>)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Constant RBC Size (<span className="text-rose-400 font-bold">~7.5 µm</span>)
          </span>
        </div>
      </div>

      <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={720}
          height={220}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 flex items-center space-x-2">
          <span className="text-cyan-400">Velocity Profile:</span>
          <span>Parabolic Laminar</span>
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-slate-300 flex items-center space-x-4">
          <div>
            <span className="text-slate-500">Flow:</span>{' '}
            <span className="text-cyan-400 font-bold">{flowRateMls.toFixed(2)} mL/s</span>
          </div>
          <div>
            <span className="text-slate-500">v:</span>{' '}
            <span className="text-cyan-400 font-bold">{velocity.toFixed(3)} m/s</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 font-mono text-center">
        * RBC size remains physically constant while vessel diameter scales with parameter changes.
      </p>
    </div>
  );
}
