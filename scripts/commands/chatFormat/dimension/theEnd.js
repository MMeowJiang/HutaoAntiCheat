import { Hutao } from "../../../lib/import"
import * as setting from "../../../config"

export const theEnd = (player, command) => {
  if (command[4] == undefined) {
    Hutao.World.showHelp(player,
      [`dimension the-end §dset`, Hutao.Player.getLanguage(player).commandChatFormatDimensionTheEnd],
      [`dimension the-end §dview`, Hutao.Player.getLanguage(player).commandView]
    )
  } else if (command[4] == "set") {
    if (command[5] == undefined) {
      Hutao.World.showHelp(player,
        [`the-end set §d<string>`, Hutao.Player.getLanguage(player).commandChatFormatDimensionTheEnd]
      )
    } else {
      if (command[6]) return Hutao.World.wrongCommand(player, command, 6)

      const validString = (string) => {
        if (string.trim() == "") return {
          condition: true,
          reason: Hutao.Player.getLanguage(player).cannotBeEmpty
        }

        return {
          condition: false,
          reason: "None"
        }
      }

      if (validString(command[5]).condition) return Hutao.World.wrong(player, validString(command[5]).reason)

      let config = Hutao.Database.get("db")

      config.data.chatFormat.format.dimension.theEnd = Hutao.World.getNormalCommand(player, 5);

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    }
  } else if (command[4] == "view") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    Hutao.World.log([
      `§7=========================`,
      `§e${Hutao.Player.getLanguage(player).project} §7▶ §6${Hutao.Player.getLanguage(player).theEnd}`,
      ``,
      `§e${Hutao.Player.getLanguage(player).theEnd} §7▶ §r${setting.default.data.chatFormat.format.dimension.theEnd}`,
      `§7=========================`
    ].join("\n§r"), player)
  } else {
    Hutao.World.wrongCommand(player, command, 4)
  }
}