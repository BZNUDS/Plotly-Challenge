function init() {
    // Read in data 
    d3.json("samples.json").then(data => {
        console.log("Printing data in init function");
        console.log(data);
        console.log("Printing data.samples in init function");
        console.log(data.samples);
        processSamples(data)
        var dropdown = d3.select("#selDataset");
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
        })
    // Call optionChanged to initalize Dropdown Menu, Bar Graph, and Buble Chart with first data point
    optionChanged('940')
    });
}

function optionChanged(value_in) {
    // If option is new or changed, load Dropdown Menu, Bar Graph, and Buble Chart with value_inputed
    d3.json("samples.json").then(data => {
        var samples = []
        samples=data.samples
        var track_name = [];
        var sample_selected = [];
        var i=0;
        var dropdown = d3.select("#selDataset");
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
            track_name[name] = [i];
            i += 1;
        })

        sample_selected = samples[track_name[value_in]]
        bar_values = []
        bar_labels = []
        bar_hovertext = []
        let result = '';
        let j = 0;
        // initialize array
        do {
            result = result + j;
            // append new value to the array
            bar_values.push(sample_selected.sample_values[j]);
            bar_labels.push(sample_selected.otu_ids[j]);
            bar_hovertext.push(sample_selected.otu_labels[j]);
            j += 1;
        } while (j < 10);
        
        let sortedBySearch2 = data.samples.sort((a, b) => b.sample_values - a.sample_values);

        // Slice the first 10 objects for plotting
        slicedData2 = sortedBySearch2.slice(0, 10);

        // Reverse the array to accommodate Plotly's defaults
        reversedData2 = slicedData2.reverse();

        // handle error condition for undefied values (like 945)
        if (bar_labels[8] == undefined) {
            console.log("*************Error: Undefined value with bar_labels***************************/n");
            console.log(bar_labels);
            document.write('********************** Terminated due to Undefined value. Right-click any part of the page and choose Inspect. Then select the Console window area for more detail********************** ');
            return
        }

        // Set-up the required variables for the Bar Chart
        let bar_labels_str = bar_labels.map(convertAsString);
        reversedData = bar_values.reverse();
        // The following lines of code were used for a discussion with my Instuctor becasue of the issue I experienced with the Bar Chart. It appears Plotly doesn't like numneric strings. 
        // bar_labels_str = ['944', '2419', '2539', '3450', '1795', '2389', '1314', '922', '1167', '2859'],
        // bar_labels_str = ['OTU_944', 'OTU_2419', 'OTU_2539', 'OTU_3450', 'OTU_1795', 'OTU_2389', 'OTU_1314', 'OTU_922', 'OTU_1167', 'OTU_2859'],
        bar_labels_str1 = bar_labels_str
        bar_labels_str1=bar_labels_str1.map(obj => `OTU_${obj}`)
        reversedLabels = bar_labels_str1.reverse();
        let trace2 = {
            x: reversedData,
            y: reversedLabels,
            text: bar_hovertext,
            marker: {
                // color: 'light_blue'},
                color: bar_labels
                 },
            type: "bar",
            orientation: "h"
        };
    
        // Data array
        let traceData2 = [trace2];

        // Set-up the layout
        let layout = {
        // title: "Not needed",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
        };

        // Render the plot to the div tag with id "plot"
        // Note that we use `traceData2` instead of 'data' since followed the Lesson example where they used use `traceData`, 
        console.log("Printing traceData2 in optionChanged function");
        console.log(traceData2);
        console.log("Printing layout in optionChanged function");
        console.log(layout);
        Plotly.newPlot("bar", traceData2, layout);

        // Update buble chart
        bubblely_chart(sample_selected.otu_ids, sample_selected.sample_values, sample_selected.otu_labels)

        // Update demographic information in panel 
        var display_metadata = data.metadata;
        var metadata= data.metadata;
        var metadata_array= metadata.filter(sampleobject =>
            sampleobject.id == value_in);
        var md_a= metadata_array[0]
        var panel_metadata = d3.select("#sample-metadata");
        panel_metadata.html("");
        Object.entries(md_a).forEach(([key, value]) => {
            panel_metadata.append("h6").text(`${key}: ${value}`);
            console.log("Printing `${key}: ${value}` in optionChanged function");
            console.log(`${key}: ${value}`);
        });
    });

}

function convertAsString(val) {
    // Convert to a string
    return val.toString();
}

function processSamples(data) {
    // Process Samples data
    sample_id = data.samples.map(d => d["id"]);
    sample_values = data.samples.map(d => d["sample_values"]);
    otu_ids = data.samples.map(d => d["otu_ids"]);
    otu_labels= data.samples.map(d => d["otu_labels"]);
}

function bubblely_chart(b_l, b_v, b_h){
    // Passing in sample_selected.otu_ids, sample_selected.sample_values, sample_selected.otu_labels 
    // as b_l, b_v, b_h to crete buble chart
    console.log("Printing sample_selected.otu_ids (as b_l) in bubblely_chart function");
    console.log(b_l);
    console.log("Printing sample_selected.sample_values (as b_v) in bubblely_chart function");
    console.log(b_v);
    console.log("Printing hovertext sample_selected.otu_labels (as b_h) in bubblely_chart function");
    console.log(b_h);

    var trace1 = {
        x: b_l,
        y: b_v,
        text: b_h,
        mode: 'markers',
        marker: {
            color: b_l,
            // opacity: [1, 0.8, 0.6, 0.4],
            size: b_v,
            // colorscale: 'Jet'  // Closet color scale I could find at https://plotly.com/python/builtin-colorscales/
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: '',
        showlegend: false,
        height: 600,
        width: 1200
      };
      // Plot Buble Chart
      Plotly.newPlot('bubble', data, layout);
      
}
init();