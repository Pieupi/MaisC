import fs from "fs";
import path from "path";
import { GuildMember } from "discord.js";

const serversPath = path.join(__dirname, "../servers.json");

let SERVERS: Record < string, string > = JSON.parse(fs.readFileSync(serversPath, "utf-8"));

export default {
  name: "guildMemberAdd",
  once: false,
  async execute(member: GuildMember) {
    const roleID = SERVERS[member.guild.id];
    if (!roleID) return;
    
    try {
      await member.roles.add(roleID);
      console.log(`✅ ${member.user.tag} verificado no servidor ${member.guild.name}`);
    } catch (err) {
      console.error(err);
    }
  },
};