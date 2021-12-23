import { Sprite } from './sprite';
export declare const renderPack: {
    /** 高速簡易的模糊模式 */
    blur(sprite: Sprite, options?: Partial<{
        iterations: number;
    }>): void;
    /** 將精靈覆蓋上指定顏色 */
    colorTo: (sprite: Sprite, options?: Partial<{
        color: string;
        alpha: number;
    }>) => void;
    /** 繪製填滿的圓角矩形 */
    fillRoundRect: (sprite: Sprite, options?: Partial<{
        round: number;
        color: string;
    }>) => void;
};
