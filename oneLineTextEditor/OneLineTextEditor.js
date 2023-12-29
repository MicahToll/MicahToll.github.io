let total_width = 1;
let r = .9;

function draw_letters() {
    let input_text = document.getElementById("input_text").value;
    let output_svg = document.getElementById("output_svg");
    output_svg.innerHTML = "";
    total_width = window.innerWidth*.8;
    current_position = 0;
    output_svg.innerHTML += `<text id="template_character" x="" y="15" fill="black" font-family="monospace" font-size="1px" translate(0, 15)">T</text>`
    text_length = document.getElementById("template_character").getComputedTextLength();
    text_height = 2*text_length;
    total_width /= text_length;
    initial_width = find_initial_width();
    width = initial_width;
    for (let i = 0; i < input_text.length; i++) {
        output_svg.innerHTML += `<text id="character`+i+`" x="" y="15" fill="black" font-family="monospace" font-size="1px" transform="translate(`+(current_position*.5375)+`, `+350+`) scale(`+width+`, `+width+`) translate(0, -15)">`+input_text.substring(i, i+1)+`</text>`
        text_length = document.getElementById("character"+i).getComputedTextLength();
        current_position += width;
        width *= r;
    }//style="transform-origin: bottom left"
}//transform-origin="50 100"
//font dimensions: short letters: 2 by .67. tall 2 by 1.33?

function find_initial_width() {//a
    return (1-r)*total_width;
}