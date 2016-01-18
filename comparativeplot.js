function ComparativePlot(targetContainer){
    this.genomes = [];
    this.alignmentFile = null;
    this.container = d3.select(targetContainer);
    this.svg = null;
}

ComparativePlot.prototype.addGenome = function(genome){
    this.genomes.push(genome);
};

ComparativePlot.prototype.setAlignmentFile = function(alignmentfile){
    this.alignmentFile = alignmentfile;
};

ComparativePlot.prototype.render = function(){
    this.svg = this.container.append("svg")
        .attr("class","comparativeplot");
};

function Genome(name){
    this.genomeName = name;
}



