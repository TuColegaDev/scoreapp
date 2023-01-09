import { RefreshToken, User } from '@prisma/client';
import jwt from 'jsonwebtoken'

/**
 * Method to create a new AccessToken for the login user
 * @param user: User
 * @returns JsonWebToken: string
 */
function generateAccessToken(user: User){
    const payload: object = {
        userId: user.id
    }
    const accessToken: jwt.Secret = process.env.JWT_ACCESS_TOKEN || 'secret' 
    const jwtConfig: jwt.SignOptions = {
        expiresIn: '5m'
    }

    return jwt.sign(payload, accessToken, jwtConfig)
}

/**
 * Method to create a new RefreshToken for the login user
 * @param user: User // Login user
 * @param jti: number // AccessToken id
 * @returns JsonWebToken: string
 */
function generateRefreshToken(user: User, jti: number){
    const payload: object = {
        userId: user.id,
        jti
    }
    const refreshToken: jwt.Secret = process.env.JWT_REFRESH_TOKEN || 'secret' 
    const jwtConfig: jwt.SignOptions = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, refreshToken, jwtConfig)
}

/**
 * Create the both token for the login user
 * @param user: User
 * @param jti: number
 * @returns { 
 *  accessToken = JsonWebToken: string, 
 *  refreshToken = JsonWebToken: string 
 * }
 */
export default function generateTokens(user: User, jti: number){
    const accessToken: string = generateAccessToken(user)
    const refreshToken: string = generateRefreshToken(user, jti)

    return {
        accessToken,
        refreshToken
    }
}