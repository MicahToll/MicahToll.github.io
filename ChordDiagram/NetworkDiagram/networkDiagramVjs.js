let window_width;
let window_height;
let nodes = networkxData["nodes"];
let edges = networkxData["links"];

let node_lookup = {};

let mouse_over_rect;
let mouse_over_text;
let box_height = 10;
let box_width = 55;
let margin = 2;
let is_circle_graph = true;
let labels = true;

let graph_type = "network";
let nodes_num;

function init(){
    window_width = window.innerWidth;
    window_height = window.innerHeight;

    nodes_num = nodes.length;
    for (let i=0; i<nodes_num; i++){
        node_lookup[nodes[i]["id"]] = i;
    }

    container = d3.select("#d3-container")
        .attr("height",window_height)
    svg = container.append("svg")
        .attr("width", window_width)
        .attr("height", window_height);


    if (graph_type == "network") {
        draw_network_graph(svg);
    }
    else if (graph_type == "grid"){
        draw_grid_graph(svg)
    }
}

/*
network graph
*/
function draw_network_graph(svg) {
    mouse_over_rect = svg.append("rect")
        .attr("id","mouse_over_rect")
        .attr("width", box_width)
        .attr("height", box_height)
        .attr("visibility","hidden");
        
    mouse_over_text = svg.append("text")
        .attr("id","mouse_over_text")
        .attr("x",margin)
        .attr("y",box_height-margin)
        .attr("width", box_width)
        .attr("height", box_height)
        .attr("visibility","hidden");

    if (is_circle_graph) {
        svg.selectAll()
            .data(networkxData["links"])
            .enter()
            .append("path")
            .classed("edge", true)
            .attr("stroke", "black")
            .attr("target_node", target_node)
            .attr("source_node", source_node)
            .style("stroke-opacity", opacity)
            .style("stroke-width", width)
            .style("fill", "none")
            .attr("d", path);
    }
    else {
        svg.selectAll()
            .data(networkxData["links"])
            .enter()
            .append("line")
            .classed("edge", true)
            .attr("stroke", "black")
            .attr("target_node", target_node)
            .attr("source_node", source_node)
            .style("stroke-opacity", opacity)
            .style("stroke-width", width)
            .attr("x1", edge_x1)
            .attr("y1", edge_y1)
            .attr("x2", edge_x2)
            .attr("y2", edge_y2);
    }

    svg.selectAll("circle")
        .data(networkxData["nodes"])
        .enter()
        .append("circle")
        .classed("node", true)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .attr("cx",node_x)
        .attr("cy",node_y)
        .attr("r",size)
        .style("fill",color);

    svg.selectAll("div")
        .data(networkxData["nodes"])
        .enter()
        .append("text")
        .classed("label", true)
        .attr("x",node_x)
        .attr("y",node_y)
        .attr("transform", text_angle)
        //.attr("rotate", 45)
        .text(label);
    
    key = svg.append("g")
    
    key_top_margin = 10
    key_left_margin = 1
    key_text_width = 6
    key_bar_width = 25
    key_text_height = 25
    image_scale_factor = key_text_height/12

    key.append("text")
        .classed("key", true)
        .text("Low Difficulty")
        .attr("lengthAdjust", "spacingAndGlyphs")
        .attr("textLength", key_text_width+"vw")
        .attr("x", (key_left_margin+key_text_width/2)+"vw")
        .attr("y", (key_text_height/2+key_top_margin));
    key.append("image")
        .attr("xlink:href", "NetworkDiagram/viridis_key.PNG")
        .attr("x", (key_left_margin+key_text_width)+"vw")
        //.attr("y", )
        .attr("width", key_bar_width+"vw")
        .attr("transform", "scale("+1+", "+image_scale_factor+")");
    key.append("text")
        .classed("key", true)
        .text("High Difficulty")
        .attr("lengthAdjust", "spacingAndGlyphs")
        .attr("textLength", key_text_width+"vw")
        .attr("x", (key_left_margin+key_text_width/2+key_text_width+key_bar_width)+"vw")
        .attr("y", (key_text_height/2+key_top_margin));
    /*key.append("text")
        .classed("key", true)
        .text("Fall 2019")
        .attr("lengthAdjust", "spacingAndGlyphs")
        .attr("textLength", key_text_width/1.5+"vw")
        .attr("x", (key_left_margin+key_text_width/1.5/2)+"vw")
        .attr("y", (key_text_height*5/2+key_top_margin));*/
}

let label_text_px_lengthL = 45//90;//45
let label_text_px_lengthR = 45//10;//45
function text_angle(node) {
    let x = node["pos"]["x"];
    let y = node["pos"]["y"];
    let theta = 180*Math.atan(y/x)/Math.PI;
    if (x > 0) {
        return " rotate("+theta/2.5+", "+node_x(node)+", "+node_y(node)+") translate("+label_text_px_lengthR+", 0)"
    }
    else {
        return "rotate("+theta/2.5+", "+node_x(node)+", "+node_y(node)+") translate(-"+label_text_px_lengthL+", 0) "
    }
}

let edge_threshhold = 1.26//recommended = 1//or 0.706036244803498 or //1.26084750623282 or //1.36942652169226
function width(edge){
    let weight = edge["weight"]
    if (weight > edge_threshhold){
        return Math.max(Math.min((weight-edge_threshhold)*5/10, 3), .1);
    }
    else{
        return 0;
    }
}

function opacity(edge){
    let weight = edge["weight"]
    return Math.max(Math.min((weight-edge_threshhold)/3, .7), .3);
}

function source_node(edge) {
    return edge["source"]
}

function target_node(edge) {
    return edge["target"]
}

function size(node){
    let size = node["size"]
    return Math.sqrt(size)*.5;
}

function color(node){
    return node["color"];
}

function x_position(x){
    return (1.45+x)*window_width/2.9//-0.30857700086914247 0.8240266154179829 - the .1 and .2 are to give some margin
}

function y_position(y){
    return (1.2+y)*window_height/2.4//-0.30857700086914247 0.8240266154179829
}

function node_x(node){
    let x = node["pos"]["x"];
    return x_position(x)
}

function node_y(node){
    let y = node["pos"]["y"];
    return y_position(y);
}

function label_x(node){
    let x = node["pos"]["x"];
    return x_position_label(x)
}

function label_y(node){
    let y = node["pos"]["y"];
    return y_position_label(y);
}

function x_position_label(x) {
    return (1.1+x)*window_width/2.2//-0.30857700086914247 0.8240266154179829 - the .1 and .2 are to give some margin
}

function y_position_label(y) {
    return (1.1+y)*window_height/2.2//-0.30857700086914247 0.8240266154179829 - the .1 and .2 are to give some margin
}

function edge_x1(edge){
    x = nodes[node_lookup[edge["source"]]]["pos"]["x"];
    return x_position(x);
}
function edge_y1(edge){
    y = nodes[node_lookup[edge["source"]]]["pos"]["y"];
    return y_position(y);
}
function edge_x2(edge){
    x = nodes[node_lookup[edge["target"]]]["pos"]["x"];
    return x_position(x);
}
function edge_y2(edge){
    y = nodes[node_lookup[edge["target"]]]["pos"]["y"];
    return y_position(y);
}

function handleMouseOver(event){
    node = event["target"]["__data__"];
    mouse_over_rect
        .attr("visibility","visible")
        .attr("x",x_position(node["pos"]["x"]))
        .attr("y",y_position(node["pos"]["y"])-box_height)
        .raise();
    mouse_over_text
        .attr("visibility","visible")
        .attr("x",margin+x_position(node["pos"]["x"]))
        .attr("y",-margin+y_position(node["pos"]["y"]))
        .text(node["id"])
        .raise();
    //makes all links hidden except ones going to clicked node 
    d3.selectAll('.edge').attr("visibility","hidden");
    d3.selectAll('.edge[target_node="'+node["id"]+'"]').attr("visibility","visible");
    d3.selectAll('.edge[source_node="'+node["id"]+'"]').attr("visibility","visible").attr("stroke","red");
}

function handleMouseOut(event){
    //node = event["target"]["__data__"];
    mouse_over_rect
        .attr("visibility","hidden");
    mouse_over_text
        .attr("visibility","hidden");
    d3.selectAll('.edge').attr("visibility","visible").attr("stroke","black");
}

/*function handleMouseDown(event) {
    node = event["target"]["__data__"];
    //makes all links hidden except ones going to clicked node 
    d3.selectAll('.edge').attr("visibility","hidden");
    d3.selectAll('.edge[target_node="'+node["id"]+'"]').attr("visibility","visible");
    console.log("hey")
}*/

function path(edge){
    //return "M"+edge_x1(edge)+","+edge_y1(edge)+" Q"+(window_width/2)+","+(window_height/2)+" "+edge_x2(edge)+","+edge_y2(edge);
    let x1 = edge_x1(edge);
    let y1 = edge_y1(edge);
    let x2 = edge_x2(edge);
    let y2 = edge_y2(edge);
    return "M"+x1+","+y1+" Q"+(x1+x2+window_width)/4+","+(y1+y2+window_height)/4+" "+x2+","+y2;
}

function label(node){
    return node["id"];
}

/*
grid graph
*/
//DOT PRODUCT STUFF//



//end dot product stuff
function draw_grid_graph(svg) {
    svg.selectAll()
        .data(networkxData["links"])
        .enter()
        .append("rect")
        .classed("grid_cell", true)
        //.style("stroke-width", width)
        .attr("x", cell_x1)
        .attr("y", cell_y1)
        .attr("width", x_grid_pos(1)-x_grid_pos(.2))
        .attr("height", y_grid_pos(1)-y_grid_pos(.2))
        .style("fill-opacity", opacity)
        .style("fill","#00AA00");

    /*svg.selectAll("rect")
        .data(networkxData["nodes"])
        .enter()
        .append("circle")
        .classed("row", true)
        //.on("mouseover", handleMouseOver)
        //.on("mouseout", handleMouseOut)
        .attr("cx",node_x)
        .attr("cy",node_y)
        //.attr("r",size)
        .style("fill",color);*/

    //rows
    svg.selectAll("div")
        .data(networkxData["nodes"])
        .enter()
        .append("text")
        .classed("label", true)
        .classed("row_label", true)
        .attr("x",x_grid_pos(-1.5))//just picked number that works for my screen
        .attr("y",row_y)
        .text(label);

    //rows
    svg.selectAll("div")
        .data(networkxData["nodes"])
        .enter()
        .append("text")
        .classed("label", true)
        .classed("col_label", true)
        .attr("x",col_x)
        .attr("y",y_grid_pos(-2.5))
        .text(label);
}

let grid_margin = 7;
function x_grid_pos(x_cord){
    return (x_cord+grid_margin)/(nodes_num+2*grid_margin)*window_width;
}

function y_grid_pos(y_cord){
    return (y_cord+grid_margin)/(nodes_num+2*grid_margin)*window_height;
}

function row_y(node) {
    return y_grid_pos( node_lookup[node["id"]]+.5 );
}

function col_x(node) {
    return x_grid_pos( node_lookup[node["id"]]+.5 );
}

function cell_x1(edge){
    return x_grid_pos( node_lookup[edge["target"]] );
}
function cell_y1(edge){
    return y_grid_pos( node_lookup[edge["source"]] );
}