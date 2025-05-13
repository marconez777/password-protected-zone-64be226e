
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResourceResultDisplayProps {
  title: string;
  message?: string;
  children: React.ReactNode;
}

export function ResourceResultDisplay({
  title,
  message,
  children
}: ResourceResultDisplayProps) {
  if (message) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <Alert>
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ScrollArea className="h-full max-h-[600px] pr-4 overflow-auto">
          <div className="space-y-4">
            {children}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
