const xlabels = [];
const ytemps = [];

const getData = async () => {
  const response = await fetch("data/data.csv");
  const data = await response.text();
  const table = data.split(/\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xlabels.push(year);
    const temp = columns[1];
    ytemps.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
};

const chartIt = async () => {
  await getData();
  const ctx = document.getElementById("myChart").getContext("2d");
  Chart.defaults.font.size = 14;
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Global Average Temperature",
          data: ytemps,
          backgroundColor: "lightgrey",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
};

chartIt();
