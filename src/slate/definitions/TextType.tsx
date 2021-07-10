import { BoldInterface } from "@arteneo/forge/slate/plugins/Bold";
import { ItalicInterface } from "@arteneo/forge/slate/plugins/Italic";
import { StrikethroughInterface } from "@arteneo/forge/slate/plugins/Strikethrough";
import { UnderlineInterface } from "@arteneo/forge/slate/plugins/Underline";
import { ColorInterface } from "@arteneo/forge/slate/plugins/Color";

type TextType = BoldInterface | ItalicInterface | StrikethroughInterface | UnderlineInterface | ColorInterface;

export default TextType;
