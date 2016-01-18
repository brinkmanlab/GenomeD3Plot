function ComparativePlot(targetContainer){
    this.sequences = [];
    this.container = d3.select(targetContainer);
    this.svg = null;
}

ComparativePlot.prototype.render = function(){
    this.svg = this.container.append("svg")
        .attr("class","comparativeplot");
};





