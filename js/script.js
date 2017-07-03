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

var node = d3.select('#main').selectAll('abbr')
    .data(nodes)
  .enter().append('abbr').attr('title',function(d){return d.country})
  .append('img')
    .style('background','flag.png')
    .attr('class', function(d){return "flag flag-"+d.code})
    .call(force.drag())
    .classed('fixed', function(d){d.fixed=false})

force.on('end', function() {
    node
        .style('left', function(d) { return d.x-5+'px'; })
        .style('top', function(d) { return d.y-5+'px'; });

    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

});
force.start();

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  node.style('left', function(d) { return d.x-5+'px'; })
      .style('top', function(d) { return d.y-5+'px'; });
}
});
