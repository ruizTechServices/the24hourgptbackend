import * as z from "zod";
import { ResponseFormats } from "./responseformats.js";
export type ResponseFormat = {
    /**
     * An object specifying the format that the model must output. Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the message the model generates is in JSON. When using JSON mode you MUST also instruct the model to produce JSON yourself with a system or a user message.
     */
    type?: ResponseFormats | undefined;
};
/** @internal */
export declare const ResponseFormat$inboundSchema: z.ZodType<ResponseFormat, z.ZodTypeDef, unknown>;
/** @internal */
export type ResponseFormat$Outbound = {
    type?: string | undefined;
};
/** @internal */
export declare const ResponseFormat$outboundSchema: z.ZodType<ResponseFormat$Outbound, z.ZodTypeDef, ResponseFormat>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ResponseFormat$ {
    /** @deprecated use `ResponseFormat$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ResponseFormat, z.ZodTypeDef, unknown>;
    /** @deprecated use `ResponseFormat$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ResponseFormat$Outbound, z.ZodTypeDef, ResponseFormat>;
    /** @deprecated use `ResponseFormat$Outbound` instead. */
    type Outbound = ResponseFormat$Outbound;
}
//# sourceMappingURL=responseformat.d.ts.map