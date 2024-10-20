import * as z from "zod";
import { FunctionT, FunctionT$Outbound } from "./function.js";
import { ToolTypes } from "./tooltypes.js";
export type Tool = {
    type?: ToolTypes | undefined;
    function: FunctionT;
};
/** @internal */
export declare const Tool$inboundSchema: z.ZodType<Tool, z.ZodTypeDef, unknown>;
/** @internal */
export type Tool$Outbound = {
    type?: string | undefined;
    function: FunctionT$Outbound;
};
/** @internal */
export declare const Tool$outboundSchema: z.ZodType<Tool$Outbound, z.ZodTypeDef, Tool>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace Tool$ {
    /** @deprecated use `Tool$inboundSchema` instead. */
    const inboundSchema: z.ZodType<Tool, z.ZodTypeDef, unknown>;
    /** @deprecated use `Tool$outboundSchema` instead. */
    const outboundSchema: z.ZodType<Tool$Outbound, z.ZodTypeDef, Tool>;
    /** @deprecated use `Tool$Outbound` instead. */
    type Outbound = Tool$Outbound;
}
//# sourceMappingURL=tool.d.ts.map