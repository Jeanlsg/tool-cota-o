import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, Map } from 'lucide-react';
import clsx from 'clsx';

const Step4Logistics = ({ formData, setFormData, onSubmit, loading, error }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isDisabled = !formData.Destino || loading;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-lg mx-auto"
        >
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4 text-indigo-600">
                    <Navigation size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Dados da Entrega</h2>
                <p className="text-slate-500 font-medium">Onde você quer receber seu container?</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-6">

                <div className="space-y-4">
                    <div className="relative group">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4 flex items-center gap-2">
                            <MapPin size={12} className="text-indigo-500" /> Cidade e Estado
                        </label>
                        <input
                            required
                            name="Destino"
                            value={formData.Destino || ''}
                            onChange={handleChange}
                            placeholder="Ex: São Paulo, SP"
                            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 shadow-inner"
                        />
                    </div>

                    <div className="relative group opacity-80 hover:opacity-100 transition-opacity">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4 flex items-center gap-2">
                            <Map size={12} className="text-indigo-500" /> CEP (Opcional)
                        </label>
                        <input
                            name="cep"
                            type="number"
                            value={formData.cep || ''}
                            onChange={handleChange}
                            placeholder="00000-000"
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-600 placeholder:text-slate-300"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={onSubmit}
                    disabled={isDisabled}
                    className={clsx(
                        "w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform shadow-xl",
                        isDisabled
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            CALCULANDO...
                        </div>
                    ) : (
                        <>
                            CALCULAR MINHA COTAÇÃO AGORA
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Step4Logistics;
