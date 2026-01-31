import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { bot } from "../evobot/index"; // EvoBot TS

interface ServerData {
  [guildId: string]: {
    roleId: string;
  };
}

// Simulando banco de dados em memória (substitua por JSON se quiser)
const servers: ServerData = {};

// Adiciona cargo de verificação
const addVerificationRole = async (guildId: string, userId: string) => {
  try {
    const guild = bot.client.guilds.cache.get(guildId);
    if (!guild) throw new Error("Bot não está nesse servidor");
    
    const roleId = servers[guildId]?.roleId;
    if (!roleId) throw new Error("Cargo de verificação não configurado");
    
    const member = await guild.members.fetch(userId);
    await member.roles.add(roleId);
    
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint do botão de verificação
app.post("/verify", async (req, res) => {
  const { guildId, userId } = req.body;
  if (!guildId || !userId)
    return res.status(400).json({ error: "Faltando guildId ou userId" });
  
  const success = await addVerificationRole(guildId, userId);
  if (success) return res.json({ success: true });
  return res.status(500).json({ success: false, message: "Erro ao adicionar cargo" });
});

// Endpoint para cadastrar cargo de verificação
app.post("/setrole", (req, res) => {
  const { guildId, roleId } = req.body;
  if (!guildId || !roleId)
    return res.status(400).json({ error: "Faltando guildId ou roleId" });
  
  servers[guildId] = { roleId };
  return res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));