// Gestion des erreurs non gérées pour éviter les crashs
process.on('unhandledRejection', e => console.error('Erreur non gérée :', e));

const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config(); // pour lire .env (le token)

const app = express();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(PORT, () => console.log(`✅ Serveur web lancé sur le port ${PORT}`));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const CHANNEL_ID = "1378448023625007287";

client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.channel.id === CHANNEL_ID && !message.author.bot) {
    try {
      await message.react("✅");
      await message.react("❌");
    } catch (err) {
      console.error("Erreur lors des réactions :", err);
    }
  }
});

client.login(process.env.TOKEN);
