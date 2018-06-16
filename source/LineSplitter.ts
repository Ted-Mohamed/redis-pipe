import { Transform } from 'stream'

export default class LineSplitter extends Transform {
    forEachLine: (l: string) => any
    private buffer: string | undefined

    constructor(forEachLine = l => l, encoding = 'utf8') {
        super({ encoding })
        this.buffer = ''
        this.forEachLine = forEachLine
    }

    _transform(chunk, encoding, done) {
        this.buffer += chunk.toString()
        let lines = this.buffer!.split(/\r?\n/)
        this.buffer = lines.pop()
        lines.forEach(line => this.push(this.forEachLine(line)))
        done()
    }

    _flush(done) {
        if (this.buffer) this.push(this.forEachLine(this.buffer))
        this.buffer = ''
        done()
    }
}
