import React, { useState } from 'react';
import { 
  Ship, 
  MapPin, 
  Container, 
  Layers, 
  Hash, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Truck,
  Navigation,
  RefreshCw
} from 'lucide-react';

const App = () => {
  // Webhook Tool
  const WEBHOOK_URL = "https://grupomb-n8n.nbiyxi.easypanel.host/webhook/tool-cotacao";
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [quoteResult, setQuoteResult] = useState(null);

  const [formData, setFormData] = useState({
    "Tipo do Container": "20 DC",
    "Estado do Container": "Usados A",
    "Destino": "",
    "Quantidade de containers": 1
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Formatação solicitada: query contendo exatamente { destino, itens: [...] }
      const queryInternal = {
        destino: formData.Destino,
        itens: [{
          modelo: formData["Tipo do Container"],
          estado: formData["Estado do Container"],
          quantidade: Number(formData["Quantidade de containers"])
        }]
      };

      // Payload final em formato de array conforme especificado anteriormente
      const payload = [{
        query: JSON.stringify(queryInternal)
      }];

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Falha ao processar cotação no servidor.');

      const data = await response.json();
      
      // Processamento da resposta
      if (Array.isArray(data) && data.length > 0) {
        setQuoteResult(data[0]);
      } else if (data && typeof data === 'object') {
        setQuoteResult(data);
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Não foi possível obter a cotação. Verifique a conexão ou os dados informados.");
    } finally {
      setLoading(false);
    }
  };

  const containerTypes = ["20 DC", "40 DC", "40 HC"];
  const containerStates = ["Usados A", "One way", "Reefer com motor", "Reefer sem motor"];

  if (submitted && quoteResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-slate-100">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Cotação Realizada!</h2>
            <p className="text-slate-500 font-medium">Confira os valores calculados para sua rota</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Total Geral</p>
                <h3 className="text-4xl font-black">{formatCurrency(quoteResult["Frete + Container"] || 0)}</h3>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-500/30 flex justify-between items-center text-xs">
                <span>Qtd: {quoteResult[" Quantidade de Containers"] || formData["Quantidade de containers"]}</span>
                <span className="bg-indigo-500/40 px-2 py-1 rounded-lg font-bold text-[10px]">{quoteResult["Tipo de Container"] || formData["Tipo do Container"]}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm"><Container size={18} className="text-slate-600" /></div>
                  <span className="text-sm font-semibold text-slate-600">Container</span>
                </div>
                <span className="font-bold text-slate-800">{formatCurrency(quoteResult["Valor do Container"] || 0)}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm"><Truck size={18} className="text-slate-600" /></div>
                  <span className="text-sm font-semibold text-slate-600">Frete Total</span>
                </div>
                <span className="font-bold text-slate-800">{formatCurrency(quoteResult["Valor do Frete"] || 0)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 space-y-4 mb-8 border border-slate-100">
             <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mb-2">
                <Navigation size={14} /> Detalhes da Operação
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Saindo de</p>
                  <p className="font-bold text-slate-700 truncate text-sm">{quoteResult["Saindo de"] || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Distância</p>
                  <p className="font-bold text-slate-700 text-sm">{quoteResult["Km de Distância"] || 0} KM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Valor p/ KM</p>
                  <p className="font-bold text-slate-700 text-sm">{formatCurrency(quoteResult["R$ por KM"] || 0)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Rota Santos-GO?</p>
                  <p className={`font-bold text-sm ${quoteResult["Está na Rota Santos-Goiânia?"] === "Sim" ? "text-green-600" : "text-slate-700"}`}>
                    {quoteResult["Está na Rota Santos-Goiânia?"] || 'Não'}
                  </p>
                </div>
             </div>
          </div>

          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw size={20} />
            NOVA SIMULAÇÃO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg">
              <Ship className="text-white" size={22} />
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tight italic">MB<span className="text-indigo-600 font-bold not-italic">CONTAINER</span></span>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
               Cotação Direta - V3.1
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Sua cotação <br/>em <span className="text-indigo-600">tempo real.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
              Simule o valor do frete e do container com parâmetros diretos para nosso sistema.
            </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Destino Principal */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-indigo-500" /> Cidade de Destino
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  required
                  name="Destino"
                  value={formData.Destino}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-lg placeholder:text-slate-300"
                  placeholder="Ex: Juazeiro, BA"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tipo de Container */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Container size={14} className="text-indigo-500" /> Tipo do Container
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {containerTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, "Tipo do Container": type }))}
                      className={`py-3 rounded-xl text-xs font-black transition-all border-2 ${
                        formData["Tipo do Container"] === type 
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' 
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estado do Container */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={14} className="text-indigo-500" /> Estado
                </label>
                <select 
                  name="Estado do Container"
                  value={formData["Estado do Container"]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                >
                  {containerStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantidade */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Hash size={14} className="text-indigo-500" /> Quantidade de Containers
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  required
                  type="number"
                  min="1"
                  name="Quantidade de containers"
                  value={formData["Quantidade de containers"]}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none font-black text-xl"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-bold">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all transform active:scale-[0.97] shadow-2xl ${
                loading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-indigo-200 border-t-white"></div>
                  <span>CALCULANDO...</span>
                </div>
              ) : (
                <>
                  SIMULAR COTAÇÃO
                  <ArrowRight size={26} />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
