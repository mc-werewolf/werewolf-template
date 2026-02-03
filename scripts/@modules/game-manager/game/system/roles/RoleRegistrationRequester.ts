import { KairoUtils } from "../../../../../@core/kairo/utils/KairoUtils";
import { SCRIPT_EVENT_COMMAND_IDS } from "../../../constants/scriptevent";
import { KAIRO_COMMAND_TARGET_ADDON_IDS } from "../../../constants/systems";
import { roles } from "../../../../../werewolf/roles/roles";
import { RoleManager } from "./RoleManager";

export class RoleRegistrationRequester {
    private constructor(private readonly roleManager: RoleManager) {}
    public static create(roleManager: RoleManager): RoleRegistrationRequester {
        return new RoleRegistrationRequester(roleManager);
    }

    public request(): void {
        KairoUtils.sendKairoCommand(
            KAIRO_COMMAND_TARGET_ADDON_IDS.WEREWOLF_GAMEMANAGER,
            SCRIPT_EVENT_COMMAND_IDS.ROLE_REGISTRATION_REQUEST,
            {
                roles: roles,
            },
        );
    }
}
