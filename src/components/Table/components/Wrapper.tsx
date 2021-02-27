import React from "react";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";

interface WrapperProps extends WrapperInterface {
    children: React.ReactNode;
}

const Wrapper = ({ children, wrapperComponent, wrapperComponentProps }: WrapperProps) => {
    if (typeof wrapperComponent === "undefined") {
        return <>{children}</>;
    }

    const WrapperComponent = wrapperComponent;
    return <WrapperComponent {...wrapperComponentProps}>{children}</WrapperComponent>;
};

export default Wrapper;
export { WrapperProps };
