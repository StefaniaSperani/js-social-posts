/*
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

x Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)

x Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
        
    }
    
];
console.log(posts);


//creo la variabile del container presente nel DOM(questa è un'HTML Collection)
const containerPost = document.getElementById('container');

//ora ciclo l'array, in modo che mi mostri gli oggetti in esso contenuti
posts.forEach((userPost) => {
    //creo il div dove finirà tutta la struttura del post
    const post = document.createElement('div');
    //e gli aggiungo la classe che gli darà lo stile del CSS
    post.className = ('post');
    //e lo inserisco nel DOM
    post.innerHTML = `
    <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${userPost.author.image}" alt="${userPost.author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${userPost.author.name}</div>
                        <div class="post-meta__time">${userPost.created}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${userPost.content}</div>
            <div class="post__image">
                <img src="${userPost.media}" alt="Immagine di ${userPost.author}.">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" data-postid="1">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-1" class="js-likes-counter">${userPost.likes}</b> persone
                    </div>
                </div> 
            </div>            
    `;
    //per fare in modo che si veda nel DOM lo appendo al suo contenitore padre
    containerPost.appendChild(post);
})
//ora devo creare la funzione per il like al post, quindi estraggo il bottone dal DOM
const btnLike = document.querySelectorAll('.like-button');
//estraggo il counter che incrementa(o decresce)
let likeCounter = document.querySelectorAll('.js-likes-counter')
//estraggo il counter che diventerà l'array con al suo interno i post piaciuti
let likedPosts = document.getElementById('like-counter-1');
//e lo setto vuoto, così man mano si popola
likedPosts = [];
//per tenere traccia se il post riceve un like o meno, creo una variabile che imposto a false
let isLiked = false;

//Creo la funzione che al click, cambierà colore alla scritta e incrementa il numero di likes
function clickLike(i){
    console.log('sono like', i, isLiked);
    //se il post NON ha ricevuto like, al click entrerà in questo blocco
    if(!isLiked){ //isLikded === false
        //aggiungo la classe che gli farà cambiare colore, insieme all'indice che lo cambierà a tutti
        btnLike[i].classList.add('like-button--liked');
        //ora deve incrementare il like, sempre con l'indice
        likeCounter[i].innerHTML = ++posts[i].likes;
        //ora devo pushare nell'array i like piaciuti
        likedPosts.push(posts[i].id);
        //e infine setto la variabile a true
        isLiked = true;
    //se invece il post HA ricevuto il like, al click entrerà in questo blocco
    }else if(isLiked){ //isLiked === true
        //rimuovendo la classe del colore
        btnLike[i].classList.remove('like-button--liked');
        //e decrementando il numero di like
        likeCounter[i].innerHTML = --posts[i].likes;
        //risettando la variabile a false, come lo era all'inizio
        isLiked = false;
    }
}
//e attacco la funzione al bottone di ogni post, di cui tengo traccia tramite l'index
for(let i = 0; i < btnLike.length; i++){
    btnLike[i].addEventListener('click', ()=> clickLike(i))
}



