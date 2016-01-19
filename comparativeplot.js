function ComparativePlot(targetContainer){
    this.GENOMEHEIGHT = 150;
    this.COMPARISONHEIGHT = 150;

    this.genomes = [];
    this.alignmentData = null;
    this.container = d3.select(targetContainer);
    this.svg = null;
    this.xscale = null;

    this.createPlot();
}

ComparativePlot.prototype.createPlot = function(){
    this.svg = this.container.append("svg")
        .attr("class","comparativeplot")
        .attr("width",this.container.node().getBoundingClientRect()['width']+"px");
};

ComparativePlot.prototype.updatePlotSize = function(){
    this.svg
        .attr("width",this.container.node().getBoundingClientRect()['width']+"px")
        .attr("height",(this.COMPARISONHEIGHT+this.GENOMEHEIGHT)*(this.genomes.length));
};

ComparativePlot.prototype.addGenome = function(genome){
    genomeContainer = this.svg.append("g")
        .attr("class","genome")
        .attr("transform","translate(0,"+((this.COMPARISONHEIGHT+this.GENOMEHEIGHT)*(this.genomes.length)+30)+")");

    genomeContainer.append("text")
        .attr("class","genomename")
        .text(genome.genomeName);

    genomeContainer.append("rect")
        .attr("width",this.container.node().getBoundingClientRect()['width']+"px")
        .attr("height",this.GENOMEHEIGHT - 10)
        .attr("transform","translate(0,10)")
        .attr("fill","gray");

    genome.setContainer(genomeContainer);
    this.genomes.push(genome);

    comparativeplot.updatePlotSize();
    return genomeContainer;
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



