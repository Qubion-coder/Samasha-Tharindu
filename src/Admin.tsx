import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [nextPrefix, setNextPrefix] = useState('ඔබට');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prefixes = [
    'Mr.',
    'Mrs.',
    'Miss',
    'Mr. & Mrs.',
    'Family',
    'Dear'
  ];

  const nextPrefixes = [
    { label: 'ඔබට', value: 'ඔබට' },
    { label: 'ඔබ දෙපළට', value: 'ඔබ දෙපළට' },
    { label: 'ඔබ සැමට', value: 'ඔබ සැමට' },
  ];

  const baseUrl = window.location.origin;
  const fullName = `${prefix} ${guestName.trim()}`;
  const generatedUrl = guestName.trim()
    ? `${baseUrl}/?to=${encodeURIComponent(fullName)}&suffix=${encodeURIComponent(nextPrefix)}`
    : '';

  const getMessageSuffix = (prefix: string) => {
    switch(prefix) {
      case 'ඔබට': return 'ඔයත්';
      case 'ඔබ දෙපළට': return 'ඔබ දෙපළත්';
      case 'ඔබ සැමට': return 'ඔබ සැමත්';
      default: return prefix;
    }
  };

  const generatedMessage = guestName.trim() ? `ආදරණීය ${fullName} ❤️

අපේ මගුල් ගෙදර ඇවිත් යන්න ${getMessageSuffix(nextPrefix)} එන්න... 💍✨

💌 අපේ ආරාධනා පත්‍රය මෙතැනින් බලන්න:
${generatedUrl}


❤️ තරිඳු & සමාෂා` : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopiedId('link');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopiedId('message');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy message', err);
    }
  };

  return (
    <div className="min-h-screen h-[100dvh] overflow-y-auto overflow-x-hidden bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Generator Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            LINK GENERATOR
          </h1>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Select Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  {prefixes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sanjaya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Next Prefix</label>
                <select
                  value={nextPrefix}
                  onChange={(e) => setNextPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  {nextPrefixes.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Message Preview Card */}
        {guestName.trim() && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Generated Message Preview
            </h2>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
              <pre className="whitespace-pre-wrap text-slate-700 font-medium font-sans text-[15px] leading-relaxed">
                {generatedMessage}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                {copiedId === 'link' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied Link!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Copy Link Only
                  </>
                )}
              </button>

              <button
                onClick={handleCopyMessage}
                className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm active:scale-[0.99]"
              >
                {copiedId === 'message' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied Full Message!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Full Message
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
