# P7Garbet 
# Mon Vieux Grimoire

### Réalisé par 
## [Simon Garbet](www.simongarbet.com)
### Dans le but d'un projet Openclassrooms

## Pour lancer ce site :

Commencez par le **back** de ce site :
- cd MonVieuxGrimoire/backend
- nodemon server

Puis lancez le **front** de ce site :
- cd MonVieuxGrimoire/frontend
- npm start

*Si la base de données ne renvoie rien, merci de connecter votre base de données personnelle avec le mot de passe à changer dans App.js (ligne 10).* 


## Que fait ce site ?

Mon Vieux Grimoire est une reproduction d'un site de notation de livres.
C'est le 7ème projet qui m'a été proposé par OpenClassrooms en juin 2023.
Le but étant de comprendre comment mettre en place le backend d'un site avec le framework **ExpressJS** et une base de données **Mongo DB**.
Il a été réalisé à partir d'un front pré-réalisé par Openclassrooms et du back en réalisé par moi-même.

Sur ce site est possible de réaliser ces actions :

- Créer un compte
- Se connecter
- Pouvoir ajouter des livres
- Pouvoir modifier/supprimer nos propres livres
- Pouvoir noter des livres que l'on a pas encore noté


Il y a des outils intégrés dans le backend :

- L'utilisation de **bcrypt** pour réaliser le hash de notre mot de passe.
- L'utilisation d'un **sanitizer** pour éviter l'injection de code à travers un formulaire. 
- Un **multer** pour enregistrer les images sur notre serveur.
- Un **sharp** pour redimmensionner les images à la taille voulue automatiquement.








