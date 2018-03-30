import { createReadStream } from 'fs'
import * as path from 'path'
import { Transform } from 'stream'
import { spawn } from 'child_process'

function GenerateRedisProtocol(...parts: string[]) {
    return parts.reduce((output, part) => {
        return output + `$${part.length}\r\n${part}\r\n`
    }, '*3\r\n')
}

class LineSplitter extends Transform {
    forEachLine: (l: string) => any
    private buffer: string
    constructor(forEachLine = l => l, encoding = 'utf8') {
        super({ encoding })
        this.buffer = ''
        this.forEachLine = forEachLine
    }

    _transform(chunk, encoding, done) {
        this.buffer += chunk.toString()
        let lines = this.buffer.split(/\r?\n/)
        this.buffer = lines.pop()!
        lines.forEach(line => this.push(this.forEachLine(line)))
        done()
    }

    _flush(done) {
        if (this.buffer) this.push(this.forEachLine(this.buffer))
        this.buffer = ''
        done()
    }
}

const defaultOptions = { host: '127.0.0.1', port: '6379', password: '' }

export default async (file, { host, port, password } = defaultOptions) =>
    new Promise((resolve, reject) => {
        const options = ['--pipe', '-h', host, '-p', port, '-a', password]
        const redisPipe = spawn('redis-cli', options)

        // redisPipe.stdout.setEncoding('utf8')
        // redisPipe.stdout.pipe(process.stdout)
        // redisPipe.stderr.pipe(process.stderr)

        let transformer = new LineSplitter(line => {
            return GenerateRedisProtocol('SADD', 'stuf', line)
        })

        transformer.on('end', () => {
            redisPipe.stdin.end()
            resolve()
        })

        createReadStream(path.join(process.cwd(), file))
            .pipe(transformer)
            .pipe(redisPipe.stdin)
    })
