export declare class ListenerGroup {
    private element;
    private listeners;
    constructor(element: Element);
    add(name: string, callback: (...params: any[]) => void): void;
    close(): void;
}
declare type Site = {
    x: number;
    y: number;
};
export declare const pointer: (element: Element, params: {
    end: () => void;
    move: (params: Site) => void;
    start: (params: Site) => void;
}) => ListenerGroup;
export {};
