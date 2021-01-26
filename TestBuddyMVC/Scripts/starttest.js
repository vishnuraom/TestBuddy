$("#enter").click(function () {
    var data1 = {
        "Description": $('#desc').val(),
        "TestId": '',
        "TestName": $('#testname').val(),
        "MaxMarks": $('#maxmarks').val(),
        "MinMarks": $('#minmarks').val(),
        "Category": $('#category').val(),
    }
    var bla = $('#maxtime').val();

    //Set
    $('#maxtime').val(bla);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:59257/api/Tests",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + localStorage.getItem('Token'),
            "cache-control": "no-cache",
            "postman-token": "b2ef0f5e-7e44-345d-56ef-0fe5fd84f2f8"
        },
        "data": JSON.stringify(data1)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#TestId').val(response.TestId);
        $('#desc').val(response.Description);
        $('#testname').val(response.TestName);
        $('#upload_div').removeAttr('hidden');
        $('#select_file').hide();
    });
});
var json_data_arr = [];

document.getElementById('file').onchange = function () {

    var check = checkfile(this);

    if (check == true) {
        $('#b1').show();
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (progressEvent) {

            var lines = this.result.split('\n');

            alert(lines);

            var line_data = [];

            for (k = 0; k < lines.length - 1; k++) {
                line_data[k] = lines[k];
            }

            $("#data").append(line_data);

            var csv = $("#data").val();
            var p = csv.trim();
            var json = csvJSON(p);
            $("#json").val(json);
            alert(json);
            json_data_arr = json;

        };
        reader.readAsText(file);
    }
    else {
        alert("Invalid file selected, valid file is of .csv");
    }

};



function SaveToDb() {
    var Test_id = document.getElementById("TestId").value;
    var root = 'http://localhost:59257/api/Questions?Test_ID=' + Test_id.toString() + '';
    $.ajax({
        url: root,
        method: 'POST',
        data: json_data_arr,
        contentType: "application/json"

    }).done(function (response) {
        alert(response);
        $('#upload_div').hide();
        $('#admin').removeAttr('hidden');

    });
}

function checkfile(file) {
    var validExts = new Array(".csv");
    var fileExt = file.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        return false;
    }
    else return true;
}

//var csv is the CSV file with headers
function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

