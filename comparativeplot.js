function ComparativePlot(targetContainer){
    this.genomes = [];
    this.alignmentData = null;
    this.container = d3.select(targetContainer);
    this.svg = null;
    this.xscale = null;

    this.createPlot();
}

ComparativePlot.prototype.createPlot = function(){
    this.svg = this.container.append("svg")
        .attr("class","comparativeplot");
};

ComparativePlot.prototype.addGenome = function(genome){
    genomeContainer = this.svg.append("g")
        .attr("class","genome")
        .append("text")
        .attr("class","genomename")
        .text(genome.genomeName);

    genome.setContainer(genomeContainer);
    this.genomes.push(genome);
};

//TODO: Add functionality to remove genome from visualization
ComparativePlot.prototype.removeGenome = function(indexGenome){
    this.genomes.pop(indexGenome);
};

ComparativePlot.prototype.setAlignmentData = function(alignmentdata){
    this.alignmentData = alignmentdata;
};

ComparativePlot.prototype.findLargestGenome = function(){
    var largestGenomeSize = -1;
    var largestGenome = null;

    for (var genomeindex = 0; genomeindex < this.genomes.length; genomeindex++){
        if (this.genomes[genomeindex].getSize()>largestGenomeSize){
            largestGenomeSize = this.genomes[genomeindex];
            largestGenome = this.genomes[genomeindex];
        }
    }
    return largestGenome;
};

function Genome(name, size){
    this.genomeName = name;
    this.genomeSize = size;
    this.container = null;
}

Genome.prototype.setContainer = function(container){
    this.container = container;
};

Genome.prototype.getSize = function(){
    return this.genomeSize;
};



