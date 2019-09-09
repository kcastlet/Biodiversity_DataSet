function buildMetadata(sample) {

  // Function that builds metadata panel
  var url = `/metadata/${sample}`;

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(sample) {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sample).forEach(function ([key,value]) {
      var panel = sample_metadata.append("div");
      panel.text(`${key}: ${value}`);
    });
  });
};


function buildCharts(sample) {
  // Fetch sample data for plots
  var url = `/samples/${sample}`;

    d3.json(url).then(function(data){
      // Build Pie Chart
      var values = data.sample_values.slice(0,10);
      var labels = data otu_ids.slice(0,10);
      var text = data.otu_labels.slice(0,10)

      var trace1 = [{
        values: values,
        labels: labels,
        type: "pie"
      }];

      var layout = {
        width: ,
        height: ,
      };
      
      Plotly.newPlot("pie", trace1, layout);
    });


// Build Bubble Chart using sample data

d3.json(url).then(function(data){
  var x = data.otu_ids;
  var y = data.sample_values;
  var size = data.sample_values;
  var colors = data.otu_ids;
  var labels = data.otu_labels;

  var trace2 = [{
    x: x,
    y: y,
    labels: labels,
    mode: 'markers',
    marker: {
      color: colors,
      size: size
    }
  }];
  Plotly.newPlot("bubble", trace2);
});


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
