import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Map, Loader2, Check } from 'lucide-react';
import clsx from 'clsx';

const Step4Logistics = ({ formData, setFormData, onSubmit, loading, error }) => {

    // --- IBGE Autocomplete Logic ---
    const [cityQuery, setCityQuery] = useState(formData.Destino || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch cities from IBGE when query changes (debounced)
    useEffect(() => {
        const fetchCities = async () => {
            if (cityQuery.length < 3) {
                setSuggestions([]);
                return;
            }

            setIsSearching(true);
            try {
                // Fetch all municipalities (could be optimized, but lightweight enough for modern connections)
                // Filter client side for better UX or use a specific search endpoint if available.
                // IBGE Direct Search: https://servicodados.ibge.gov.br/api/v1/localidades/municipios

                // For performance, we fetch once or cache? 
                // Actually, caching all 5570 cities is fine (~200KB JSON). 
                // Let's rely on browser caching.
                const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`);
                const data = await response.json();

                // Filter
                const filtered = data
                    .filter(city => city.nome.toLowerCase().includes(cityQuery.toLowerCase()))
                    .slice(0, 5) // Limit to 5 suggestions
                    .map(city => ({
                        id: city.id,
                        name: `${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`
                    }));

                setSuggestions(filtered);
                setShowSuggestions(true);
            } catch (err) {
                console.error("IBGE Error", err);
            } finally {
                setIsSearching(false);
            }
        };

        const timeoutId = setTimeout(() => {
            // Only search if it doesn't match the currently selected valid value (to avoid re-search on selection)
            if (cityQuery !== formData.Destino) {
                fetchCities();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [cityQuery, formData.Destino]);

    const handleSelectCity = (cityName) => {
        setCityQuery(cityName);
        setFormData(prev => ({ ...prev, Destino: cityName }));
        setShowSuggestions(false);
    };

    const handleBlur = () => {
        // Delay hide to allow click
        setTimeout(() => setShowSuggestions(false), 200);
    };

    // -------------------------------

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

            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-6 relative overflow-visible">

                <div className="space-y-4">

                    {/* City Autocomplete */}
                    <div className="relative group z-50">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4 flex items-center gap-2">
                            <MapPin size={12} className="text-indigo-500" /> Cidade e Estado
                        </label>
                        <div className="relative">
                            <input
                                required
                                value={cityQuery}
                                onChange={(e) => {
                                    setCityQuery(e.target.value);
                                    // Reset valid selection if user types
                                    if (formData.Destino && e.target.value !== formData.Destino) {
                                        setFormData(prev => ({ ...prev, Destino: '' }));
                                    }
                                }}
                                onBlur={handleBlur}
                                onFocus={() => cityQuery.length >= 3 && setShowSuggestions(true)}
                                placeholder="Digite a cidade..."
                                className={clsx(
                                    "w-full px-6 py-5 bg-slate-50 border-2 rounded-2xl transition-all outline-none font-bold text-lg text-slate-800 placeholder:text-slate-300 shadow-inner pe-12",
                                    formData.Destino ? "border-green-500 focus:border-green-500 bg-green-50" : "border-slate-100 focus:border-indigo-500 focus:bg-white"
                                )}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                {isSearching ? <Loader2 className="animate-spin" size={20} /> : formData.Destino ? <Check className="text-green-600" size={24} /> : null}
                            </div>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[100]">
                                {suggestions.map((city) => (
                                    <button
                                        key={city.id}
                                        onClick={() => handleSelectCity(city.name)}
                                        className="w-full text-left px-6 py-3 hover:bg-slate-50 font-bold text-slate-600 text-sm border-b border-slate-50 last:border-none flex items-center gap-2"
                                    >
                                        <MapPin size={14} className="text-indigo-400" />
                                        {city.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        <p className="text-[10px] text-slate-400 mt-2 ml-4 font-bold bg-slate-100 inline-block px-2 py-1 rounded-md">
                            ⚠️ Selecione a cidade na lista
                        </p>
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
