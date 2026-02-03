import type { SystemManager } from "../../SystemManager";
import { RoleRegistrationRequester } from "./RoleRegistrationRequester";

export class RoleManager {
    private readonly roleRegistrationRequester: RoleRegistrationRequester;
    private constructor(private readonly systemManager: SystemManager) {
        this.roleRegistrationRequester = RoleRegistrationRequester.create(this);
    }
    public static create(systemManager: SystemManager): RoleManager {
        return new RoleManager(systemManager);
    }

    public requestRoleRegistration(): void {
        this.roleRegistrationRequester.request();
    }
}
