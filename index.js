const express = require('express');
const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static('public'));

const characters = [
    { name: 'Monkey D. Luffy', devilFruit: 'Gomu Gomu no Mi', affiliation: 'Straw Hat Pirates', height: '174 cm', gender: 'Masculin', bounty: '1,500,000,000 Berries' },
    { name: 'Roronoa Zoro', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '181 cm', gender: 'Masculin', bounty: '320,000,000 Berries' },
    { name: 'Nami', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '170 cm', gender: 'Féminin', bounty: '66,000,000 Berries' },
    { name: 'Nico Robin', devilFruit: 'Hana Hana no Mi', affiliation: 'Straw Hat Pirates', height: '188 cm', gender: 'Féminin', bounty: '130,000,000 Berries' },
    { name: 'Sanji', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '180 cm', gender: 'Masculin', bounty: '77,000,000 Berries' },
    { name: 'Tony Tony Chopper', devilFruit: 'Hito Hito no Mi', affiliation: 'Straw Hat Pirates', height: '90 cm', gender: 'Masculin', bounty: '100 Berries' },
    { name: 'Franky', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '240 cm', gender: 'Masculin', bounty: '44,000,000 Berries' },
    { name: 'Brook', devilFruit: 'Yomi Yomi no Mi', affiliation: 'Straw Hat Pirates', height: '277 cm', gender: 'Masculin', bounty: '33,000,000 Berries' },
    { name: 'Jinbe', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '301 cm', gender: 'Masculin', bounty: '438,000,000 Berries' },
    { name: 'Gol D. Roger', devilFruit: 'Aucun', affiliation: 'Roger Pirates', height: 'Unknown', gender: 'Masculin', bounty: '5,564,800,000 Berries' },
    { name: 'Shanks', devilFruit: 'Aucun', affiliation: 'Red-Haired Pirates', height: '199 cm', gender: 'Masculin', bounty: 'Unknown' },
    { name: 'Blackbeard', devilFruit: 'Yami Yami no Mi, Gura Gura no Mi', affiliation: 'Blackbeard Pirates', height: '344 cm', gender: 'Masculin', bounty: '2,247,600,000 Berries' },
    { name: 'Eustass Kid', devilFruit: 'Aucun', affiliation: 'Kid Pirates', height: 'Unknown', gender: 'Masculin', bounty: '470,000,000 Berries' },
    { name: 'Trafalgar Law', devilFruit: 'Ope Ope no Mi', affiliation: 'Heart Pirates', height: '191 cm', gender: 'Masculin', bounty: '500,000,000 Berries' },
    { name: 'Donquixote Doflamingo', devilFruit: 'String String Fruit', affiliation: 'Donquixote Pirates', height: '305 cm', gender: 'Masculin', bounty: '340,000,000 Berries' },
    { name: 'Big Mom', devilFruit: 'Soru Soru no Mi', affiliation: 'Big Mom Pirates', height: '880 cm', gender: 'Féminin', bounty: '4,388,000,000 Berries' },
    { name: 'Kaido', devilFruit: 'Uo Uo no Mi', affiliation: 'Beast Pirates', height: 'Unknown', gender: 'Masculin', bounty: '4,611,100,000 Berries' },
    { name: 'Jinbe', devilFruit: 'Aucun', affiliation: 'Straw Hat Pirates', height: '301 cm', gender: 'Masculin', bounty: '438,000,000 Berries' },
    { name: 'Smoker', devilFruit: 'Moku Moku no Mi', affiliation: 'Marine', height: '220 cm', gender: 'Masculin', bounty: 'Unknown' },
    { name: 'Kizaru', devilFruit: 'Pika Pika no Mi', affiliation: 'Marine', height: 'Unknown', gender: 'Masculin', bounty: 'Unknown' },
    { name: 'Akainu', devilFruit: 'Magu Magu no Mi', affiliation: 'Marine', height: 'Unknown', gender: 'Masculin', bounty: 'Unknown' },
    { name: 'Aokiji', devilFruit: 'Hie Hie no Mi', affiliation: 'Marine', height: 'Unknown', gender: 'Masculin', bounty: 'Unknown' }
];

// API pour choisir un personnage aléatoire
app.get('/api/start-game', (req, res) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    res.json(characters[randomIndex]);
});

// API pour récupérer tous les personnages
app.get('/api/characters', (req, res) => {
    res.json(characters);
});

// API pour rechercher des personnages
app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = characters.filter(character => character.name.toLowerCase().includes(query));
    res.json(results);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
