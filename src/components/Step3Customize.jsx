import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Palette, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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

    // Local Optimized Images
    const images6m = [
        "/images/6m/1.jpg",
        "/images/6m/2.jpg",
        "/images/6m/3.jpg",
        "/images/6m/4.jpg",
        "/images/6m/5.jpg"
    ];

    const images12m = [
        "/images/12m/1.jpg",
        "/images/12m/2.jpg",
        "/images/12m/3.jpg",
        "/images/12m/4.jpg",
        "/images/12m/5.jpg",
        "/images/12m/6.jpg"
    ];

    const [color, setColor] = useState(formData.cor || colors[0]);
    // Detect which image set to use based on the selection in Step 2
    const currentImages = formData["Tipo do Container"]?.includes('20') ? images6m : images12m;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset index if type changes (though step logic usually prevents this mid-view)
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [formData["Tipo do Container"]]);

    const handleColorChange = (c) => {
        setColor(c);
        setFormData(prev => ({ ...prev, cor: c }));
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Detalhes e Cores</h2>
                <p className="text-slate-500 font-medium">Veja fotos reais dos nossos containers e escolha a cor desejada.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8 min-h-[400px]">

                {/* Photo Gallery Area */}
                <div className="lg:col-span-2 bg-slate-100 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-inner border border-slate-200 group">

                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 z-10">
                        <ImageIcon size={14} /> Fotos Reais ({currentImages.length})
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-slate-800 shadow-lg z-20 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-slate-800 shadow-lg z-20 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Image Display */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={currentImages[currentImageIndex]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover"
                            alt="Container MB"
                        />
                    </AnimatePresence>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-6 flex gap-2 z-10">
                        {currentImages.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={clsx(
                                    "w-2 h-2 rounded-full cursor-pointer transition-all",
                                    idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                                )}
                            />
                        ))}
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

                    <p className="text-xs text-slate-400 mb-4 px-1">Selecione uma cor de referência para pintura:</p>

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
