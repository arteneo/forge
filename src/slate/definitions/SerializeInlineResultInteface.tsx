import SerializeInlineResultAttributesInterface from "@arteneo/forge/slate/definitions/SerializeInlineResultAttributesInterface";

interface SerializeInlineResultInteface {
    text: string;
    attributes: SerializeInlineResultAttributesInterface;
    styles: React.CSSProperties;
}

export default SerializeInlineResultInteface;
