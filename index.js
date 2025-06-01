process.on('unhandledRejection', e => console.error(e));
const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config(); // pour lire .env (le token)

const app = express();
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(3000, () => console.log("✅ Serveur web lancé"));

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
