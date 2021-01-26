   var x = [];
    var y=[];
    $(document).ready(function () {


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:59257/api/Company/getStudentData",
            "method": "GET",
            "headers": {
                "authorization": "bearer " + localStorage.getItem('Token'),
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
        }

        $.ajax(settings).done(function (data) {
            $.each(data, function (key, data1) {
                x.push(data1.TestId);
                y.push(data1.Percentage);
                console.log(y);
            })
        });

        $('#show').click(function () {

        var canvas = document.getElementById('myChart');

        var data2 = {
            labels: x,
            datasets: [
                {
                    label: "Student Dashboard Result",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: y,
                }
            ]
        };
        var option = {
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: true
                    }
                }]
            }
        };

        var myBarChart = Chart.Line(canvas, {
            data: data2,
            options: option
        });
        });


    });