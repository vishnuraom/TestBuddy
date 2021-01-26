
$(function () {
    updateemail();
    var chat = $.connection.testHub;
    chat.client.addNewMessageToPage = function (testid, testname, desc, maxtime) {
      
        $('#testname').text(testname);

        $('#desc').text(desc);

        $('#head2').removeAttr('hidden');

        
        $('#start').val(testid);
        localforage.setItem('mystatvar', 0).then(function (c) { console.log('statvar set') });
        localStorage.setItem('maxtime', maxtime);


    };

    $.connection.hub.start().done(function () {
       
        console.log("Connection Established");
    });
    $('#end').click(function () {
        if (!(localStorage.getItem('TestStarted') == 'true')) {
            console.log('testdone');
        }
        else {
            $('#head1').hide();
            $('#test').hide();
            dict = {};
            chat.server.testSubmittedUsers('lol');
            localforage.removeItem('mystatvar').then(function (value) { });

            localforage.iterate(function (value, key, iterationNumber) {
                // Resulting key/value pair — this callback
                // will be executed for every item in the
                // database.
                dict[key] = value;
                console.log([key, value]);
            }).then(function () {
                console.log('Iteration has completed');
                var sdict = JSON.stringify(dict);
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:59257/api/submit?testid=" + localStorage.getItem('startid'),
                    "method": "POST",
                    "headers": {
                        "authorization": "bearer " + localStorage.getItem('Token'),
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                    },
                    "processData": false,
                    "data": sdict
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    localforage.clear().then(function () { console.log('cleared done'); });
                    localStorage.removeItem('maxtime');
                    localStorage.removeItem('TestStarted');
                    localStorage.removeItem('startid');
                    localStorage.removeItem('starttime');
                    $('#resultxx').text(response.Percentage + " % correct answers. ");
                }).fail();
            });
        }
    });
});

var data;

if (localStorage.getItem('TestStarted') == 'true') {
    $('#head2').hide();
    $('#test').removeAttr('hidden');
    var root = 'http://localhost:59257/api/Questions?s=';
    $.ajax({
        url: root + localStorage.getItem('startid'),
        method: 'GET'
    }).done(function (questions) {
        data = questions;
        console.log(questions);



        display = document.querySelector('#time');

        startTimer(localStorage.getItem('maxtime') * 60, display);
        //console.log(uniqueID());
        localforage.getItem('mystatvar').then(function (c) {
            $('#question').empty();

            $('<p id="ques">' + data[c].Question +"."+ '</p>').appendTo('#question');

            $('#radio1').attr('value', data[c].Option1);
            $('label[for=radio1]').html(data[c].Option1).attr('value', data[c].Option1);

            $('#radio2').attr('value', data[c].Option2);
            $('label[for=radio2]').html(data[c].Option2).attr('value', data[c].Option2);

            $('#radio3').attr('value', data[c].Option3);
            $('label[for=radio3]').html(data[c].Option3).attr('value', data[c].Option3);

            $('#radio4').attr('value', data[c].Option4);
            $('label[for=radio4]').html(data[c].Option4).attr('value', data[c].Option4);

        });
    });
}
$('#start').click(function () {
    localStorage.setItem('TestStarted', 'true');
    $('#head2').hide();
    localStorage.setItem('startid', $('#start').val());

    $('#test').removeAttr('hidden');
    var root = 'http://localhost:59257/api/Questions?s=';
    $.ajax({
        url: root + $('#start').val(),
        method: 'GET'
    }).done(function (questions) {
        data = questions;
        console.log(questions);

        var result = '';
        $('#btngrp').empty();
        $.each(data, function (index, record) {
            if (index % 15 == 0) {
                result = result + '<br/>'
            }
            result += '<button type="button" class="btn btn-secondary" onclick="gotoQuestion(this)" value=' + record.$id + '>' + record.$id + '</button>';
        });
        $('#btngrp').append(result);

        //timer
        display = document.querySelector('#time');
        localStorage.starttime = new Date();
        startTimer(localStorage.getItem('maxtime') * 60, display);


        localforage.getItem('mystatvar').then(function (c) {
            $('#question').empty();

            $('<p id="ques">' + data[c].$id +"."+ data[c].Question + '</p>').appendTo('#question');

            $('#radio1').attr('value', data[c].Option1);
            $('label[for=radio1]').html(data[c].Option1).attr('value', data[c].Option1);

            $('#radio2').attr('value', data[c].Option2);
            $('label[for=radio2]').html(data[c].Option2).attr('value', data[c].Option2);

            $('#radio3').attr('value', data[c].Option3);
            $('label[for=radio3]').html(data[c].Option3).attr('value', data[c].Option3);

            $('#radio4').attr('value', data[c].Option4);
            $('label[for=radio4]').html(data[c].Option4).attr('value', data[c].Option4);
        });
    });
});

$('#next').click(function () {
    reset();
    localforage.getItem('mystatvar').then(function (value) {
        localforage.setItem('mystatvar', ++value).then(function (c) {

            $('#question').empty();
            $('<p id="ques">' + data[c].$id + "." + data[c].Question + '</p>').appendTo('#question');



            $('#radio1').attr('value', data[c].Option1);
            $('label[for=radio1]').html(data[c].Option1).attr('value', data[c].Option1);

            $('#radio2').attr('value', data[c].Option2);
            $('label[for=radio2]').html(data[c].Option2).attr('value', data[c].Option2);

            $('#radio3').attr('value', data[c].Option3);
            $('label[for=radio3]').html(data[c].Option3).attr('value', data[c].Option3);

            $('#radio4').attr('value', data[c].Option4);
            $('label[for=radio4]').html(data[c].Option4).attr('value', data[c].Option4);

            $(".radio").prop("checked", false);
        });
    });
});



$('#prev').click(function () {
    reset();
    localforage.getItem('mystatvar').then(function (value) {
        value = value - 1;
        localforage.setItem('mystatvar', value).then(function (c) {

            $('#question').empty();
            $('<p id="ques">' + data[c].$id + "." + data[c].Question + '</p>').appendTo('#question');

            $('#radio1').attr('value', data[c].Option1);
            $('label[for=radio1]').html(data[c].Option1).attr('value', data[c].Option1);

            $('#radio2').attr('value', data[c].Option2);
            $('label[for=radio2]').html(data[c].Option2).attr('value', data[c].Option2);

            $('#radio3').attr('value', data[c].Option3);
            $('label[for=radio3]').html(data[c].Option3).attr('value', data[c].Option3);

            $('#radio4').attr('value', data[c].Option4);
            $('label[for=radio4]').html(data[c].Option4).attr('value', data[c].Option4);

            $(".radio").prop("checked", false);
        });
    });

});

$("input[type='radio']").on('change', function () {

    localforage.getItem('mystatvar').then(function (value) {
        var selectedValue = retnum($("input[name='radio']:checked")[0].id);
        localforage.setItem(data[value].QuestionId + '', selectedValue).then(function (x) {
            console.log(x);
        });;
    });
});

function retnum(str) {
    var num = str.replace(/[^0-9]/g, '');
    return num + '';
}

function startTimer(duration, display) {
    var start = Date.parse(localStorage.getItem('starttime'));
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        if (diff == 0) {
            $("#end")[0].click();
        }
        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

function reset() {
    $("input:radio[name='radio']").each(function (i) {
        this.checked = false;
    });
}

function gotoQuestion(elem) {
    var d = $(elem).val();
    localforage.setItem('mystatvar', d).then(function (c) {

        $('#question').empty();
        $('<p id="ques">' + data[0].$id +"."+ data[c].Question + '</p>').appendTo('#question');


        $('#radio1').attr('value', data[c].Option1);
        $('label[for=radio1]').html(data[c].Option1).attr('value', data[c].Option1);

        $('#radio2').attr('value', data[c].Option2);
        $('label[for=radio2]').html(data[c].Option2).attr('value', data[c].Option2);

        $('#radio3').attr('value', data[c].Option3);
        $('label[for=radio3]').html(data[c].Option3).attr('value', data[c].Option3);

        $('#radio4').attr('value', data[c].Option4);
        $('label[for=radio4]').html(data[c].Option4).attr('value', data[c].Option4);

        $(".radio").prop("checked", false);
    });
    reset();
}