$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:59257/api/Company/TestName",
        data: [],
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);
            var result = '';
            $('#SelectTest').empty();
            result = "<option disabled>Select Test Name</option>";
            $.each(data, function (index, record) {
                result += '<option value="' + record.TestId + '">' + record.TestName + '</option>';
            });
            $('#SelectTest').append(result);
        }
    });

});



$('#SelectTest').change(function () {

    var count = 0;
    var division = [];
    division[0] = 0;
    division[1] = 0;
    division[2] = 0;

    var x = "test1";

    $.ajax({
        url: 'http://localhost:59257/api/results?testid=' + $('#SelectTest').val(),
        type: 'get'
    }).done(function (response) {
        console.log(response);
        $.each(response, function (index, value) {
            if (value.Percentage > 70) {
                division[0] += 1;
            }
            else if (value.Percentage > 40) {
                division[1] += 1;
            }
            else {
                division[2] += 1;
            }
        })

        var ctx = document.getElementById("myChart").getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["above 70", "40-70", "Fail"],
                datasets: [{
                    backgroundColor: [
                      "#2ecc71",
                      "#14dee5",
                      "#e74c3c"
                    ],
                    data: division
                }]
            }
        });
    })

});
