
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// This page has been simplified to just show a message
const UsageLimit = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Redirecionamento</CardTitle>
            <CardDescription className="text-center">
              Esta página foi removida.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <p>Esta funcionalidade não está mais disponível.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link to="/dashboard">
                Voltar ao Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UsageLimit;
