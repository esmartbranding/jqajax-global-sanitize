/*!
 * jq-gs.js
 * Original author: Al Serize
 * Last Modified on 08/23/2021
 * Licensed under the MIT license
 */
 
$(document).ready(function(event){   
    sanitize = function(payload){
     // <>" ’ % ;)(&+          <  />  >  (  '  '  )
        var map = {  
            '/' :  '%2F'            
            ,'<':  '%3C'  
            ,'>':  '%3E'
            ,"'":  ""
          },
          reg = /[/><']/ig;

        // return newString;      
        var cleanPayLoad = {};
        for (var key in payload){
          if(typeof payload[key] == 'string'){
            cleanPayLoad[key] = payload[key].replace(reg,function(match){ return map[match] } );
          }else{
            cleanPayLoad[key] = payload[key];
          }  
        }     
      return cleanPayLoad;
  } 
  $.ajaxPrefilter(function( options, originalOptions, jqXHR ) { 
    if ((originalOptions.type === 'post' || options.type === 'post') && options.contentType === "application/x-www-form-urlencoded; charset=UTF-8") {              
      options.data = $.param( ( sanitize(originalOptions.data) ));      
    } 
  });
  
});
