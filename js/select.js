function select(){
    if (document.getElementById("select").hidden){
        closeAllWindows();
        document.getElementById("select").hidden = false;
    } else {
        closeAllWindows();
    }
}