import type { RoleDefinition } from "../../../../../werewolf/roles/roles";

export type WerewolfGameData = {
    remainingTicks: number;
    playersData: PlayerData[];
};

export type PlayerData = {
    player: {
        id: string;
        name: string;
    };
    role: RoleDefinition | null;
    isAlive: boolean;
    isLeave: boolean;
    isVictory: boolean;
};
