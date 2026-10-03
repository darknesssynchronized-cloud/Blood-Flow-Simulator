import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blood Flow Simulator | Biomedical Hemodynamics Laboratory',
  description: 'Interactive Hagen–Poiseuille blood flow and hemodynamics simulator for Biomedical Engineering',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-ink-950 text-ink-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
