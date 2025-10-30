import React from "react";

const Language = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Idioma</h2>
      <p className="text-white/70">Selecione o idioma da aplicação:</p>
      <select className="mt-2 p-2 rounded bg-gray-800 text-white">
        <option>Português</option>
        <option>Emakhua</option>
      </select>
    </div>
  );
};

export default Language;
