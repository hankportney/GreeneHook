/*  LOAD MENU CSV
 *  Loads in each section of the menu into the appropriate locations.
 *  Each load is queued below:
 */

loadMenuSection("menu/appetizers.csv",      "appetizers"    );
loadMenuSection("menu/mains.csv",           "mains"         );
loadMenuSection("menu/burgers&tacos.csv",   "burgers&tacos" );
loadMenuSection("menu/sandwiches.csv",      "sandwiches"    );
loadMenuSection("menu/brunch.csv",          "brunch"        );
loadMenuSection("menu/sides.csv",           "sides"         );
loadMenuSection("menu/dessert.csv",         "dessert"       );


// ====================================================================================== //
function splitCSVButIgnoreCommasInDoublequotes(str) {
    //split the str first  
    //then merge the elments between two double quotes  
    var delimiter = ',';
    var quotes = '"';
    var elements = str.split(delimiter);
    var newElements = [];
    for (var i = 0; i < elements.length; ++i) {  
        if (elements[i].indexOf(quotes) >= 0) {    //the left double quotes is found  
            var indexOfRightQuotes = -1;  
            var tmp = new String();
            tmp = elements[i];  
            //find the right double quotes  
            for (var j = i + 1; j < elements.length; ++j) {  
                if (elements[j].indexOf(quotes) >= 0) {  
                    indexOfRightQuotes = j; 
                    break;
                }  
            }
            //found the right double quotes  
            //merge all the elements between double quotes  
            if (-1 != indexOfRightQuotes) {
                for (var k = i + 1; k <= indexOfRightQuotes; ++k) {  
                    tmp = tmp + delimiter + '\xa0' + elements[k];  
                }  
                newElements.push(tmp);  
                i = indexOfRightQuotes;  
            }  else { //right double quotes is not found  
                newElements.push(elements[i]);  
            }  
        } else {//no left double quotes is found  
            newElements.push(elements[i]);  
        }
    }
    return newElements;  
}
// ====================================================================================== //


// ====================================================================================== //
function loadMenuSection(fileName, pathName) {
    var txtFile = new XMLHttpRequest();
    txtFile.onload = function() {

        var allText = txtFile.responseText;
        var allTextLines = allText.split(/\r\n|\n/);
        
        var content = "";
        for(var i = 0; i < allTextLines.length; i++) {

            var lineWords = splitCSVButIgnoreCommasInDoublequotes(allTextLines[i]);

            var itemTitle = lineWords[0].toString();
            var itemDesc1 = lineWords[1].toString().replace(/['"]+/g, '');
            var itemDesc2 = lineWords[2].toString().replace(/['"]+/g, '');
            var itemPrice = lineWords[3].toString();

            var autofillDiv = document.getElementsByClassName("cardGrid "+pathName)[0];

            content += ('<div class="itemCard">');
            content += ('<span class="title">'+itemTitle+'</span><pre class="price">    |    $'+itemPrice+'</pre><br>');
            content+=('<div class="subtext">')
            if (itemDesc1 != "" && itemDesc2 == "") { // if we have desc 1 but not desc 2:
                content+='<span class="text1">'+itemDesc1+'</span>';
            } else {
                content+='<span class="text1">'+itemDesc1+'</span>';
                content+='<div class="text2">'+itemDesc2+'</div>';
            }
            content += ('</div>');
            content += ('</div>');
            if ((i+1)%2 == 0) {
                content += ('</div>');
                autofillDiv.innerHTML += content;
                content = "";
            }
        }
    }


    txtFile.open("get", fileName, true);
    txtFile.send();
}
// ====================================================================================== //


