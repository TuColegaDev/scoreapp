import crypto from 'node:crypto'
/**
 * Function to hash the access token before save it on database
 * @param token 
 * @returns hashing token
 */
export default function hashToken(token: string){
    return crypto.createHash('sha512').update(token).digest('hex')
}