import { Article } from "./article";
import { Event } from "./event";
import { Tool } from "./tool";

export interface Member {
    id:string,
    cin:string,
    nom:string,
    prenom:string,
    dateNaissance:string,
    createdDate:string,
    cv:string,
    email:string,
    password:string,
    type?:string,
    pubs:Article[],
    events?:Event[],
    outils?:Tool[],

    //etudiant
    sujet?:String,
    dateInscription?:String,
    diplome?:String,

    //enseignant
    grade?:String,
    etablissement?:String,


}