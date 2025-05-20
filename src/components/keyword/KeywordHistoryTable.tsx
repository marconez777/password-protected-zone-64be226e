
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type KeywordTableProps = {
  keywords: Array<{
    keyword: string;
    relation: string;
    volume: string;
    cpc: string;
  }>;
};

export const KeywordHistoryTable: React.FC<KeywordTableProps> = ({ keywords }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700 border border-gray-300">Palavra-chave</TableHead>
            <TableHead className="font-semibold text-gray-700 border border-gray-300">Relação</TableHead>
            <TableHead className="font-semibold text-gray-700 border border-gray-300">Volume de Busca</TableHead>
            <TableHead className="font-semibold text-gray-700 border border-gray-300">CPC (R$)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <TableCell className="py-2 border border-gray-300">{item.keyword}</TableCell>
              <TableCell className="py-2 border border-gray-300">{item.relation}</TableCell>
              <TableCell className="py-2 border border-gray-300">{item.volume}</TableCell>
              <TableCell className="py-2 border border-gray-300">{item.cpc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
