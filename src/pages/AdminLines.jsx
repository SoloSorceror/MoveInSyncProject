import { useState, useMemo } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Train, Save, Plus, Trash2, ArrowRightLeft } from 'lucide-react';

// Hardcoded initial state based on requirements, so we can edit it locally
const INITIAL_NETWORK = [
    { id: 'yellow', name: 'Yellow Line', color: 'bg-yellow-400', stations: ['Samaypur Badli', 'Kashmere Gate', 'Chandni Chowk', 'Rajiv Chowk', 'Central Secretariat', 'Hauz Khas', 'HUDA City Centre'] },
    { id: 'blue', name: 'Blue Line', color: 'bg-blue-500', stations: ['Dwarka Sec 21', 'Janakpuri West', 'Rajiv Chowk', 'Mandi House', 'Botanical Garden', 'Noida Electronic City'] },
    { id: 'red', name: 'Red Line', color: 'bg-red-500', stations: ['Rithala', 'Netaji Subhash Place', 'Kashmere Gate', 'Welcome', 'Dilshad Garden', 'Shaheed Sthal'] },
];

function SortableStationItem({ id, stationName, onRemove, isInterchange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 p-4 mb-2 bg-white dark:bg-slate-800 border rounded-xl shadow-sm transition-all ${isDragging ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-500/20 opacity-90' : 'border-slate-200 dark:border-slate-700'
                }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
                <GripVertical size={20} />
            </div>

            <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center font-bold ${isInterchange ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                {isInterchange ? <ArrowRightLeft size={18} /> : <Train size={18} />}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-medium text-slate-800 dark:text-white">{stationName}</span>
                    {isInterchange && (
                        <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 mt-0.5">Interchange Hub</span>
                    )}
                </div>

                {/* Remove button (doesn't trigger drag) */}
                <button
                    onClick={() => onRemove(id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remove Station"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

export default function AdminLines() {
    const [network, setNetwork] = useState(INITIAL_NETWORK);
    const [activeLineId, setActiveLineId] = useState('yellow');
    const [newStationName, setNewStationName] = useState('');
    const [saveStatus, setSaveStatus] = useState('idle');

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Get current line data
    const activeLine = network.find(l => l.id === activeLineId);

    // Map stations to objects with unique IDs for dnd-kit
    const stations = useMemo(() => {
        if (!activeLine) return [];
        return activeLine.stations.map((name, index) => ({ id: `station-${activeLineId}-${index}-${name}`, name }));
    }, [activeLine, activeLineId]);

    // Compute all interchanges (stations present in > 1 line)
    const interchanges = useMemo(() => {
        const counts = {};
        network.forEach(line => {
            line.stations.forEach(station => {
                counts[station] = (counts[station] || 0) + 1;
            });
        });
        const hubs = new Set();
        Object.entries(counts).forEach(([station, count]) => {
            if (count > 1) hubs.add(station);
        });
        return hubs;
    }, [network]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = stations.findIndex(item => item.id === active.id);
        const newIndex = stations.findIndex(item => item.id === over.id);

        setNetwork(prev => prev.map(line => {
            if (line.id === activeLineId) {
                const newStations = arrayMove(line.stations, oldIndex, newIndex);
                return { ...line, stations: newStations };
            }
            return line;
        }));
    };

    const handleAddStation = (e) => {
        e.preventDefault();
        if (!newStationName.trim() || !activeLine) return;

        setNetwork(prev => prev.map(line => {
            if (line.id === activeLineId) {
                return { ...line, stations: [...line.stations, newStationName.trim()] };
            }
            return line;
        }));
        setNewStationName('');
    };

    const handleRemoveStation = (stationIdToRemove) => {
        // ID format: `station-${activeLineId}-${index}-${name}`
        const stationObj = stations.find(s => s.id === stationIdToRemove);
        if (!stationObj) return;

        setNetwork(prev => prev.map(line => {
            if (line.id === activeLineId) {
                // Filter out the first occurrence of this name (or all if duplicates exist, but we assume exact match by name for simplicity)
                // Actually safer to filter by index if we have multiple same names, but station names are typically unique per line.
                const newStations = line.stations.filter(name => name !== stationObj.name);
                return { ...line, stations: newStations };
            }
            return line;
        }));
    };

    const handleSaveSequence = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 800);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Route Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Reorder stations via Drag & Drop. Add new stations or remove existing ones. Interchanges are auto-detected.</p>
                </div>

                <button
                    onClick={handleSaveSequence}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20"
                >
                    <Save size={18} />
                    {saveStatus === 'saving' ? 'Saving Routes...' : saveStatus === 'saved' ? 'Routes Saved!' : 'Save Routes'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Line Selector Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">Network Lines</h3>
                    {network.map(line => (
                        <button
                            key={line.id}
                            onClick={() => setActiveLineId(line.id)}
                            className={`flex justify-between items-center px-4 py-3 rounded-xl font-medium transition-all ${activeLineId === line.id
                                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${line.color}`} />
                                {line.name}
                            </div>
                            <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300">
                                {line.stations.length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* DnD Editor Area */}
                <div className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm min-h-[600px] flex flex-col">

                    {/* Header + Add Station Form */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full ${activeLine?.color}`} />
                                {activeLine?.name} Sequence
                            </h2>
                        </div>

                        <form onSubmit={handleAddStation} className="flex relative items-center w-full xl:w-72">
                            <input
                                type="text"
                                placeholder="Add new station..."
                                value={newStationName}
                                onChange={(e) => setNewStationName(e.target.value)}
                                className="pl-4 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full text-slate-800 dark:text-white transition-all shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={!newStationName.trim()}
                                className="absolute right-1 top-1 bottom-1 px-2.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                            >
                                <Plus size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Drag and Drop List */}
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                        {stations.length > 0 ? (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={stations.map(s => s.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-1">
                                        {stations.map(station => (
                                            <SortableStationItem
                                                key={station.id}
                                                id={station.id}
                                                stationName={station.name}
                                                onRemove={handleRemoveStation}
                                                isInterchange={interchanges.has(station.name)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                                <Train size={48} className="mb-4 opacity-20" />
                                <p>No stations on this line.</p>
                                <p className="text-sm">Add a station using the input above.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
