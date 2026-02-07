import { DefinitionRegistry, type GameEventContext } from "@mc-werewolf/game-engine";

export const onTickUpdate = (ev: GameEventContext): void => {
    const { playerData, playersData, ingameConstants } = ev;
};

export const onSecondUpdate = (ev: GameEventContext): void => {
    const { playerData, playersData, ingameConstants } = ev;
};

DefinitionRegistry.updateHandlers.register({ onTickUpdate, onSecondUpdate });
