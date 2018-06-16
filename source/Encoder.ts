// const CRLF = '\r\n'

export function BulkString(s) {
    return `$${s.length}\r\n${s}\r\n`
}

export function Integer(i) {
    return `:${i}\r\n`
}

export function Array(a) {
    return `*${a.length}\r\n` + a.join("")
}

export function ArraySize(a) {
    return `*${a.length}\r\n`
}

export function SimpleString(s) {
    return `+${s}\r\n`
}

export function Error(e) {
    return `-${e}\r\n`
}