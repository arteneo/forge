import SerializeInlineResultAttributes from "@arteneo/forge/slate/definitions/SerializeInlineResultAttributes";

interface SerializeInlineResult {
    text: string;
    attributes: SerializeInlineResultAttributes;
    styles: React.CSSProperties;
}

export default SerializeInlineResult;
