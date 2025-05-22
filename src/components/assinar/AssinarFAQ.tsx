
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AssinarFAQ = () => {
  const faqItems = [
    {
      question: "A MK Ranker serve para o meu nicho?",
      answer: "Sim! Ela é adaptável para qualquer mercado, desde e-commerce até consultórios médicos."
    },
    {
      question: "Preciso entender de SEO?",
      answer: "Não! A plataforma mostra o caminho e executa boa parte das tarefas para você."
    },
    {
      question: "E se eu não gostar?",
      answer: "Sem problemas: você tem nossa garantia total de devolução."
    },
    {
      question: "Funciona para atrair leads qualificados?",
      answer: "Sim! Nosso foco é transformar o tráfego em leads reais, que compram."
    },
    {
      question: "Quanto tempo leva para começar a ver resultados?",
      answer: "Isso pode variar dependendo do seu nicho e da competitividade das palavras-chave, mas nossos usuários geralmente começam a ver melhorias nos rankings em poucos meses. Com estratégias focadas em palavras de cauda longa, alguns veem resultados em semanas."
    },
    {
      question: "Como a IA é treinada para o meu mercado específico?",
      answer: "Nossa IA utiliza dados atualizados do Google e é supervisionada por especialistas em SEO. Ela analisa seu nicho específico, concorrentes e comportamento de busca para gerar recomendações personalizadas."
    }
  ];

  return (
    <div className="py-24 bg-[#0c0a11]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            <span className="text-[#805af5]">❓</span> Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="bg-[#121016] border border-gray-800 rounded-xl overflow-hidden">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800 last:border-0">
                <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#111019] text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AssinarFAQ;
