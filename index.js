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
        affiliation: 'Équipage des Pirates de Roger', 
        height: '274 cm', 
        gender: 'Masculin', 
        bounty: '5,564,800,000 Berries', 
        firstArc: 'Romance Dawn' 
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
        name: 'Trafalgar D. Water Law', 
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
        name: 'Aramaki', 
        devilFruit: 'Mori Mori no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '330 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Haguar D. Sauro', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Marine', 
        height: '1950 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Morgan', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Marine', 
        height: '285 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn'
    },
    { 
        name: 'Vegapunk', 
        devilFruit: 'Nomi Nomi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Gouvernement Mondial', 
        height: '180 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Shaka', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '211 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Lilith', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '205 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Edison', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '160 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Pythagoras', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '180 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Atlas', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '891 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'York', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Vegapunk', 
        height: '606 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Egg Head'
    },
    { 
        name: 'Rob Lucci', 
        devilFruit: 'Neko Neko no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '212 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Kaku', 
        devilFruit: 'Ushi Ushi no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '193 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Kalifa', 
        devilFruit: 'Awa Awa no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '185 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Stussy', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '179 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Blueno', 
        devilFruit: 'Doa Doa no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'CP-AIGIS0', 
        height: '258 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Jabra', 
        devilFruit: 'Inu Inu no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'CP9', 
        height: '212 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Kinemon', 
        devilFruit: 'Fuku Fuku no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '295 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Kozuki Momonosuke', 
        devilFruit: 'Fruit de Kozuki Momonosuke (Fruit Artificiel)', 
        haki: 'Vision', 
        affiliation: 'Famille Kozuki', 
        height: '110 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Kurozumi Kanjuro', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kurozumi', 
        height: '347 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Kurozumi Orochi', 
        devilFruit: 'Hebi Hebi no Mi, Modèle: Yamata no Orochi', 
        haki: 'Aucun', 
        affiliation: 'Famille Kurozumi', 
        height: '350 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Kurozumi Tama', 
        devilFruit: 'Kibi Kibi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Famille Kurozumi', 
        height: '108 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Diamante', 
        devilFruit: 'Hira Hira no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Donquichote Pirates', 
        height: '525 cm', 
        gender: 'Masculin', 
        bounty: '99,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Riku Viola', 
        devilFruit: 'Giro Giro no Mi', 
        haki: 'Aucun', 
        affiliation: 'Famille Riku', 
        height: '178 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Rebecca', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Famille Riku', 
        height: '171 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Kyros', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Riku', 
        height: '298 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Zeff', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Baratie', 
        height: '189 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Portgas D. Ace', 
        devilFruit: 'Mera Mera no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '185 cm', 
        gender: 'Masculin', 
        bounty: '550,000,000 Berries', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Izou', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '192 cm', 
        gender: 'Masculin', 
        bounty: '510,000,000 Berries', 
        firstArc: 'Marineford' 
    },
    { 
        name: 'Joz', 
        devilFruit: 'Kira Kira no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '503 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Marineford' 
    },
    { 
        name: 'Little Oars Jr.', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Barbe Blanche', 
        height: '6000 cm', 
        gender: 'Masculin', 
        bounty: '550,000,000 Berries', 
        firstArc: 'Marineford' 
    },
    { 
        name: 'Marco', 
        devilFruit: 'Tori Tori no Mi', 
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
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Cavendish', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage des Magnifiques Pirates', 
        height: '208 cm', 
        gender: 'Masculin', 
        bounty: '330,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Arlong', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage Arlong', 
        height: '263 cm', 
        gender: 'Masculin', 
        bounty: '20,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Kuro', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage du Chat Noir', 
        height: '207 cm', 
        gender: 'Masculin', 
        bounty: '16,000,000 Berries', 
        firstArc: 'Syrup Village' 
    },
    { 
        name: 'Foxy', 
        devilFruit: 'Noro Noro no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Foxy', 
        height: '180 cm', 
        gender: 'Masculin', 
        bounty: '24,000,000 Berries', 
        firstArc: 'Enies Lobby' 
    },
    { 
        name: 'Caribou', 
        devilFruit: 'Numa Numa no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Caribou', 
        height: '228 cm', 
        gender: 'Masculin', 
        bounty: '210,000,000 Berries', 
        firstArc: 'Post-War' 
    },
    { 
        name: 'Ashura Doji', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Voleurs Atamayama', 
        height: '544 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Enel', 
        devilFruit: 'Goro Goro no Mi', 
        haki: 'Vision', 
        affiliation: 'Spaceys', 
        height: '266 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Skypiea' 
    },
    { 
        name: 'Dracule Mihawk', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Guilde de la Croix', 
        height: '198 cm', 
        gender: 'Masculin', 
        bounty: '3,590,000,000 Berries', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Emporio Ivankov', 
        devilFruit: 'Horu Horu no Mi', 
        haki: 'Aucun', 
        affiliation: 'Armée Révolutionnaire', 
        height: '449 cm', 
        gender: 'Masculin', 
        bounty: '100,000,000 Berries', 
        firstArc: 'Impel Down' 
    },
    { 
        name: 'Inazuma', 
        devilFruit: 'Choki Choki no Mi', 
        haki: 'Aucun', 
        affiliation: 'Armée Révolutionnaire', 
        height: '229 cm', 
        gender: 'Masculin', 
        bounty: '100,000,000 Berries', 
        firstArc: 'Impel Down' 
    },
    { 
        name: 'Hack', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Armée Révolutionnaire', 
        height: '280 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Bartholomew Kuma', 
        devilFruit: 'Nikyu Nikyu no Mi', 
        haki: 'Armement', 
        affiliation: 'Armée Révolutionnaire', 
        height: '689 cm', 
        gender: 'Masculin', 
        bounty: '296,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Bartolomeo', 
        devilFruit: 'Bari Bari no Mi', 
        haki: 'Aucun', 
        affiliation: 'Barto Club', 
        height: '220 cm', 
        gender: 'Masculin', 
        bounty: '200,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Vinsmoke Ichiji', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Vinsmoke', 
        height: '186 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Vinsmoke Niji', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Vinsmoke', 
        height: '185 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Vinsmoke Yonji', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Vinsmoke', 
        height: '194 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Vinsmoke Reiju', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Vinsmoke', 
        height: '173 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Silvers Rayleigh', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage des Pirates de Roger', 
        height: '188 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Orange Town' 
    },
    { 
        name: 'Don Quichotte Rossinante', 
        devilFruit: 'Nagi Nagi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Marine', 
        height: '293 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'X Drake', 
        devilFruit: 'Ryu Ryu no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '233 cm', 
        gender: 'Masculin', 
        bounty: '222,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Monkey D. Dragon', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Armée Révolutionnaire', 
        height: '256 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Loguetown' 
    },
    { 
        name: 'Inuarashi', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Principauté de Mokomo', 
        height: '511 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Nekomamushi', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Principauté de Mokomo', 
        height: '522 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Shishilian', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Principauté de Mokomo', 
        height: '196 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Carrot', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Principauté de Mokomo', 
        height: '161 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Wanda', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Principauté de Mokomo', 
        height: '181 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Pedro', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Principauté de Mokomo', 
        height: '233 cm', 
        gender: 'Masculin', 
        bounty: '382,000,000 Berries', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Mont Blanc Noland', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Royaume de Luvneel', 
        height: '220 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Skypiea' 
    },
    { 
        name: 'Mont Blanc Cricket', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Forces Spéciales Simiesques', 
        height: '242 cm', 
        gender: 'Masculin', 
        bounty: '25,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Raizo', 
        devilFruit: 'Maki Maki no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '311 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Zou' 
    },
    { 
        name: 'Brogy', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Géants', 
        height: '2130 cm', 
        gender: 'Masculin', 
        bounty: '100,000,000 Berries', 
        firstArc: 'Little Garden' 
    },
    { 
        name: 'Dorry', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Géants', 
        height: '2260 cm', 
        gender: 'Masculin', 
        bounty: '100,000,000 Berries', 
        firstArc: 'Little Garden' 
    },
    { 
        name: 'Shimotsuki Ryuma', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Thriller Pirates de lécorce', 
        height: '179 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Gecko Moria', 
        devilFruit: 'Kage Kage no Mi', 
        haki: 'Aucun', 
        affiliation: 'Thriller Pirates de lécorce', 
        height: '692 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Oars', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Thriller Pirates de lécorce', 
        height: '6700 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Tashigi', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '170 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Loguetown' 
    },
    { 
        name: 'Yamato', 
        devilFruit: 'Inu Inu no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Alliance des Ninjas-Pirates-Minks-Samouraïs', 
        height: '263 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Kawamatsu', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '271 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Usopp', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Straw Hat Pirates', 
        height: '176 cm', 
        gender: 'Masculin', 
        bounty: '500,000,000 Berries', 
        firstArc: 'Syrup Village' 
    },
    { 
        name: 'Krieg', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Armada Pirate de Don Krieg', 
        height: '243 cm', 
        gender: 'Masculin', 
        bounty: '17,000,000 Berries', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Gin', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Armada Pirate de Don Krieg', 
        height: '186 cm', 
        gender: 'Masculin', 
        bounty: '12,000,000 Berries', 
        firstArc: 'Baratie' 
    },
    { 
        name: 'Issho', 
        devilFruit: 'Zushi Zushi no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '270 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Icebarg', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Galley-La Company', 
        height: '199 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Pauly', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Galley-La Company', 
        height: '195 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Urouge', 
        devilFruit: 'Fruit Urouge', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Moines Dépravés ', 
        height: '389 cm', 
        gender: 'Masculin', 
        bounty: '108,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Kozuki Oden', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '382 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Denjiro', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '306 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Kiku', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Kozuki', 
        height: '287 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Boa Hancock', 
        devilFruit: 'Mero Mero no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Kujas', 
        height: '191 cm', 
        gender: 'Féminin', 
        bounty: '1,659,000,000 Berries', 
        firstArc: 'Amazon Lily' 
    },
    { 
        name: 'Perona', 
        devilFruit: 'Horo Horo no Mi', 
        haki: 'Aucun', 
        affiliation: 'Dracule Mihawk', 
        height: '160 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Shirahoshi', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Famille Neptune', 
        height: '1187 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Otohime', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Famille Neptune', 
        height: '224 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Neptune', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Neptune', 
        height: '1220 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Fukaboshi', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Neptune', 
        height: '604 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Nefertari Vivi', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Royaume Alabasta', 
        height: '169 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Reverse Mountain' 
    },
    { 
        name: 'Pell', 
        devilFruit: 'Tori Tori no Mi', 
        haki: 'Aucun', 
        affiliation: 'Royaume Alabasta', 
        height: '169 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Nefertari Cobra', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Royaume Alabasta', 
        height: '182 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Igaram', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Royaume Alabasta', 
        height: '218 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whisky Peak' 
    },
    { 
        name: 'Monkey D. Garp', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Marine', 
        height: '287 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Arlong Park' 
    },
    { 
        name: 'Señor Pink', 
        devilFruit: 'Sui Sui no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '244 cm', 
        gender: 'Masculin', 
        bounty: '58,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Trébol', 
        devilFruit: 'Beta Beta no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '349 cm', 
        gender: 'Masculin', 
        bounty: '99,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Lao G', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '233 cm', 
        gender: 'Masculin', 
        bounty: '61,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Dellinger', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '160 cm', 
        gender: 'Masculin', 
        bounty: '15,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Gladius', 
        devilFruit: 'Pamu Pamu no Mi', 
        haki: 'Armement', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '260 cm', 
        gender: 'Masculin', 
        bounty: '31,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Sai', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Flotte de Happou', 
        height: '242 cm', 
        gender: 'Masculin', 
        bounty: '210,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Chinjao', 
        devilFruit: 'Aucun', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Flotte de Happou', 
        height: '520 cm', 
        gender: 'Masculin', 
        bounty: '542,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Léo', 
        devilFruit: 'Nui Nui no Mi', 
        haki: 'Aucun', 
        affiliation: 'Royaume de Tontatta', 
        height: '23 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Hajrudin', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Erbaf', 
        height: '2200 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Buffalo', 
        devilFruit: 'Guru Guru no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '696 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Baby 5', 
        devilFruit: 'Buki Buki no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '181 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Sugar', 
        devilFruit: 'Hobi Hobi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '110 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Vergo', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '247 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'Pekoms', 
        devilFruit: 'Kame Kame no Mi', 
        haki: 'Armement, Vision', 
        affiliation: ' Équipage de Big Mom', 
        height: '232 cm', 
        gender: 'Masculin', 
        bounty: '330,000,000 Berries', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Tamago', 
        devilFruit: 'Tama Tama no Mi', 
        haki: 'Armement, Vision', 
        affiliation: ' Équipage de Big Mom', 
        height: '301 cm', 
        gender: 'Masculin', 
        bounty: '429,000,000 Berries', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Pica', 
        devilFruit: 'Ishi Ishi no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '470 cm', 
        gender: 'Masculin', 
        bounty: '99,000,000 Berries', 
        firstArc: 'Dressrosa' 
    },
    { 
        name: 'Sabo', 
        devilFruit: 'Mera Mera no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Armée révolutionnaire', 
        height: '187 cm', 
        gender: 'Masculin', 
        bounty: '602,000,000 Berries', 
        firstArc: 'Post-War' 
    },
    { 
        name: 'Basil Hawkins', 
        devilFruit: 'Wara Wara no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Hawkins', 
        height: '210 cm', 
        gender: 'Masculin', 
        bounty: '320,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Spandam', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'CP-AIGIS0', 
        height: '192 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Water 7' 
    },
    { 
        name: 'Sengoku', 
        devilFruit: 'Hito Hito no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Marine', 
        height: '278 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Jesus Burgess', 
        devilFruit: 'Riki Riki no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Barbe Noire', 
        height: '355 cm', 
        gender: 'Masculin', 
        bounty: '20,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Kureha', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Royaume des Cerisiers', 
        height: '188 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Hiluluk', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Aucun', 
        height: '213 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Drum Island' 
    },
    { 
        name: 'Bentham (mr 2)', 
        devilFruit: 'Mane Mane no Mi', 
        haki: 'Aucun', 
        affiliation: 'Okamas', 
        height: '238 cm', 
        gender: 'Masculin', 
        bounty: '32,000,000 Berries', 
        firstArc: 'Little Garden' 
    },
    { 
        name: 'Galdino (mr 3)',
        devilFruit: 'Doru Doru no Mi', 
        haki: 'Aucun', 
        affiliation: 'Guilde de la Croix', 
        height: '179 cm', 
        gender: 'Masculin', 
        bounty: '24,000,000 Berries', 
        firstArc: 'Little Garden' 
    },
    { 
        name: 'Daz Bonez (mr 1)', 
        devilFruit: 'Supa Supa no Mi', 
        haki: 'Aucun', 
        affiliation: 'Guilde de la Croix', 
        height: '212 cm', 
        gender: 'Masculin', 
        bounty: '75,000,000 Berries', 
        firstArc: 'Arabasta' 
    },
    { 
        name: 'Crocodile', 
        devilFruit: 'Suna Suna no Mi', 
        haki: 'Aucun', 
        affiliation: 'Guilde de la Croix', 
        height: '253 cm', 
        gender: 'Masculin', 
        bounty: '1,965,000,000 Berries', 
        firstArc: 'Little Garden' 
    },
    { 
        name: 'Wiper', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Shandias', 
        height: '183 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Skypiea' 
    },
    { 
        name: 'Monet', 
        devilFruit: 'Yuki Yuki no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '227 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Punk Hazard' 
    },
    { 
        name: 'César Clown', 
        devilFruit: 'Gasu Gasu no Mi', 
        haki: 'Aucun', 
        affiliation: 'Royaume de Germa', 
        height: '309 cm', 
        gender: 'Masculin', 
        bounty: '300,000,000 Berries', 
        firstArc: 'Punk Hazard' 
    },
    
    { 
        name: 'Jewelry Bonney', 
        devilFruit: 'Toshi Toshi no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Bonney', 
        height: '174 cm', 
        gender: 'Féminin', 
        bounty: '320,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },

    { 
        name: 'Capone Bege', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage du Fire Tank', 
        height: '166 cm', 
        gender: 'Masculin', 
        bounty: '350,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Vinsmoke Judge', 
        devilFruit: 'Aucun', 
        haki: 'Armement', 
        affiliation: 'Famille Vinsmoke', 
        height: '272 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Kozuki Hiyori', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Famille Kozuki', 
        height: '170 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Kozuki Toki', 
        devilFruit: 'Toki Toki no Mi', 
        haki: 'Aucun', 
        affiliation: 'Famille Kozuki', 
        height: '190 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Shinobu', 
        devilFruit: 'Juku Juku no Mi', 
        haki: 'Aucun', 
        affiliation: 'Famille Kozuki', 
        height: '180 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Fukurokuju', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipe aux Cent Bêtes', 
        height: '221 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Shimotsuki Yasuie', 
        devilFruit: 'Smile', 
        haki: 'Aucun', 
        affiliation: 'Pays des Wa', 
        height: '155 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Hyogoro', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Famille Hyogoro', 
        height: '100 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Toko', 
        devilFruit: 'Smile', 
        haki: 'Aucun', 
        affiliation: 'Pays des Wa', 
        height: '89 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Wano' 
    },
    { 
        name: 'Hogback', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Thriller Pirates de lécorce', 
        height: '223 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Thriller Bark' 
    },
    { 
        name: 'Hody Jones', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Nouveaux Hommes-Poissons', 
        height: '331 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Fisher Tiger', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Pirates du Soleil', 
        height: '520 cm', 
        gender: 'Masculin', 
        bounty: '230,000,000 Berries', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Aladin', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage des Pirates du Soleil', 
        height: '627 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Bellamy', 
        devilFruit: 'Bane Bane no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Don Quichotte Doflamingo', 
        height: '240 cm', 
        gender: 'Masculin', 
        bounty: '195,000,000 Berries', 
        firstArc: 'Jaya' 
    },
    { 
        name: 'Koby', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '167 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Hermepp', 
        devilFruit: 'Aucun', 
        haki: 'Vision', 
        affiliation: 'Marine', 
        height: '179 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Sentomaru', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Marine', 
        height: '279 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Killer', 
        devilFruit: 'Smile', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Kid', 
        height: '195 cm', 
        gender: 'Masculin', 
        bounty: '200,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Scratchmen Apoo', 
        devilFruit: 'Oto Oto no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipe aux Cent Bêtes', 
        height: '256 cm', 
        gender: 'Masculin', 
        bounty: '350,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Koala', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Armée révolutionnaire', 
        height: '160 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Fishman Island' 
    },
    { 
        name: 'Baggy', 
        devilFruit: 'Bara Bara no Mi', 
        haki: 'Aucun', 
        affiliation: 'Guilde de la Croix', 
        height: '192 cm', 
        gender: 'Masculin', 
        bounty: '3,189,000,000 Berries', 
        firstArc: 'Orange Town' 
    },
    { 
        name: 'Alvida', 
        devilFruit: 'Sube Sube no Mi', 
        haki: 'Aucun', 
        affiliation: 'Guilde de la Croix', 
        height: '198 cm', 
        gender: 'Féminin', 
        bounty: '5,000,000 Berries', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Morgans', 
        devilFruit: 'Bara Bara no Mi', 
        haki: 'Aucun', 
        affiliation: 'Document dactualité sur léconomie mondiale', 
        height: '305 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Tori Tori no Mi' 
    },
    { 
        name: 'Magellan', 
        devilFruit: 'Doku Doku no Mi', 
        haki: 'Aucun', 
        affiliation: 'Impel Down', 
        height: '491 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Impel Down' 
    },
    { 
        name: 'Bell-mère', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Marine', 
        height: '186 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Arlong Park' 
    },
    { 
        name: 'Nojiko', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Aucun', 
        height: '170 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Arlong Park' 
    },
    { 
        name: 'Camie', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Takoyaki 8', 
        height: '197 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Camie', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Takoyaki 8', 
        height: '197 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Alabasta' 
    },
    { 
        name: 'Bepo', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage du Heart', 
        height: '240 cm', 
        gender: 'Masculin', 
        bounty: '500,000,000 Berries', 
        firstArc: 'Sabaody Archipelago' 
    },
    { 
        name: 'Yasopp', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage du Roux', 
        height: '183 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Lucky Roux', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage du Roux', 
        height: '241 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Benn Beckman', 
        devilFruit: 'Aucun', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage du Roux', 
        height: '206 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Romance Dawn' 
    },
    { 
        name: 'Uta', 
        devilFruit: 'Uta Uta no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage du Roux', 
        height: '169 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Film Red' 
    },
    { 
        name: 'Charlotte Pudding', 
        devilFruit: 'Memo Memo no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Big Mom', 
        height: '166 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Brûlée', 
        devilFruit: 'Mira Mira no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Big Mom', 
        height: '350 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Smoothie', 
        devilFruit: 'Shibo Shibo no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Big Mom', 
        height: '464 cm', 
        gender: 'Féminin', 
        bounty: '932,000,000', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Chiffon', 
        devilFruit: 'Aucun', 
        haki: 'Aucun', 
        affiliation: 'Équipage du Fire Tank', 
        height: '215 cm', 
        gender: 'Féminin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Mont dOr', 
        devilFruit: 'Buku Buku no Mi', 
        haki: 'Aucun', 
        affiliation: 'Équipage de Big Mom', 
        height: '260 cm', 
        gender: 'Masculin', 
        bounty: '0', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Perospero', 
        devilFruit: 'Pero Pero no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Big Mom', 
        height: '333 cm', 
        gender: 'Masculin', 
        bounty: '700,000,000 Berries', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Katakuri', 
        devilFruit: 'Mochi Mochi no Mi', 
        haki: 'Rois, Armement, Vision', 
        affiliation: 'Équipage de Big Mom', 
        height: '509 cm', 
        gender: 'Masculin', 
        bounty: '1,100,000,000 Berries', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Oven', 
        devilFruit: 'Netsu Netsu no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Big Mom', 
        height: '492 cm', 
        gender: 'Masculin', 
        bounty: '300,000,000 Berries', 
        firstArc: 'Whole Cake Island' 
    },
    { 
        name: 'Charlotte Cracker', 
        devilFruit: 'Bisu Bisu no Mi', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage de Big Mom', 
        height: '307 cm', 
        gender: 'Masculin', 
        bounty: '860,000,000 Berries', 
        firstArc: 'Whole Cake Island' 
    },
    {
        name: 'King',
        devilFruit: 'Ryu Ryu no Mi, Modèle: Ptéranodon',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '613 cm',
        gender: 'Masculin',
        bounty: '1,390,000,000 Berries',
        firstArc: 'Wano'
    },
    {
        name: 'Queen',
        devilFruit: 'Ryu Ryu no Mi, Modèle: Brachiosaure',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '612 cm',
        gender: 'Masculin',
        bounty: '1,320,000,000 Berries',
        firstArc: 'Wano'
    },
    {
        name: 'Jack',
        devilFruit: 'Zo Zo no Mi, Modèle: Mammouth',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '830 cm',
        gender: 'Masculin',
        bounty: '1,000,000,000 Berries',
        firstArc: 'Zou'
    },
    {
        name: 'Sasaki',
        devilFruit: 'Ryu Ryu no Mi, Modèle: Tricératops',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '318 cm',
        gender: 'Masculin',
        bounty: '472,000,000 Berries',
        firstArc: 'Wano'
    },
    {
        name: 'Black Maria',
        devilFruit: 'Kumo Kumo no Mi, Modèle: Rosamygale Grauvogeli',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '820 cm',
        gender: 'Féminin',
        bounty: '480,000,000 Berries',
        firstArc: 'Wano'
    },
    {
        name: "Who's-Who",
        devilFruit: 'Neko Neko no Mi, Modèle: Tigre à dents de sabre',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '336 cm',
        gender: 'Masculin',
        bounty: '546,000,000 Berries',
        firstArc: 'Wano'
    },
    { 
        name: 'Ulti', 
        devilFruit: 'Ryu Ryu no Mi, Modèle: Pachycéphalosaure', 
        haki: 'Armement, Vision', 
        affiliation: 'Équipage aux Cent Bêtes', 
        height: '173 cm', 
        gender: 'Féminin', 
        bounty: '400,000,000 Berries', 
        firstArc: 'Wano' 
    },
    {
        name: 'Page One',
        devilFruit: 'Ryu Ryu no Mi, Modèle: Spinosaurus',
        haki: 'Armement, Vision',
        affiliation: 'Équipe aux Cent Bêtes',
        height: '171 cm',
        gender: 'Masculin',
        bounty: '290,000,000 Berries',
        firstArc: 'Wano'
    },
];



// Liste des fruits du démon
const devilFruits = [
    // ////////////////////////////
    ////////// Logia  /////////
    // ////////////////////////////
    { name: 'Moku Moku no Mi', type: 'Logia' },
    { name: 'Magu Magu no Mi', type: 'Logia' },
    { name: 'Hie Hie no Mi', type: 'Logia' },
    { name: 'Mera Mera no Mi', type: 'Logia' },
    { name: 'Pika Pika no Mi', type: 'Logia' },
    { name: 'Goro Goro no Mi', type: 'Logia' },
    { name: 'Yami Yami no Mi', type: 'Logia' },
    { name: 'Gasu Gasu no Mi', type: 'Logia' },
    { name: 'Yuki Yuki no Mi', type: 'Logia' },
    { name: 'Suna Suna no Mi', type: 'Logia' },
    { name: 'Numa Numa no Mi', type: 'Logia' },
    { name: 'Mori Mori no Mi', type: 'Logia' },
    // ////////////////////////////
    ////////// Paramecia  /////////
    // ////////////////////////////
    { name: 'Gomu Gomu no Mi', type: 'Paramecia' },
    { name: 'Bara Bara no Mi', type: 'Paramecia' },
    { name: 'Hana Hana no Mi', type: 'Paramecia' },
    { name: 'Yomi Yomi no Mi', type: 'Paramecia' },
    { name: 'Toshi Toshi no Mi', type: 'Paramecia' },
    { name: 'Gura Gura no Mi', type: 'Paramecia' },
    { name: 'Ope Ope no Mi', type: 'Paramecia' },
    { name: 'Jiki Jiki no Mi', type: 'Paramecia' },
    { name: 'String String Fruit', type: 'Paramecia' },
    { name: 'Soru Soru no Mi', type: 'Paramecia' },
    { name: 'Supa Supa no Mi', type: 'Paramecia' },
    { name: 'Doru Doru no Mi', type: 'Paramecia' },
    { name: 'Mane Mane no Mi', type: 'Paramecia' },
    { name: 'Riki Riki no Mi', type: 'Paramecia' },
    { name: 'Wara Wara no Mi', type: 'Paramecia' },
    { name: 'Ishi Ishi no Mi', type: 'Paramecia' },
    { name: 'Sui Sui no Mi', type: 'Paramecia' },
    { name: 'Horo Horo no Mi', type: 'Paramecia' },
    { name: 'Mero Mero no Mi', type: 'Paramecia' },
    { name: 'Fruit Urouge', type: 'Paramecia' },
    { name: 'Zushi Zushi no Mi', type: 'Paramecia' },
    { name: 'Kage Kage no Mi', type: 'Paramecia' },
    { name: 'Maki Maki no Mi', type: 'Paramecia' },
    { name: 'Nagi Nagi no Mi', type: 'Paramecia' },
    { name: 'Bari Bari no Mi', type: 'Paramecia' },
    { name: 'Nikyu Nikyu no Mi', type: 'Paramecia' },
    { name: 'Horu Horu no Mi', type: 'Paramecia' },
    { name: 'Noro Noro no Mi', type: 'Paramecia' },
    { name: 'Bane Bane no Mi', type: 'Paramecia' },
    { name: 'Doku Doku no Mi', type: 'Paramecia' },
    { name: 'Awa Awa no Mi', type: 'Paramecia' },
    { name: 'Doa Doa no Mi', type: 'Paramecia' },
    { name: 'Fuku Fuku no Mi', type: 'Paramecia' },
    { name: 'Mochi Mochi no Mi', type: 'Paramecia' },
    { name: 'Memo Memo no Mi', type: 'Paramecia' },
    { name: 'Mira Mira no Mi', type: 'Paramecia' },
    { name: 'Buku Buku no Mi', type: 'Paramecia' },
    { name: 'Pero Pero no Mi', type: 'Paramecia' },
    { name: 'Bisu Bisu no Mi', type: 'Paramecia' },
    { name: 'Kibi Kibi no Mi', type: 'Paramecia' },
    { name: 'Hira Hira no Mi', type: 'Paramecia' },
    { name: 'Giro Giro no Mi', type: 'Paramecia' },
    { name: 'Netsu Netsu no Mi', type: 'Paramecia' },
    { name: 'Shibo Shibo no Mi', type: 'Paramecia' },
    { name: 'Sube Sube no Mi', type: 'Paramecia' },
    { name: 'Nomi Nomi no Mi', type: 'Paramecia' },
    { name: 'Beta Beta no Mi', type: 'Paramecia' },
    { name: 'Pamu Pamu no Mi', type: 'Paramecia' },
    { name: 'Guru Guru no Mi', type: 'Paramecia' },
    { name: 'Buki Buki no Mi', type: 'Paramecia' },
    { name: 'Hobi Hobi no Mi', type: 'Paramecia' },
    { name: 'Nui Nui no Mi', type: 'Paramecia' },
    { name: 'Oto Oto no Mi', type: 'Paramecia' },
    { name: 'Kira Kira no Mi', type: 'Paramecia' },
    { name: 'Toki Toki no Mi', type: 'Paramecia' },
    { name: 'Uta Uta no Mi', type: 'Paramecia' },
    { name: 'Juku Juku no Mi', type: 'Paramecia' },
    { name: 'Choki Choki no Mi', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },

    // ////////////////////////////
    // ZOAN
    // ////////////////////////////
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi', type: 'Zoan' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Hito Hito no Mi', type: 'Zoan' },
    { name: 'Uo Uo no Mi', type: 'Zoan' },
    { name: 'Kame Kame no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Neko Neko no Mi', type: 'Zoan' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Fruit de Kozuki Momonosuke (Fruit Artificiel)', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle Pachycéphalosaure', type: 'Zoan' },
    { name: 'Neko Neko no Mi, Modèle Tigre à dents de sabre', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Spinosaurus', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Ptéranodon', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Brachiosaure', type: 'Zoan' },
    { name: 'Zo Zo no Mi, Modèle: Mammouth', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Tricératops', type: 'Zoan' },
    { name: 'Kumo Kumo no Mi, Modèle: Rosamygale Grauvogeli', type: 'Zoan' },
    { name: 'Tama Tama no Mi', type: 'Zoan' },
    { name: 'Hebi Hebi no Mi, Modèle: Yamata no Orochi', type: 'Zoan' },
    // { name: 'Ato Ato no Mi', type: 'Zoan' },
    { name: 'au', type: 'Zoan' },
    { name: 'Smile', type: 'Zoan' }
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
