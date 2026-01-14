import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Snowflake, ArrowRight, ArrowLeft, Ruler } from 'lucide-react';
import clsx from 'clsx';

const Step2Config = ({ formData, setFormData, onNext, onBack }) => {
    // Mapping internal "Simple" choices to the complex "Legacy" data required by the specific webhook
    // While we simplify UI, we must keep data compatibility.

    // UI States
    const [selectedType, setSelectedType] = useState(() => {
        if (formData["Tipo do Container"]?.includes('Reefer')) return 'reefer';
        return 'dry';
    });

    const handleTypeSelect = (type) => {
        setSelectedType(type);

        // Auto-update legacy fields based on selection logic
        // If 'reefer', standard is '20 RE' or '40 RE' usually, but existing options are 20/40 DC/HC.
        // The user previous code had "20 DC", "40 DC", "40 HC".
        // Reefer options were stuck in "Estado do Container" -> "Reefer com motor".
        // Strategy: 
        // If Dry -> Enable 20DC, 40DC, 40HC. State default "Usados A".
        // If Reefer -> Enable 20/40? Previous "Tipo" options don't explicitly list RE types like "20 RE".
        // Likely the "Tipo" field stays "40 HC" (common for reefers) or just standard sizes, and "Estado" becomes "Reefer com/sem motor".

        let defaultState = type === 'dry' ? 'Usados A' : 'Reefer com motor';
        setFormData(prev => ({
            ...prev,
            "Estado do Container": defaultState
        }));
    };

    const handleSizeSelect = (size) => {
        // size is "20 DC", "40 DC", "40 HC"
        setFormData(prev => ({ ...prev, "Tipo do Container": size }));
    };

    const isSelected = (val) => formData["Tipo do Container"] === val;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData["Tipo do Container"]) onNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Configure seu Container</h2>
                <p className="text-slate-500 font-medium">Escolha o modelo e o tamanho ideal para sua necessidade.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Type Selection */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                            <Container size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Modelo</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Qual a finalidade?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <button
                            onClick={() => handleTypeSelect('dry')}
                            className={clsx(
                                "rounded-3xl p-4 flex flex-col items-center justify-center gap-3 transition-all border-2",
                                selectedType === 'dry'
                                    ? "bg-slate-800 border-slate-800 text-white shadow-lg scale-[1.02]"
                                    : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                            )}
                        >
                            <Container size={32} />
                            <span className="font-bold text-sm">Seco / Aço</span>
                        </button>

                        <button
                            onClick={() => handleTypeSelect('reefer')}
                            className={clsx(
                                "rounded-3xl p-4 flex flex-col items-center justify-center gap-3 transition-all border-2",
                                selectedType === 'reefer'
                                    ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-200 scale-[1.02]"
                                    : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                            )}
                        >
                            <Snowflake size={32} />
                            <span className="font-bold text-sm">Refrigerado</span>
                        </button>
                    </div>
                </div>

                {/* Size Selection */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                            <Ruler size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Medida</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tamanho e Altura</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 flex-1 justify-center">
                        {[
                            { id: "20 DC", label: "20 Pés Padrão", dim: "6m x 2.4m x 2.6m" },
                            { id: "40 DC", label: "40 Pés Padrão", dim: "12m x 2.4m x 2.6m" },
                            { id: "40 HC", label: "40 High Cube", dim: "12m x 2.4m x 2.9m (Mais Alto)" }
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleSizeSelect(opt.id)}
                                className={clsx(
                                    "w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all group",
                                    isSelected(opt.id)
                                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-900"
                                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-indigo-200"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-colors",
                                        isSelected(opt.id) ? "bg-indigo-600 text-white" : "bg-white text-slate-300 group-hover:text-indigo-400"
                                    )}>
                                        {opt.id.split(' ')[0]}
                                    </div>
                                    <div className="text-left">
                                        <p className={clsx("font-bold text-sm", isSelected(opt.id) ? "text-indigo-900" : "text-slate-700")}>{opt.label}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">{opt.dim}</p>
                                    </div>
                                </div>
                                {isSelected(opt.id) && <div className="w-4 h-4 rounded-full bg-indigo-600" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 py-5 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} /> Voltar
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-[3] py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]"
                >
                    CONTINUAR <ArrowRight size={22} />
                </button>
            </div>
        </motion.div>
    );
};

export default Step2Config;
