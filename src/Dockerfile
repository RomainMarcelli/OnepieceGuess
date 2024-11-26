# Utiliser une image officielle de Node.js
FROM node:16

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de votre projet dans le conteneur
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port de l'application
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["node", "index.js"]
