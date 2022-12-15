//----------------------Partie importation-----------------------------//

import {Formulaire} from './Formulaire.js';

//----------------------Partie definition variables-----------------------------//
let globalStatus = 0;

//Code HTML pour le formulaire
let htmlCode = `<div class="form" id="form">
                    <div class="close-container" id='exit'>
                        <div class="leftright"></div>
                        <div class="rightleft"></div>
                        <label class="close">close</label>
                    </div>
                    <div class="title2">Create activity</div>
                    <div class="input-container ic1">
                        <input class="input" id="title" type="text" placeholder=" " />
                        <div class="cut"></div>
                        <label for="title" class="placeholder">Nom de l'activite</label>
                    </div>
                    <div class="input-container ic2">
                        <input class="input" type="text" id="desc" placeholder=" " />
                        <div class="cut"></div>
                        <label for="desc" class="placeholder">Description</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="date" class="input" type="date" />
                    </div>
                    <div class="input-container ic2">
                        <select id="status" class="input">
                            <option value="1">To do</option>
                            <option value="2">Doing</option>
                            <option value="3">Done</option>
                        </select>
                    </div>
                    <button type="text" class="submit" id ="bSubmit">submit</button>
                </div>`;
// let htmlCode = `<form>
//                     <div class="cardform">
//                         <div>
//                             <label>Nom de l'activite:</label>
//                             <input type="text" title name="title" placeholder="Nom de l'activite" />
//                         </div>
//                         <div>
//                             <label>Description:</label>
//                             <input type="textarea" id="desc" name="desc" placeholder="Description" />
//                         </div>
//                         <div>
//                             <label>Date:</label>
//                             <input type="date" id="date" name="date" />
//                         </div>
//                         <label>Status:</label>
//                         <select id="status">
//                             <option value="1">To do</option>
//                             <option value="2">Doing</option>
//                             <option value="3">Done</option>
//                         </select>
//                         <div class="button" id ="bSubmit">
//                             <button type="submit">Envoyer le formulaire</button>
//                         </div>
//                     </div>
//                 </form>`;

//Stocke de toutes les cartes
let listForm = [];

// Pour afficher l'html généré dans le js quand on appuie sur le bouton genForm
const idGenForm = document.querySelector('#genForm');

//----------------------Partie formulaire-----------------------------//

function genForm()
{
    const formCard = document.getElementsByTagName("main")[0];
    let tmp = formCard.innerHTML
    formCard.innerHTML = htmlCode + tmp;

    const RecupSubmit = document.querySelector('#bSubmit'); // Pour récupérer le contenu du formulaire quand on clique sur submit 

    /**
     * Met en place l'animation pour la disparition du formulaire
     */
    document.getElementById("exit").addEventListener("click", function()
    {
        document.getElementById("form").animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-350px)' }],
            {
                duration: 1000
            }
        );
        setTimeout(() => {  document.getElementById("form").remove(); }, 1000);
    });

    /**
     * Recupere les valeurs du formulaire pour les ajouter a une class form et l'ajouter a la liste listForm
     */
    RecupSubmit.addEventListener('click', function()
        {
            let title = document.getElementById("title").value;
            let desc = document.getElementById("desc").value;
            let date = document.getElementById("date").value;
            let status = document.getElementById("status").value;
            
            let newForm = new Formulaire(title, desc, date, status)

            listForm.push(newForm);

            regroupStatus();
        });
};

/**
 * Genere le formulaire
 */
idGenForm.addEventListener('click', function()
    {
        genForm();
    });

//----------------------Partie menu burger-------------//

/**
 * Animation pour les bares du menu burger
 */
document.getElementById("menu_burger").addEventListener("click", function()
    {
        document.getElementById("menu_burger").classList.toggle("open");
    });

/** 
 * Apparition et disparition du menu
*/
document.getElementById("jsID").addEventListener("click", function()
    {
        var x = document.getElementById("burger");
        if (x.style.display === "block")
        {
            x.animate([
                { transform: 'translateX(0px)' },
                { transform: 'translateX(20vw)' }],
                { duration: 1000 }
            );
            setTimeout(() => {  x.style.display = "none"; }, 1000);
        }
        else
            x.style.display = "block";
    });

//----------------------Tri par statut -------------//

function regroupStatus()
{
    let tmp = '';
    const formCard = document.getElementsByTagName("main")[0];
    
    for (let elem of listForm){
        if(elem.status == globalStatus || globalStatus == 0){
            tmp += elem.affCard();
        }
    }
    formCard.innerHTML='<div id="all_card">' + tmp + '</div>';
}

let toDo = document.getElementById('toDo').addEventListener('click', e =>{
    globalStatus = 1
    regroupStatus()
})

let going = document.getElementById('going').addEventListener('click',e =>{
    globalStatus = 2
    regroupStatus()
})


let done = document.getElementById('done').addEventListener('click',e =>{
    globalStatus = 3
    regroupStatus()
})

let urgent = document.getElementById('urgent').addEventListener('click',e =>{
    globalStatus = 4
    regroupStatus()
})


//----------------------Partie récupération des infos-------------//

// localStorage.setItem("Info formulaire", document.querySelector("#bsumit").value);

// document.querySelector('#display-firstname').innerHTML = localStorage.getItem('');