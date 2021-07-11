import { ImageElementType } from "@arteneo/forge/slate/plugins/Image";
import { LinkElementType } from "@arteneo/forge/slate/plugins/Link";
import { HeadingElementType } from "@arteneo/forge/slate/plugins/Heading";
import { ParagraphElementType } from "@arteneo/forge/slate/plugins/Paragraph";
import { OrderedListElementType } from "@arteneo/forge/slate/plugins/OrderedList";
import { UnorderedListElementType } from "@arteneo/forge/slate/plugins/UnorderedList";

type ElementTypeType =
    | ImageElementType
    | LinkElementType
    | HeadingElementType
    | ParagraphElementType
    | OrderedListElementType
    | UnorderedListElementType;

export default ElementTypeType;
