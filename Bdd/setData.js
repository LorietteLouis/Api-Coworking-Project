const mockCoworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt')
const roles = require('./roles.json')

module.exports = (CoworkingModel, UserModel, RoleModel, ReviewModel) => {
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        })
    })

    Promise.all(rolePromises).then(() => {
        const userPromises = []
        userPromises.push(
            RoleModel.findOne({ where: { label: 'editor' } })
                .then(role => {
                    return bcrypt.hash('BiKiNiBotTom', 10)
                        .then(hash => {
                            return UserModel.create({
                                firstName: 'Bob',
                                lastName: 'Carré',
                                username: 'Sponger',
                                password: hash,
                                RoleId: role.id
                            })
                        })
                }),
            RoleModel.findOne({ where: { label: 'admin' } })
                .then(role => {
                    return bcrypt.hash('ATlanThroPiA', 10)
                        .then(hash => {
                            return UserModel.create({
                                firstName:'Loriette',
                                lastName:'Loriette',
                                username: 'Sioul',
                                password: hash,
                                RoleId: role.id
                            })
                        })
                })
        )
        Promise.all(userPromises)
            .then(() => {
                const coworkingPromises = mockCoworkings.map(mock => {
                    return CoworkingModel.create({
                        name: mock.name,
                        price: mock.price,
                        superficy: mock.superficy,
                        capacity: mock.capacity,
                        address: mock.address,
                        userId: 1
                    });
                })
                Promise.all(coworkingPromises).then(() => {
                    ReviewModel.create({
                        content: `C'était mieux avant...`,
                        rating: 3,
                        userId: 1,
                        coworkingId: 10,
                    })
                    ReviewModel.create({
                        content: `SAMA plus.`,
                        rating: 5,
                        userId: 2,
                        coworkingId: 7
                    })
                })
            })
    })
}