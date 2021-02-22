import React from "react";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";

interface Props extends WrapperInterface {
    children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children, wrapperComponent, wrapperComponentProps }: Props) => {
    if (typeof wrapperComponent === "undefined") {
        return <>{children}</>;
    }

    const WrapperComponent = wrapperComponent;
    return <WrapperComponent {...wrapperComponentProps}>{children}</WrapperComponent>;
};

export default Wrapper;
