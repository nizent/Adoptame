let ctx;
let myChart;
let ctx2;
let myChart2;

function updateShareValue(){
    try {
        myChart.destroy();
    } catch (e) {
        console.log("No existe aún");
    }
    ctx = document.getElementById('shareValue').getContext('2d');
    let request_15077 = new XMLHttpRequest();
    let request_188 = new XMLHttpRequest();
    let request_187 = new XMLHttpRequest();
    let request_186 = new XMLHttpRequest();
    let initial_date = new Date(document.getElementById("inicio").value);
    initial_date.setDate(initial_date.getDate()+1);
    let final_date = new Date(document.getElementById("fin").value);
    final_date.setDate(final_date.getDate()+1);
    if(final_date < initial_date){
        return ;
    }
    let filter_str = `days?from_date=${initial_date.getFullYear()}-${initial_date.getMonth()+1}-${initial_date.getDate()}&to_date=${final_date.getFullYear()}-${final_date.getMonth()+1}-${final_date.getDate()}`;
    let link_15077=`https://fintual.cl/api/real_assets/15077/`+filter_str;
    let link_188="https://fintual.cl/api/real_assets/188/"+filter_str;
    let link_187="https://fintual.cl/api/real_assets/187/"+filter_str;
    let link_186="https://fintual.cl/api/real_assets/186/"+filter_str;

    request_15077.open("GET", link_15077);
    request_15077.responseType = "json";
    request_15077.send();

    request_15077.onload = function (){
        request_188.open("GET", link_188);
        request_188.responseType = "json";
        request_188.send();
        request_188.onload = function (){
            request_187.open("GET", link_187);
            request_187.responseType = "json";
            request_187.send();
            request_187.onload = function () {
                request_186.open("GET", link_186);
                request_186.responseType = "json";
                request_186.send();
                request_186.onload = function () {
                      let labels = [];
                      let data_15077 = [];
                      let data_188 = [];
                      let data_187 = [];
                      let data_186 = [];
                      console.log(request_15077);
                      for(let i in request_15077.response["data"]){
                          labels.push(request_15077.response["data"][i]["attributes"]["date"]);
                          data_15077.push(request_15077.response["data"][i]["attributes"]["net_asset_value"]);
                          data_188.push(request_188.response["data"][i]["attributes"]["net_asset_value"]);
                          data_187.push(request_187.response["data"][i]["attributes"]["net_asset_value"]);
                          data_186.push(request_186.response["data"][i]["attributes"]["net_asset_value"]);
                      }
                      myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labels,
                                datasets: [{
                                    label: 'Very Conservative Streep',
                                    data: data_15077,
                                    borderWidth: 1,
                                    borderColor: "#007bff",
                                    backgroundColor: "#007bff"
                                },
                                    {
                                        label: 'Conservative Clooney',
                                        data: data_188,
                                        borderWidth: 1,
                                        borderColor: "#2fec00",
                                        backgroundColor: "#2fec00"
                                    },
                                    {
                                        label: 'Moderate Pit',
                                        data: data_187,
                                        borderWidth: 1,
                                        borderColor: "#ec7a00",
                                        backgroundColor: "#ec7a00"
                                    },
                                    {
                                        label: 'Risky Norris',
                                        data: data_186,
                                        borderWidth: 1,
                                        borderColor: "#ec0000",
                                        backgroundColor: "#ec0000"
                                    }
                                ]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                },
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Valor cuota en el tiempo"
                                    }
                                }
                            }
                      });
                }
            };
        };
    };
}

function updateProfitability() {
    try {
        myChart2.destroy();
    } catch (e) {
        console.log("No existe aún");
    }
    ctx2 = document.getElementById('shareValue_prof').getContext('2d');
    let request = new XMLHttpRequest();
    let sel = document.getElementById("fondo");
    let id = sel.value;
    let initial_date = new Date(document.getElementById("inicio_prof").value);
    initial_date.setDate(initial_date.getDate()+1);
    let final_date = new Date(document.getElementById("fin_prof").value);
    final_date.setDate(final_date.getDate()+1);
    if(final_date < initial_date){
        return ;
    }
    let filter_str = `days?from_date=${initial_date.getFullYear()}-${initial_date.getMonth()+1}-${initial_date.getDate()}&to_date=${final_date.getFullYear()}-${final_date.getMonth()+1}-${final_date.getDate()}`;
    let link=`https://fintual.cl/api/real_assets/${id}/`+filter_str;

    request.open("GET", link);
    request.responseType = "json";
    request.send();

    request.onload = function (){
        let labels = [];
        let data = [];
        console.log(request);
        for(let i in request.response["data"]){
            if(i>0){
                labels.push(request.response["data"][i]["attributes"]["date"]);
                let today = request.response["data"][i]["attributes"]["net_asset_value"];
                let yesterday = request.response["data"][i-1]["attributes"]["net_asset_value"];
                let profitability = (today-yesterday)/yesterday;
                data.push(profitability);
            }
        }
        myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: sel.options[sel.selectedIndex].text,
                    data: data,
                    borderWidth: 1,
                    borderColor: "#007bff",
                    backgroundColor: "#007bff"
                }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Rentabilidad en el tiempo del fondo "+sel.options[sel.selectedIndex].text
                    }
                }
            }
        });
    };
}

