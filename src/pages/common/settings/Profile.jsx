import React, { useState } from "react";
import { ArrowLeft, Camera, Eye, EyeOff } from "lucide-react";

const Profile = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  return (
    <div className="p-4 text-white">
      {/* Header - seta volta ao painel */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 p-2 rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Editar Perfil</h2>
      </div>

      {/* Card */}
      <div className="bg-white/10 rounded-2xl p-6">
        {/* Foto de Perfil */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src="/placeholder.svg"
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
            />
            <button className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-6">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Nome</label>
            <input
              id="name"
              defaultValue="Arsénio Abreu Joaquim"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1">Telefone</label>
            <input
              id="phone"
              defaultValue="+258871484599"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none"
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              defaultValue="origamyinc@gmail.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none"
            />
            <p className="text-green-400 text-xs mt-1">
              Para alterar o e-mail, insira sua senha atual abaixo
            </p>
          </div>

          {/* Nova Senha */}
          <div>
            <label htmlFor="newPassword" className="block text-sm mb-1">Nova Senha</label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                defaultValue="••••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Senha Atual */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm mb-1">Senha Atual</label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Digite sua senha atual"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-green-400 text-xs mt-1">
              Necessário para alterar e-mail ou senha
            </p>
          </div>

          {/* Carga */}
          <div>
            <label htmlFor="role" className="block text-sm mb-1">Carga</label>
            <input
              id="role"
              defaultValue="Vendedor"
              disabled
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white/60"
            />
          </div>

          {/* Botões */}
          <div className="space-y-3 pt-4">
            <button className="w-full bg-[#E18003] hover:bg-[#335048] h-14 rounded-2xl text-lg font-semibold">
              Salvar
            </button>
            <button
              onClick={onBack}
              className="w-full bg-[#E18003] hover:bg-[#335048] h-14 rounded-2xl text-lg font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
