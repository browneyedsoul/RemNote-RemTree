import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

export const [REMTREE_POWERUP, REMTREEC_POWERUP] = ["remtree_powerup", "remtreec_powerup"];

let TreeCSS = "";

fetch("snippet.css")
  .then((response) => response.text())
  .then((text) => {
    // Use the entire contents of the CSS file
    TreeCSS = text;

    // Use the extracted text in your JavaScript code
    console.log(TreeCSS);
  })
  .catch((error) => console.error(error));

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerPowerup("Tree", REMTREE_POWERUP, "A Power-up Block for decorating texts", { slots: [] });
  await plugin.app.registerPowerup("Treec", REMTREEC_POWERUP, "A Power-up Block for decorating texts", { slots: [] });

  await plugin.app.registerCommand({
    id: "browneyedsoul-RemTree",
    name: "Tree",
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();
      await rem?.addPowerup(REMTREE_POWERUP);
    },
  });
  await plugin.app.registerCommand({
    id: "browneyedsoul-RemTree-Container",
    name: "Treec",
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();
      await rem?.addPowerup(REMTREEC_POWERUP);
    },
  });
  
  await plugin.app.registerCSS("rem-tree", TreeCSS);
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
