import React from "react";

interface Props {
    /**
     * abc
     */
    number: number;
    /**
     * A description of the prop that you seem fit :)
     */
    kind?: "a" | "c";
}

const Example: React.FC<Props> = ({ number }: Props) => {
    return <div>Numerek: {number}</div>;
};

export { Example };
