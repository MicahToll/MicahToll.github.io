function get_game() {
    console.log("hey");

    let userID = "9a99784a-dc1f-4dec-8f4a-07d8fd92c8d6"
    let url = "B52D2QS"
    //https://turingmachine.info/api/api.php?uuid=9a99784a-dc1f-4dec-8f4a-07d8fd92c8d6&h=B52D2QS
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        var data = xhr.responseText;
        if (data.length === 0) {
            console.log("error 1");
            return;
        }
        var jsonResponse = JSON.parse(data);
        if (jsonResponse["status"] === "ok") {
            this.addGame(jsonResponse["hash"]);
            this.game.idPartie = jsonResponse["idPartie"];
            this.game.color = jsonResponse["color"];
            this.game.hash = jsonResponse["hash"];
            this.game.m = jsonResponse["m"];
            this.game.d = jsonResponse["d"];
            this.game.n = jsonResponse["n"];
            this.game.code = jsonResponse["code"];
            this.game.par = jsonResponse["par"];
            this.game.fake = jsonResponse["fake"];
            this.game.ind = jsonResponse["ind"];
            this.game.law = jsonResponse["law"];
            this.game.crypt = jsonResponse["crypt"];
            if (this.game.m > 0) {
                //this.game.par = Math.ceil(this.game.par * 1.5);
            }
            if (this.game.m == 1) {
                //this.shuffleIndFake();
            }
            if (this.game.m == 2) {
                //this.sortInd();
            }
            if (this.state.dailyText != "") {
                //Moment.locale("en");
                //let time =
              //Math.floor(new Date().getTime() / 1000.0) -
              //new Date().getTimezoneOffset() * 60;
                //this.state.dailyText = Moment.unix(time).format(
              //traduction[this.state.language]["DATEFORMAT"]
                //);
              }                  
            //if (this.state.askSolo) this.changePage(idPage["P_ASKSOLO"]);
            //else this.changePage(idPage["P_INGAME"]);
        } else {
            console.log("error 2");
        }
        console.log("success");
    });
    xhr.addEventListener("error", () => {
        console.log("error 3");
    });
    xhr.addEventListener("abort", () => {
        console.log("error 4");
    });
    xhr.open(
        "GET",
        "https://turingmachine.info/api/"+"api.php?uuid=" + userID + "&" + url
    );
    xhr.send();
}
