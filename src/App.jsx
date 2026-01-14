import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Ship } from 'lucide-react';

import Step1Lead from './components/Step1Lead';
import Step2Config from './components/Step2Config';
import Step3Customize from './components/Step3Customize';
import Step4Logistics from './components/Step4Logistics';
import Step5Result from './components/Step5Result';

const App = () => {
  const WEBHOOK_URL = "https://grupomb-n8n.nbiyxi.easypanel.host/webhook/tool-cotacao";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quoteResult, setQuoteResult] = useState(null);

  // Initial Form Data
  const [formData, setFormData] = useState({
    // Step 1: Lead
    nome: '',
    email: '',

    // Step 2: Config
    "Tipo do Container": "20 DC",
    "Estado do Container": "Usados A",
    "Quantidade de containers": 1,

    // Step 3: Customize
    cor: { name: 'Padrão (Azul/Cinza)', hex: '#2c3e50', id: 'standard' },

    // Step 4: Logistics
    "Destino": "",
    "cep": ""
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Legacy Structure for Calculation Logic
      const queryInternal = {
        destino: formData.Destino,
        itens: [{
          modelo: formData["Tipo do Container"],
          estado: formData["Estado do Container"],
          quantidade: Number(formData["Quantidade de containers"])
        }],
        // Append new fields for automation (PDF/Email) without breaking calc logic
        // Placing them at root level of queryInternal ensures they travel with the object
        lead: {
          nome: formData.nome,
          email: formData.email,
          cep: formData.cep
        },
        personalizacao: {
          cor: formData.cor?.name || formData.cor // Handle both object and string (legacy safety)
        }
      };

      // Payload wrapper as required
      const payload = [{
        query: JSON.stringify(queryInternal)
      }];

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Falha ao conectar com servidor de cotação.');

      const data = await response.json();

      const result = (Array.isArray(data) && data.length > 0) ? data[0] : data;
      setQuoteResult(result);
      nextStep(); // Go to Step 5

    } catch (err) {
      console.error(err);
      setError("Não foi possível realizar a cotação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setQuoteResult(null);
    setFormData(prev => ({ ...prev, Destino: "", nome: "", email: "" }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={handleReset} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="MB Container Logo" className="h-12 w-auto object-contain" />
          </div>

          <div className="flex gap-2">
            {/* Step Indicators */}
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-500 ${s <= step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}
              />
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start p-6 relative overflow-y-auto">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-5xl z-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1Lead
                key="step1"
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <Step2Config
                key="step2"
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <Step3Customize
                key="step3"
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 4 && (
              <Step4Logistics
                key="step4"
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
              />
            )}
            {step === 5 && (
              <Step5Result
                key="step5"
                result={quoteResult}
                formData={formData}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="bg-[#005F33] text-white pt-16 pb-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="MB Logo" className="h-16 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-green-100/80 text-sm leading-relaxed">
              Excelência em containers e logística. Soluções completas para você.
            </p>
          </div>

          {/* Addresses */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Endereços</h4>
            <ul className="space-y-4 text-sm text-green-100/80">
              <li>
                <strong className="block text-white">Brasil:</strong>
                Av. Pres. Wilson, 151 - José Menino, Santos - SP, 11065-201
              </li>
              <li>
                <strong className="block text-white">Portugal:</strong>
                R. Tomás da Fonseca, 1600-160 Lisboa, Portugal
              </li>
              <li>
                <strong className="block text-white">Espanha:</strong>
                Calle de Isabel Colbrand, Fuencarral-El Pardo, 28050, Madrid
              </li>
              <li>
                <strong className="block text-white">Estados Unidos:</strong>
                175 SW 7th St Suite 1900, Miami, FL 33130
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contato</h4>
            <ul className="space-y-3 text-sm text-green-100/80">
              <li>
                <span className="block text-xs uppercase opacity-70">Telefone:</span>
                (13) 98813-3069
              </li>
              <li>
                <span className="block text-xs uppercase opacity-70">E-mail:</span>
                grupo.mb.negocios@gmail.com
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Horário de Atendimento</h4>
            <ul className="space-y-2 text-sm text-green-100/80">
              <li className="flex justify-between border-b border-green-800/50 pb-2">
                <span>Segunda a Sexta</span>
                <span className="font-bold text-white">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-green-800/50 pb-2">
                <span>Sábado</span>
                <span className="font-bold text-white">08:00 - 12:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Domingo</span>
                <span className="text-red-300 font-bold">Fechado</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-green-800/50 text-center text-xs font-bold uppercase tracking-widest text-green-100/40">
          GRUPO MB® 2024. TODOS OS DIREITOS RESERVADOS.
        </div>
      </footer>
    </div>
  );
};

export default App;
