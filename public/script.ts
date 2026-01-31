const verifyBtn = document.getElementById("verifyBtn") as HTMLButtonElement;

verifyBtn?.addEventListener("click", async () => {
  const guildId = prompt("1463142049787150370:");
  const userId = prompt("1368660583813218401:");
  
  if (!guildId || !userId) return alert("Você precisa preencher ambos!");
  
  try {
    const response = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guildId, userId }),
    });
    
    const data = await response.json();
    
    if (data.success) alert("✅ Verificação concluída! Cargo adicionado");
    else alert("❌ Falha na verificação, tente novamente");
  } catch (err) {
    console.error(err);
    alert("❌ Erro ao comunicar com o servidor");
  }
});