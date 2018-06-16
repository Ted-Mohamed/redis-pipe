import {
    Array,
    ArraySize,
    BulkString,
    SimpleString,
    Integer,
    Error
} from '../source/Encoder'

test('SimpleString encoder defined', () => {
    expect(SimpleString).toBeDefined()
})

test('Correctly encode a simple string', () => {
    expect(SimpleString('foobar')).toEqual('+foobar\r\n')
})

test('Error encoder defined', () => {
    expect(Error).toBeDefined()
})

test('Correctly encode an error', () => {
    expect(Error('Error')).toEqual('-Error\r\n')
})

test('Integer encoder defined', () => {
    expect(Integer).toBeDefined()
})

test('Correctly encode an integer', () => {
    expect(Integer(5)).toEqual(':5\r\n')
})

test('BulkString encoder defined', () => {
    expect(BulkString).toBeDefined()
})

test('Correctly encode a bulk string', () => {
    expect(BulkString('foobar')).toEqual('$6\r\nfoobar\r\n')
})

test('Correctly encode an empty bulk string', () => {
    expect(BulkString('')).toEqual('$0\r\n\r\n')
})

test('Array encoder defined', () => {
    expect(Array).toBeDefined()
})

test('Correctly encode an array of strings', () => {
    expect(Array([BulkString('foo'), BulkString('bar')])).toEqual(
        '*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n'
    )
})

test('Correctly encode an empty string', () => {
    expect(Array([])).toEqual('*0\r\n')
})

test('ArraySize encoder defined', () => {
    expect(ArraySize).toBeDefined()
})

test('Correctly encode the size of an array', () => {
    expect(ArraySize(['foo', 'bar'])).toEqual('*2\r\n')
})

test('Correctly encode the size of an empty array', () => {
    expect(ArraySize([])).toEqual('*0\r\n')
})

test('Correctly encode a command', () => {
    let command = 'SET key value'.split(' ')

    let encodedCommand = command.reduce(
        (o, c) => o + BulkString(c),
        ArraySize(command)
    )
    expect(encodedCommand).toEqual(
        '*3\r\n$3\r\nSET\r\n$3\r\nkey\r\n$5\r\nvalue\r\n'
    )
})
