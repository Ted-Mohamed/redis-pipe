import redisPipe from '../source'

test('', () => {
    redisPipe('/tests/data/filters.txt')
    expect(redisPipe).toBeDefined()
})
