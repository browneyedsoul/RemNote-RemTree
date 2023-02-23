import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

export const [REMTREE_POWERUP, REMTREEC_POWERUP] = ["remtree_powerup", "remtreec_powerup"];

let TreeCSS: string;

async function onActivate(plugin: ReactRNPlugin) {
  try {
    await fetch("snippet.css")
      .then((response) => response.text())
      .then((text) => {
        TreeCSS = text;
        console.log("Rem Tree Installed");
      })
      .catch((error) => console.error(error));
  } catch (error) {
    await fetch("https://raw.githubusercontent.com/browneyedsoul/RemNote-RemTree/main/src/snippet.css")
      .then((response) => response.text())
      .then((text) => {
        TreeCSS = text;
        console.log("Rem Tree Installed from cdn");
      })
      .catch((error) => console.error(error));
  }
  
  await plugin.app.registerCSS("rem-tree", TreeCSS);
  
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
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
