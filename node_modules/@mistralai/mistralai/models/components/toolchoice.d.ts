import * as z from "zod";
import { FunctionName, FunctionName$Outbound } from "./functionname.js";
import { ToolTypes } from "./tooltypes.js";
/**
 * ToolChoice is either a ToolChoiceEnum or a ToolChoice
 */
export type ToolChoice = {
    type?: ToolTypes | undefined;
    /**
     * this restriction of `Function` is used to select a specific function to call
     */
    function: FunctionName;
};
/** @internal */
export declare const ToolChoice$inboundSchema: z.ZodType<ToolChoice, z.ZodTypeDef, unknown>;
/** @internal */
export type ToolChoice$Outbound = {
    type?: string | undefined;
    function: FunctionName$Outbound;
};
/** @internal */
export declare const ToolChoice$outboundSchema: z.ZodType<ToolChoice$Outbound, z.ZodTypeDef, ToolChoice>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ToolChoice$ {
    /** @deprecated use `ToolChoice$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ToolChoice, z.ZodTypeDef, unknown>;
    /** @deprecated use `ToolChoice$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ToolChoice$Outbound, z.ZodTypeDef, ToolChoice>;
    /** @deprecated use `ToolChoice$Outbound` instead. */
    type Outbound = ToolChoice$Outbound;
}
//# sourceMappingURL=toolchoice.d.ts.map