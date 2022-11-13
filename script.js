
$(document).ready(function() {
    
    // $("#button").click(function() {
    //     $('#list').append($("<li>" + $('#Text1').val() + "</li>"));
    //     return false;
    // });
    // $("#btn_submit").click(function(){
        
    // });
    $('#submit_div').hide();
    let counter = 1;
    
    $("#add_sym").click(function() {
        $('#submit_div').show();

        if(counter==4){
            $('#add_sym').hide();
        }
        let symId = "symId"+counter;
        let symDuration = "symDuration"+counter;
        
        $('#additional_sym').append('<div class="input-group mb-3"><div class="input-group-prepend"><select class="custom-select" id="'+symId+'">\
                        <option selected value="0">N/A</option>\
                        <option value="1">Cough</option>\
                        <option value="2">Sneeze</option>\
                        <option value="3">Fever</option>\
                        <option value="4">Headache</option>\
                        <option value="5">Sweating</option>\
                        <option value="6">Nausea</option>\
                        <option value="7">Vomiting</option>\
                        <option value="8">Diarrhea</option>\
                        <option value="9">Rash</option>\
                        <option value="10">Constipation</option>\
                        <option value="11">Fatigue</option>\
                        <option value="12">Scretches</option>\
                        <option value="13">Swelling</option>\
                        <option value="14">Stiffness</option>\
                        <option value="15">Bleeding</option>\
                        <option value="16">Arthitis</option>\
                        </select>\
                    </div>\
                    <select class="custom-select" id="'+symDuration+'">\
                    <option selected value="0">N/A</option>\
                    <option value="1">< 1 week</option>\
                    <option value="2">1-2 weeks</option>\
                    <option value="3">2-4 weeks</option>\
                    <option value="4">4-8 weeks</option>\
                    <option value="5"> > 8 weeks</option>\
                    </select>\
                </div>\
        ');
        counter++;
        
        // else{
        //     $('#error_msg').append('<p>You can only add upto 4 symptoms</p>');
        //     $('#add_sym').hide();
        // }
    });
    // <div class="input-group mb-3">
    //             <div class="input-group-prepend">
    //                 </div>
    //                 <select class="custom-select" id="">
    //                 <option selected value="0">N/A</option>
    //                 <option value="1">Less than a week</option>
    //                 <option value="2">1-2 weeks</option>
    //                 <option value="3">2-3 weeks</option>
    //                 <option value="4">3-4 weeks</option>
    //                 </select>
    //             </div>

}); 

function sendPatientData(){
              
    let result = document.querySelector('.result');
    
    var patient_data = []; 
    for(var i=1;i<=4;i++){
        var id = "symId"+i;
        var timeId = "symDuration"+i;
        let symptom = $('#id').val();
        let duration = $('#timeId').val();
        //patient_data[i]={symptom: symptom, duration: duration};
        
    }
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("content",',,,');
    // Creating a XHR object

    // open a connection

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("user-type","patient");
    xhr.setRequestHeader("type","");
    
    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            // Print received data from server
            result.innerHTML = this.responseText;
            
        }
    };
    
    // Converting JSON data to string
    var data = patient_data;
    //JSON.stringify({ "name": name.value, "email": email.value });
    
    // Sending data with the request
    xhr.send(data);
}