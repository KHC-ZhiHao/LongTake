import { Sprite } from './sprite';
export declare const renderPack: {
    /** 邊緣羽化 */
    feather(sprite: Sprite, options?: Partial<{
        radius: number;
        strength: number;
    }>): void;
    /** 高斯模糊 */
    blur(sprite: Sprite, options?: Partial<{
        radius: number;
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
