import jwt from 'jsonwebtoken'


const generateToken = (id:number) => {
    return jwt.sign({id}, '1234', {
        expiresIn: '30d'
    })
}

export default generateToken

