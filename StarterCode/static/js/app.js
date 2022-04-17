function init() {
    d3.json("samples.json").then(data => {
        console.log("BZ printing data in init function");
        console.log(data);
        console.log(data.samples);
        processSamples(data)
        var dropdown = d3.select("#selDataset");
        console.log("Printing dropdown");
        console.log(dropdown);
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
        })
    // Call optionChanged to initalize
    optionChanged('940')
    });
}

function display_metadata(meta_value) {


}


function optionChanged(value_in) {
    d3.json("samples.json").then(data => {
        // console.log("BZ printing data in optionChanged function");
        // console.log(data);
        console.log("BZ printing data.samples in optionChanged function");
        console.log(data.samples);
        var samples = []
        samples=data.samples
        var track_name = [];
        var sample_selected = [];
        var i=0;

        var dropdown = d3.select("#selDataset");
        console.log("Printing dropdown");
        console.log(dropdown);
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
            track_name[name] = [i];
            i += 1;
        })
        console.log("Printing track_name[value_in]");
        console.log(track_name[value_in]);
        console.log("Printing sample_selected aka samples[track_name[value_in]]");
        sample_selected = samples[track_name[value_in]]
        console.log(sample_selected);
        console.log("Printing sample_selected.id");
        console.log(sample_selected.id);

        console.log("Printing sample_selected.sample_values");
        console.log(sample_selected.sample_values);
        console.log("Printing sample_selected.otu_ids");
        console.log(sample_selected.otu_ids);
        console.log("Printing sample_selected.otu_labels");
        console.log(sample_selected.otu_labels);

        bar_values = []
        bar_labels = []
        bar_hovertext = []
        // bar_values = sample_selected.sample_values
        // bar_labels = sample_selected.otu_ids
        // bar_hovertext = sample_selected.otu_labels
        let result = '';
        let j = 0;
        // initialize array
        var arr = [];
        do {
            result = result + j;
            // append new value to the array
            arr.push("Hola");
            bar_values.push(sample_selected.sample_values[j]);
            bar_labels.push(sample_selected.otu_ids[j]);
            bar_hovertext.push(sample_selected.otu_labels[j]);
            j += 1;
        } while (j < 10);
        console.log(arr);
        console.log(sample_selected.sample_values);
        console.log(bar_values);
        console.log(bar_labels);
        console.log(bar_hovertext);
        console.log('Printing do/while loop result');
        console.log(result);
        // expected result: "12345"
        
        console.log("Printing bar_values");
        console.log(bar_values);
        console.log("Printing bar_labels");
        console.log(bar_labels);
        console.log("Printing bar_hovertext");
        console.log(bar_hovertext);
        
        let sortedByGreekSearch2 = data.samples.sort((a, b) => b.sample_values - a.sample_values);
        console.log("Printing sortedByGreekSearch2");
        console.log(sortedByGreekSearch2);

        // Slice the first 10 objects for plotting
        slicedData2 = sortedByGreekSearch2.slice(0, 10);

        // Reverse the array to accommodate Plotly's defaults
        reversedData2 = slicedData2.reverse();
            
        let bar_labels_str = bar_labels.map(convertAsString);
        // console.log("bar_labels_str:", bar_labels_str)
        reversedData = bar_values.reverse();
        console.log("reversedData:", reversedData)
        // bar_labels_str = ['944', '2419', '2539', '3450', '1795', '2389', '1314', '922', '1167', '2859'],
        // bar_labels_str = ['OTU_944', 'OTU_2419', 'OTU_2539', 'OTU_3450', 'OTU_1795', 'OTU_2389', 'OTU_1314', 'OTU_922', 'OTU_1167', 'OTU_2859'],
        bar_labels_str1 = bar_labels_str
        bar_labels_str1=bar_labels_str1.map(obj => `OTU ${obj}`)
        reversedLabels = bar_labels_str1.reverse();
        console.log("reversedLabels:", reversedLabels)
        console.log("OTU reversedLabels[0]:", reversedLabels[0])

        let trace2 = {
        x: reversedData,
        y: reversedLabels,
        text: bar_hovertext,
        // name: "Greek",
        marker: {color: 'light_blue'},
        type: "bar",
        orientation: "h"
        };
    
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData2 = [trace2];
        console.log("Printing traceData2");
        console.log(traceData2);

        // Apply a title to the layout
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
        // Note that we use `traceData` here, not `data`
        Plotly.newPlot("bar", traceData2, layout);

        // Update buble chart
        bubblely_chart(sample_selected.otu_ids, sample_selected.sample_values, sample_selected.otu_labels)

        // Update demographic information in panel 
        console.log("BZ printing data.metadata in optionChanged function");
        console.log(data.metadata);
        var display_metadata = data.metadata;
        console.log("BZ printing display_metadata in optionChanged function");
        console.log(data.metadata);
        var metadata_array = display_metadata.filter((sampleobject) => sampleobject.id == value_in);
        var md_a = metadata_array[0];
        var panel_metadata = d3.select("#sample-metadata");
        panel_metadata.html("");
        Object.entries(md_a).forEach(([key,value]) => {
            panel_metadata.append("h6").text('${key}: ${value}');
            console.log("BZ printing key, value in optionChanged function");
            console.log(key, value);
        });

    });

}

function convertAsString(val) {
    return val.toString();
}

function processSamples(data) {
    console.log("BZ printing sample_id in processSamples function");
    sample_id = data.samples.map(d => d["id"]);
    console.log(sample_id);
    console.log("BZ printing sample_values in processSamples function");
    sample_values = data.samples.map(d => d["sample_values"]);
    console.log(sample_values);
    console.log("BZ printing otu_ids in processSamples function");
    otu_ids = data.samples.map(d => d["otu_ids"]);
    console.log(otu_ids);
    console.log("BZ printing otu_labels in processSamples function");
    otu_labels= data.samples.map(d => d["otu_labels"]);
    console.log(otu_labels);
}

function bubblely_chart(b_l, b_v, b_h){
    // Passing in sample_selected.otu_ids, sample_selected.sample_values, sample_selected.otu_labels
    // as b_l, b_v, b_h     
    console.log("Printing b_l", b_l);     
    console.log("Printing b_v", b_v);     
    console.log("Printing b_h", b_h);

    var trace1 = {
        x: b_l,
        y: b_v,
        text: b_h,
        mode: 'markers',
        marker: {
        color: b_l,
        // color: ['rgb(1167, 1167, 1167)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        // opacity: [1, 0.8, 0.6, 0.4],
        size: b_v
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 1400
      };
      
      Plotly.newPlot('bubble', data, layout);
      
}
init();