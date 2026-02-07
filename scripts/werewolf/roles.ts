import {
    DefinitionRegistry,
    type RoleDefinition,
    type RoleGroupDefinition,
} from "@mc-werewolf/game-engine";

export const roleGroups: RoleGroupDefinition[] = [];

export const roles: RoleDefinition[] = [];

DefinitionRegistry.roleGroups.register(roleGroups);
DefinitionRegistry.roles.register(roles);
