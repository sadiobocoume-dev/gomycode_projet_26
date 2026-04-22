/*
const fs = require('fs').promises

async function main() {
    // Ecrire un fichier

    await fs.writeFile('message.txt', 'Bonjour depuis Node.js')
    console.log('✅ Fichier créé')
}

main() */

// 2. Lire un fichier

/*

const fs = require('fs').promises

async function main() {

    // Ajouter du contenu sans écraser
    await fs.appendFile('message.txt', '\nNouvelle ligne ajoutée')
    console.log('✅ Contenu ajouté')

    // Vérifier
    const contenu = await fs.readFile('message.txt', 'utf8')
    console.log(contenu)

}

main()


// 'utf8' indique que le fichier est du texte. sans ca, Node.js
// retourne des bytes bruts

*/

// 4. Supprimer un fichier

/*
const fs = require('fs').promises

async function main() {
    await fs.unlink('message.txt')
    console.log('🗑️  Fichier supprimé')
}
 
main() */

// travailler avec des dossiers
/*
const fs = require('fs').promises

async function main() {

    // Créer un dossier
    await fs.mkdir('mon-dossier')
    console.log('📁 Dossier créé')

    // Lister le contenu du dossier actuel
    const fichiers = await fs.readdir('.')
    console.log('Contenu :', fichiers)

    // Supprimer un dossier vide
    await fs.rmdir('mon-dossier')
    console.log('🗑️  Dossier supprimé')

}

main()
*/
// Verifier si un fichier existe 
/*
const fs = require('fs')

async function main() {
    try {
        await fs.access('message.txt')
        console.log('✅ Le fichier existe')
    } catch {
        console.log('❌ Le fichier n\'existe pas')
    }
}

main()

*/

const fs = require('fs').promises

async function ajouterNote(note) {
    const date = new Date().toLocaleDateString('fr-FR')
    const ligne = `[${date}] ${note}\n`
    await fs.appendFile('journal.txt', ligne)

    console.log('✅ Note ajoutée :', note)
}

async function lireJournal() {
    try {
        const contenu = await fs.readFile('journal.txt', 'utf8')
        console.log('\n📒 Journal :\n', contenu)
    } catch {
        console.log('journal vide.')
    }
}

async function main() {
    await ajouterNote('Premier jour de Node.js')
    await ajouterNote('J\' ai appris le module fs')
    await ajouterNote('callbacks et async/await compris')
    await lireJournal()
}

main()
