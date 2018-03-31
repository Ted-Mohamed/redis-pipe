export default (...parts: string[]) =>
    parts.reduce((output, part) => {
        return output + `$${part.length}\r\n${part}\r\n`
    }, '*3\r\n')
