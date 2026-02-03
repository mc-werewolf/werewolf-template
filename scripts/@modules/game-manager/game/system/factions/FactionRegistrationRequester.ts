import { KairoUtils } from "../../../../../@core/kairo/utils/KairoUtils";
import { factions } from "../../../../../werewolf/factions/factions";
import { SCRIPT_EVENT_COMMAND_IDS } from "../../../constants/scriptevent";
import { KAIRO_COMMAND_TARGET_ADDON_IDS } from "../../../constants/systems";
import { FactionManager } from "./FactionManager";

export class FactionRegistrationRequester {
    private constructor(private readonly factionManager: FactionManager) {}
    public static create(factionManager: FactionManager): FactionRegistrationRequester {
        return new FactionRegistrationRequester(factionManager);
    }

    public request(): void {
        KairoUtils.sendKairoCommand(
            KAIRO_COMMAND_TARGET_ADDON_IDS.WEREWOLF_GAMEMANAGER,
            SCRIPT_EVENT_COMMAND_IDS.FACTION_REGISTRATION_REQUEST,
            {
                factions: factions,
            },
        );
    }
}
