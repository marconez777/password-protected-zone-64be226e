
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

/**
 * Formata o conteúdo markdown para exibição
 * Converte marcações simples como **negrito**, *itálico*, listas, subtítulos e tabelas
 */
export function formatMarkdownContent(content: string): React.ReactNode {
  if (!content) return null;
  
  // Função para processar o conteúdo markdown
  const processText = (text: string) => {
    // Processar markdown para cabeçalhos (H1-H6)
    text = text.replace(/^#{6}\s+(.*?)$/gm, '<h6 class="text-sm font-bold mb-1 mt-3">$1</h6>');
    text = text.replace(/^#{5}\s+(.*?)$/gm, '<h5 class="text-base font-bold mb-1 mt-3">$1</h5>');
    text = text.replace(/^#{4}\s+(.*?)$/gm, '<h4 class="text-base font-bold mb-2 mt-3">$1</h4>');
    text = text.replace(/^#{3}\s+(.*?)$/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>');
    text = text.replace(/^#{2}\s+(.*?)$/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>');
    text = text.replace(/^#{1}\s+(.*?)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>');
    
    // Processar negrito
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Processar itálico
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Processar listas
    text = text.replace(/^- (.*?)$/gm, '<li class="ml-5 list-disc">$1</li>');
    text = text.replace(/^\* (.*?)$/gm, '<li class="ml-5 list-disc">$1</li>');
    text = text.replace(/^[0-9]+\. (.*?)$/gm, '<li class="ml-5 list-decimal">$1</li>');
    
    // Processar códigos inline
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-1 rounded font-mono">$1</code>');
    
    // Processar links
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Processar quebras de linha
    text = text.replace(/\n\n/g, '<br /><br />');
    
    return text;
  };
  
  const processedContent = processText(content);
  
  return (
    <div 
      className="prose prose-slate max-w-none" 
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
}

/**
 * Formata o conteúdo do funil de busca para exibir em tabelas
 * Extrai seções como "Topo do Funil", "Meio do Funil", "Fundo do Funil"
 * e suas respectivas palavras-chave em tabelas
 */
export function formatFunnelContent(content: string): React.ReactNode {
  if (!content) return null;

  // Função para dividir o conteúdo em seções
  const sections = [];
  let currentSection = { title: '', content: '' };
  
  // Divide o conteúdo em linhas
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Identifica títulos de seções (1 - Topo do Funil, etc)
    if (line.match(/^\d+\s*[-\.]\s*.*Funil/i) || line.match(/^\*\*\d+\s*[-\.]\s*.*Funil/i)) {
      // Se já temos conteúdo em uma seção atual, salva ela
      if (currentSection.title) {
        sections.push({...currentSection});
      }
      
      // Inicia nova seção
      currentSection = {
        title: line.trim(),
        content: ''
      };
    } 
    // Adiciona conteúdo à seção atual
    else if (currentSection.title) {
      currentSection.content += line + '\n';
    }
  }
  
  // Adiciona a última seção
  if (currentSection.title) {
    sections.push({...currentSection});
  }
  
  // Renderiza cada seção como tabela
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{section.title}</h2>
          {renderFunnelTable(section.content)}
        </div>
      ))}
    </div>
  );
}

/**
 * Função auxiliar para renderizar uma tabela do funil de busca
 */
function renderFunnelTable(content: string): React.ReactNode {
  // Extrai linhas que contêm dados de tabela
  const tableRows = [];
  const lines = content.split('\n').filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Se a linha tem '|' é provavelmente uma linha de tabela
    if (line.includes('|')) {
      // Ignora linhas de separação (que têm apenas '-' e '|')
      if (!line.replace(/[\-\|\s]/g, '')) {
        continue;
      }
      
      // Divide a linha em colunas
      const columns = line
        .split('|')
        .filter(col => col.trim())
        .map(col => col.trim());
      
      tableRows.push(columns);
    }
  }
  
  // Se não encontrou pelo menos uma linha com cabeçalho, retorna o conteúdo como texto
  if (tableRows.length < 1) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }
  
  // O primeiro conjunto de dados é o cabeçalho
  const headerRow = tableRows[0];
  const dataRows = tableRows.slice(1);
  
  return (
    <Table className="border rounded-md">
      <TableHeader>
        <TableRow>
          {headerRow.map((header, index) => (
            <TableHead key={index} className="font-bold">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataRows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
