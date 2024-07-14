const express = require('express');
const path = require('path'); // Ajoutez cette ligne
const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Liste des personnages
const characters = [
    { 
        name: 'Monkey D. Luffy', 
        devilFruit: 'Gomu Gomu no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '174 cm', 
        gender: 'Masculin', 
        bounty: '3,000,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Roronoa Zoro', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '181 cm', 
        gender: 'Masculin', 
        bounty: '1,111,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Nami', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '170 cm', 
        gender: 'Féminin', 
        bounty: '366,000,000 Berries', 
        firstArc: 'Arlong Park' 
    },
    { 
        name: 'Nico Robin', 
        devilFruit: 'Hana Hana no Mi', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '188 cm', 
        gender: 'Féminin', 
        bounty: '930,000,000 Berries', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Sanji', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '180 cm', 
        gender: 'Masculin', 
        bounty: '1,032,000,000 Berries', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Tony Tony Chopper', 
        devilFruit: 'Hito Hito no Mi', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '90 cm', 
        gender: 'Masculin', 
        bounty: '1000 Berries', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Franky', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '240 cm', 
        gender: 'Masculin', 
        bounty: '394,000,000 Berries', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Brook', 
        devilFruit: 'Yomi Yomi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '277 cm', 
        gender: 'Masculin', 
        bounty: '383,000,000 Berries', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Jinbe', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '301 cm', 
        gender: 'Masculin', 
        bounty: '1,100,000,000 Berries', 
        firstArc: 'Impel Down' 
    },
    { 
        name: 'Gol D. Roger', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Roger Pirates', 
        height: '274 cm', 
        gender: 'Masculin', 
        bounty: '5,564,800,000 Berries', 
        firstArc: 'Romance Down' 
    },
    { 
        name: 'Shanks', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage du Roux', 
        height: '199 cm', 
        gender: 'Masculin', 
        bounty: '4,000,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Marshall D. Teach', 
        devilFruit: 'Yami Yami no Mi, Gura Gura no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Noire', 
        height: '344 cm', 
        gender: 'Masculin', 
        bounty: '2,247,600,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Eustass Kid', 
        devilFruit: 'Jiki Jiki no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Kid Pirates', 
        height: '205 cm', 
        gender: 'Masculin', 
        bounty: '3,000,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Trafalgar Law', 
        devilFruit: 'Ope Ope no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage du Heart', 
        height: '191 cm', 
        gender: 'Masculin', 
        bounty: '3,000,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Donquichote Doflamingo', 
        devilFruit: 'String String Fruit', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Donquichote Pirates', 
        height: '305 cm', 
        gender: 'Masculin', 
        bounty: '340,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Big Mom', 
        devilFruit: 'Soru Soru no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Big Mom Pirates', 
        height: '880 cm', 
        gender: 'Féminin', 
        bounty: '4,388,000,000 Berries', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Kaido', 
        devilFruit: 'Uo Uo no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipe aux Cent Bêtes', 
        height: '710 cm', 
        gender: 'Masculin', 
        bounty: '4,611,100,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Smoker', 
        devilFruit: 'Moku Moku no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '209 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Loguetown' 
    },
    { 
        name: 'Kizaru', 
        devilFruit: 'Pika Pika no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '302 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Akainu', 
        devilFruit: 'Magu Magu no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '306 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Aokiji', 
        devilFruit: 'Hie Hie no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Noire', 
        height: '298 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Rob Lucci', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '212 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Kaku', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '193 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Kalifa', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '185 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Blueno', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '258 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Jabra', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'CP9', 
        height: '212 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Kinemon', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '295 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Kozuki Momonosuke', 
        devilFruit: '', 
        haki: 'Vision', 
        affiliation: 'Famille Kozuki', 
        height: '110 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Kurozumi Kanjuro', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kurozumi', 
        height: '347 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Kurozumi Tama', 
        devilFruit: '', 
        haki: 'Aucun', 
        affiliation: 'Famille Kurozumi', 
        height: '108 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Diamante', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'Donquichote Pirates', 
        height: '525 cm', 
        gender: 'Masculin', 
        bounty: '99,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Riku Viola', 
        devilFruit: '', 
        haki: 'Aucun', 
        affiliation: 'Famille Riku', 
        height: '178 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Rebecca', 
        devilFruit: '', 
        haki: 'Vision', 
        affiliation: 'Famille Riku', 
        height: '171 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Kyros', 
        devilFruit: '', 
        haki: '', 
        affiliation: 'Famille Riku', 
        height: '298 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Zeff', 
        devilFruit: '', 
        haki: '', 
        affiliation: 'Baratie', 
        height: '189 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Portgas D. Ace', 
        devilFruit: '', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '185 cm', 
        gender: 'Masculin', 
        bounty: '550,000,000 Berries', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Marco', 
        devilFruit: '', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '203 cm', 
        gender: 'Masculin', 
        bounty: '1,400,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Barbe Blanche', 
        devilFruit: 'Gura Gura no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '666 cm', 
        gender: 'Masculin', 
        bounty: '5,000,000,000 Berries', 
        firstArc: 'Arabasta' 
    },


];



// Liste des fruits du démon
const devilFruits = [
    { name: 'Moku Moku no Mi', type: 'Logia' },
    { name: 'Magu Magu no Mi', type: 'Logia' },
    { name: 'Hie Hie no Mi', type: 'Logia' },
    { name: 'Mera Mera no Mi', type: 'Logia' },
    { name: 'Pika Pika no Mi', type: 'Logia' },
    { name: 'Goro Goro no Mi', type: 'Logia' },
    { name: 'Gomu Gomu no Mi', type: 'Paramecia' },
    { name: 'Bara Bara no Mi', type: 'Paramecia' },
    { name: 'Hana Hana no Mi', type: 'Paramecia' },
    { name: 'Yomi Yomi no Mi', type: 'Paramecia' },
    { name: 'Yami Yami no Mi', type: 'Logia' },
    { name: 'Gura Gura no Mi', type: 'Paramecia' },
    { name: 'Ope Ope no Mi', type: 'Paramecia' },
    { name: 'Jiki Jiki no Mi', type: 'Paramecia' },
    { name: 'String String Fruit', type: 'Paramecia' },
    { name: 'Soru Soru no Mi', type: 'Paramecia' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Hito Hito no Mi', type: 'Zoan' },
    { name: 'Uo Uo no Mi', type: 'Zoan' }
];
// Fonction pour catégoriser le fruit du démon
function categorizeDevilFruit(devilFruit) {
    const fruit = devilFruits.find(f => f.name === devilFruit);
    return fruit ? fruit.type : 'Aucun';
}

// Route pour obtenir un personnage aléatoire
app.get('/api/start-game', (req, res) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    res.json(characters[randomIndex]);
});

// Route pour obtenir tous les personnages
app.get('/api/characters', (req, res) => {
    res.json(characters);
});

// Route pour rechercher des personnages par nom
app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = characters.filter(character => character.name.toLowerCase().includes(query));
    res.json(results);
});

// Route pour obtenir la liste des fruits du démon
app.get('/api/devil-fruits', (req, res) => {
    res.json(devilFruits);
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
