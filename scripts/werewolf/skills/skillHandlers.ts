import { DefinitionRegistry, type GameEventHandlerMap } from "@mc-werewolf/game-engine";

export const roleSkillHandlers: Record<string, GameEventHandlerMap> = {};

DefinitionRegistry.roleSkillHandlers.register(roleSkillHandlers);
