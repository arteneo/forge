import { jsx } from "slate-hyperscript";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

const deserializeElement = (element: Node, children: any): undefined | any => {
    switch (element.nodeName) {
        case "BODY":
            return jsx("fragment", {}, children);
    }
};

const plugin: SlatePluginInterface = {
    deserializeElement,
};

export default plugin;
export { deserializeElement };
