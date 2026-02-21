import { ShieldCheck, Info } from 'lucide-react';

const VERSIONS = ['v1.0', 'v1.1', 'v2.0', 'v2.1', 'v3.0'];

// Green = direct upgrade allowed; amber = requires intermediate stop; red = blocked
const MATRIX = {
    'v1.0': { 'v1.0': 'green', 'v1.1': 'green', 'v2.0': 'amber', 'v2.1': 'red', 'v3.0': 'red' },
    'v1.1': { 'v1.0': 'red', 'v1.1': 'green', 'v2.0': 'green', 'v2.1': 'amber', 'v3.0': 'red' },
    'v2.0': { 'v1.0': 'red', 'v1.1': 'red', 'v2.0': 'green', 'v2.1': 'green', 'v3.0': 'amber' },
    'v2.1': { 'v1.0': 'red', 'v1.1': 'red', 'v2.0': 'red', 'v2.1': 'green', 'v3.0': 'green' },
    'v3.0': { 'v1.0': 'red', 'v1.1': 'red', 'v2.0': 'red', 'v2.1': 'red', 'v3.0': 'green' },
};

const TOOLTIPS = {
    'green': 'Direct Upgrade Allowed seamlessly.',
    'amber': 'Requires Intermediate Stop (Data Migration Needed).',
    'red': 'Upgrade Blocked due to breaking architectural changes.'
};

export default function AdminDashboard() {
    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Version & Compatibility Matrix</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Read-only matrix showing upgrade paths between software versions.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500 shadow-sm shadow-emerald-500/20"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Direct Upgrade</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-500 shadow-sm shadow-amber-500/20"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Requires Intermediate Stop</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-rose-500 shadow-sm shadow-rose-500/20"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Blocked</span>
                    </div>
                </div>

                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[600px]">
                        {/* Header Row (Targets) */}
                        <div className="flex mb-2">
                            <div className="w-32 flex-shrink-0"></div> {/* Corner */}
                            <div className="flex-1 grid grid-cols-5 gap-2">
                                {VERSIONS.map(target => (
                                    <div key={target} className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 pb-2 border-b-2 border-slate-100 dark:border-slate-800">
                                        Target<br />{target}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rows (Sources) */}
                        <div className="space-y-2">
                            {VERSIONS.map(source => (
                                <div key={source} className="flex items-center">
                                    <div className="w-32 flex-shrink-0 text-sm font-bold text-slate-700 dark:text-slate-300 pr-4 text-right">
                                        Source {source}
                                    </div>
                                    <div className="flex-1 grid grid-cols-5 gap-2">
                                        {VERSIONS.map(target => {
                                            const status = MATRIX[source][target];
                                            const bgColor =
                                                status === 'green' ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/30' :
                                                    status === 'amber' ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/30' :
                                                        'bg-rose-100 dark:bg-rose-500/20 border-rose-300 dark:border-rose-500/30';

                                            const iconColor =
                                                status === 'green' ? 'text-emerald-600 dark:text-emerald-400' :
                                                    status === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                                                        'text-rose-600 dark:text-rose-400';

                                            return (
                                                <div
                                                    key={`${source}-${target}`}
                                                    className={`group relative h-12 rounded-lg border flex items-center justify-center transition-all hover:scale-105 cursor-help ${bgColor}`}
                                                >
                                                    <Info size={16} className={`opacity-50 group-hover:opacity-100 transition-opacity ${iconColor}`} />

                                                    {/* Tooltip */}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 dark:bg-slate-800 text-white text-xs text-center rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-10 pointer-events-none">
                                                        <div className="font-bold mb-1 border-b border-slate-700 pb-1">
                                                            {source} &rarr; {target}
                                                        </div>
                                                        {TOOLTIPS[status]}
                                                        {/* Tooltip Arrow */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
