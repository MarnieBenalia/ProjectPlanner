/**
 * Classe formulaire
 * Stocke les donnees :
 *      -titre          =>      t
 *      -description    =>      dsc
 *      -date           =>      d
 *      -status         =>      s
 * 
 * La fonction affCard permet de mettre les donnees sous forme HTML vec un ensemble logique
 */

export class Formulaire
{
    constructor(t, dsc, d, s)
    {
        this.title = t;
        this.desc = dsc;
        this.date = d;
        this.status = s;
        this.time ;

        let today = new Date();
        let difference = new Date(this.date).getTime() - today.getTime();
        this.time = Math.ceil(difference / (1000 * 3600 * 24));

    }

    affCard()
    {
        let htmlCode = `<div class="card">
                            <div class="title">${this.title}</div>
                            <div class="timeLeft">J-${this.time}</div>
                            <div class="desc">${this.desc}</div>
                            <div class="date">${this.date}</div>
                                <div class="status">${this.status}
                                    <span class="status1"></span>
                                    <span class="status2"></span>
                                    <span class="status3"></span>
                                </div>
                        </div>`;
        return htmlCode;
    }
}