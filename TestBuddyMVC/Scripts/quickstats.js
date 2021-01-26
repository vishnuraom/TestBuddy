var email = [];

$(document).ready(function () {

    //To load the drop down list with testname from database
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

    //To get the Student data
    $('#submit').click(function () {
        $("#Modal").modal({
            backdrop: false, backdrop: 'static',
            keyboard: false
        });
        $('#imgLoading').show();
        var data2 = {
            "TestName": $('#SelectTest').val()
        }
        console.log(data2);
        $.ajax({
            type: "Get",
            url: "http://localhost:59257/api/Company/getData?testId=" + $('#SelectTest').val(),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data);
                $('#imgLoading').hide();
                var result = "<thead><th>Sl. No.</th><th>Name</th><th>Email Id</th><th>Percentage</th><th></thead>";
                $.each(data, function (index, record) {
                    result += "<tbody><tr><td>" + index + "</td><td>" + record.Email + "</td><td>" + record.Email + "</td><td>" + record.Percentage + "</td></tr></tbody>"
                    email.push(record.Email);
                });
                $("#ResultTable").html(result);
            },
            fail: function () {
                $('#imgLoading').hide();
                $('#alert').show(200);
                $('ModalTable').show(300);
            }
        });
    });

    //Open Model block of Mail Body
    $("#btnSendMail").click(function () {
        $("#MailModal").modal({ backdrop: true });
    });

    //Download Html Table Data into Excel format
    $("#btnDownloadExcel").click(function (e) {
        $("#Modal").modal({ backdrop: true });
        e.preventDefault();
        //getting data from our table
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById('ResultTable');

        //Replace Spaces with %20
        var table_html = table_div.outerHTML.replace(/ /g, '%20');

        var a = document.createElement('a');

        a.href = data_type + ', ' + table_html;
        a.download = 'student_table ' + Math.floor((Math.random() * 9) + 10) + '.xls';
        a.click();
        $("#Modal").modal({ backdrop: true });
    });

    //To send Mail to selected Student
    $('#Send').click(function () {
        var data1 = JSON.stringify(email);
        $('#imgLoading').show();
        $.ajax({
            type: "Post",
            url: "http://localhost:59257/api/Company/sending?body=" + $('#emailbody').val(),
            data: data1,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#imgLoading').hide();
                alert('Hey, message sent');
            },
            fail: function () {
                $('#imgLoading').hide();
                alert('Message Sending Error');
            }
        });
    });
});