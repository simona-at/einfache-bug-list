"use strict";

window.onload = function () {

    //Add entry to list
    let addBtn = document.querySelector("input#add");
    addBtn.onclick = function (){
        addEntry();
    };

    //Show all list entries
    let showAllBtn = document.querySelector("input#showAll");
    showAllBtn.onclick = function (){
        showAllEntries();
    };

    //show only open list entries
    let showOpenBtn = document.querySelector("input#showOpen");
    showOpenBtn.onclick = function (){
        showOpenEntries();
    };

    //delete all closed list entries
    let deleteBtn = document.querySelector("input#deleteClosed");
    deleteBtn.onclick = function (){
        deleteClosedEntries();
    };

    //filter list entries from name
    let filterBtn = document.querySelector("input#filter");
    filterBtn.onclick = function (){
        fiterEntries();
    };
};



//Fügt einen neuen Eintrag hinzu
function addEntry(){
    let title = document.querySelector("input#titleInput").value;
    let author = document.querySelector("input#authorInput").value;
    let description = document.querySelector("textarea#descriptionInput").value;
    let listOfBugs = document.querySelector("div#listOfBugs");


    if(title != "" && author != ""){

        //neue Elemente erstellen:

        let div_bugEntry = document.createElement("div");
        div_bugEntry.classList.add("bugEntry", "not_checked");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = author;

        let p_title = document.createElement("p");
        p_title.classList.add("inline");

        let text_title = document.createTextNode(title + " (" + author + ")");

        let p_description = document.createElement("p");

        let text_description = document.createTextNode(description);


        //Hierarchie eines Listen-Eintrags erstellen:

        listOfBugs.appendChild(div_bugEntry);
        div_bugEntry.appendChild(checkbox);
        div_bugEntry.appendChild(p_title);
        p_title.appendChild(text_title);
        div_bugEntry.appendChild(p_description);
        p_description.appendChild(text_description);


        //Beim Klick auf das Häkchen Status ändern

        checkbox = document.querySelectorAll("input[type=checkbox]");
        for(let i of checkbox){
            i.onclick = function (){
                changeCheckboxes(i.parentElement);
            };
        }


        //Name des Autors zur Filter-Selection hinzufügen

        let selectBox = document.querySelector("select#selectName");
        let nameEntry = document.createElement("option");
        nameEntry.value = author;
        let text_name = document.createTextNode(author);
        nameEntry.appendChild(text_name);

        if(selectBox.hasChildNodes()){
            let existingOptionTag = document.querySelectorAll("select#selectName option");
            let boolean = true;
            for(let i of existingOptionTag) {
                if(i.value == author){
                    boolean = false;
                    break;
                }
            }
            if(boolean){
                selectBox.appendChild(nameEntry);
            }
        }
        else {
            selectBox.appendChild(nameEntry);
        }
    }

    //Falls kein Titel oder kein Autor eingegeben wurde:
    else {
        alert("Please enter title and author.");
    }
}


//Zeige alle noch offenen Einträge (not checked) (=verstecke alle geschlossenen Einträge)
function showOpenEntries(){

    let checkedEntry = document.querySelectorAll("div.checked");
    for(let i of checkedEntry){
        i.style.display = "none";
    }
}


//Zeige alle Einträge (=blende alle versteckten Einträge wieder ein)
function showAllEntries(){

    let hiddenEntry = document.querySelectorAll("div#listOfBugs div.bugEntry");
    for(let i of hiddenEntry) {
        if (i.style.display === "none") {
            i.style.display = "block";
        }
    }
}


//Lösche alle geschlossenen Einträge aus dem DOM-Baum
function deleteClosedEntries(){

    let checkedEntry = document.querySelectorAll("div.checked");
    for(let i of checkedEntry){
        i.parentNode.removeChild(i);
    }
}


//Ändere den Bug-Status der Häkchen
//param: parent = Eltern-Element der geklickten checkbox (input[type=checkbox]),
//                welches eine neue Klasse bekommen soll
function changeCheckboxes(parent){

    if(parent.classList.contains("checked")) {
        parent.classList.remove("checked");
        parent.classList.add("not_checked");
    }
    else if(parent.classList.contains("not_checked")) {
        parent.classList.remove("not_checked");
        parent.classList.add("checked");
    }
}


//Filtere die Einträge nach Namen
function fiterEntries() {

    //Blende zuerst alle Einträge wieder ein:
    showAllEntries();

    //Um anschließend nur Einträge mit treffendem Autor zu zeigen:
    let filterName = document.querySelector("select").value;
    let foundEntry = document.querySelectorAll("div#listOfBugs div.bugEntry");
    for(let i of foundEntry) {
        let foundAuthor = i.querySelector("input").value;
        if (filterName != foundAuthor) {
            i.style.display = "none";
        }
    }
}
