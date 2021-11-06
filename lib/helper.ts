const arc = Math.PI / 180
const rarc = 180 / Math.PI
const trigonometric: Record<string, {
    sin: number
    cos: number
}> = {}

for( let i = -360 ; i < 360 ; i++ ){
    trigonometric[i] = {
        sin: Math.sin(i * arc),
        cos: Math.cos(i * arc)
    }
}

export const helper = {

    arc,
    rarc,

    /**
     * 獲取角度轉換弧度後的 sin 值
     */
    
    sinByRad(deg: number) {
        if(trigonometric[Math.round(deg)]) {
            return trigonometric[Math.round(deg)].sin
        } else {
            return Math.sin(deg * arc)
        }
    },

    /**
     * 獲取角度轉換弧度後的cos值
     */
    
    cosByRad(deg: number) {
        if (trigonometric[Math.round(deg)]) {
            return trigonometric[Math.round(deg)].cos
        } else {
            return Math.cos(deg * arc)
        }
    },

    /**
     * 獲取向量
     */

    getVector(deg: number, distance: number) {
    	return {
            x: distance * helper.cosByRad(deg),
            y: distance * helper.sinByRad(deg)
        }
    },

    /**
     * 求整數範圍內的隨機值
     */

    randInt(min: number, max: number) {
        return Math.floor(Math.random() * ( max-min + 1 ) + min)
    },

    /**
     * 求兩點角度
     */

    getAngle(x: number, y: number, ax: number, ay: number) {
        if (x === ax && y === ay) {
            return 0
        }
        let angle = Math.atan2(ay - y, ax - x) * rarc
        return angle > 0 ? angle : 360 + angle
    },

    /**
     * 檢測目前螢幕裝置大小
     */

    getVisibility() {
        let width = document.body.clientWidth
        if (width < 600) {
            return 'xs'
        }
        if (width >= 600 && width < 960) {
            return 'sm'
        }
        if (width >= 960 && width < 1264) {
            return 'md'
        }
        if (width >= 1264 && width < 1904) {
            return 'lg'
        }
        return 'xl'
    }
}
