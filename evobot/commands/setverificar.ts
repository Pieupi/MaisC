import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';
import path from 'path';

const serversPath = path.join(__dirname, '../servers.json');

export const setverificar = {
  data: new SlashCommandBuilder()
    .setName('setverificar')
    .setDescription('Define o cargo de verificado para este servidor')
    .addRoleOption(option =>
      option.setName('cargo')
      .setDescription('Cargo de verificação')
      .setRequired(true)),
  
  async execute(interaction: CommandInteraction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply("❌ Apenas admins podem configurar este cargo.");
    }
    
    const role = interaction.options.getRole('cargo');
    if (!role) return interaction.reply("❌ Cargo inválido.");
    
    // Lê JSON atual
    const servers: Record < string, string > = JSON.parse(fs.readFileSync(serversPath, 'utf-8'));
    servers[interaction.guildId!] = role.id;
    
    fs.writeFileSync(serversPath, JSON.stringify(servers, null, 2));
    return interaction.reply(`✅ Cargo de verificação configurado: ${role.name}`);
  }
};