const { ValidationError, UniqueConstraintError } = require('sequelize')
const {UserModel} = require('../Bdd/sequelize')
const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ma_clé_secrète'


exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const dataUsers = {...req.body,  password: hash}
            return UserModel
            .create(dataUsers)
            .then((user)=>{
                res.status(201).json({ message:'Un user a bien été ajouté',
                data: user})
            })
          
        })
        .catch((error)=>{
            if (error instanceof ValidationError || error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message})
         }
            res.status(500).json({ message:`Une erreur est survenu : ${error}`
        })
    })
}

exports.logIn = (req, res) => {
    UserModel.findOne({ where: { username: req.body.username } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (isValid) {
                        const token = jwt.sign({
                            data: req.body.username
                        }, SECRET_KEY, { expiresIn: 60 * 60 });

                        res.json({ message: 'login réussi', data: token })
                    } else {
                        return res.json({ message: `Le mot de passe n'est pas correct` })
                    }
                })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié` })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY)
                req.username = decoded.data
                next()
            } catch(error) {
                res.status(403).json({ message: `Le jeton n'est pas valide` })
            }
    } else {
        res.status(401).json({ message: `Vous n'avez pas d'autorisation` })
    }

}