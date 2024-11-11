/* fetch CSV temperature data and display via Chart.JS
Temperature values are differences from the mean of 14*/
 
async function getData() {
    const response = await fetch("data/dimple-measurment.csv"); // move up two folders
    const data = await response.text();
   
    const xTrials = []; // x-axis labels
    const yNdimple = []; // y-axis global temps
    const ySdimple = []; // y-axis NH temps
    const yLdimple = []; // y-axis SH temp values
   
    const table = data.split("\n").slice(1);
    console.log(table);
   
    table.forEach((row) => {
      const columns = row.split(","); // split row into columns using commas
      const trial = parseFloat(columns[0]); // assign year value
      xTrials.push(trial);
   
      const ndimple = parseFloat(columns[1]); // global temp values
      yNdimple.push(ndimple);
   
      const sdimple = parseFloat(columns[2]);
      ySdimple.push(sdimple);
   
      const ldimple = parseFloat(columns[3]);
      yLdimple.push(ldimple);
      
    });
    console.log(xTrials, yNdimple, ySdimple, yLdimple);
    return { xTrials, yNdimple, ySdimple, yLdimple }; // return multiple values as an object
  }
  
  async function createChart() {
    const data = await getData(); // wait for getData to send formatted data to create chart
    const lineChart = document.getElementById("lineChart");
   
    const myChart = new Chart(lineChart, {
      type: "line",
      data: {
        labels: data.xTrials, // x-axis labels
        datasets: [
          {
            label: 'Helmet with No Dimple Drag Coefficient',
            data: data.yNdimple, // y-axis data
            fill: false,
            backgroundColor: "rgba(255, 0, 132, 0.2)",
            borderColor: "rgba(255, 0, 132, 1)",
            borderWidth: 1,
          },
          {
            label: 'Helmet with Small Dimple Drag Coefficient',
            data: data.ySdimple, // y-axis data
            fill: false,
            backgroundColor: "rgba(0, 102, 255, 0.2)",
            borderColor: "rgba(0, 102, 255, 1)",
            borderWidth: 1,
          },
          {
            label: 'Helmet with Large Dimple Drag Coefficient',
            data: data.yLdimple, // y-axis data
            fill: false,
            backgroundColor: "rgba(0, 153, 51, 0.2)",
            borderColor: "rgba(0, 153, 51, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // resize based on screen size
        maintainAspectRatio: false,
        scales: {
          // display options for x & y axes
          x: {
            title: {
              display: true,
              text: "Trial Number", // x-axis title
              font: {
                size: 14,
              },
            },
            ticks: {
              callback: function(val, index) {
                return index % 1 === 0 ? this.getLabelForValue(val) : '';
              },
              font: {
                size: 14,
              },
            },
            grid: {
              color: "#6c767e",
            },
          },
          y: {
            title: {
              display: true,
              text: "Helmet Drag Coefficient", // y-axis title
              font: {
                size: 14,
              },
            },
            
            ticks: {
              callback: function(val, index) {
                return index % 1 === 0 ? this.getLabelForValue(val) : '';
              },
              
              font: {
                size: 12,
              },
            },
            grid: {
              color: "#6c767e",
            },
          },
        },
        plugins: {
          // display options for title and legend
          title: {
            display: true, // display chart title
            text: "Helmet Dimple Measurements vs Drag Coefficient",
            font: {
              size: 24,
            },
            color: "black",
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            align: "start",
            position: "bottom",
          },
        },
      },
    });
  }
   
  createChart();
   