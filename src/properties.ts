import { MinecraftModule, type AddonProperties } from "@kairo-js/router";

/**
 * 譁・忰縺ｫ # 縺瑚ｨ倩ｿｰ縺輔ｌ縺ｦ縺・ｋ邂・園繧帝←螳應ｿｮ豁｣縺励※菴ｿ逕ｨ縺励∪縺吶・
 * Modify and use where # is written at the end of the sentence as appropriate
 */
export const properties: AddonProperties = {
    id: "werewolf-template", # // a-z & 0-9 - _
    metadata: {
        /** 陬ｽ菴懆・・蜷榊燕 */
        authors: [
            //"shizuku86"
        ],
    },
    header: {
        name: "Werewolf Template", #
        description:
            "A starter template for developing Minecraft Bedrock Werewolf games powered by Kairo.", #
        version: {
            major: 1,
            minor: 0,
            patch: 0,
            // prerelease: "preview.1",
            // build: "abc123",
        },
        min_engine_version: [1, 21, 132],
    },
    dependencies: [
        {
            module_name: MinecraftModule.Server,
            version: "2.7.0", #
        },
        {
            module_name: MinecraftModule.ServerUi,
            version: "2.0.0", #
        },
    ],
    /** 蜑肴署繧｢繝峨が繝ｳ */
    requiredAddons: {
        /**
         * id: version (string) // "kairo": "1.0.0"
         */
        "werewolf-gamemanager": "1.0.0-dev.1",
    },
    tags: [],
};
