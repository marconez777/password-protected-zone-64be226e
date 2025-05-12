
import { Link } from "react-router-dom";

const Subscribe = () => {
  return (
    <div>
      <h1>Escolha seu plano</h1>
      <p>
        Para acessar o sistema, você precisa ter um plano ativo.
        Escolha o plano que melhor se adequa às suas necessidades.
      </p>

      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        {/* Plano Mensal */}
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Plano Mensal</h2>
          <div>
            <span>R$29,90</span>
            <span>/mês</span>
          </div>
          <p>Acesso mensal ao sistema</p>
          <ul>
            <li>Acesso completo a todas as funcionalidades</li>
            <li>Suporte prioritário</li>
            <li>Cancelamento a qualquer momento</li>
          </ul>
          <button>Assinar</button>
        </div>

        {/* Plano Anual */}
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>Plano Anual</h2>
          <div>
            <span>R$299,90</span>
            <span>/ano</span>
          </div>
          <p>Economize 16% em comparação ao plano mensal</p>
          <ul>
            <li>Acesso completo a todas as funcionalidades</li>
            <li>Suporte prioritário</li>
            <li>Cancelamento a qualquer momento</li>
            <li>2 meses grátis</li>
          </ul>
          <button>Assinar</button>
        </div>
      </div>

      <div>
        <p>
          Já tem um plano ativo?{" "}
          <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
