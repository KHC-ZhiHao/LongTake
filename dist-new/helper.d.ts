export declare const helper: {
    arc: number;
    rarc: number;
    /**
     * 獲取角度轉換弧度後的 sin 值
     */
    sinByRad(deg: number): number;
    /**
     * 獲取角度轉換弧度後的cos值
     */
    cosByRad(deg: number): number;
    /**
     * 獲取向量
     */
    getVector(deg: number, distance: number): {
        x: number;
        y: number;
    };
    /**
     * 求整數範圍內的隨機值
     */
    randInt(min: number, max: number): number;
    /**
     * 求兩點角度
     */
    getAngle(x: number, y: number, ax: number, ay: number): number;
    /**
     * 檢測目前螢幕裝置大小
     */
    getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
};
