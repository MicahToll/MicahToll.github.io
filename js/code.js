//this files contains the code used for the background of micahtoll.github.io
//itsdependency is d3 and my style.js file

function init(){
    container = d3.select("#d3-container");
        //.attr("height",window_height)
    svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 100 100")
        .attr("preserveAspectRatio", "none");

        line_list = [];
        for (let x = 0; x<50; x+=1) {
            line_list.push(x);
        }

        /*svg.selectAll()//style="stroke:rgb(255,0,0);stroke-width:2"
            .data(line_list)
            .enter()
            .append("line")
            .classed("bg_line", true)
            .attr("x1", line_x1)
            .attr("y1", 0)
            .attr("x2", 100)
            .attr("y2", line_y2)*/
        svg.selectAll()//style="stroke:rgb(255,0,0);stroke-width:2"
            .data(line_list)
            .enter()
            .append("line")
            .classed("bg_line", true)
            .attr("x1", line_y2)
            .attr("y1", 0)
            .attr("x2", 100)
            .attr("y2", line_x1)

        grid_list = [];
        for (let x = 0; x<100; x+=2) {
            for (let y = 0; y<100; y+=2) {
                grid_list.push({"x":x, "y":y})
            }
        }

        svg.selectAll()
            .data(grid_list)
            .enter()
            .append("rect")
            .attr("width", 2)
            .attr("height", 2)
            .attr("x", grid_x)
            .attr("y", grid_y)
            .attr("fill", "white")
            //.attr("fill", color)
            .attr("opacity", opacity);
}

function grid_x(point){
    return point.x;
}
function grid_y(point){
    return point.y;
}
function color(point){
    let blue = left_right_gradiant(point.x, 1/2) * top_down_gradiant(point.y);//*(Math.sin(Math.sqrt(point.x**2+point.y**2)/33*Math.PI*2)/3+2/3)
    blue *= 255/2
    return "rgb("+(255-blue)+", "+(255-blue)+", 255)";
}


//given x (float 0-100) and power (positive int) returns value between 0 and 1.1. increasing power, increases drop off.
function left_right_gradiant(x, pow) {
    return 1/(1+x)**pow+1/(101-x)**pow;
}

//given y (float 0-100) and returns value between 0 and 1.
function top_down_gradiant(y) {
    return ((100 - y)/100)**2 ;//100/(y+100)
}

function line_x1(i){
    return 50 + i-50;
}
function line_y2(i){
    return i;
}

function opacity(point) {
    let blue = left_right_gradiant(point.x, 1/2) * top_down_gradiant(point.y);
    return 1-blue;
}