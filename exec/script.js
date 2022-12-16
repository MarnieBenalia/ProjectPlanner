//--------------------------------------------------------------//
//----------------------Importation-----------------------------//
//--------------------------------------------------------------//

/**
 * Import la classe formulaire depuis le fichier Formulaire.js
 */
import {Formulaire} from './Formulaire.js';

//---------------------------------------------------------------------//
//----------------------Variables globales-----------------------------//
//---------------------------------------------------------------------//

/**
 * globalStatus     =>      Definition du status pour l'affichage des cartes
 * htmlCode         =>      Code HTML pour le formulaire
 * listForm         =>      Liste des classes des cartes
 */

let globalStatus = 0;

let htmlCode = `<div class="form" id="form">
                    <div class="close-container" id='exit'>
                        <div class="leftright"></div>
                        <div class="rightleft"></div>
                        <label class="close">close</label>
                    </div>
                    <div class="title2">Create activity</div>
                    <div class="input-container ic1">
                        <input class="input" id="title" type="text" placeholder=" " required="required"/>
                        <div class="cut"></div>
                        <label for="title" class="placeholder">Nom de l'activite</label>
                    </div>
                    <div class="input-container ic2">
                        <input class="input" type="text" id="desc" placeholder=" " required="required"/>
                        <div class="cut"></div>
                        <label for="desc" class="placeholder">Description</label>
                    </div>
                    <div class="input-container ic2">
                        <input id="date" class="input" type="date" required="required"/>
                    </div>
                    <div class="input-container ic2">
                        <select id="status" class="input">
                            <option value="1">To do</option>
                            <option value="2">Doing</option>
                            <option value="3">Done</option>
                            <option value="toMove"></option>
                        </select>
                    </div>
                    <button type="text" class="submit" id ="bSubmit">submit</button>
                </div>`;

let listForm = [];

//-----------------------------------------------------//
//----------------------Fonctions----------------------//
//-----------------------------------------------------//

/**
 * Genere l'HTML pour le formulaire de creation de taches
 * Details:
 *      1       Recuperation de la balise main
 *      2       Ajout du code HTML du formulaire au code HTML deja present (Le formulaire sera au debut du main)
 *      3       Recupere le button de validation du formulaire
 *      4       Ajoute une fonction au click du button(3)
 *      5       Recupere les valeurs du titre, de la desc, de la date et du status
 *      6       Verifie que aucune n'est vide
 *          a   Si vide
 *                  =>  Box alert pour signaler qu'il faut le completer
 *          b   Si remplie
 *                  =>  A   Conversion des donnees en classe (et execution de la fonction newList(voir la fonction pour plus d'info))
 *                      B   Execution de la focntion d'affichage des cartes (voir regroupStatus pour plus d'infos)
 *      7       Ajout d'une fonction sur la croix de sortie, il s'agit d'une animation de rotation de la croix
 *      8       Code CSS pour l'animation execute avec le parametre "animte"
 *      9       Le setTimeout permet d'attendre la fin de l'animation avant de remove le code HTML
 * 
 * Params:
 *      Rien
 * 
 * Return:
 *      Rien
 */
function genForm()
{
    const formCard = document.getElementsByTagName("main")[0]; //1
    formCard.innerHTML = htmlCode + formCard.innerHTML; //2
    const RecupSubmit = document.querySelector('#bSubmit'); //3
    RecupSubmit.addEventListener('click', function() //4
    {
        let title = document.getElementById("title").value; //5
        let desc = document.getElementById("desc").value;
        let date = document.getElementById("date").value;
        let status = document.getElementById("status").value;
        if (title =='' || desc =='' || date =='' || status=='') //6
            window.alert("attention champ vide"); //a
        else //b
        {
            newList(new Formulaire(title, desc, date, status)); //A
            regroupStatus(); //B
        }
    });
    document.getElementById("exit").addEventListener("click", function() //7
    {
        document.getElementById("form").animate([ //8
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-350px)' }],
            { duration: 1000 });
        setTimeout(() => { document.getElementById("form").remove(); }, 1000); //9
    });
};

/**
 * Ajoute une classe a la liste et met a jour la liste dans le localStorage
 * Details:
 *      1       Recupere l'interieur du localStorage avec la clee "listForms" et "JSON.parse" converti les donnees en objets
 *      2       Remise a 0 de la classe listForm
 *      3       Si le localStorage n'est pas vide
 *                  =>  a   Lance une boucle for qui parcourt tous les objets
 *                      b   Si l'objet n'est pas vide alors 
 *                              =>  A   Conversion de l'objet en classe puis ajout dans la liste listForm
 *      4       Si une carte est a ajoutee
 *                  =>  a   Ajout de la carte a la fin de la liste
 *      5       Initialisation de test
 *      6       Parcourt listForm
 *      7       Ajoute dans test la conversion de la classe en objet (elem par elem)
 *      8       Ajout de test dans le local storage a la place de l'ancienne liste
 * 
 *      1 - 3   =>  Copie du localStorage     
 *      4 - 8   =>  Mise a jour du localStorage
 * 
 * Params:
 *      newForm     =   Class de la carte avec les donnees preremplies
 * 
 * Return:
 *      listForm    =   Liste de toutes les cartes (a jour)
 */
function newList(newForm)
{
    let tmp = JSON.parse(localStorage.getItem('listForms')); //1
    listForm = []; //2
    if (tmp) //3
        for (let x = 0; x < tmp.length; x++) //a
            if (tmp[x]) //b
                listForm.push(new Formulaire(tmp[x].title, tmp[x].desc, tmp[x].date, tmp[x].status)); //A
    if (newForm) //4
        listForm.push(newForm); //a
    let test = []; //5
    for (let elem of listForm) //6
        test.push(elem.genOut()); //7
    localStorage.setItem("listForms", JSON.stringify(test)); //8
    return (listForm);
}

/**
 * Parcourt toutes les cartes pour ajouter un addEventlistener sur les logo de poubelles
 * Cela permet de retirer la carte de la liste et de localStorage
 * Details:
 *      1       Selectionne toutes les cartes
 *      2       Parcourt toute la liste de cartes
 *      3       Extrait les contenus HTML des balises internes a la class card
 *      4       Ajout d'une fonction sur l'icon poubelle
 *      5       Initialisation des variables
 *      6       Parcourt toutes les cartes
 *      7       Quand il trouve sa classe, on sort de la boucle for avec la position de la classe
 *      8       Ajoute toutes les cartes sauf la cartes a supprimer dans une liste temporaire
 *      9       Conversion de la lsite de classe en lsite d'objet avant de remettre a jour la liste d'objet du localStorage
 *      10      Reaffichage des cartes
 * 
 * Params:
 *      listForm    =   Liste de toutes les cartes sous formes de classe
 * 
 * Return:
 *      Rien
 */
function addClickTrash(listForm)
{
    let newPoub = document.getElementsByClassName('card'); //1
    for (let elem of newPoub) //2
    {
        let timeLeft = elem.getElementsByClassName('timeLeft')[0].textContent;
        timeLeft = timeLeft.substr(2);
        let classeFace = elem.getElementsByClassName('face1')[0];
        console.log(timeLeft);
        if(timeLeft >= 20){
            classeFace.style.backgroundColor = '#81c654';
        }
        else if (timeLeft >= 10){
            classeFace.style.backgroundColor = '#e89721';
        }
        else  {
            classeFace.style.backgroundColor = '#f44242';
        }
        let tmp_title = elem.getElementsByClassName('title')[0].textContent; //3
        let tmp_desc = elem.getElementsByClassName('desc')[0].textContent;
        let tmp_date = elem.getElementsByClassName('date')[0].textContent;
        let poubelle = elem.getElementsByClassName('delete')[0];
        poubelle.addEventListener('click', function () //4
        {
            let tmp = [], index = 0, index1 = 0; //5
            for (let elem of listForm) //6
            {
                if ((elem.title == tmp_title) && (elem.desc == tmp_desc) && (elem.date == tmp_date)) //7
                    break;
                index++;
            }
            for (let elem of listForm) //8
                if (index != index1++)
                    tmp.push(elem);
            let test = []; //9
            for (let elem of tmp)
                test.push(elem.genOut());
            localStorage.setItem("listForms", JSON.stringify(test));
            regroupStatus(); //10
        });
    }
}

/**
 * Gere l'affichage des cartes en fonction du status global
 * Details:
 *      1       Initialisation des variables
 *      2       Extraction de la liste de cartes depuis le localStorage
 *      3       Si globalStatus est egal a 4
 *                  =>  a   Parcourt toute la liste triee (croissant) par rapport au nombre de jours restans
 *                      b   Ajoute la carte HTML au HTML total
 *      4       Si globalStatus est egal a 5
 *                  =>  a   Parcourt toute la liste triee (croissant) par rapport au nombre de titres
 *                      b   Ajoute la carte HTML au HTML total
 *      5       Sinon
 *                  =>  a   Parcourt toute la liste
 *                      b   Si le status de la carte est le meme que le globalStatus ou globalStatus est a 0
 *                              =>  A   Ajoute la carte HTML au HTML total
 *      6       Ajout du code HTML total
 *      7       Execution de la fonction "addClickTrash" (voir fonction addClickTrash pour plus d'infos)
 * 
 * Params:
 *      Rien
 * 
 * Return:
 *      Rien
 */
function regroupStatus()
{
    let tmp = ''; //1
    const formCard = document.getElementsByTagName("main")[0];
    const byValue = (a,b) => a.time - b.time;
    const byText = (a,b) => a.title.localeCompare(b.title);
    listForm = newList(null); //2
    if(globalStatus == 4) //3
        for (let elem of [...listForm].sort(byValue)) //a
            tmp += elem.affCard(); //b
    else if (globalStatus == 5) //4
        for (let elem of [...listForm].sort(byText)) //a
            tmp += elem.affCard(); //b
    else //5
        for (let elem of listForm) //a
            if(elem.status == globalStatus || globalStatus == 0) //b
                tmp += elem.affCard(); //A
    formCard.innerHTML='<div id="all_card" class="container" >' + tmp + '</div>'; //6
    addClickTrash(listForm); //7
}

//-------------------------------------------------------------------------//
//----------------------Ajout de fonction aux actions----------------------//
//-------------------------------------------------------------------------//

/**
 * Fonction au click
 * 
 *      Animation pour les bares du menu burger
 */
document.getElementById("menu_burger").addEventListener("click", function()
{
    document.getElementById("menu_burger").classList.toggle("open");
});

/** 
 * Fonction au click
 * 
 *      Apparition et disparition du menu avec une animation avant la disparition
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

/**
 * Fonction au click
 * 
 *      Genere le formulaire
 */
document.querySelector('#genForm').addEventListener('click', function()
{
    genForm();
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (0) et relance l'affichage
 */
document.getElementById('reset').addEventListener('click', function()
{
    globalStatus = 0
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (1) et relance l'affichage
 */
document.getElementById('toDo').addEventListener('click', function()
{
    globalStatus = 1
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (2) et relance l'affichage
 */
document.getElementById('going').addEventListener('click', function()
{
    globalStatus = 2
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (3) et relance l'affichage
 */
document.getElementById('done').addEventListener('click', function()
{
    globalStatus = 3
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (4) et relance l'affichage
 */
document.getElementById('urgent').addEventListener('click', function()
{
    globalStatus = 4
    regroupStatus()
});

/**
 * Fonction au click
 * 
 *      Definit la valeur de globalStatus (5) et relance l'affichage
 */
document.getElementById('alpha').addEventListener('click', function()
{
    globalStatus = 5
    regroupStatus()
});

//----------------------------------------------------------------//
//----------------------Execution par defaut----------------------//
//----------------------------------------------------------------//

regroupStatus();

