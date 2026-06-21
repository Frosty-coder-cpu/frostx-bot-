require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("bug-report")
    .setDescription("Submit a FrostX bug report")
    .addStringOption(option =>
      option.setName("executor")
        .setDescription("Executor used")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("issue")
        .setDescription("Describe the bug")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("proof")
        .setDescription("Screenshot or video link")
        .setRequired(false)
    )
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );

  console.log("FrostX commands deployed.");
})();
