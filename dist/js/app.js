var htmlTag    = document.documentElement;
var toggles    = document.querySelector('.toggles');
var calculator = document.querySelector('form#calculator');

if (toggles) {
    /**
     * Sets light mode/dark mode initially
     */
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlTag.classList.add('dark');
        toggles.querySelector('.toggle-mode.dark-mode').classList.add('hidden');
        toggles.querySelector('.toggle-mode.light-mode').classList.remove('hidden');

        localStorage.setItem("theme", "dark");
    } else {
        htmlTag.classList.remove('dark');
        toggles.querySelector('.toggle-mode.dark-mode').classList.remove('hidden');
        toggles.querySelector('.toggle-mode.light-mode').classList.add('hidden');

        localStorage.setItem("theme", "light");
    }

    /**
     * Toggles light mode/dark mode
     */
    toggles.querySelectorAll('.toggle-mode').forEach(function (toggleMode) {
        toggleMode.addEventListener('click', function () {
            if (this.classList.contains('light-mode')) {
                htmlTag.classList.remove('dark');
                toggles.querySelector('.toggle-mode.dark-mode').classList.remove('hidden');
                toggles.querySelector('.toggle-mode.light-mode').classList.add('hidden');

                localStorage.setItem("theme", "light");
            } else {
                htmlTag.classList.add('dark');
                toggles.querySelector('.toggle-mode.dark-mode').classList.add('hidden');
                toggles.querySelector('.toggle-mode.light-mode').classList.remove('hidden');

                localStorage.setItem("theme", "dark");
            }
        });
    });
}

if (calculator) {
    // Men	 BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    var activityMethodBtns       = calculator.querySelectorAll('input[name="activity-level-method"]');
    var activityLevelPanel       = calculator.querySelector('.activity-level-panel');
    var activityLevelTitle       = calculator.querySelector('.activity-level-title');
    var activityLevelLabels      = calculator.querySelectorAll('.activity-level-label');
    var calculatorPaginationBtns = calculator.querySelectorAll('button.next, button.back');
    var calculatorPanels         = Array.prototype.slice.call(calculator.querySelectorAll('fieldset'));
    var calculatorHeightUnit     = calculator.querySelector('select[name="height-unit"]');
    var calculatorHeightInputs   = Array.prototype.slice.call(calculator.querySelectorAll('#height-input-ft-inches, #height-input'));
    var calculatorWeightUnit     = calculator.querySelector('select[name="weight-unit"]');
    var calculatorWeightInputs   = Array.prototype.slice.call(calculator.querySelectorAll('#weight-input-st-lbs, #weight-input'));
    var calorieResultsGoal       = calculator.querySelector('fieldset:last-child h3 .goal');
    var calorieResultsRange      = calculator.querySelector('#calorie-range strong');
    var calorieResultsBmr        = calculator.querySelector('fieldset:last-child .bmr-results');
    var calorieResultsTdee       = calculator.querySelector('fieldset:last-child .tdee-results');
    var bmrTdeeOpen              = calculator.querySelector('#bmr-tdee-open');
    var bmrTdeePanel             = calculator.querySelector('#bmr-tdee-panel');
    var bmrTdeeClose             = calculator.querySelector('#bmr-tdee-close');

    function checkInput(event) {
        if (
            event.which === 187 ||
            event.which === 189 ||
            event.which === 69 ||
            event.which === 190
        ) {
            event.preventDefault();
        }
    }

    function removeExistingErrorsIfAny() {
        let existingErrors = Array.prototype.slice.call(calculator.querySelectorAll('.error-message'));

        if (existingErrors.length > 0) {
            existingErrors.map(function(errorMessage){
                return errorMessage.remove();
            });
        }
    }

    function checkFailableFields(calculator, heightUnit, weightUnit) {
        let errors         = false;
        let age            = calculator.querySelector('input[name="age"]');
        let heightFt       = calculator.querySelector('input[name="height-ft"]');
        let heightIn       = calculator.querySelector('input[name="height-in"]');
        let height         = calculator.querySelector('input[name="height"]');
        let weightSt       = calculator.querySelector('input[name="weight-st"]');
        let weightLbs      = calculator.querySelector('input[name="weight-lbs"]');
        let weight         = calculator.querySelector('input[name="weight"]');

        removeExistingErrorsIfAny();

        if (
            age.value === '' ||
            parseFloat(age.value) === 0
        ) {
            errors = true;

            age.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">Age is blank</div>'
            );
        }

        if (
            ( parseFloat(age.value) > 0 && parseFloat(age.value) < 18 ) ||
            parseFloat(age.value) >= 65
        ) {
            errors = true;

            age.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">This calculator is recommended for people over 18 and under 65.</div>'
            );
        }

        if (heightUnit === 'ft-in') {
            if (
                heightFt.value === '' ||
                parseFloat(heightFt.value) === 0
            ) {
                errors = true;

                heightFt.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Height (ft) is blank</div>'
                );
            }

            if (heightIn.value === '') {
                errors = true;

                heightIn.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Height (in) is blank</div>'
                );
            }
        } else {
            if (
                height.value === '' ||
                parseFloat(height.value) === 0
            ) {
                errors = true;

                height.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Height (' + heightUnit + ') is blank</div>'
                );
            }
        }

        if (weightUnit === 'st-lbs') {
            if (
                weightSt.value === '' ||
                parseFloat(weightSt.value) === 0
            ) {
                errors = true;

                weightSt.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Weight (st) is blank</div>'
                );
            }

            if (weightLbs.value === '') {
                errors = true;

                weightLbs.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Weight (lbs) is blank</div>'
                );
            }
        } else {
            if (
                weight.value === '' ||
                parseFloat(weight.value) === 0
            ) {
                errors = true;

                weight.insertAdjacentHTML(
                    'afterend',
                    '<div class="error-message">Weight (' + weightUnit + ') is blank</div>'
                );
            }
        }

        if (errors) {
            calculator.querySelector('fieldset#step-2').style.display = 'block';
            return false;
        } else {
            return true;
        }
    }

    calculatorHeightUnit.addEventListener('change', function () {
        removeExistingErrorsIfAny();

        calculatorHeightInputs.map(function (heightInput) {
            return heightInput.classList.add('!hidden');
        });

        if (this.value === 'ft-in') {
            calculator.querySelector('#height-input-ft-inches').classList.remove('!hidden');
        } else {
            let stdHeightWrapper = calculator.querySelector('#height-input');
            stdHeightWrapper.querySelector('input[name="height"]').value = '';
            stdHeightWrapper.classList.remove('!hidden');
        }
    });

    calculatorWeightUnit.addEventListener('change', function () {
        removeExistingErrorsIfAny();

        calculatorWeightInputs.map(function (weightInput) {
            return weightInput.classList.add('!hidden');
        });

        if (this.value === 'st-lbs') {
            calculator.querySelector('#weight-input-st-lbs').classList.remove('!hidden');
        } else {
            let stdWeightWrapper = calculator.querySelector('#weight-input');
            stdWeightWrapper.querySelector('input[name="weight"]').value = '';
            stdWeightWrapper.classList.remove('!hidden');
        }
    });

    activityMethodBtns.forEach(function (activityMethodBtn) {
        activityMethodBtn.addEventListener('change', function (e) {
            e.preventDefault();

            if (activityLevelPanel.style.display === 'none') {
                activityLevelPanel.style.display = 'block';
            }

            activityLevelLabels.forEach(function (activityLevelLabel) {
                let selectedMethodTitle = activityLevelTitle.dataset[activityMethodBtn.value];
                let selectedMethodContent = JSON.parse(activityLevelLabel.dataset[activityMethodBtn.value]);

                activityLevelTitle.innerHTML = selectedMethodTitle;
                activityLevelLabel.querySelector('span').innerHTML = selectedMethodContent.title;
                activityLevelLabel.querySelector('small').innerHTML = selectedMethodContent.text;
            });
        });
    });

    calculator.addEventListener('submit', function (e) {
        e.preventDefault();

        let goal          = this.querySelector('input[name="goal"]:checked');
        let gender        = this.querySelector('input[name="gender"]:checked');
        let activityLevel = this.querySelector('input[name="activity-level"]:checked');
        let heightUnit    = this.querySelector('select[name="height-unit"]').value;
        let weightUnit    = this.querySelector('select[name="weight-unit"]').value;
        let age           = calculator.querySelector('input[name="age"]').value;
        let heightFt      = calculator.querySelector('input[name="height-ft"]').value;
        let heightIn      = calculator.querySelector('input[name="height-in"]').value;
        let height        = calculator.querySelector('input[name="height"]').value;
        let weightSt      = calculator.querySelector('input[name="weight-st"]').value;
        let weightLbs     = calculator.querySelector('input[name="weight-lbs"]').value;
        let weight        = calculator.querySelector('input[name="weight"]').value;

        if (! checkFailableFields(calculator, heightUnit, weightUnit) ) {
            calculator.querySelector('fieldset#step-3').style.display = 'none';
            return;
        }

        switch (heightUnit) {
            case 'ft-in':
                height = (parseFloat(heightFt) * 12) + parseFloat(heightIn); // Convert to inches.
                height = Math.floor((parseFloat(height) * 2.54)); // Convert to CM.
                break;
            case 'in':
                height = Math.floor((parseFloat(height) * 2.54)); // Convert to CM.
                break;
        }

        switch (weightUnit) {
            case 'st-lbs':
                weight = (parseFloat(weightSt) * 14) + parseFloat(weightLbs); // Convert to lbs.
                weight = Math.floor((parseFloat(weight) / 2.205)); // Convert to kg.
                break;
            case 'lbs':
                weight = Math.floor((parseFloat(weight) / 2.205)); // Convert to kg.
                break;
        }

        let bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age));
        bmr     = (gender === 'female' ? bmr - 161 : bmr + 5);

        let tdee           = Math.round(bmr * parseFloat(activityLevel.value));
        let targetCalories = Math.round(tdee * parseFloat(goal.value));

        calorieResultsGoal.innerHTML  = goal.title.toLowerCase();
        calorieResultsRange.innerHTML = (targetCalories - 100) + ' - ' + (targetCalories + 100);

        calorieResultsBmr.innerHTML  = bmr;
        calorieResultsTdee.innerHTML = tdee;

        calculatorPanels.map(function (panel) {
            return panel.style.display = 'none';
        });

        calculator.querySelector('fieldset:last-child').style.display = 'block';
        calculator.firstElementChild.scrollIntoView();
    });

    calculatorPaginationBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var closestPanel = this.closest('fieldset');

            calculatorPanels.map(function (panel) {
                return panel.style.display = 'none';
            });

            if (btn.classList.contains('next')) {

                if (btn.classList.contains('check-fields')) {
                    if (checkFailableFields(
                        calculator,
                        calculator.querySelector('select[name="height-unit"]').value,
                        calculator.querySelector('select[name="weight-unit"]').value
                    )) {
                        closestPanel.nextElementSibling.style.display = 'block';
                    }
                } else {
                    closestPanel.nextElementSibling.style.display = 'block';
                }

            } else {
                closestPanel.previousElementSibling.style.display = 'block';
            }

            calculator.firstElementChild.scrollIntoView();
        });
    });

    bmrTdeeOpen.addEventListener('click', function(e){
        e.preventDefault();

        bmrTdeePanel.style.display = 'block';
    });

    bmrTdeeClose.addEventListener('click', function(e){
        e.preventDefault();

        bmrTdeePanel.style.display = 'none';
    });
}