'use client';

import React, { useRef, useEffect } from 'react';

interface VesselVisualizationProps {
  radiusMm: number;
  velocity: number;
  flowRateMls: number;
  regime: 'LAMINAR' | 'TRANSITIONAL' | 'TURBULENT';
}

interface Particle {
  x: number;
  yNorm: number; // Normalized -1 to 1 from vessel centerline
  speedFactor: number;
  size: number;
  wobblePhase: number;
}

export function VesselVisualization({
  radiusMm,
  velocity,
  flowRateMls,
  regime,
}: VesselVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Fixed physical RBC dimensions in pixels (DOES NOT scale with vessel radius)
    const RBC_RADIUS_X = 6.0;
    const RBC_RADIUS_Y = 4.0;

    // Physical mapping for Vessel Height in Canvas
    // Radius 0.1mm -> 16px height, Radius 15.0mm -> 220px height
    const minCanvasH = 16;
    const maxCanvasH = 220;
    const currentVesselHeight = minCanvasH + ((radiusMm - 0.1) / 14.9) * (maxCanvasH - minCanvasH);

    // Dynamic density particle count: wide vessel = more particles, narrow vessel = fewer particles
    const particleDensity = Math.max(12, Math.floor(currentVesselHeight * 0.9));

    // Particle pool setup
    const particles: Particle[] = Array.from({ length: particleDensity }, () => {
      const yNorm = (Math.random() * 2 - 1) * 0.85;
      // Parabolic laminar velocity profile: v(y) = 1 - yNorm^2
      const parabolicSpeed = Math.max(0.2, 1 - yNorm * yNorm);
      return {
        x: Math.random() * 800,
        yNorm,
        speedFactor: parabolicSpeed,
        size: RBC_RADIUS_X,
        wobblePhase: Math.random() * Math.PI * 2,
      };
    });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const topWallY = centerY - currentVesselHeight / 2;
      const bottomWallY = centerY + currentVesselHeight / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Vessel Outer Background
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Endothelial Tissue Walls
      ctx.fillStyle = '#1e0912';
      ctx.fillRect(0, 0, width, topWallY);
      ctx.fillRect(0, bottomWallY, width, height - bottomWallY);

      // Endothelial Boundary Lines
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(0, topWallY);
      ctx.lineTo(width, topWallY);
      ctx.moveTo(0, bottomWallY);
      ctx.lineTo(width, bottomWallY);
      ctx.stroke();

      // Endothelial Glow Line
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, topWallY - 3);
      ctx.lineTo(width, topWallY - 3);
      ctx.moveTo(0, bottomWallY + 3);
      ctx.lineTo(width, bottomWallY + 3);
      ctx.stroke();

      // 3. Flow Channel Interior Gradient
      const lumenGrad = ctx.createLinearGradient(0, topWallY, 0, bottomWallY);
      lumenGrad.addColorStop(0, 'rgba(159, 18, 57, 0.25)');
      lumenGrad.addColorStop(0.5, 'rgba(88, 28, 135, 0.15)');
      lumenGrad.addColorStop(1, 'rgba(159, 18, 57, 0.25)');
      ctx.fillStyle = lumenGrad;
      ctx.fillRect(0, topWallY, width, currentVesselHeight);

      // 4. Parabolic Velocity Grid Lines (Subtle visual aid)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      [-0.5, 0, 0.5].forEach((offsetNorm) => {
        const lineY = centerY + offsetNorm * (currentVesselHeight / 2);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 5. Normalized Speed Calculation
      // Clamped visual pixel speed mapping to avoid screen tearing or static freezing
      const basePixelSpeed = Math.min(Math.max(velocity * 120, 30), 600);

      // 6. Animate & Draw Red Blood Cells (Erythrocytes)
      particles.forEach((p) => {
        p.wobblePhase += dt * 3;
        
        let verticalPerturbation = 0;
        if (regime === 'TRANSITIONAL') {
          verticalPerturbation = Math.sin(p.wobblePhase) * 2;
        } else if (regime === 'TURBULENT') {
          verticalPerturbation = (Math.random() - 0.5) * 6;
        }

        // Move particle left to right based on calculated physical flow
        p.x += basePixelSpeed * p.speedFactor * dt;

        // Seamless loop back to entrance
        if (p.x > width + 20) {
          p.x = -20;
          p.yNorm = (Math.random() * 2 - 1) * 0.85;
          p.speedFactor = Math.max(0.2, 1 - p.yNorm * p.yNorm);
        }

        const particleY = centerY + p.yNorm * (currentVesselHeight / 2 - 8) + verticalPerturbation;

        // Render Erythrocyte Biconcave Disk Representation
        ctx.save();
        ctx.translate(p.x, particleY);

        // Subtle rotation during movement
        const angle = regime === 'TURBULENT' ? Math.sin(p.wobblePhase) * 0.4 : Math.sin(p.wobblePhase) * 0.1;
        ctx.rotate(angle);

        // RBC Outer Shell
        ctx.beginPath();
        ctx.ellipse(0, 0, RBC_RADIUS_X, RBC_RADIUS_Y, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.fill();
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 1;
        ctx.stroke();

        // RBC Inner Biconcave Indentation
        ctx.beginPath();
        ctx.ellipse(0, 0, RBC_RADIUS_X * 0.4, RBC_RADIUS_Y * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#881337';
        ctx.fill();

        ctx.restore();
      });

      // 7. Render Directional Flow Vectors
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      const arrowSpacing = 160;
      for (let x = arrowSpacing / 2; x < width; x += arrowSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 4);
        ctx.lineTo(x + 10, centerY);
        ctx.lineTo(x, centerY + 4);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [radiusMm, velocity, regime]);

  return (
    <div id="visualization" className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
            Real-Time Hemodynamic Cross-Section Visualizer
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-slate-400">
            Vessel Opening: <span className="text-cyan-400 font-bold">{(radiusMm * 2).toFixed(2)} mm</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            RBC Physical Diameter: <span className="text-rose-400 font-bold">~7.5 µm (Fixed Scale)</span>
          </span>
        </div>
      </div>

      <div className="relative w-full h-64 bg-[#050811] rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={256}
          className="w-full h-full object-cover"
        />

        {/* Live Overlay Indicators */}
        <div className="absolute top-3 left-3 bg-[#070a12]/85 border border-slate-800 px-3 py-1.5 rounded text-[11px] font-mono space-y-0.5 backdrop-blur-sm">
          <div className="text-slate-400 flex items-center gap-2">
            <span>FLUID VELOCITY:</span>
            <span className="text-cyan-300 font-bold">{velocity.toFixed(3)} m/s</span>
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <span>FLOW RATE (Q):</span>
            <span className="text-rose-400 font-bold">{flowRateMls.toFixed(2)} mL/s</span>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 bg-[#070a12]/85 border border-slate-800 px-3 py-1 rounded text-[10px] font-mono text-slate-400 backdrop-blur-sm">
          Flow Profile: <span className="text-emerald-400 font-semibold">Parabolic Laminar Field</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-400 font-mono bg-slate-950/60 p-2.5 rounded border border-slate-800/50">
        <div>
          <span className="text-rose-400 font-bold">● Vessel Wall:</span> Elastic Endothelium
        </div>
        <div>
          <span className="text-cyan-400 font-bold">→ Velocity Vector:</span> Centerline $v_{\max}$
        </div>
        <div>
          <span className="text-slate-300 font-bold">● Particles:</span> Erythrocytes ($r \approx \text{const}$)
        </div>
      </div>
    </div>
  );
}
