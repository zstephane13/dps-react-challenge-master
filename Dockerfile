# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application avec nginx
FROM nginx:alpine

# Créer les répertoires nécessaires pour nginx
RUN mkdir -p /var/cache/nginx /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx

# Copier le fichier de configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Supprimer la page par défaut de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers construits depuis l'étape de construction
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 (nginx par défaut)
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]