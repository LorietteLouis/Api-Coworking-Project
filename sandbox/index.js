// const arr1 = [2,4,7]
// const arr2 = [3,5,8]

// const newArr = [1, ...arr2, "hello", "world"]

// console.log(newArr)

const dave = {
    name : 'Dave',
    age : 26
}

const daveWithEmail = {
    ...dave,
    email : 'dave@gmail.com'
}

const oldDave = {
    age : 27,
    ...dave
}

console.log(oldDave)


// Exercices
const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ["Salut", "à tous"]
const arr3 = ["je m'appelle", "mon nom est"]
const arr4 = ["Paul", "Doazan"]
const arr5 = ["Antoine", "Dupont"]

// à l'aide du spread operator, creer un seul et unique tableau, qui sera ensuite parcouru pour écrire les phrases suivantes :
// Bonjour tout le monde, je m'appelle Antoine Dupont
// Salut à tous, mon nom est Paul Doazan



const antoineDupont = [...arr1 ,
     arr3[0] , 
     ...arr5]
const res1 = antoineDupont.join(' ')
console.log (res1)

const paulDoazan = [...arr2 , arr3[1] , ...arr4]
const res2 = paulDoazan.join(' ')
console.log (res2)

function sum(...params) {
    let total = 0
    params.forEach(param => total += param)
    return total
}

console.log(sum(4,5,7))

