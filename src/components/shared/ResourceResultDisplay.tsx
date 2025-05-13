
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceResultDisplayProps {
  title: string;
  children: React.ReactNode;
  message?: string;
}

export function ResourceResultDisplay({ title, children, message }: ResourceResultDisplayProps) {
  if (message) {
    return (
      <Card className="shadow-lg w-full">
        <CardContent className="pt-6">
          <p className="text-gray-700">{message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg w-full bg-white">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-6 text-mkranker-purple border-b pb-2">{title}</h3>
        
        <div className="h-full overflow-visible">
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="pb-6">
              {children}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
