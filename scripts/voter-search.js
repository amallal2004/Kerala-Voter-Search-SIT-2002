const showLACssir2002 = (id) => {
    var base_url = $('#base_url').val().trim();
    if (id != "")
    {
        $.ajax({
            url: base_url+"electoral-roll-sir-2002/show_lac/",
            type: 'GET', // Using the GET method
            data: {
                id: id  // Pass the variable as a query parameter
            },
            dataType: 'json', // Expecting JSON response
            success: function(response) {
                //document.getElementById('LAC_div').innerHTML=response.selectHtml;
                $('#LAC_div').html(response.selectHtml);
                bindCustomDropdowns(document);
            },
            /*error: function(xhr, status, error) {
                alert("Error: " + error);
            }*/
        });
    }
    else
    {
        $('#LAC_div').html('<div class="p-3 bg-light border-radius"></div>'); 
        //$('#Booth_div').html('<div class="p-3 bg-light border-radius"></div>');   
    }
}

const showElectoralrolls = (id) => {
    document.getElementById('result_div').style.display = 'none';
    document.getElementById('loadingMessage').style.display = 'block';
    frmsearch.submit();
}
const showLACs = (id) => {
    var base_url = $('#base_url').val().trim();
    if (id != "")
    {
        $.ajax({
            url: base_url+"votersearchnew/show_lac/",
            type: 'GET', // Using the GET method
            data: {
                id: id  // Pass the variable as a query parameter
            },
            dataType: 'json', // Expecting JSON response
            success: function(response) {
                //document.getElementById('LAC_div').innerHTML=response.selectHtml;
                $('#LAC_div').html(response.selectHtml);
                bindCustomDropdowns(document);
            },
            /*error: function(xhr, status, error) {
                alert("Error: " + error);
            }*/
        });
    }
    else
    {
        $('#LAC_div').html('<div class="p-3 bg-light border-radius"></div>'); 
        $('#Booth_div').html('<div class="p-3 bg-light border-radius"></div>');   
    }
}

const showBooths = (id) => {
    var base_url = $('#base_url').val().trim();
    if (id !="")
    {
        $.ajax({
            url: base_url+"votersearchnew/show_booth/",
            type: 'GET', 
            data: {
                id: id  
            },
            dataType: 'json', 
            success: function(response) {
                $('#Booth_div').html(response.selectHtml);
                bindCustomDropdowns(document);
            },
        });
    }
    else
    {
        $('#Booth_div').html('<div class="p-3 bg-light border-radius"></div>'); 
    }
}

const showResults = () => {
    if ($('#district_id').val().trim() == '') {
        //msgBox("Missing!", "Please choose a district", "warning", "district_id");
        alert("Please choose a district");
        document.getElementById('district_id').focus();
        return false;
    }
    if ($('#lac_id').val().trim() == '') {
        //msgBox("Missing!", "Please choose an LAC", "warning", "lac_id");
        alert("Please choose an LAC");
        document.getElementById('lac_id').focus();
        return false;
    }

    if ($('#unicodehousename').val().trim() == '' && $('#booth_id').val().trim() == '' && $('#sl_no_in').val().trim() == '' && $('#unicodeValue').val().trim() == '') {
        //msgBox("Missing!", "Please provide either a booth name, your name, or a serial number", "warning", "booth_id");
         alert("Please provide either a booth name, your name, house name or a serial number");
        document.getElementById('booth_id').focus();
        return false;
    }

    var unicodeValue = $('#unicodeValue').val();
    var asciiValue = unicode2ascii(unicodeValue);
    document.getElementById('searchname').value = asciiValue;

    var unicodehousename = $('#unicodehousename').val();
    var asciiValuehousename = unicode2ascii(unicodehousename);
    document.getElementById('searchhousename').value = asciiValuehousename;

    $("#searchBtn").html("Searching...");
    $("#searchBtn").prop("disabled", true);
    
    frmsearch.submit();
}

function show_voters_by_house_number(slno)
{
    var base_url = $('#base_url').val().trim();
    var lac_id = $('#lac_id'+slno).val().trim();
    var booth_id = $('#booth_id'+slno).val().trim();
    var house_no = $('#house_no'+slno).val().trim();
    if (house_no!="")
    {
        $.ajax({
            url: base_url + "votersearchnew/show_voters_by_house_number",
            type: 'POST',
            data: { 
                HOUSE_NO: house_no,
                AC_CODE: lac_id,
                PART_CODE: booth_id
             },
            dataType: 'text',
            success: function(response) {
                $('#res_div').html(response);
            }
        });
    }
}