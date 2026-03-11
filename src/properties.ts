import { MinecraftModule, type AddonProperties } from "@kairo-js/router";

/**
 * 文末に # が記述されている箇所を適宜修正して使用します。
 * Modify and use where # is written at the end of the sentence as appropriate
 */
export const properties: AddonProperties = {
    id: "werewolf-template", # // a-z & 0-9 - _
    metadata: {
        /** 製作者の名前 */
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
            version: "2.4.0", #
        },
        {
            module_name: MinecraftModule.ServerUi,
            version: "2.0.0", #
        },
    ],
    /** 前提アドオン */
    requiredAddons: {
        /**
         * id: version (string) // "kairo": "1.0.0"
         */
        "werewolf-gamemanager": "1.0.0-dev.1",
    },
    tags: [],
};
