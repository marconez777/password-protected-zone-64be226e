
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div>
      <h1>Cadastro realizado com sucesso!</h1>
      <p>
        Sua conta foi criada e está pronta para uso.
        Para acessar o sistema, você precisará ativar um plano.
      </p>
      <p>
        Verifique seu e-mail para confirmar seu cadastro e acesse sua conta.
      </p>
      <div>
        <Link to="/login">
          <button>Fazer login</button>
        </Link>
      </div>
      <div>
        <Link to="/subscribe">
          <button>Ver planos</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
