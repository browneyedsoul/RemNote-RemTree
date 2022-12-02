import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

/**
 * Simple example snippet plugin which shows how to:
 * - Register style settings
 * - Register Custom CSS
 * - Register a command
 *
 * How to Use:
 * - Tag a Rem with ##Plugin Style, or use the /Add Plugin Style command on a Rem
 * - The Rem will be styled with the CSS defined in the plugin
 */
async function onActivate(plugin: ReactRNPlugin) {
  // Register a setting to change the Rem's text color
  await plugin.settings.registerStringSetting({
    id: "color",
    title: "Text Color (hex)",
    description: "Provide a hex color for the text",
    defaultValue: "#ff0000",
  });

  // Each time the setting changes, re-register the text color css.
  plugin.track(async (reactivePlugin) => {
    const color = await reactivePlugin.settings.getSetting("color");
    await reactivePlugin.app.registerCSS(
      "color",
      `[data-rem-tags~="plugin-style"] { color: ${color}; }`
    );
  });

  // Register a setting to change the Rem's margin
  await plugin.settings.registerStringSetting({
    id: "margin",
    title: "Rem Margin (px)",
    description: "Provide a margin for the Rem",
    defaultValue: "10",
  });

  // Each time the margin setting changes, re-register the margin css.
  plugin.track(async (reactivePlugin) => {
    const margin = await reactivePlugin.settings.getSetting<string>("margin");
    try {
      const marginAsNumber = Number.parseInt(margin);
      await reactivePlugin.app.registerCSS(
        "margin",
        `[data-rem-tags~="plugin-style"] { margin: ${marginAsNumber}px; }`
      );
    } catch {}
  });

  // A command that adds a style tag to the current focused Rem.
  await plugin.app.registerCommand({
    id: "add-style-tag",
    name: "Add Plugin Style",
    description: "Add a style tag to the current focused Rem",
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) {
        return;
      }
      let tag = await plugin.rem.findByName(["Plugin Style"], null);
      if (!tag) {
        tag = await plugin.rem.createRem();
        if (!tag) {
          return;
        }
        await tag.setText(["Plugin Style"]);
      }
      await focusedRem.addTag(tag);
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
