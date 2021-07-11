import { jsx } from "slate-hyperscript";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import DeserializeElementType from "@arteneo/forge/slate/definitions/DeserializeElementType";
import DeserializeType from "@arteneo/forge/slate/definitions/DeserializeType";

const deserializeElement = (element: Node, children: DeserializeType[]): DeserializeElementType => {
    switch (element.nodeName) {
        case "BODY":
            return (jsx("fragment", {}, children) as unknown) as DeserializeElementType;
    }
};

const plugin: SlatePluginInterface = {
    deserializeElement,
};

export default plugin;
export { deserializeElement };
