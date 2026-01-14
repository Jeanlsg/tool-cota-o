import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, MessageCircle, MapPin, Truck, Box, RotateCcw } from 'lucide-react';

const Step5Result = ({ result, formData, onReset }) => {

    useEffect(() => {
        // Fire confetti on mount
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#4f46e5', '#818cf8', '#c7d2fe']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#4f46e5', '#818cf8', '#c7d2fe']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const whatsappLink = `https://wa.me/5547999999999?text=Olá, vi a cotação #${result?.id || 'MB'} de um container ${formData["Tipo do Container"]} para ${formData.Destino}. Valor: ${formatCurrency(result?.["Frete + Container"] || 0)}. Gostaria de finalizar.`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 text-center relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="text-green-600 w-10 h-10" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">Parabéns!</h2>
                <p className="text-slate-500 font-medium mb-8">Aqui está sua cotação exclusiva.</p>

                {/* Pricing Card */}
                <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

                    <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Investimento Total</p>
                    <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                        {formatCurrency(result?.["Frete + Container"] || 0)}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-indigo-100 border-t border-white/20 pt-4">
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><Box size={14} /> {formData["Tipo do Container"]}</span>
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><MapPin size={14} /> {formData.Destino}</span>
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><Truck size={14} /> {result?.["Km de Distância"] || 0}km</span>
                    </div>
                </div>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-200 hover:bg-[#128C7E] hover:shadow-green-300 transition-all transform hover:scale-[1.02] mb-4"
                >
                    <MessageCircle size={24} fill="currentColor" />
                    FALAR COM ATENDENTE
                </a>

                <button
                    onClick={onReset}
                    className="text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-slate-600 transition-colors mx-auto"
                >
                    <RotateCcw size={14} /> Fazer nova simulação
                </button>
            </div>
        </motion.div>
    );
};

export default Step5Result;
