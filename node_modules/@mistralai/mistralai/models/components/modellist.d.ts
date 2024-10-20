import * as z from "zod";
import { BaseModelCard, BaseModelCard$Outbound } from "./basemodelcard.js";
import { FTModelCard, FTModelCard$Outbound } from "./ftmodelcard.js";
export type Data = (BaseModelCard & {
    type: "base";
}) | (FTModelCard & {
    type: "fine-tuned";
});
export type ModelList = {
    object?: string | undefined;
    data?: Array<(BaseModelCard & {
        type: "base";
    }) | (FTModelCard & {
        type: "fine-tuned";
    })> | undefined;
};
/** @internal */
export declare const Data$inboundSchema: z.ZodType<Data, z.ZodTypeDef, unknown>;
/** @internal */
export type Data$Outbound = (BaseModelCard$Outbound & {
    type: "base";
}) | (FTModelCard$Outbound & {
    type: "fine-tuned";
});
/** @internal */
export declare const Data$outboundSchema: z.ZodType<Data$Outbound, z.ZodTypeDef, Data>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace Data$ {
    /** @deprecated use `Data$inboundSchema` instead. */
    const inboundSchema: z.ZodType<Data, z.ZodTypeDef, unknown>;
    /** @deprecated use `Data$outboundSchema` instead. */
    const outboundSchema: z.ZodType<Data$Outbound, z.ZodTypeDef, Data>;
    /** @deprecated use `Data$Outbound` instead. */
    type Outbound = Data$Outbound;
}
/** @internal */
export declare const ModelList$inboundSchema: z.ZodType<ModelList, z.ZodTypeDef, unknown>;
/** @internal */
export type ModelList$Outbound = {
    object: string;
    data?: Array<(BaseModelCard$Outbound & {
        type: "base";
    }) | (FTModelCard$Outbound & {
        type: "fine-tuned";
    })> | undefined;
};
/** @internal */
export declare const ModelList$outboundSchema: z.ZodType<ModelList$Outbound, z.ZodTypeDef, ModelList>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ModelList$ {
    /** @deprecated use `ModelList$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ModelList, z.ZodTypeDef, unknown>;
    /** @deprecated use `ModelList$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ModelList$Outbound, z.ZodTypeDef, ModelList>;
    /** @deprecated use `ModelList$Outbound` instead. */
    type Outbound = ModelList$Outbound;
}
//# sourceMappingURL=modellist.d.ts.map