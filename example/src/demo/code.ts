import { LongTake as _ } from 'longtake'

const t = (longtake: _, LongTake: typeof _) => {
    class Text extends LongTake.TextSprite {
        constructor(text: string) {
            super({
                backgroundColor: 'red'
            })
            this.x = longtake.width / 2
            this.y = longtake.height / 2
            this.setAnchor(0.5)
            this.setContent(text)
        }
    }
    longtake.addChildren(new Text('Hello World'))
}
