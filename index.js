const express = require('express');
const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));

// Liste des personnages
const characters = [
    { 
        name: 'Monkey D. Luffy', 
        devilFruit: 'Gomu Gomu no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '174 cm', 
        gender: 'Masculin', 
        bounty: '1,500,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Roronoa Zoro', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '181 cm', 
        gender: 'Masculin', 
        bounty: '320,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Nami', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '170 cm', 
        gender: 'Féminin', 
        bounty: '66,000,000 Berries', 
        firstArc: 'Arlong Park' 
    },
    { 
        name: 'Nico Robin', 
        devilFruit: 'Hana Hana no Mi', 
        haki: 'Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '188 cm', 
        gender: 'Féminin', 
        bounty: '130,000,000 Berries', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Sanji', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Straw Hat Pirates', 
        height: '180 cm', 
        gender: 'Masculin', 
        bounty: '77,000,000 Berries', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Tony Tony Chopper', 
        devilFruit: 'Hito Hito no Mi', 
        haki: 'Aucun', 
        affiliation: 'Straw Hat Pirates', 
        height: '90 cm', 
        gender: 'Masculin', 
        bounty: '100 Berries', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Franky', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Straw Hat Pirates', 
        height: '240 cm', 
        gender: 'Masculin', 
        bounty: '44,000,000 Berries', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Brook', 
        devilFruit: 'Yomi Yomi no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '277 cm', 
        gender: 'Masculin', 
        bounty: '33,000,000 Berries', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Jinbe', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '301 cm', 
        gender: 'Masculin', 
        bounty: '438,000,000 Berries', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Gol D. Roger', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Roger Pirates', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '5,564,800,000 Berries', 
        firstArc: 'Loguetown' 
    },
    { 
        name: 'Shanks', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Red-Haired Pirates', 
        height: '199 cm', 
        gender: 'Masculin', 
        bounty: 'Unknown', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Blackbeard', 
        devilFruit: 'Yami Yami no Mi, Gura Gura no Mi', 
        haki: 'Rois', 
        affiliation: 'Blackbeard Pirates', 
        height: '344 cm', 
        gender: 'Masculin', 
        bounty: '2,247,600,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Eustass Kid', 
        devilFruit: 'Jiki Jiki no Mi', 
        haki: 'Armement', 
        affiliation: 'Kid Pirates', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '470,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Trafalgar Law', 
        devilFruit: 'Ope Ope no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Heart Pirates', 
        height: '191 cm', 
        gender: 'Masculin', 
        bounty: '500,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Donquixote Doflamingo', 
        devilFruit: 'String String Fruit', 
        haki: 'Armement', 
        affiliation: 'Donquixote Pirates', 
        height: '305 cm', 
        gender: 'Masculin', 
        bounty: '340,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Big Mom', 
        devilFruit: 'Soru Soru no Mi', 
        haki: 'Rois, Armement', 
        affiliation: 'Big Mom Pirates', 
        height: '880 cm', 
        gender: 'Féminin', 
        bounty: '4,388,000,000 Berries', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Kaido', 
        devilFruit: 'Uo Uo no Mi', 
        haki: 'Rois, Armement', 
        affiliation: 'Beast Pirates', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '4,611,100,000 Berries', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Smoker', 
        devilFruit: 'Moku Moku no Mi', 
        haki: 'Armement', 
        affiliation: 'Marine', 
        height: '220 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Loguetown' 
    },
    { 
        name: 'Kizaru', 
        devilFruit: 'Pika Pika no Mi', 
        haki: 'Armement', 
        affiliation: 'Marine', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Akainu', 
        devilFruit: 'Magu Magu no Mi', 
        haki: 'Armement', 
        affiliation: 'Marine', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Marineford' 
    },
    { 
        name: 'Aokiji', 
        devilFruit: 'Hie Hie no Mi', 
        haki: 'Vision', 
        affiliation: 'Marine', 
        height: 'Unknown', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    }
];




// Liste des fruits du démon
const devilFruits = [
    { name: 'Gomu Gomu no Mi', type: 'Paramecia' },
    { name: 'Mera Mera no Mi', type: 'Logia' },
    { name: 'Pika Pika no Mi', type: 'Logia' },
    { name: 'Goro Goro no Mi', type: 'Logia' },
    { name: 'Bara Bara no Mi', type: 'Paramecia' },
    { name: 'Hana Hana no Mi', type: 'Paramecia' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Hito Hito no Mi', type: 'Zoan' },
    { name: 'Yomi Yomi no Mi', type: 'Paramecia' },
    { name: 'Yami Yami no Mi', type: 'Logia' },
    { name: 'Gura Gura no Mi', type: 'Paramecia' },
    { name: 'Ope Ope no Mi', type: 'Paramecia' },
    { name: 'Jiki Jiki no Mi', type: 'Paramecia' },
    { name: 'String String Fruit', type: 'Paramecia' },
    { name: 'Soru Soru no Mi', type: 'Paramecia' },
    { name: 'Uo Uo no Mi', type: 'Zoan' },
    { name: 'Moku Moku no Mi', type: 'Logia' },
    { name: 'Magu Magu no Mi', type: 'Logia' },
    { name: 'Hie Hie no Mi', type: 'Logia' }
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
