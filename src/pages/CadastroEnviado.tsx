
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CadastroEnviado = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Cadastro Enviado!</CardTitle>
          <CardDescription className="text-lg">
            Aguarde a aprovação pelo administrador
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-muted-foreground">
            Seu cadastro foi recebido com sucesso e está aguardando aprovação. Assim que for aprovado, você receberá uma notificação e poderá acessar o sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/login">Voltar para o login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CadastroEnviado;
