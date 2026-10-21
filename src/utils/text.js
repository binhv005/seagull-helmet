// join the last two words with a non-breaking space so a wrapped line never ends on one word
export const noOrphan = (text) => (typeof text === 'string' ? text.replace(/\s+(\S+)\s*$/, ' $1') : text)
