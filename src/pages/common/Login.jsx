import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email ou nome
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // Buscar usuário no Firestore pelo nome ou email
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", "==", identifier)
      );

      const nameQuery = query(usersRef, where("name", "==", identifier));
      const snapshot = await getDocs(q);
      const snapshotName = snapshot.empty ? await getDocs(nameQuery) : snapshot;

      if (snapshotName.empty) {
        setError("Usuário não encontrado.");
        setLoading(false);
        return;
      }

      // Obtem o primeiro usuário encontrado
      const userData = snapshotName.docs[0].data();
      const userEmail = userData.email || `${Date.now()}@placeholder.com`;

      // Login com email (necessário para autenticação Firebase)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      const role = userData.role;
      if (role === "agricultor") navigate("/agricultor");
      else if (role === "transportador") navigate("/transportador");
      else navigate("/comprador");

    } catch (err) {
      setError("Erro ao fazer login. Verifique os dados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#05291C] p-8">
      <div className="flex flex-col justify-center w-full max-w-md rounded-2xl px-8 py-10 border border-[#103a2f] bg-[#112C25]/70 backdrop-blur-md shadow-lg text-white text-sm">
        <h2 className="text-2xl font-bold text-[#FE9300]">Entrar</h2>
        <p className="text-slate-300 mt-1 mb-6">Acesse a sua conta</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="mt-2" onSubmit={handleSubmit}>
          <label className="block mb-1 font-medium text-slate-200">
            E-mail ou Nome
          </label>
          <input
            type="text"
            placeholder="Digite e-mail ou nome"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 mb-4 bg-[#05291C] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 transition focus:ring-[#BF7F17] focus:border-[#BF7F17] placeholder-slate-500"
          />

          <label className="block mb-1 font-medium text-slate-200">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite a sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-3 bg-[#05291C] border border-slate-700 rounded-xl focus:outline-none focus:ring-2 transition focus:ring-[#BF7F17] focus:border-[#BF7F17] placeholder-slate-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 px-4 py-3 font-semibold text-white rounded-4xl transition duration-300
              ${
                loading
                  ? "bg-[#FE9300]/70 cursor-not-allowed"
                  : "bg-[#FE9300] hover:bg-[#E38004] hover:scale-105"
              }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/select-role")}
              className="text-[#FE9300] hover:underline"
            >
              Criar conta
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium transition hover:bg-white/20 hover:scale-105"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
