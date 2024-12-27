import HashString from '@repo/packets/functions/hash-string';

let str = process.argv[2];
if (!str)
    throw new Error('provide string to hash as first argument');

let hash = HashString.HashString(str);
console.log(hash);
