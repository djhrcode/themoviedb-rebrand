import React from "react";

/**
 * @template T
 * @param {T} Component
 * @param {object} baseProps
 * @returns {T}
 */
export const decorateComponentProps = (Component, baseProps) => {
    const Decorator = (props) => {
        return <Component {...{ ...props, ...baseProps }} />;
    };

    Decorator.isPropDecorator = true;

    Object.setPrototypeOf(Decorator, Component);

    /**
     * @type {ProxyHandler}
     */
    const DecoratorHandler = {
        get: (target, prop, receiver) => {
            if (target[prop] && target[prop].isPropDecorator) {
                const DecoratorProxied = target[prop];

                console.log(target, prop, DecoratorProxied);

                const PropDecorator = (proxyProps) => {
                    return (
                        <DecoratorProxied
                            {...{ ...proxyProps, ...baseProps }}
                        />
                    );
                };

                PropDecorator.isPropDecorator = true;
                Object.setPrototypeOf(PropDecorator, Component);

                return PropDecorator;
            }

            return target[prop];
        },
    };

    const DecoratorProxy = new Proxy(Decorator, DecoratorHandler);

    return DecoratorProxy;
};
