import type { KairoCommand, KairoResponse } from "../../../../@core/kairo/utils/KairoUtils";
import { SCRIPT_EVENT_COMMAND_IDS, SCRIPT_EVENT_MESSAGES } from "../../constants/scriptevent";
import type { IngameConstants } from "../ingame/InGameManager";
import { GameWorldState, type SystemManager } from "../SystemManager";

export class ScriptEventReceiver {
    private constructor(private readonly systemManager: SystemManager) {}
    public static create(systemManager: SystemManager): ScriptEventReceiver {
        return new ScriptEventReceiver(systemManager);
    }

    public async handleScriptEvent(command: KairoCommand): Promise<void | KairoResponse> {
        switch (command.commandType) {
            case SCRIPT_EVENT_COMMAND_IDS.WORLD_STATE_CHANGE:
                this.handleWorldStateChange(
                    command.data.newState,
                    command.data.ingameConstants as IngameConstants,
                );
                return;
            case SCRIPT_EVENT_COMMAND_IDS.FACTION_RE_REGISTRATION_REQUEST:
                this.systemManager.requestFactionRegistration();
                return;
            case SCRIPT_EVENT_COMMAND_IDS.ROLE_RE_REGISTRATION_REQUEST:
                this.systemManager.requestRoleRegistration();
                return;
            case SCRIPT_EVENT_COMMAND_IDS.INGAME_PHASE_CHANGE:
                this.systemManager.setCurrentPhase(command.data.newPhase);
                return;
            case SCRIPT_EVENT_COMMAND_IDS.WEREWOLF_INGAME_PLAYER_SKILL_TRIGGER:
                return this.systemManager.handlePlayerSkillTrigger(
                    command.data.playerId,
                    command.data.eventType,
                );
            default:
                return;
        }
    }

    private handleWorldStateChange(newState: string, ingameConstants?: IngameConstants): void {
        switch (newState) {
            case SCRIPT_EVENT_MESSAGES.IN_GAME:
                this.systemManager.changeWorldState(GameWorldState.InGame, ingameConstants);
                break;
            case SCRIPT_EVENT_MESSAGES.OUT_GAME:
                this.systemManager.changeWorldState(GameWorldState.OutGame);
                break;
        }
    }
}
