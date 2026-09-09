import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, RADII, EFFECTS } from '../constants/theme';

export default function StyleGuide() {
  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto pb-20 relative z-10">
      <header className="mb-12 border-b border-surface pb-6">
        <h1 className="font-display text-5xl text-text-bright mb-2">Graveyard Cinema</h1>
        <p className="text-text-muted text-lg">Design System & Style Guide</p>
      </header>

      {/* Colors */}
      <section className="mb-16">
        <h2 className="font-display text-3xl text-crimson-bright mb-6 border-l-4 border-crimson pl-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Swatch name="Background" color="bg-background" hex={COLORS.background} />
          <Swatch name="Surface" color="bg-surface" hex={COLORS.surface} />
          <Swatch name="Crimson" color="bg-crimson" hex={COLORS.crimson.DEFAULT} />
          <Swatch name="Crimson Bright" color="bg-crimson-bright" hex={COLORS.crimson.bright} />
          <Swatch name="Text Muted" color="bg-text-muted" hex={COLORS.text.muted} />
          <Swatch name="Text Bright" color="bg-text-bright" hex={COLORS.text.bright} textClass="text-background" />
          <Swatch name="Success" color="bg-success" hex={COLORS.status.success} />
          <Swatch name="Warning" color="bg-warning" hex={COLORS.status.warning} />
          <Swatch name="Error" color="bg-error" hex={COLORS.status.error} />
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="font-display text-3xl text-crimson-bright mb-6 border-l-4 border-crimson pl-4">Typography</h2>
        <div className="bg-surface p-8 rounded-lg shadow-glow space-y-6">
          <div>
            <p className="text-sm text-text-muted mb-2">Display Font (Cinzel)</p>
            <h1 className="font-display text-6xl text-text-bright">The Haunting</h1>
            <h2 className="font-display text-4xl text-text-bright mt-2">Chapter II: The Return</h2>
          </div>
          <div className="pt-6 border-t border-background">
            <p className="text-sm text-text-muted mb-2">Body Font (Inter)</p>
            <p className="font-body text-base text-text-muted max-w-2xl leading-relaxed">
              In the heart of the abandoned theater, shadows danced to a silent orchestra. 
              The air was thick with the scent of old velvet and long-forgotten secrets.
              This is the body font, designed for maximum legibility even in the darkest of designs.
            </p>
            <p className="font-body text-sm text-text-muted mt-4">Small body text sizing.</p>
          </div>
        </div>
      </section>

      {/* Interactive Components */}
      <section className="mb-16">
        <h2 className="font-display text-3xl text-crimson-bright mb-6 border-l-4 border-crimson pl-4">Interactive Elements</h2>
        <div className="flex flex-wrap gap-6 p-8 bg-surface rounded-lg">
          <button className="px-6 py-3 bg-crimson text-text-bright font-display tracking-widest rounded transition-cinematic hover:bg-crimson-bright hover:shadow-glow hover:-translate-y-1">
            Watch Now
          </button>
          
          <button className="px-6 py-3 bg-surface border border-crimson text-crimson-bright font-display tracking-widest rounded transition-fast hover:bg-crimson hover:text-text-bright">
            View Trailer
          </button>

          <button className="px-6 py-3 text-text-muted font-body hover:text-text-bright transition-fast underline underline-offset-4 decoration-crimson">
            More Info
          </button>
          
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="px-4 py-2 bg-background border border-surface rounded text-text-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
          />
        </div>
      </section>
    </div>
  );
}

function Swatch({ name, color, hex, textClass = "text-text-bright" }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-24 rounded-lg shadow-md ${color} border border-surface`}></div>
      <div>
        <p className={`font-display text-sm ${textClass}`}>{name}</p>
        <p className="font-mono text-xs text-text-muted">{hex}</p>
      </div>
    </div>
  );
}
