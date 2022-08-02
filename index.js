const getData = async () => {
  const xs = [];
  const ys = [];
  const response = await fetch("data/data.csv");
  const data = await response.text();
  const table = data.split(/\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
  return { xs, ys };
};

const chartIt = async () => {
  const data = await getData();
  const ctx = document.getElementById("myChart").getContext("2d");
  Chart.defaults.font.size = 14;
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature in °C",
          data: data.ys,
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
