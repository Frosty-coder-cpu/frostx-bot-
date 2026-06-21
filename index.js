require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let bugCount = 1;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "bug-report") {
    const executor = interaction.options.getString("executor");
    const issue = interaction.options.getString("issue");
    const proof = interaction.options.getString("proof") || "No proof provided.";

    const bugId = `BUG-${String(bugCount).padStart(3, "0")}`;
    bugCount++;

    const bugChannel = await client.channels.fetch(process.env.BUG_CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setTitle(`🐞 ${bugId} | FrostX Bug Report`)
      .setColor("#4A9FE7")
      .addFields(
        { name: "Status", value: "Open", inline: true },
        { name: "Executor", value: executor, inline: true },
        { name: "Reporter", value: `${interaction.user}`, inline: true },
        { name: "Issue", value: issue },
        { name: "Proof", value: proof }
      )
      .setFooter({ text: "FrostX Bug Tracker ❄️" })
      .setTimestamp();

    await bugChannel.send({ embeds: [embed] });

    await interaction.reply({
      content: `❄️ Bug report submitted as **${bugId}**.`,
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
