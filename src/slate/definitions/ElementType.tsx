import { HeadingElementInterface } from "@arteneo/forge/slate/plugins/Heading";
import { ParagraphElementInterface } from "@arteneo/forge/slate/plugins/Paragraph";
import { OrderedListElementInterface } from "@arteneo/forge/slate/plugins/OrderedList";
import { UnorderedListElementInterface } from "@arteneo/forge/slate/plugins/UnorderedList";

type ElementType =
    | HeadingElementInterface
    | ParagraphElementInterface
    | OrderedListElementInterface
    | UnorderedListElementInterface;

export default ElementType;
