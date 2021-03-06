// const CRLF = '\r\n'

export function BulkString(s: string) {
    return `$${s.length}\r\n${s}\r\n`
}

export function Integer(i: number) {
    return `:${i}\r\n`
}

export function Array(a: string[]) {
    return `*${a.length}\r\n` + a.join('')
}

export function ArrayOfSize(s: number) {
    return `*${s}\r\n`
}

export function SimpleString(s: string) {
    return `+${s}\r\n`
}

export function Error(e: string) {
    return `-${e}\r\n`
}

export const Commands = {
    SADD: BulkString('SADD'),
    DEL: BulkString('DEL')
}
