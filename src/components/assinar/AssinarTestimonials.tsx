
import React from 'react';

const AssinarTestimonials = () => {
  const testimonials = [
    {
      name: "Dr. Gabriel",
      title: "Psiquiatra",
      text: "Eu tentava criar conteúdo, mas não sabia o que ranqueava. Com a MK Ranker, em 3 meses, meu site saiu do zero para 1500 leads/mês.",
      stats: "100k de Tráfego em 6 meses",
      image: "/lovable-uploads/435adb76-fa36-4074-b0aa-bf0000868f61.png"
    },
    {
      name: "Paulo",
      title: "Dono de e-commerce",
      text: "Minhas palavras até ranqueavam, mas ninguém comprava. Com a MK Ranker, aprendi a escolher as certas e meu faturamento triplicou.",
      stats: "Faturamento Triplicado",
    },
    {
      name: "Dr. Diego Gastro",
      title: "Gastroenterologista",
      text: "A plataforma me mostrou exatamente quais termos buscar para atrair pacientes que realmente precisam dos meus serviços.",
      stats: "110k de Tráfego em 3 meses",
      image: "/lovable-uploads/435adb76-fa36-4074-b0aa-bf0000868f61.png"
    }
  ];

  return (
    <div className="py-24 bg-[#121016]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            <span className="text-[#805af5]">💬</span> Histórias Reais: Resultados Reais
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-[#111019] border border-gray-800 rounded-xl p-6"
              >
                <div className="mb-4">
                  {testimonial.stats && (
                    <h3 className="text-xl font-bold text-[#cd99ff] mb-1">
                      {testimonial.stats}
                    </h3>
                  )}
                  <p className="text-gray-400">
                    {testimonial.name}, {testimonial.title}
                  </p>
                </div>
                
                <p className="text-white text-lg mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                {testimonial.image && (
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <img 
                      src={testimonial.image} 
                      alt={`Resultados de ${testimonial.name}`}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-xl text-white mt-10 text-center">
            E você? Está pronto para ser o próximo caso de sucesso?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssinarTestimonials;
