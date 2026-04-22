/**console.log("Hello depuis Node.js!")
console.log("Dossier :", __dirname)
console.log("Fichier :", __filename)
console.log("Système :", process.platform)
console.log("Version Node :", process.version)*/


/*const math = require("./math")

console.log(math.additionner(5, 3))
console.log(math.multiplier(4, 6)) */
const path = require('path')

console.log(path.join(__dirname, 'fichiers', 'data.txt'))
// /Users/sadio/cours-node.js/fichiers/data.txt

console.log(path.extname('photo.png'))
// .png

console.log(path.basename('dossier/fichier.js'))
// fichier.jsod
/*
const os = require('os')

console.log(os.platform())    // darwin
console.log(os.homedir())     // /Users/sadio
console.log(os.totalmem())    // mémoire totale en bytes
console.log(os.freemem())     // mémoire libre en bytes */

/*const chalk = require('chalk')

console.log(chalk.green("✅ Succès !"))
console.log(chalk.red("❌ Erreur !"))
console.log(chalk.blue("ℹ️  Information"))
console.log(chalk.yellow.bold("⚠️  Attention !")) */

/*console.log("1 - Debut")

setTimeout(() => {
    console.log("2 - Dans le  setTimeout")
}, 2000)

console.log("3 - Fin") */

// callback

/*

function direBonjour(nom, callback) {
    console.log("Bonjour " + nom)
    callback()
}

function apresBonjour() {
    console.log("Comment ca va ?")
}

direBonjour("Sadio", apresBonjour) */
// callback asynchrone -- exple reel
/*
const fs = require('fs')

console.log("1 - Avant la lecture")

fs.readFile('./package.json', 'utf8', (erreur, contenu) => {
    if (erreur) {
        console.log("Erreur :", erreur)
        return
    }
    console.log("2 - Fichier lu", contenu.slice(0, 50))
})

console.log("3 - Apres la lecture") */

const fs = require('fs').promises

async function lireFichier() {
    const contenu = await fs.readFile('./package.json', 'utf8')
    console.log(contenu.slice(0, 50))
}

lireFichier();