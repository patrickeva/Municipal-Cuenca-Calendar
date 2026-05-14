import { useState } from 'react';
import { municipalInfo as defaults } from '../../data/municipalInfo';
import { useSettings } from '../../contexts/SettingsContext';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';

const FIELDS = [
  { key: 'name',     label: 'Municipality Name',  placeholder: 'e.g. Cuenca' },
  { key: 'fullName', label: 'Full Name',           placeholder: 'e.g. Municipality of Cuenca' },
  { key: 'province', label: 'Province',            placeholder: 'e.g. Batangas' },
  { key: 'tagline',  label: 'Tagline / Motto',     placeholder: 'e.g. Building Together...' },
  { key: 'mayor',    label: 'Mayor',               placeholder: 'e.g. Hon. Juan Dela Cruz' },
  { key: 'address',  label: 'Address',             placeholder: 'Street, Barangay, Municipality, Province' },
  { key: 'phone',    label: 'Phone Number',        placeholder: 'e.g. (043) 123-4567' },
  { key: 'email',    label: 'Email Address',       placeholder: 'e.g. office@cuenca.gov.ph' },
  { key: 'website',  label: 'Website',             placeholder: 'e.g. www.cuenca.gov.ph' },
];

export default function Settings() {
  const { settings, loading, saveSettings } = useSettings();
  const [form, setForm]   = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Use live settings as the form source once loaded
  const formData = form ?? settings;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...(prev ?? settings), [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveSettings(formData);
    setSaving(false);
    setSaved(true);
    setForm(null);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setForm(defaults);
    setSaved(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-slate-400 text-sm font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-extrabold text-2xl text-navy tracking-tight">Settings</h1>
          <p className="text-slate-400 text-sm font-medium mt-0.5">Municipal information shown across the site</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 border border-stone-200 text-slate-500 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-stone-50 transition-all"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-navy text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-navy/90 disabled:opacity-60 transition-all"
          >
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-3 flex items-center gap-2">
          <CheckCircle size={15} className="text-emerald-600" />
          <p className="text-sm text-emerald-700 font-semibold">Changes saved successfully!</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
        <h2 className="font-bold text-sm text-navy uppercase tracking-wider border-b border-stone-100 pb-3">
          Municipal Information
        </h2>

        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {label}
            </label>
            <input
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-navy/20 focus:border-navy/40 outline-none transition-all bg-white text-slate-700"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 font-medium text-center">
        Changes here will be reflected across the entire site after saving.
      </p>
    </div>
  );
}
