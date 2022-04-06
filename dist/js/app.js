var htmlTag=document.documentElement,toggles=document.querySelector(".toggles"),calculator=document.querySelector("form#calculator");if(toggles&&("dark"===localStorage.theme||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?(htmlTag.classList.add("dark"),toggles.querySelector(".toggle-mode.dark-mode").classList.add("hidden"),toggles.querySelector(".toggle-mode.light-mode").classList.remove("hidden"),localStorage.setItem("theme","dark")):(htmlTag.classList.remove("dark"),toggles.querySelector(".toggle-mode.dark-mode").classList.remove("hidden"),toggles.querySelector(".toggle-mode.light-mode").classList.add("hidden"),localStorage.setItem("theme","light")),toggles.querySelectorAll(".toggle-mode").forEach(function(e){e.addEventListener("click",function(){this.classList.contains("light-mode")?(htmlTag.classList.remove("dark"),toggles.querySelector(".toggle-mode.dark-mode").classList.remove("hidden"),toggles.querySelector(".toggle-mode.light-mode").classList.add("hidden"),localStorage.setItem("theme","light")):(htmlTag.classList.add("dark"),toggles.querySelector(".toggle-mode.dark-mode").classList.add("hidden"),toggles.querySelector(".toggle-mode.light-mode").classList.remove("hidden"),localStorage.setItem("theme","dark"))})})),calculator){var activityMethodBtns=calculator.querySelectorAll('input[name="activity-level-method"]'),activityLevelPanel=calculator.querySelector(".activity-level-panel"),activityLevelTitle=calculator.querySelector(".activity-level-title"),activityLevelLabels=calculator.querySelectorAll(".activity-level-label"),calculatorPaginationBtns=calculator.querySelectorAll("button.next, button.back"),calculatorPanels=Array.prototype.slice.call(calculator.querySelectorAll("fieldset")),calculatorHeightUnit=calculator.querySelector('select[name="height-unit"]'),calculatorHeightInputs=Array.prototype.slice.call(calculator.querySelectorAll("#height-input-ft-inches, #height-input")),calculatorWeightUnit=calculator.querySelector('select[name="weight-unit"]'),calculatorWeightInputs=Array.prototype.slice.call(calculator.querySelectorAll("#weight-input-st-lbs, #weight-input")),calorieResultsGoal=calculator.querySelector("fieldset:last-child h3 .goal"),calorieResultsRange=calculator.querySelector("#calorie-range strong"),calorieResultsBmr=calculator.querySelector("fieldset:last-child .bmr-results"),calorieResultsTdee=calculator.querySelector("fieldset:last-child .tdee-results"),bmrTdeeOpen=calculator.querySelector("#bmr-tdee-open"),bmrTdeePanel=calculator.querySelector("#bmr-tdee-panel"),bmrTdeeClose=calculator.querySelector("#bmr-tdee-close");function checkInput(e){187!==e.which&&189!==e.which&&69!==e.which&&190!==e.which||e.preventDefault()}function removeExistingErrorsIfAny(){let e=Array.prototype.slice.call(calculator.querySelectorAll(".error-message"));e.length>0&&e.map(function(e){return e.remove()})}function checkFailableFields(e,t,l){let a=!1,r=e.querySelector('input[name="age"]'),c=e.querySelector('input[name="height-ft"]'),i=e.querySelector('input[name="height-in"]'),o=e.querySelector('input[name="height"]'),s=e.querySelector('input[name="weight-st"]'),n=e.querySelector('input[name="weight-lbs"]'),u=e.querySelector('input[name="weight"]');return removeExistingErrorsIfAny(),""!==r.value&&0!==parseFloat(r.value)||(a=!0,r.insertAdjacentHTML("afterend",'<div class="error-message">Age is blank</div>')),(parseFloat(r.value)>0&&parseFloat(r.value)<18||parseFloat(r.value)>=65)&&(a=!0,r.insertAdjacentHTML("afterend",'<div class="error-message">This calculator is recommended for people over 18 and under 65.</div>')),"ft-in"===t?(""!==c.value&&0!==parseFloat(c.value)||(a=!0,c.insertAdjacentHTML("afterend",'<div class="error-message">Height (ft) is blank</div>')),""===i.value&&(a=!0,i.insertAdjacentHTML("afterend",'<div class="error-message">Height (in) is blank</div>'))):""!==o.value&&0!==parseFloat(o.value)||(a=!0,o.insertAdjacentHTML("afterend",'<div class="error-message">Height ('+t+") is blank</div>")),"st-lbs"===l?(""!==s.value&&0!==parseFloat(s.value)||(a=!0,s.insertAdjacentHTML("afterend",'<div class="error-message">Weight (st) is blank</div>')),""===n.value&&(a=!0,n.insertAdjacentHTML("afterend",'<div class="error-message">Weight (lbs) is blank</div>'))):""!==u.value&&0!==parseFloat(u.value)||(a=!0,u.insertAdjacentHTML("afterend",'<div class="error-message">Weight ('+l+") is blank</div>")),!a||(e.querySelector("fieldset#step-2").style.display="block",!1)}calculatorHeightUnit.addEventListener("change",function(){if(removeExistingErrorsIfAny(),calculatorHeightInputs.map(function(e){return e.classList.add("!hidden")}),"ft-in"===this.value)calculator.querySelector("#height-input-ft-inches").classList.remove("!hidden");else{let e=calculator.querySelector("#height-input");e.querySelector('input[name="height"]').value="",e.classList.remove("!hidden")}}),calculatorWeightUnit.addEventListener("change",function(){if(removeExistingErrorsIfAny(),calculatorWeightInputs.map(function(e){return e.classList.add("!hidden")}),"st-lbs"===this.value)calculator.querySelector("#weight-input-st-lbs").classList.remove("!hidden");else{let e=calculator.querySelector("#weight-input");e.querySelector('input[name="weight"]').value="",e.classList.remove("!hidden")}}),activityMethodBtns.forEach(function(e){e.addEventListener("change",function(t){t.preventDefault(),"none"===activityLevelPanel.style.display&&(activityLevelPanel.style.display="block"),activityLevelLabels.forEach(function(t){let l=activityLevelTitle.dataset[e.value],a=JSON.parse(t.dataset[e.value]);activityLevelTitle.innerHTML=l,t.querySelector("span").innerHTML=a.title,t.querySelector("small").innerHTML=a.text})})}),calculator.addEventListener("submit",function(e){e.preventDefault();let t=this.querySelector('input[name="goal"]:checked'),l=this.querySelector('input[name="gender"]:checked'),a=this.querySelector('input[name="activity-level"]:checked'),r=this.querySelector('select[name="height-unit"]').value,c=this.querySelector('select[name="weight-unit"]').value,i=calculator.querySelector('input[name="age"]').value,o=calculator.querySelector('input[name="height-ft"]').value,s=calculator.querySelector('input[name="height-in"]').value,n=calculator.querySelector('input[name="height"]').value,u=calculator.querySelector('input[name="weight-st"]').value,d=calculator.querySelector('input[name="weight-lbs"]').value,h=calculator.querySelector('input[name="weight"]').value;if(!checkFailableFields(calculator,r,c))return void(calculator.querySelector("fieldset#step-3").style.display="none");switch(r){case"ft-in":n=12*parseFloat(o)+parseFloat(s),n=Math.floor(2.54*parseFloat(n));break;case"in":n=Math.floor(2.54*parseFloat(n))}switch(c){case"st-lbs":h=14*parseFloat(u)+parseFloat(d),h=Math.floor(parseFloat(h)/2.205);break;case"lbs":h=Math.floor(parseFloat(h)/2.205)}let g=Math.round(10*h+6.25*n-5*i);g="female"===l?g-161:g+5;let m=Math.round(g*parseFloat(a.value)),v=Math.round(m*parseFloat(t.value));calorieResultsGoal.innerHTML=t.title.toLowerCase(),calorieResultsRange.innerHTML=v-100+" - "+(v+100),calorieResultsBmr.innerHTML=g,calorieResultsTdee.innerHTML=m,calculatorPanels.map(function(e){return e.style.display="none"}),calculator.querySelector("fieldset:last-child").style.display="block",calculator.firstElementChild.scrollIntoView()}),calculatorPaginationBtns.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault();var l=this.closest("fieldset");calculatorPanels.map(function(e){return e.style.display="none"}),e.classList.contains("next")?e.classList.contains("check-fields")?checkFailableFields(calculator,calculator.querySelector('select[name="height-unit"]').value,calculator.querySelector('select[name="weight-unit"]').value)&&(l.nextElementSibling.style.display="block"):l.nextElementSibling.style.display="block":l.previousElementSibling.style.display="block",calculator.firstElementChild.scrollIntoView()})}),bmrTdeeOpen.addEventListener("click",function(e){e.preventDefault(),bmrTdeePanel.style.display="block"}),bmrTdeeClose.addEventListener("click",function(e){e.preventDefault(),bmrTdeePanel.style.display="none"})}