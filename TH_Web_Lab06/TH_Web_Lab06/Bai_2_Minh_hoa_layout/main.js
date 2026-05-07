function myFunction(){
    var x = document.getElementById("MyTopNav");
    if(x.className === "menu"){
        x.className += " responsive";
    }else{
        x.className = "menu";
    }
}