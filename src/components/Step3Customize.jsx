import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Palette, Rotate3D } from 'lucide-react';
import clsx from 'clsx';

const Step3Customize = ({ formData, setFormData, onNext, onBack }) => {
    // Available colors
    const colors = [
        { id: 'standard', hex: '#2c3e50', name: 'Padrão (Azul/Cinza)', label: 'Original' },
        { id: 'white', hex: '#f8fafc', name: 'Branco Neve', label: 'Premium' },
        { id: 'green', hex: '#16a34a', name: 'Verde Logística', label: 'Eco' },
        { id: 'red', hex: '#dc2626', name: 'Vermelho Sinal', label: 'Destaque' },
        { id: 'blue', hex: '#2563eb', name: 'Azul Real', label: 'Clássico' },
    ];

    const [color, setColor] = useState(formData.cor || colors[0]);
    const [rotation, setRotation] = useState(0);

    const handleColorChange = (c) => {
        setColor(c);
        setFormData(prev => ({ ...prev, cor: c.name }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Personalize seu Container</h2>
                <p className="text-slate-500 font-medium">Escolha a cor e visualize como ele ficará.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8 min-h-[400px]">

                {/* Visualizer Area */}
                <div className="lg:col-span-2 bg-slate-100 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-inner border border-slate-200 group">

                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 z-10">
                        <Rotate3D size={14} /> 360° View
                    </div>

                    {/* Pseudo-3D Container Representation */}
                    <motion.div
                        className="relative w-64 h-32 md:w-80 md:h-40 transition-all duration-500 ease-out"
                        style={{
                            preserve3d: true,
                            transform: `perspective(1000px) rotateY(${rotation}deg) rotateX(5deg)`
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDrag={(event, info) => setRotation(r => r + info.delta.x)}
                    >
                        {/* Front Face */}
                        <div
                            className="absolute inset-0 border-4 border-black/10 flex flex-col justify-between p-4 shadow-xl transition-colors duration-500"
                            style={{
                                backgroundColor: color.hex,
                                transform: 'translateZ(60px)',
                                boxShadow: `inset 0 0 40px rgba(0,0,0,0.2)`
                            }}
                        >
                            <div className="text-white/50 font-black text-4xl tracking-tighter mix-blend-overlay">MB</div>
                            <div className="w-full h-2 bg-black/10 flex gap-4">
                                <div className="w-1/3 bg-transparent border-r-2 border-black/10"></div>
                                <div className="w-1/3 bg-transparent border-r-2 border-black/10"></div>
                            </div>
                        </div>

                        {/* Back Face */}
                        <div
                            className="absolute inset-0 border-4 border-black/10 transition-colors duration-500"
                            style={{
                                backgroundColor: color.hex,
                                transform: 'translateZ(-60px) rotateY(180deg)',
                                filter: 'brightness(90%)'
                            }}
                        />

                        {/* Right Face */}
                        <div
                            className="absolute inset-y-0 right-0 w-[120px] origin-right border-4 border-black/10 transition-colors duration-500"
                            style={{
                                backgroundColor: color.hex,
                                transform: 'rotateY(-90deg)',
                                filter: 'brightness(80%)',
                                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px)'
                            }}
                        />

                        {/* Left Face */}
                        <div
                            className="absolute inset-y-0 left-0 w-[120px] origin-left border-4 border-black/10 transition-colors duration-500"
                            style={{
                                backgroundColor: color.hex,
                                transform: 'rotateY(90deg)',
                                filter: 'brightness(80%)',
                                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px)'
                            }}
                        />

                        {/* Top Face */}
                        <div
                            className="absolute inset-x-0 top-0 h-[120px] origin-top border-4 border-black/10 transition-colors duration-500"
                            style={{
                                backgroundColor: color.hex,
                                transform: 'rotateX(-90deg)',
                                filter: 'brightness(110%)'
                            }}
                        />
                    </motion.div>

                    <div className="absolute bottom-6 text-slate-400 text-xs font-bold uppercase tracking-widest opacity-50 flex flex-col items-center">
                        <div className="w-12 h-1 bg-slate-200 rounded-full mb-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-500"
                                animate={{ x: [-12, 12, -12] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                        </div>
                        Arraste para girar
                    </div>
                </div>

                {/* Color Palette */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Cores</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Acabamento externo</p>
                        </div>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {colors.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => handleColorChange(c)}
                                className={clsx(
                                    "w-full p-3 rounded-2xl flex items-center justify-between border-2 transition-all hover:scale-[1.02]",
                                    color.id === c.id
                                        ? "border-slate-800 bg-slate-50 shadow-md"
                                        : "border-transparent hover:bg-slate-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full shadow-inner border border-black/10"
                                        style={{ backgroundColor: c.hex }}
                                    />
                                    <div className="text-left">
                                        <p className={clsx("font-bold text-sm", color.id === c.id ? "text-slate-800" : "text-slate-500")}>
                                            {c.name}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{c.label}</p>
                                    </div>
                                </div>
                                {color.id === c.id && <div className="w-3 h-3 bg-slate-800 rounded-full" />}
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
                    onClick={onNext}
                    className="flex-[3] py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]"
                >
                    CONTINUAR <ArrowRight size={22} />
                </button>
            </div>
        </motion.div>
    );
};

export default Step3Customize;
