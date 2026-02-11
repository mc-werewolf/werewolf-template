import { DefinitionRegistry, type GameEventHandlerMap } from "@mc-werewolf/game-module";

export const roleSkillHandlers: Record<string, GameEventHandlerMap> = {};

DefinitionRegistry.roleSkillHandlers.register(roleSkillHandlers);
