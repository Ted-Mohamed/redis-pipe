import RedisPipe, { Encoder } from '../source/index'

test('RedisPipe is defined', () => {
    expect(RedisPipe).toBeDefined()
})

test('Encoder is defined', () => {
    expect(Encoder).toBeDefined()
})

test('Encoder expose ArraySize', () => {
    expect(Encoder.ArraySize).toBeDefined()
})

test('Encoder expose BulkString', () => {
    expect(Encoder.BulkString).toBeDefined()
})
