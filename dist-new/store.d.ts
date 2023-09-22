import { Event } from './base';
import { Sprite } from "./sprite";
declare type Channels<T> = {
    pick: {
        id: string;
        sprite: T;
        recycle: () => void;
    };
};
export declare class Store<T extends Sprite> extends Event<Channels<T>> {
    _list: {
        id: string;
        sprite: T;
        running: boolean;
    }[];
    constructor();
    static preGen<T extends Sprite>(params: {
        preGenCount: number;
        creater: () => T;
    }): {
        store: Store<T>;
        take: () => T | null;
    };
    get size(): number;
    get waitingSize(): number;
    add(sprite: T): string;
    get(): null | T;
    getWithDetail(): null | {
        id: string;
        sprite: T;
        recycle: () => void;
    };
    recycle(id: string): void;
    clear(): void;
}
export {};
