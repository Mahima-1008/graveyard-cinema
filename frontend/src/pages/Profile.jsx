import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/context/ProfileContext';
import { Button } from '@/components/common';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, Settings, LogOut, CreditCard, Bell } from 'lucide-react';
import clsx from 'clsx';

function AccordionItem({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-surface rounded-xl overflow-hidden bg-surface/20 mb-4">
      <button 
        className="w-full px-6 py-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-text-muted" />}
          <span className="font-bold text-text-bright">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-background/50"
          >
            <div className="px-6 py-6 border-t border-surface">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { profiles, activeProfile, switchProfile } = useProfile();

  const [autoplay, setAutoplay] = useState(true);
  const [emails, setEmails] = useState(true);
  const [pushInfo, setPushInfo] = useState(false);

  return (
    <div className="flex-1 container mx-auto px-6 lg:px-12 py-8 md:py-12 mt-14 md:mt-20 min-h-screen">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-text-bright drop-shadow-md mb-2">Account</h1>
        <p className="font-body text-text-muted">Manage your profiles and settings.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Col: Profiles */}
        <div className="w-full lg:w-80 shrink-0">
          <h2 className="font-bold text-text-muted uppercase tracking-wider text-xs mb-6">Who's watching?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {profiles.map(p => (
              <button 
                key={p.id}
                onClick={() => switchProfile(p.id)}
                className="flex flex-col items-center gap-3 focus-visible:outline-none group"
              >
                <div className={clsx(
                  "w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ring-offset-4 ring-offset-background",
                  activeProfile.id === p.id ? "ring-4 ring-crimson scale-105" : "ring-2 ring-transparent group-hover:ring-surface opacity-70 group-hover:opacity-100"
                )}>
                  <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <span className={clsx("font-bold text-sm", activeProfile.id === p.id ? "text-text-bright" : "text-text-muted")}>
                  {p.name} {p.isKids && "🧒"}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-surface">
            <Button variant="ghost" className="w-full justify-start text-text-muted hover:text-crimson-bright" icon={LogOut} onClick={logout}>
              Sign Out All Devices
            </Button>
          </div>
        </div>

        {/* Right Col: Settings */}
        <div className="flex-1 max-w-3xl">
          
          <AccordionItem title="Account Details" icon={Settings} defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Email</label>
                <p className="text-text-bright">{user?.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase tracking-wider">Password</label>
                <div className="flex items-center justify-between">
                  <p className="text-text-bright tracking-widest">••••••••</p>
                  <Button variant="secondary" size="sm">Update</Button>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Playback Settings" icon={Settings}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-text-bright font-bold">Autoplay next episode</h4>
                  <p className="text-sm text-text-muted">Automatically play the next episode when watching a series.</p>
                </div>
                <button 
                  onClick={() => setAutoplay(!autoplay)}
                  className={clsx("w-12 h-6 rounded-full transition-colors relative", autoplay ? "bg-crimson" : "bg-surface")}
                >
                  <div className={clsx("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", autoplay ? "left-7" : "left-1")}></div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-bright mb-2">Default Subtitle Language</label>
                <select className="w-full md:w-1/2 bg-surface border border-surface rounded-lg px-4 py-2 text-text-bright focus:outline-none focus:border-crimson">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Off</option>
                </select>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Notifications" icon={Bell}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-text-bright font-bold">Email Notifications</h4>
                  <p className="text-sm text-text-muted">Receive updates about new releases and recommendations.</p>
                </div>
                <button 
                  onClick={() => setEmails(!emails)}
                  className={clsx("w-12 h-6 rounded-full transition-colors relative", emails ? "bg-crimson" : "bg-surface")}
                >
                  <div className={clsx("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", emails ? "left-7" : "left-1")}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-text-bright font-bold">Push Notifications</h4>
                  <p className="text-sm text-text-muted">Receive alerts on your mobile device.</p>
                </div>
                <button 
                  onClick={() => setPushInfo(!pushInfo)}
                  className={clsx("w-12 h-6 rounded-full transition-colors relative", pushInfo ? "bg-crimson" : "bg-surface")}
                >
                  <div className={clsx("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", pushInfo ? "left-7" : "left-1")}></div>
                </button>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Subscription" icon={CreditCard}>
            <div className="bg-surface/50 border border-crimson/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="font-display text-2xl text-text-bright font-bold mb-1">Cult Member Tier</h3>
                  <p className="text-sm text-text-muted mb-4">4K UHD + HDR • 4 Screens • Ad-Free</p>
                  <p className="text-sm text-text-bright font-bold">Next billing date: <span className="font-normal text-text-muted">Oct 31, 2026</span></p>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-bold text-text-bright">$14.99</span>
                  <span className="text-text-muted text-sm">/mo</span>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4 relative z-10">
                <Button variant="secondary" size="sm">Change Plan</Button>
                <Button variant="ghost" size="sm" className="text-text-muted hover:text-crimson-bright">Cancel Subscription</Button>
              </div>
            </div>
          </AccordionItem>

        </div>
      </div>
    </div>
  );
}
