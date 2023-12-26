export interface Member {
    id:String,
    cin:String,
    nom:String,
    prenom:String,
    dateNaissance:String,
    createdDate:String,
    cv:String,
    email:String,
    password:String,
    type?:string,
    tab_pub:String[],
    tab_event?:String[],
    tab_outil?:String[],

    //etudiant
    sujet?:String,
    dateInscription?:String,
    diplome?:String,

    //enseignant
    grade?:String,
    etablissement?:String,


}