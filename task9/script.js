$(document).ready(function(){

    var formData = {
        
        
        fields:[
              {label:"Name", type:"text", name:"name", required:true},
            {label:"Email", type:"email", name:"email", required:true},
            {label:"Password", type:"password", name:"password", required:true},
            {label:"Country", type:"select", name:"country", required:true,
              
                options:["Select","India","USA","Canada"]
            }
        ]
    };

    var form = $("<form id='myForm'></form>");

   
    $.each(formData.fields,function(i,field){

        form.append("<label>"+field.label+"</label><br>");

        var input;

        if(field.type  ==  "select"){
           
           
            input = $("<select name='"+field.name+"'></select>");

            $.each(field.options,function(j,opt){
                         input.append("<option value='"+opt+"'>"+opt+"</option>");
            });
        }


        else{
            
            
            input = $("<input type='"+field.type+"' name='"+field.name+"'>");
        }


        if(field.required){
            input.attr("required","required");
        }

        form.append(input);
        form.append("<br><span class='error'></span><br><br>");
    });

            form.append("<div id='extraFields'></div>");
    form.append("<button type='submit'>Submit</button>");

    $("#formContainer").append(form);
});




$(document).on("change","select[name='country']",function(){

      
    var selected = $(this).val();

    $("#extraFields").empty();

        if(selected=="USA"){

        var usaField = "<label>State</label><br>" +
                       "<select name='state' required>" +
                       "<option value=''>Select State</option>" +
                       "<option>California</option>" +
                       "<option>Texas</option>" +
                       "<option>Florida</option>" +
                       "</select><br><span class='error'></span><br><br>";

        $("#extraFields").append(usaField);
    }




    else if(selected=="India"){

        var indiaField = "<label>Aadhaar Number</label><br>" +
                         "<input type='text' name='aadhaar' required>" +
                         "<br><span class='error'></span><br><br>";

        $("#extraFields").append(indiaField);
    }



    else if(selected=="Canada"){



        var canadaField = "<label>Province</label><br>" +
                          "<select name='province' required>" +
                          "<option value=''>Select Province</option>" +
                          "<option>Ontario</option>" +
                          "<option>Quebec</option>" +
                          "<option>Alberta</option>" +
                          "</select><br><span class='error'></span><br><br>";

        $("#extraFields").append(canadaField);
    }

});







$(document).on("submit","#myForm",function(e){




    e.preventDefault();

    var valid = true;

    $(".error").text("");

    $("input, select").each(function(){






        if($(this).attr("required") && $(this).val()==""){
            $(this).next(".error").text("This field is required");
            valid = false;
        }

    });






    var email = $("input[name='email']").val();

    if(email!="" && !email.includes("@")){
        $("input[name='email']").next(".error").text("Invalid Email");
        valid = false;
    }

    var pass = $("input[name='password']").val();




    if(pass.length < 6){





        $("input[name='password']").next(".error").text("Password must be 6 characters");
        valid = false;
    }

    var aadhaar = $("input[name='aadhaar']").val();

    if(aadhaar){
        if(isNaN(aadhaar) || aadhaar.length != 12){
            $("input[name='aadhaar']").next(".error").text("Enter valid 12 digit Aadhaar");
            valid = false;
        }
    }

    if(valid){

        alert("Form Submitted Successfully");
    }

});