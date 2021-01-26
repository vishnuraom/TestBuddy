
        $('#generate_file').click(function () {
            var SampleData_arr = [
                {
                    "QuestionId": "1",
                    "Question": "What is COMPUTER?",
                    "Option1": "An Electronic Device",
                    "Option2": "An Electrical Device",
                    "Option3": "A Mechanical Device",
                    "Option4": "A Electromagnetic Device",
                    "Answer": "1"
                },
                {
                    "QuestionId": "2",
                    "Question": "What is C?",
                    "Option1": "An IDE",
                    "Option2": "An Operating System",
                    "Option3": "A Programming Language",
                    "Option4": "A Platform",
                    "Answer": "3"
                }];

            ArrayToCSVConvertor(SampleData_arr, "SampleTestpaper", true);
        });



        function ArrayToCSVConvertor(arrData, ReportTitle, ShowLabel)
        {
            var CSV = '';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    // row += '"' + arrData[i][index] + '",';
                    row += arrData[i][index] + ',';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
