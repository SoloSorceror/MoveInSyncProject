import { useState } from 'react';
import { UploadCloud, FileJson, FileText, CheckCircle2, AlertTriangle, AlertCircle, Play, Check, ArrowUpFromLine } from 'lucide-react';

const DUMMY_PREVIEW_DATA = [
    { id: 'S001', name: 'Rajiv Chowk', line: 'Yellow, Blue', status: 'valid', message: 'Ready to import' },
    { id: 'S002', name: 'Kashmere Gate', line: 'Yellow, Red, Violet', status: 'valid', message: 'Ready to import' },
    { id: 'S003', name: 'New Delhi', line: 'Yellow, Orange', status: 'valid', message: 'Ready to import' },
    { id: 'S004', name: 'Yamuna Bank', line: 'Blue', status: 'valid', message: 'Ready to import' },
    { id: 'S005', name: 'Botanical Garden', line: 'Blue, Magenta', status: 'valid', message: 'Ready to import' },
    { id: 'S006', name: 'HUDA City Centre', line: 'Yellow', status: 'valid', message: 'Ready to import' },
];

export default function AdminBulkImport() {
    const [dragActive, setDragActive] = useState(false);
    const [fileStatus, setFileStatus] = useState('idle'); // idle, uploaded, processing, complete
    const [progress, setProgress] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileStatus('uploaded');
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFileStatus('uploaded');
        }
    };

    const simulateImport = () => {
        setFileStatus('processing')
        setProgress(0)

        const STEPS = [
            { label: 'Parsing', target: 25 },
            { label: 'Validating', target: 55 },
            { label: 'Committing', target: 85 },
            { label: 'Done', target: 100 },
        ]
        let current = 0
        const advance = () => {
            if (current >= STEPS.length) return
            const { target } = STEPS[current]
            const tick = setInterval(() => {
                setProgress(p => {
                    if (p >= target) {
                        clearInterval(tick)
                        current++
                        if (current >= STEPS.length) {
                            setFileStatus('complete')
                        } else {
                            setTimeout(advance, 300)
                        }
                        return p
                    }
                    return p + 2
                })
            }, 40)
        }
        advance()
    }

    const hasErrors = DUMMY_PREVIEW_DATA.some(d => d.status === 'error');

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-black text-[#003087] mb-1">Bulk Import Network Data</h1>
                <p className="text-gray-500 text-sm">
                    Upload CSV or JSON files to rapidly generate or update metro lines and station sequences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Upload Zone */}
                <div className="col-span-1 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">

                    <form
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`w-full aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-colors ${dragActive ? 'border-[#003087] bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".csv, .json"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                            <UploadCloud size={48} className={`mb-4 ${dragActive ? 'text-[#003087]' : 'text-gray-400'}`} />
                            <p className="font-bold text-gray-700 mb-1">
                                Click or drag file to upload
                            </p>
                            <p className="text-sm text-gray-400">
                                Supports CSV and JSON formats
                            </p>

                            <div className="flex gap-4 mt-6">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                                    <FileText size={14} /> CSV
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                                    <FileJson size={14} /> JSON
                                </span>
                            </div>
                        </label>
                    </form>

                </div>

                {/* Preview & Validation Table */}
                <div className="col-span-1 lg:col-span-2 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                        <div>
                            <h3 className="text-base font-black text-gray-800">Validation Preview</h3>
                            <p className="text-sm text-gray-400">Review constraints before committing changes.</p>
                        </div>

                        {fileStatus === 'uploaded' && (
                            <button
                                onClick={simulateImport}
                                disabled={hasErrors}
                                className="flex items-center gap-2 px-5 py-2 bg-[#003087] hover:bg-blue-900 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                <Play size={16} />
                                {hasErrors ? 'Fix errors to Import' : 'Commence Import'}
                            </button>
                        )}

                        {fileStatus === 'processing' && (() => {
                            const STEPS = ['Parsing', 'Validating', 'Committing', 'Done']
                            const stepIdx = progress < 25 ? 0 : progress < 55 ? 1 : progress < 85 ? 2 : 3
                            return (
                                <div className="w-full max-w-xs">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs font-bold text-[#003087]">{STEPS[stepIdx]}...</span>
                                        <span className="text-xs font-bold text-[#003087]">{progress}%</span>
                                    </div>
                                    {/* Steps */}
                                    <div className="flex gap-1 mb-2">
                                        {STEPS.map((s, si) => (
                                            <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${si < stepIdx ? 'bg-[#00873D]'
                                                : si === stepIdx ? 'bg-[#003087] animate-pulse'
                                                    : 'bg-gray-200'
                                                }`} />
                                        ))}
                                    </div>
                                    {/* Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div className="bg-[#003087] h-full rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Processing {DUMMY_PREVIEW_DATA.filter(d => d.status !== 'error').length} valid records...</p>
                                </div>
                            )
                        })()}

                        {fileStatus === 'complete' && (
                            <div className="flex items-center gap-2 px-5 py-2 bg-[#00873D] text-white rounded-xl font-bold text-sm">
                                <Check size={16} /> {DUMMY_PREVIEW_DATA.filter(d => d.status !== 'error').length} records imported!
                            </div>
                        )}
                    </div>

                    {fileStatus === 'idle' ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-12">
                            <ArrowUpFromLine size={48} className="mb-4 opacity-20" />
                            <p className="font-semibold">No file uploaded yet.</p>
                            <p className="text-sm">Upload a valid data file to see the preview table.</p>
                            <p className="text-xs text-[#003087] mt-2">
                                Try: <a href="/sample-import.csv" download className="underline font-bold">Download sample-import.csv</a>
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-slate-500 dark:text-slate-400">
                                        <th className="px-4 py-3 font-semibold rounded-tl-xl">ID</th>
                                        <th className="px-4 py-3 font-semibold">Station Name</th>
                                        <th className="px-4 py-3 font-semibold">Belongs To</th>
                                        <th className="px-4 py-3 font-semibold rounded-tr-xl">Validation State</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {DUMMY_PREVIEW_DATA.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">{row.id}</td>
                                            <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                                                {row.name || <span className="text-rose-500 italic">Undefined</span>}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.line}</td>
                                            <td className="px-4 py-3">
                                                <div className={`flex items-center gap-2 ${row.status === 'error' ? 'text-rose-600 dark:text-rose-400' :
                                                    row.status === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                                                        'text-emerald-600 dark:text-emerald-400'
                                                    }`}>
                                                    {row.status === 'error' && <AlertCircle size={16} />}
                                                    {row.status === 'warning' && <AlertTriangle size={16} />}
                                                    {row.status === 'valid' && <CheckCircle2 size={16} />}
                                                    <span className="text-xs font-semibold">{row.message}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {hasErrors && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="text-[#D7231A] shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <h4 className="font-bold text-[#D7231A] text-sm">Cannot proceed with import</h4>
                                        <p className="text-red-600 text-xs mt-1">Fix duplicate IDs and missing station names in your source file, then re-upload.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
