export function byteLength(text: string) {
    let size = text.length
    for (let i = text.length - 1; i >= 0; i--) {
        let code = text.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) {
            size++
        } else if (code > 0x7ff && code <= 0xffff) {
            size += 2
        }
        if (code >= 0xDC00 && code <= 0xDFFF) {
            i--
        }
    }
    return size
}
