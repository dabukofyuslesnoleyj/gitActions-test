

$(document).ready(function() {
  
  function sendRequests(requestData) {
    // Make POST request
    var rsp;
    $.ajax({
      url: "https://39wm33ghmb.execute-api.us-east-1.amazonaws.com/default/ReadWriteDDB_Richmond",
      type: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestData),
      success: function(response) {
        var responseStatus = { requestStatus: 0, item: response };

        //console.log(responseStatus);
        //console.log(responseStatus.item);
        if(requestData.httpMethod == "GET")
        {
          console.log("GET");
          GETOutput(responseStatus);
        }
        else if(requestData.httpMethod == "POST")
        {
          POSTOutput(responseStatus);
        }

      },
      error: function(response) {
        var errorStatus = { requestStatus: 1, item: response };
        
        console.log(response);
        //console.log(errorStatus.item);
        if(requestData.httpMethod == "GET")
        {
          console.log("GET");
          GETOutput(errorStatus);
        }
        else if(requestData.httpMethod == "POST")
        {
          POSTOutput(errorStatus);
        }
      }
    });

  }

  function GETOutput(rsp)
  {
    console.log("Request");
    // remove the old class and add the new class
    if(rsp.requestStatus == 1)
    {
      console.log("Request Failed");
      console.log(rsp.item);
        $("#GET_output_span").removeClass("text-bg-light").addClass("text-bg-danger");
        $("#GET_output_span").val("Failed");
    }
    else if(rsp.requestStatus == 0)
    {
      console.log("Request Success");
        $("#GET_output_span").removeClass("text-bg-light").addClass("text-bg-success");
        $("#GET_output_span").val("Success");
    }
  }
  function POSTOutput(rsp)
  {
    if(rsp.requestStatus == 1)
    {
        $("#POST_output_span").removeClass("text-bg-light").addClass("text-bg-danger");
        $("#POST_output_span").val("Failed");
    }
    else if(rsp.requestStatus == 0)
    {
        $("#POST_output_span").removeClass("text-bg-light").addClass("text-bg-success");
        $("#POST_output_span").val("Success");
    }
    else
    {
      $("#POST_output_span").val("Nothing");
    }
  }


    $('#submitPOSTButton').click(function() {
      // call your function here
      var input_POST_name = $('#input_usernamePOST').val();
      var input_POST_desc = $('#input_descriptionPOST').val();
      var jsonBody = {name: input_POST_name, description: input_POST_desc};
      var requestData = {httpMethod: "POST", "body": JSON.stringify(jsonBody)};

      sendRequests(requestData);
      
    });
    $('#submitGETButton').click(function() {
        // call your function here
        var input_GET_name = $('#input_usernameGET').val();

        var requestData = {httpMethod: "GET", queryStringParameters:{entity_type: "user_entity", name: input_GET_name} }

        console.log(requestData);
        sendRequests(requestData);
      });
  });
