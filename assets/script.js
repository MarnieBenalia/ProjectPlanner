
class Formulaire
{
    constructor(t, dsc, d, s)
    {
        this.title = t;
        this.desc = dsc;
        this.date = d;
        this.status = s;
    }

    
    affCard() {
        
        let htmlCode = ``;
    
        htmlCode =
    `
    <div class="card">

        <div class="title">${this.title}</div>
        <div class="timeLeft"></div>
        <div class="desc">${this.desc}</div>
        <div class="date">${this.date}</div>
            <div class="status">${this.status}
                <span class="status1"></span>
                <span class="status2"></span>
                <span class="status3"></span>
            </div>
    
    </div>
    
    `
    return htmlCode;
    }
}

//----------------------Partie formulaire -----------------------------//

//let tmp = new Formulaire("t", "t", "t", "t");

let htmlCode = ``;
let listForm = [];
function genForm() {

    htmlCode =
    `
    <form>

        <div class="cardform">

        <div>
        <input type="text" id="title" name="title">
        </div>

        <div>
        <input type="text" id="desc" name="title">
        </div>

        <div>
        <input type="text" id="date" name="title">
        </div>

        <div>
        <input type="text" id="status" name="title">
        </div>

        <div class="button" id ="bSubmit">
        <button type="submit">Envoyer le formulaire</button>
        </div>

    </div>
    </form>
    
    `
const formCard = document.getElementsByTagName("main")[0];
    
formCard.innerHTML = htmlCode;

const RecupSubmit = document.querySelector('#bSubmit'); // Pour récupérer le contenu du formulaire quand on clique sur submit 

    RecupSubmit.addEventListener('click', e =>{

    e.preventDefault();
    
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let date = document.getElementById("date").value;
    let status = document.getElementById("status").value;
    
    let newForm = new Formulaire(title, desc, date, status);

    listForm.push(newForm);
    console.log(listForm);
    //formCard.innerHTML = newForm.affCard();
    
    let tmp = "";
    listForm.forEach(function(elem) {
        tmp += elem.affCard();
    })
    
    formCard.innerHTML='<div id="all_card">' + tmp + '</div>';

})
};


const test = document.querySelector('#genForm');// Pour afficher l'html généré dans le js quand on appuie sur le bouton genForm

test.addEventListener('click', e =>{
    
    genForm();
    e.preventDefault();
    
})

//----------------------Partie récupération des infos-------------//




// localStorage.setItem("Info formulaire", document.querySelector("#bsumit").value);

// document.querySelector('#display-firstname').innerHTML = localStorage.getItem('');