import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

const deserializeElement = (element: Node): undefined | any => {
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
