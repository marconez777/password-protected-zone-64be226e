
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type KeywordHistoryItemProps = {
  item: any;
};

export const KeywordHistoryItem: React.FC<KeywordHistoryItemProps> = ({ item }) => {
  const keyword = item.input_original?.palavras_chave || "Sem palavra-chave";
  const formattedDate = format(
    new Date(item.data_criacao), 
    "dd 'de' MMMM 'de' yyyy, HH:mm",
    { locale: ptBR }
  );
  
  return (
    <div>
      <div className="font-medium text-gray-800">{keyword}</div>
      <div className="text-xs text-gray-500 mt-1">{formattedDate}</div>
    </div>
  );
};
