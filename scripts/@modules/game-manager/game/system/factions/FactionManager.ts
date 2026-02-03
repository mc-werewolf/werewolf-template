import type { SystemManager } from "../../SystemManager";
import { FactionRegistrationRequester } from "./FactionRegistrationRequester";

export class FactionManager {
    private readonly factionRegistrationRequester: FactionRegistrationRequester;
    private constructor(private readonly systemManager: SystemManager) {
        this.factionRegistrationRequester = FactionRegistrationRequester.create(this);
    }
    public static create(systemManager: SystemManager): FactionManager {
        return new FactionManager(systemManager);
    }

    public requestFactionRegistration(): void {
        this.factionRegistrationRequester.request();
    }
}
