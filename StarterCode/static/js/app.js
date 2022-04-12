function init() {
    d3.json("samples.json").then(data => {
        console.log("BZ printing data in init function");
        console.log(data);
        console.log("BZ printing data.samples in init function");
        console.log(data.samples);
        ///console.log("BZ printing data.samples.sample_values in init function");
        ///console.log(data.samples.sample_values);
        // Create an array of samples
        console.log("Does it call processCapsules???");
        processSamples(data)
        var dropdown = d3.select("#selDataset");
        data.names.forEach((name)=>{
            dropdown.append("option").text(name).property("value",name);
        })

    });
}

function optionChanged(value) {
    console.log("BZ printing in optionChanged");
    console.log(value);


}


function processSamples(data) {
    console.log("BZ printing sample_id in processSamples function");
    sample_id = data.samples.map(d => d["id"]);
    console.log(sample_id);
    dataset1=[]
    dataset1=sample_id
    console.log("BZ printing (dataset1=sample_id) in processSamples function");
    console.log(dataset1);
    ///console.log("BZ printing sample_id keys and values");
    ///Object.keys(sample_id))
    ///Object.sample_values(sample_id))

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

init();