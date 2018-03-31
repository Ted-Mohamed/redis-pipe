import { createReadStream } from 'fs'
import { join as joinPath } from 'path'
import { spawn } from 'child_process'
import LineSplitter from './LineSplitter'
import GenerateRedisProtocol from './RedisProtocolGenerator'

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

        createReadStream(joinPath(process.cwd(), file))
            .pipe(transformer)
            .pipe(redisPipe.stdin)
    })
