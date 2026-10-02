import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blood Flow Simulator | BME Educational Tool',
  description: 'Interactive Hagen–Poiseuille blood flow simulator for Biomedical Engineering students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blood Flow Simulator | BME Educational Tool',
  description: 'Interactive Hagen–Poiseuille blood flow simulator for Biomedical Engineering students',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
