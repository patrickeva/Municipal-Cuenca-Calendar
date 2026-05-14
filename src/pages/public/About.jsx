import { Phone, Mail, MapPin, Globe, Users, Award, CalendarDays } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { useEvents } from '../../contexts/EventsContext';

export default function About() {
  const { events } = useEvents();
  const { settings: municipalInfo } = useSettings();
  const published = events.filter((e) => e.status === 'published').length;

  return (
    <div>
      {/* Hero */}
      <div className="bg-navy py-14 px-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/3 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">About</p>
          <h1 className="font-extrabold text-4xl text-white tracking-tight font-display mb-2">
            {municipalInfo.fullName}
          </h1>
          <p className="text-white/50 text-base font-medium">{municipalInfo.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: CalendarDays, label: 'Published Events',   value: published,            color: 'text-royal',   bg: 'bg-blue-50',    border: 'border-blue-100' },
            { icon: Users,        label: 'Local Government',   value: 'Sangguniang Bayan',  color: 'text-gold',    bg: 'bg-amber-50',   border: 'border-amber-100' },
            { icon: Award,        label: 'Province',           value: municipalInfo.province, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          ].map(({ icon: Icon, label, value, color, bg, border }) => (
            <div key={label} className={`bg-white rounded-2xl border ${border} p-5 flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={color} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className={`font-extrabold text-base mt-0.5 ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Municipal Info */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card">
            <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider mb-5 font-display flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gold inline-block" />
              Municipal Information
            </h2>
            <dl className="space-y-4">
              {[
                { label: 'Municipality', value: municipalInfo.name },
                { label: 'Province',     value: municipalInfo.province },
                { label: 'Mayor',        value: municipalInfo.mayor },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">{label}</dt>
                  <dd className="font-bold text-navy text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card">
            <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider mb-5 font-display flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-royal inline-block" />
              Contact Us
            </h2>
            <div className="space-y-4">
              {[
                { Icon: MapPin, text: municipalInfo.address },
                { Icon: Phone,  text: municipalInfo.phone },
                { Icon: Mail,   text: municipalInfo.email },
                { Icon: Globe,  text: municipalInfo.website },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-gold" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About the system */}
          <div className="rounded-2xl overflow-hidden shadow-card" style={{ background: 'linear-gradient(135deg, #0c1f3f 0%, #1a3a6b 100%)' }}>
            <div className="p-6">
              <h2 className="font-extrabold text-sm text-white uppercase tracking-wider mb-4 font-display flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gold inline-block" />
                About This System
              </h2>
              <p className="text-white/55 text-sm leading-relaxed">
                The Municipal Events Calendar is the official digital information system of the Municipality of Cuenca, Batangas. It is designed to keep all residents, staff, and stakeholders informed and up to date on events, sessions, and activities happening in our community.
              </p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-[11px] text-white/30 font-medium">Powered by Firebase & Vercel</p>
                <p className="text-[11px] text-white/20 font-medium mt-0.5">Secured with Firebase Authentication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
