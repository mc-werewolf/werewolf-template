import type { RawMessage } from "@minecraft/server";

export const GameEventTypeValues = [
    "AfterGameStart",
    "BeforeMeetingStart",
    "AfterMeetingStart",
    "SkillUse",
    "SkillUseInMeeting",
    "SkillUseOutMeeting",
    "Death",
] as const;
export type GameEventType = (typeof GameEventTypeValues)[number];

interface RoleKey {
    readonly addonId: string;
    readonly roleId: string;
}

type RoleRef = RoleKey;

export interface RoleDefinition {
    readonly id: string;
    readonly name: RawMessage;
    readonly description: RawMessage;
    readonly factionId: string;
    readonly isExcludedFromSurvivalCheck?: boolean; // 主に狂人枠で使用
    readonly count?: {
        max?: number;
        step?: number;
    };
    readonly color?: string; // 指定しなければ、factionに基づいて自動で決定される
    readonly divinationResult?: string; // 占い結果 roleId (別アドオンでも可)
    readonly clairvoyanceResult?: string; // 霊視結果 roleId (別アドオンでも可)
    readonly knownRoles?: string[]; // 初期に知っている役職
    readonly skills?: SkillDefinition[]; // 役職に紐づくスキル定義
    readonly handleGameEvents?: RoleSkillEvents; // スキルのトリガーとなるイベント
    readonly appearance?: {
        readonly toSelf?: RoleRef; // 自分目線の表示 (呪われし者とか)
        readonly toOthers?: RoleRef; // 他人目線の表示 (テレパシストとか)
        readonly toWerewolves?: RoleRef; // 人狼目線の表示 (スパイとか)
    };
    readonly sortIndex: number; // ソート順
}

export type SkillValue = number | string;
export interface SkillDefinition {
    id: string;
    name: RawMessage;
    cooldown?: SkillValue; // seconds
    maxUses?: SkillValue;
}
export interface SkillEventBinding {
    skillId: string;
}
export type RoleSkillEvents = Partial<Record<GameEventType, SkillEventBinding>>;

export interface FactionDefinition {
    id: string;
    defaultRoleId: string;
    type: FactionCategory;
    name: RawMessage;
    description: RawMessage;
    defaultColor: string;
    victoryCondition: VictoryCondition;
    sortIndex: number;
}

export type FactionCategory = "standard" | "independent" | "neutral";

interface VictoryCondition {
    priority: number;
    condition: Condition;
    description: RawMessage;
    presentation: {
        title: RawMessage;
        message: RawMessage;
    };
}

interface GameOutcomeRule {
    id: string;
    priority: number;
    condition: Condition;
    outcome: GameOutcome;
    presentation: {
        title: RawMessage;
        message: RawMessage;
    };
}

type GameVariableKey = "remainingTime" | "alivePlayerCount";

type NumericValue = number | GameVariableKey | { factionAliveCount: string };

type Condition =
    | StandardFactionVictoryCondition
    | ComparisonCondition
    | FactionAliveCountComparison
    | PlayerAliveCountComparison
    | RemainingTimeComparison
    | AndCondition
    | OrCondition
    | NotCondition;

export interface StandardFactionVictoryCondition {
    type: "standardFactionVictory";
}

interface ComparisonCondition {
    type: "comparison";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    left: NumericValue;
    right: NumericValue;
}

interface FactionAliveCountComparison {
    type: "factionAliveCount";
    factionId: string;
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface PlayerAliveCountComparison {
    type: "playerAliveCount";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface RemainingTimeComparison {
    type: "remainingTime";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface AndCondition {
    type: "and";
    conditions: Condition[];
}

interface OrCondition {
    type: "or";
    conditions: Condition[];
}

interface NotCondition {
    type: "not";
    condition: Condition;
}

type GameOutcome =
    | { type: "victory"; factionId: string }
    | { type: "draw"; reason: string }
    | { type: "end"; reason: string };
