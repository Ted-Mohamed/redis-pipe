import { spawn } from 'child_process'

const defaults = {
    host: '127.0.0.1',
    port: '6379',
    password: '',
    db: '0',
    out: process.stdout,
    error: process.stderr
}

export default function({
    host,
    port,
    password,
    db,
    out,
    error
} = defaults): NodeJS.WritableStream {
    const options = ['--pipe', '-h', host, '-p', port, '-a', password, '-n', db]

    const RedisPipe = spawn('redis-cli', options)
    RedisPipe.stdout.setEncoding('utf8')
    RedisPipe.stdout.pipe(out)
    RedisPipe.stderr.pipe(error)

    return RedisPipe.stdin
}

import * as Encoder from './Encoder'
export { Encoder }
