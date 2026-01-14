import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Globe, Leaf, Zap, ShieldCheck } from 'lucide-react';

const Step1Lead = ({ formData, setFormData, onNext }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isValid = formData.nome && formData.nome.length > 2 && formData.email && formData.email.includes('@');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) onNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl mx-auto space-y-12"
        >
            <div className="flex flex-col lg:flex-row gap-12 items-center">

                {/* Left Side: Form */}
                <div className="w-full max-w-lg mx-auto lg:mx-0 flex-1">
                    <div className="text-center lg:text-left mb-10 space-y-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <img src="/logo.png" alt="MB Container Logo" className="h-24 md:h-28 w-auto object-contain drop-shadow-xl" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Seja bem-vindo
                        </h1>
                        <p className="text-xl font-bold text-slate-600">
                            Compre seu container e <span className="text-indigo-600 underline decoration-4 decoration-indigo-200">pague só na entrega</span>.
                        </p>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                            Obtenha a cotação em tempo real
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem] -z-0 opacity-50" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Nome Completo</label>
                                    <User className="absolute left-5 top-[2.8rem] text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        required
                                        name="nome"
                                        value={formData.nome || ''}
                                        onChange={handleChange}
                                        placeholder="Seu nome completo"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 shadow-sm"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">E-mail Profissional</label>
                                    <Mail className="absolute left-5 top-[2.8rem] text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        placeholder="seu@email.com"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 shadow-sm"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={!isValid}
                                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl ${isValid
                                    ? 'bg-indigo-600 text-white shadow-indigo-200 hover:shadow-indigo-300'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                CLIQUE AQUI PARA OBTER COTAÇÃO <ArrowRight size={22} strokeWidth={3} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: About Us (Interactive Map Visual) */}
                <div className="flex-1 hidden lg:block">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>

                        <div className="relative z-10 mb-8">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Sobre nós</h2>
                            <p className="text-slate-600 leading-relaxed font-medium mb-4">
                                A <strong className="text-indigo-600">MB Containers</strong> nasceu com a missão de oferecer qualidade e excelência no mercado. Atuamos em território nacional e internacional, atendendo diversos clientes ao redor do mundo.
                            </p>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Cuidamos de cada etapa do processo para assegurar eficiência e controle total, proporcionando soluções que fazem a diferença.
                            </p>
                        </div>

                        {/* Quick Stats / Icons */}
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-green-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2">
                                <Globe className="text-green-600" size={32} />
                                <span className="font-bold text-slate-700 text-sm">Atuação Global</span>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="text-indigo-600" size={32} />
                                <span className="font-bold text-slate-700 text-sm">Segurança Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile About Us (Visible only on small screens) */}
            <div className="lg:hidden bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Sobre a MB Containers</h2>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">
                    Atuamos em território nacional e internacional. Cuidamos de cada etapa do processo para assegurar eficiência e controle total.
                </p>
            </div>

        </motion.div >
    );
};

export default Step1Lead;
