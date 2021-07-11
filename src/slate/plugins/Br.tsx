import DeserializeElementType from "@arteneo/forge/slate/definitions/DeserializeElementType";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

const deserializeElement = (element: Node): DeserializeElementType => {
    switch (element.nodeName) {
        case "BR":
            return "\n";
    }
};

const plugin: SlatePluginInterface = {
    deserializeElement,
};

export default plugin;
export { deserializeElement };
