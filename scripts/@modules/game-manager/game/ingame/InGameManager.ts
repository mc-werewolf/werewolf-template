import { SCRIPT_EVENT_COMMAND_IDS } from "../../constants/scriptevent";
import { KAIRO_COMMAND_TARGET_ADDON_IDS } from "../../constants/systems";
import { roles, type GameEventType, type RoleDefinition } from "../../../../werewolf/roles/roles";
import type { SystemManager } from "../SystemManager";
import { InGameEventManager } from "./events/InGameEventManager";
import type { WerewolfGameData } from "./game/WerewolfGameData";
import { SkillManager } from "./game/SkillManager";
import { playerData, type SelfPlayerData } from "../../../../werewolf/player";
import { world } from "@minecraft/server";
import { GameManager } from "./game/GameManager";
import { KairoUtils, type KairoResponse } from "../../../../@core/kairo/utils/KairoUtils";
import type { FactionDefinition } from "../../../../werewolf/factions/factions";
import { onSecondUpdate, onTickUpdate } from "../../../../werewolf/update";
import { GamePhase } from "./GamePhase";

export interface PlayerDataDTO {
    playerId: string;
    name: string;
    isAlive: boolean;
    isVictory: boolean;
    role: RoleDefinition | null;
}

export type IngameConstants = {
    roleDefinitions: Record<string, RoleDefinition[]>;
    factionDefinitions: Record<string, FactionDefinition[]>;
};

export class InGameManager {
    private currentPhase: GamePhase = GamePhase.Waiting;

    private readonly inGameEventManager: InGameEventManager;
    private readonly gameManager: GameManager;
    private readonly skillManager: SkillManager;

    private readonly playerDataByPlayerId = new Map<string, SelfPlayerData>();

    private constructor(
        private readonly systemManager: SystemManager,
        private readonly ingameConstants: IngameConstants,
    ) {
        this.inGameEventManager = InGameEventManager.create(this);
        this.gameManager = GameManager.create(this, {
            onTickUpdate: onTickUpdate,
            onSecondUpdate: onSecondUpdate,
        });
        this.skillManager = SkillManager.create(this, roles);
        this.initSelfPlayersData();
    }

    public static create(
        systemManager: SystemManager,
        ingameConstants: IngameConstants,
    ): InGameManager {
        return new InGameManager(systemManager, ingameConstants);
    }

    public getInGameEventManager(): InGameEventManager {
        return this.inGameEventManager;
    }

    public async handlePlayerSkillTrigger(
        playerId: string,
        eventType: GameEventType,
    ): Promise<KairoResponse> {
        return this.skillManager.emitPlayerEvent(playerId, eventType);
    }

    public async getWerewolfGameData(): Promise<WerewolfGameData | null> {
        const kairoResponse = await KairoUtils.sendKairoCommandAndWaitResponse(
            KAIRO_COMMAND_TARGET_ADDON_IDS.WEREWOLF_GAMEMANAGER,
            SCRIPT_EVENT_COMMAND_IDS.GET_WEREWOLF_GAME_DATA,
            {},
        );

        if (!kairoResponse.success) return null;
        return kairoResponse.data as WerewolfGameData;
    }

    public getRoleDefinition(roleId: string): RoleDefinition | undefined {
        return roles.find((role) => role.id === roleId);
    }

    public getIngameConstants(): IngameConstants {
        return this.ingameConstants;
    }

    public getCurrentPhase(): GamePhase {
        return this.currentPhase;
    }

    public setCurrentPhase(newPhase: GamePhase): void {
        this.currentPhase = newPhase;

        switch (newPhase) {
            case GamePhase.InGame:
                this.gameManager.startGame();
                break;
            case GamePhase.Result:
                this.gameManager.finishGame();
                break;
        }
    }

    public getSelfPlayerData(playerId: string): SelfPlayerData | undefined {
        return this.playerDataByPlayerId.get(playerId);
    }

    public getSelfPlayersData(): readonly SelfPlayerData[] {
        return Array.from(this.playerDataByPlayerId.values());
    }

    private initSelfPlayersData(): void {
        const players = world.getPlayers();

        for (const player of players) {
            this.playerDataByPlayerId.set(player.id, {
                ...playerData,
                playerId: player.id,
            });
        }
    }
}
