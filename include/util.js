/**
 * util.js stores utility JavaScript functions
 *
 * This file stores utility functions processing JS files
 *
 * Version 0.3 adds Form Validation capability
 * 
 * @package WEB150
 * @author Bill Newman <williamnewman@gmail.com>
 * @version 0.3 2010/05/20
 * @link http://www.billnsara.com/js/ 
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License ("OSL") v. 3.0
 * @todo none
 */
 
var viewRenderedSource = true; //set to JS true or false to trigger viewRender() function and add button to bottom of page - leave false for normal
var errorHandling = "alert";   //set to alert, none or default to trigger window.onerror function for troubleshooting errors
//end config area---------------------------------------------------------

if(viewRenderedSource)
{//if viewRenderedSource var is true (above) we'll initialize initRendered() which will add a button to view rendered source
	addOnload(initRendered);
}

/**
 * initRendered() adds a button at bottom of page if viewRenderedSource global var is true
 * A button is loaded at the bottom of the body tag which when clicked 
 * triggers the viewRendered() function and shows the currently rendered source
 * 
 * @param none
 * @return none
 * @todo none
 */
function initRendered()
{
	theBody = document.getElementsByTagName("body")[0]; //there can only be one body, hence the zero!
	mySpan = document.createElement("span");  //a nameless innocent span
	//our span is loaded via the shady non-standard innerHTML
	mySpan.innerHTML = '<div align="center"><input type="button" value="View Rendered Source!" onclick="viewRendered();"></div>';
	theBody.appendChild(mySpan); //span is appended to the ended of the body tags 'kids'
}//end initRendered()

 
/**
 * window.onerror is assigned an anonymous function for error handling
 *
 * global var named 'errorHandling' declared at top of file
 *
 * Set var named 'errorHandling' to "default" to bypass custom error handling
 *
 * Set var named 'errorHandling' to "alert" pop alerts for errors in FF/IE
 *
 * Set var named 'errorHandling' to "hide" to suppress errors in FF/IE
 *
 * window.onerror not supported by Opera, Chrome or Safari currently
 *
 * Test in FF/IE first to increase chances of error free code
 * 
 * 
 * @param string myfunc reference to name of initialization function to add to window.onload
 * @return void
 * @todo none
 */
window.onerror = function (err, file, line) {
	//can be set to alert,hide or default (empty string)
	//global var errorHandling declared at top of file to allow easy chang 
	
	switch(errorHandling.toLowerCase())
	{
		case "alert":
			alert('JavaScript Error: ' + err + '\n' +
			'In file: ' + file + '\n' +
			'At line: ' + line);
			return true;
			break;
		case "hide":
			return true;
			break;		
		default:
			return false; //default handler
	}
}//end window.onerror 
 
 
/**
 * addOnload() allows safe & convenient way to add multiple JS functions to window.onload
 *
 * Many JS scripts hijack the window.onload function, which is not additive.
 *
 * Therefore many scripts over-write each other, and only one script gets loaded.
 *
 * This solution presents a browser neutral version that will add scripts to 
 * window.onload, and also will not interfere with more primitive hijacks.
 * 
 * @author Marcello Calbucci
 * @link http://haacked.com/archive/2006/04/06/StopTheWindow.OnloadMadness.aspx
 *
 * <code>
 * addOnload(init);
 * </code>
 *
 * IMPORTANT - there are no quotes around the name of the example function (init) above!
 * 
 * @param string myfunc reference to name of initialization function to add to window.onload
 * @return void
 * @todo none
 */
function addOnload(myfunc)
{//addOnload allows us to attach multiple functions to the page load event
	if(window.addEventListener){
		window.addEventListener('load', myfunc, false);
	}else if(window.attachEvent){
		window.attachEvent('onload', myfunc);
	}
}//end addOnload()

/**
 * checkBrowser() quickly identifies a browser for special handling
 *
 * To use this, it helps to be familiar with strings found in the userAgent 
 * property of the navigator object, for example:
 *
 * Firefox = 'firefox'
 * InternetExplorer = 'msie'
 * Chrome = 'chrome'
 * Opera = 'opera'
 *
 * Once we determine a string that identifies our browser, we can use it thus:
 *
 * <code>
 * isIE = checkBrowser('msie');
 * </code>
 *
 * This returns a true or false which can be used to fork code
 * 
 * @param string singular identifying string from navigator.userAgent
 * @return bool indicates whether browser matches string provided
 * @todo none
 */
function checkBrowser(str)
{//quickly separate a browser from the herd with an identifying userAgent string
	foundBrowser = false;
	if(navigator.userAgent.toLowerCase().indexOf(str)!=-1){foundBrowser = true;}
	return foundBrowser;
}//end checkBrowser()


/**
 * viewRendered() grabs the body tag via the BOM and prepares to display current contents - 
 * which the page source as floating in memory (rendered source)
 *
 * This function is triggered by another function, initRendered(), which 
 * uses the DOM to load a button at the bottom of the body tag which when clicked 
 * triggers the viewRendered() function below and shows the currently rendered source
 * 
 * @param none
 * @return none
 * @todo none
 */
var rendered = ""; //must exist outside function. stores rendered source
function viewRendered()
{
	rendered = document.body.innerHTML.replace(/</g,'&lt;').replace(/\n/g,'<br>'); 
	sumColors = "80B0D5,D6C281,97CFFC,D6B581,FCD697,B0B0B0,A2DEA8,E0AFCE,C8ED93,EDEDED,94EECE,ED875F,A3A9D4";
	aColors = sumColors.split(",");
	
	var offset = Math.round(Math.random()*aColors.length);//randomize background color  
    var color = aColors[offset];
	
	myDate = new Date();  //date stuff helps us see when last rendered snapshot taken
	myMinutes = myDate.getMinutes();
	mySeconds = myDate.getSeconds();
	myHours = myDate.getHours();

	if(myHours < 10){myHours = "0" + myHours.toString();}
	if(myMinutes < 10){myMinutes = "0" + myMinutes.toString();}
	if(mySeconds < 10){mySeconds = "0" + mySeconds.toString();}
	
	myTime = myHours + ":" + myMinutes + ":" + mySeconds;
	begDiv = '<div style="font-family:Verdana, Arial, Helvetica, sans-serif;">';
	rendered = '<h4 align="center">Source Rendered: <font color="red">' + myTime + '</font></h4>' + begDiv + rendered + '</div>';
	rendered += '<div align="center"><input type="button" style="font-family:Verdana, Arial, Helvetica, sans-serif;" onclick="self.close();" value="Close"></div>';
	try
	{//does window already exist?
		myWindow.document.write(rendered);
		myWindow.document.bgColor="#" + color;
		myWindow.focus();
		myWindow.document.close();	
	}catch(ex)
	{//no window, IE misbehaviors, etc.
		w = screen.availWidth;//determine canvas
		h = screen.availHeight;
		var popW = 1500, popH = 150;  //wide & short window
		var leftPos = (w-popW)/2;
		var topPos = (h-popH)/2;
		topPos *= 1.8;  //adjust down the screen a bit:
		topPos = Math.round(topPos);
	
		myWindow = window.open("", "theWindow", 'width=' + popW + ',height=' + popH + ',top=' + topPos + ',left=' + leftPos + ',scrollbars=yes,resize=yes');
		myWindow.document.write(rendered);
		myWindow.document.bgColor="#" + color;
		myWindow.focus();
		myWindow.document.close();
	}

}//end viewRendered()

/**
 * empty() checks a set of radio buttons, checkboxes, a select or text type form elements for required selection
 *
 * Requires some sort of data entry (any string data, any type) of  
 * input type=text, password or textarea objects.  
 *
 * <code>
 * if(!required(thisForm.myName,"Please Enter Name.")){return false;}
 * </code>
 *
 * While building select elements, The first option of the select must not be a valid option. 
 * View the code sample below to see how the first option is not valid option.
 *
 * <code>
 * <select name="State">
 *   <option value="">Please pick a state</option>
 *   <option value="CA">California</option>
 *   <option value="OR">Oregon</option>
 *   <option value="WA">Washington</option>
 * </select>
 * </code>
 * 
 * @param object $fObj radio button set, checkboxes, select or text type form object
 * @param string $msg feedback to user, based on data required of form element
 * @return true If true, continue to check other items.  If false, do not continue
 * @todo none
 */ 
function empty(fObj,msg)
{//will accept form elements and check for input

	//radio buttons & checkboxes are arrays - their type must be determined by a single element
	if (fObj.length != undefined)
	{//if length is defined, more than one element. Treat as an array
		testType = fObj[0].type;
		isArray = true;
	}else{//if undefined, only one element
	    testType = fObj.type;
	    isArray = false;
	}

	switch(testType)
	{//once the form object type is determined, we can treat elements separately 
		
	    //handle radio & checkbox elements
		case "radio":
		case "checkbox":
			if (isArray)
			{//if length is defined, more than one element. Treat as an array
			    for(x=0; x<fObj.length;x++)
				{
					if(fObj[x].checked){return false;}
				}
			}else{//if undefined, only one element
			    if (fObj.checked){return false;}
			}
			
			alert(msg);
			//focus only works cross browser on first element of array of named elements
			if(isArray){fObj[0].focus();}
			return true;
			break;

		//handle select elements		
		case "select":
			if(fObj.options[0].selected)
			{
				alert(msg);
				fObj.options[0].focus();
				return true;
			}else{
				return false;	
			}
			break;
		
		//handle text, textarea & password elements here
		default:
	       if(fObj.value == "")
		   {
			   alert(msg);
			   fObj.focus();
			   return true;
		   }else{
			   return false;
		   }
	}//end switch
	
}//end empty()
 
/**
 * isEmail() uses a regular expression to require a valid email
 *
 * <code>
 * if(!isEmail(thisForm.Email,"Please enter a valid Email Address")){return false;}
 * </code>
 * 
 * @param object $fObj input type="text" requiring an email
 * @return true If true, continue to check other items.  If false, do not continue
 * @see isAlpha()
 * @todo none
 */
function isEmail(fObj,msg)
{//Uses regular expression for email check
	var rePattern = /^([a-zA-Z0-9]+([\.+_-][a-zA-Z0-9]+)*)@(([a-zA-Z0-9]+((\.|[-]{1,2})[a-zA-Z0-9]+)*)\.[a-zA-Z]{2,6})$/;
	if(rePattern.test(fObj.value))
	{
		return true;
	}else{
		alert(msg);
		fObj.value = "";
		fObj.focus();
		return false;
	}
}//end isEmail()

/**
 * isAlpha() uses a regular expression to require alphabetic data
 *
 * Requires alphabetic or numerical data for each character.  Will not 
 * accept a space, or any other special character. Good for passwords.
 *
 * <code>
 * if(!isAlpha(thisForm.Password,"Only alphabetic characters are allowed for passwords.")){return false;}
 * </code>
 * 
 * @param object $fObj input type="text" requiring alphabetic data
 * @return true If true, continue to check other items.  If false, do not continue
 * @see isAlphanumeric()
 * @see correctLength() 
 * @todo none
 */
function isAlpha(fObj,msg)
{//Uses regular expression for email check
	var rePattern = /^[a-zA-Z]+$/;
	if(rePattern.test(fObj.value))
	{
		return true;
	}else{
		alert(msg);
		fObj.value = "";
		fObj.focus();
		return false;
	}
}//end is Alpha()

/**
 * isAlphanumeric() uses a regular expression to require alphanumeric data
 *
 * Requires alphabetic or numerical data for each character.  Will not 
 * accept a space, or any other special character. Good for passwords.
 *
 * <code>
 * if(!isAlphanumeric(thisForm.Password,"Only alphanumeric characters are allowed for passwords.")){return false;}
 * </code>
 * 
 * @param object $fObj input type="text" requiring alphanumeric data
 * @return true If true, continue to check other items.  If false, do not continue
 * @see isAlpha()
 * @see correctLength() 
 * @todo none
 */
function isAlphanumeric(fObj,msg)
{//Uses regular expression for alphabetic check
	var rePattern = /^[a-zA-Z0-9]+$/;
	if(rePattern.test(fObj.value))
	{
		return true;
	}else{
		alert(msg);
		fObj.value = "";
		fObj.focus();
		return false;
	}
}//end isAlphanumeric()

/**
 * correctLength() ensures minimum & maximum length for text
 *
 * Requires minimum and maximum data entry (any string data, any type) of  
 * input type=text, password or textarea objects.
 *
 * <code>
 * if(!correctLength(thisForm.Password,6,20,"Password does not meet the following requirements:")){return false;}
 * </code>
 * 
 * @param object $fObj input type="text" requiring alphanumeric data
 * @return true If true, continue to check other items.  If false, do not continue
 * @see isAlpha()
 * @see isAlphanumeric() 
 * @todo none
 */
function correctLength(fObj,min,max,msg)
{//Uses regular expression for email check
	var rePattern = /^[a-zA-Z]+$/;
	if((fObj.value.length >= min) && (fObj.value.length <= max ))
	{
		return true;
	}else{
		alert(msg + "\n Minimum characters: " + min + " Maximum characters: " + max);
		fObj.value = "";
		fObj.focus();
		return false;
	}
}//end correctLength()
