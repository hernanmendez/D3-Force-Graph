d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json',function(error,data){
if(error){
    alert('OOPS! something happened, please reload the website')
    return '';
}
var width = 900;
var height = 900;
var nodes = data.nodes;
var links = data.links;

d3.select('#main').style('width',width+'px').style('height',height+'px');

var force = d3.layout.force()
    .size([width,height])
    .nodes(nodes)
    .links(links)
    .on('tick',tick)
    .linkDistance(80)
    .charge([-100])

var svg = d3.select('#main').append('svg')
    .attr('width', width)
    .attr('height', height);
    
var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

function tick(){
    
}
});