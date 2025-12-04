// Service to send an image to the GPT analysis API and return suggested fields.
// The API endpoint can be configured with the environment variable VITE_GPT_IMAGE_API
// Expected response shape (example):
// { name: 'Tomate', price: '50', quantity: '20', category: 'Verduras', description: 'Tomate fresco...' }

const API_URL = import.meta.env.VITE_GPT_IMAGE_API || "/api/gpt/analyze-image";

export async function analyzeImageFile(file, options = {}) {
  if (!file) throw new Error("No file provided to analyzeImageFile");

  const form = new FormData();
  form.append("image", file);
  // optional flags (e.g., language hints)
  if (options.lang) form.append("lang", options.lang);

  const res = await fetch(API_URL, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GPT image API error: ${res.status} ${txt}`);
  }

  const json = await res.json();
  return json;
}

export default { analyzeImageFile };
