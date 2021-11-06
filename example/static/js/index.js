window.ms = {
    scrollToEl(id, plus = 0) {
        let el = document.getElementById(id)
        let nowTop = window.pageYOffset
        let offset = el.offsetTop - nowTop
        let target = document.documentElement || document.body.parentNode || document.body
        let animate = new LongTake.Animate({
            begin: 0,
            duration: 2000,
            easing: 'easeOutQuad',
            action(p) {
                target.scrollTop = nowTop + offset * p + plus
            }
        })
        let int = setInterval(() => {
            animate.move()
            if (animate.over) {
                clearInterval(int)
            }
        }, 1)
    },
    to(path) {
        window.open('https://' + path)
    },
    onArrive: (el, offset, callbcak) => {
        let waypoint = new Waypoint({
            element: el,
            offset,
            handler: function() {
                callbcak(el)
                waypoint.destroy()
            }
        })
    },
    hide: (el) => {
        el.style.visibility = 'hidden'
    },
    show: (el) => {
        el.style.visibility = 'visible'
    },
    setAnimate: (el, name, delay = 1) => {
        setTimeout(() => {
            ms.show(el)
            $(el).addClass('animate__animated')
            $(el).addClass(`animate__${name}`)
        }, delay)
    },
    fullHeight: (el) => {
        let height = window.innerHeight
        let offset = 0
        el.style.height = (height - offset) + 'px'
    }
} 

console.log('metalsheep installed')
