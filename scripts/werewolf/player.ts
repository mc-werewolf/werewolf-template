import { DefinitionRegistry, type SelfPlayerData } from "@mc-werewolf/game-engine";

export type { SelfPlayerData };

// 任意にプロパティを追加可能。
// ここで定義したものがデフォルト値となります。
export const playerData: SelfPlayerData = {
    playerId: "", // playerId は各プレイヤーのIdが自動で割り振られます。(このままにしておいてください)
};

DefinitionRegistry.player.register(playerData);
