import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";
export declare const TextChunkType: {
    readonly Text: "text";
};
export type TextChunkType = ClosedEnum<typeof TextChunkType>;
export type TextChunk = {
    type?: "text" | undefined;
    text: string;
};
/** @internal */
export declare const TextChunkType$inboundSchema: z.ZodNativeEnum<typeof TextChunkType>;
/** @internal */
export declare const TextChunkType$outboundSchema: z.ZodNativeEnum<typeof TextChunkType>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace TextChunkType$ {
    /** @deprecated use `TextChunkType$inboundSchema` instead. */
    const inboundSchema: z.ZodNativeEnum<{
        readonly Text: "text";
    }>;
    /** @deprecated use `TextChunkType$outboundSchema` instead. */
    const outboundSchema: z.ZodNativeEnum<{
        readonly Text: "text";
    }>;
}
/** @internal */
export declare const TextChunk$inboundSchema: z.ZodType<TextChunk, z.ZodTypeDef, unknown>;
/** @internal */
export type TextChunk$Outbound = {
    type: "text";
    text: string;
};
/** @internal */
export declare const TextChunk$outboundSchema: z.ZodType<TextChunk$Outbound, z.ZodTypeDef, TextChunk>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace TextChunk$ {
    /** @deprecated use `TextChunk$inboundSchema` instead. */
    const inboundSchema: z.ZodType<TextChunk, z.ZodTypeDef, unknown>;
    /** @deprecated use `TextChunk$outboundSchema` instead. */
    const outboundSchema: z.ZodType<TextChunk$Outbound, z.ZodTypeDef, TextChunk>;
    /** @deprecated use `TextChunk$Outbound` instead. */
    type Outbound = TextChunk$Outbound;
}
//# sourceMappingURL=textchunk.d.ts.map