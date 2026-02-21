import { useState } from 'react';
import { UploadCloud, FileJson, FileText, CheckCircle2, AlertTriangle, AlertCircle, Play, Check, ArrowUpFromLine } from 'lucide-react';

const DUMMY_PREVIEW_DATA = [
    { id: 'S001', name: 'Rajiv Chowk', line: 'Yellow, Blue', status: 'valid', message: 'Ready to import' },
    { id: 'S002', name: 'Kashmere Gate', line: 'Yellow, Red, Violet', status: 'valid', message: 'Ready to import' },
    { id: 'S003', name: 'New Delhi', line: 'Yellow, Orange', status: 'valid', message: 'Ready to import' },
    { id: 'S004', name: '', line: 'Blue', status: 'error', message: 'Missing station name' },
    { id: 'S005', name: 'Botanical Garden', line: 'Blue, Magenta', status: 'warning', message: 'Potential duplicate ID detected' },
    { id: 'S001', name: 'HUDA City Centre', line: 'Yellow', status: 'error', message: 'Duplicate ID S001' },
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
        setFileStatus('processing');
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setFileStatus('complete');
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    const hasErrors = DUMMY_PREVIEW_DATA.some(d => d.status === 'error');

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Bulk Import Network Data</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Upload CSV or JSON files to rapidly generate or update metro lines and station sequences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Upload Zone */}
                <div className="col-span-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">

                    <form
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`w-full aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-colors ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                            <UploadCloud size={48} className={`mb-4 ${dragActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                                Click or drag file to this area to upload
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Support for a single or bulk CSV/JSON upload.
                            </p>

                            <div className="flex gap-4 mt-6">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FileText size={14} /> CSV
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FileJson size={14} /> JSON
                                </span>
                            </div>
                        </label>
                    </form>

                </div>

                {/* Preview & Validation Table */}
                <div className="col-span-1 lg:col-span-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Validation Preview</h3>
                            <p className="text-sm text-slate-500">Review constraints before committing changes.</p>
                        </div>

                        {fileStatus === 'uploaded' && (
                            <button
                                onClick={simulateImport}
                                disabled={hasErrors}
                                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20"
                            >
                                <Play size={16} />
                                {hasErrors ? 'Fix errors to Import' : 'Commence Import'}
                            </button>
                        )}

                        {fileStatus === 'processing' && (
                            <div className="flex items-center gap-3 w-48 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{progress}%</span>
                                <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        )}

                        {fileStatus === 'complete' && (
                            <div className="flex items-center gap-2 px-5 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold border border-emerald-200 dark:border-emerald-500/30">
                                <Check size={18} />
                                Import Success
                            </div>
                        )}
                    </div>

                    {fileStatus === 'idle' ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
                            <ArrowUpFromLine size={48} className="mb-4 opacity-20" />
                            <p>No file uploaded yet.</p>
                            <p className="text-sm">Upload a valid data file to see the preview table.</p>
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
                                <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <h4 className="font-semibold text-rose-800 dark:text-rose-300 text-sm">Cannot proceed with import</h4>
                                        <p className="text-rose-600 dark:text-rose-400 text-xs mt-1">Please fix the highlighted row constraints (duplicate IDs, undefined names) in your source file and re-upload.</p>
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
