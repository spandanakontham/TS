// Data structure
const data = {
    "corporate-entity": ["P&G", "Unilever"],
    "regions": ["USA"],
    "brands": {
        "P&G": ["Gillette", "Pampers"],
        "Unilever": ["Dove", "Comfort"]
    },
    "brand-versions": ["V1", "V2", "V3"],
    "products": {
        "Gillette": ["Gillette X", "Gillette Y"],
        "Pampers": ["Pampers X", "Pampers Y"],
        "Dove": ["Dove X", "Dove Y"],
        "Comfort": ["Comfort X", "Comfort Y"]
    },
    "product-versions": ["V1", "V2", "V3"]
};

const propertyOptions = [
    "Top feature customers look for while buying product",
    "Top paintpoint solved by product in general",
    "Feature of company's product",
    "Benefit of company's product",
    "FeBe of company's product",
    "Ad reference",
    "Product Media"
];

const angleProperties = [
    "Feature focused",
    "Painpoint addressed",
    "Angle approach",
    "Angle tone",
    "Emotion/ Effect to evoke"
];

const scriptPropertyTypes = [
    "Hook", "Discredit", "Solution", "Results", "Social Proof", "CTA", "Outro"
];

const scriptPropertyTypeDetails = [
    "Time Stamp", "On-screen visual", "Voice over", "On-screen text"
];

const variantPropertyOptions = {
    "Region": ["North America", "Europe", "Asia", "Africa", "South America"],
    "Platform": ["Facebook", "Instagram", "YouTube", "TikTok", "Twitter"],
    "Language": ["English", "Spanish", "French", "German", "Chinese"],
    "Device Type": ["Mobile", "Desktop", "Tablet", "Smart TV"],
    "Season/Occasion": ["Spring", "Summer", "Fall", "Winter", "Holiday"]
};

function populateDropdown(id, options) {
    const select = document.getElementById(id);
    if (!select) {
        console.error(`Element with id "${id}" not found`);
        return;
    }
    
    // Clear existing options
    select.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Select ${id.replace('-', ' ')}`;
    select.appendChild(defaultOption);
    
    // Add provided options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    
    // Add "Add new version" option
    if (id === 'brand-version' || id === 'product-version') {
        const newVersionOption = document.createElement('option');
        newVersionOption.value = 'new';
        newVersionOption.textContent = 'Add new version';
        select.appendChild(newVersionOption);
    }
}

function createCheckboxes(container, options, label) {
    if (!container) {
        console.error('Container not found');
        return;
    }
    container.innerHTML = `<h5>${label}</h5>`;
    options.forEach(option => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'checkbox-container';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="${option}" name="${container.id}" value="${option}">
            <label for="${option}">${option}</label>
        `;
        container.appendChild(checkboxDiv);
    });
}

function createDropdown(container, options, label) {
    const select = document.createElement('select');
    select.innerHTML = `<option value="">Select ${label}</option>`;
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.appendChild(select);
    container.appendChild(labelElement);
}

function updatePropertyInputs() {
    const propertyInputsContainer = document.getElementById('property-inputs');
    propertyInputsContainer.innerHTML = '';

    const checkedProperties = document.querySelectorAll('#property-checkboxes input:checked');
    checkedProperties.forEach(checkbox => {
        const propertyBox = document.createElement('div');
        propertyBox.className = 'property-box';
        propertyBox.innerHTML = `<h3>${checkbox.value}</h3>`;
        addPropertyInput(checkbox.value, 1, propertyBox);
        propertyInputsContainer.appendChild(propertyBox);
    });
}

function addPropertyInput(property, count, container) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'property-input';
    inputDiv.innerHTML = `
        <div class="property-header">
            <h4>${property}</h4>
            <span class="add-more" data-property="${property}" data-count="${count}">Add more</span>
        </div>
        <div class="input-group">
            <input type="text" id="${property.replace(/\s+/g, '-').toLowerCase()}-${count}" name="${property}-${count}">
        </div>
    `;
    container.appendChild(inputDiv);

    inputDiv.querySelector('.add-more').addEventListener('click', (event) => {
        const newCount = parseInt(event.target.dataset.count) + 1;
        const newInputGroup = document.createElement('div');
        newInputGroup.className = 'input-group';
        newInputGroup.innerHTML = `
            <input type="text" id="${property.replace(/\s+/g, '-').toLowerCase()}-${newCount}" name="${property}-${newCount}">
        `;
        inputDiv.appendChild(newInputGroup);
        event.target.dataset.count = newCount;
    });
}

function generateAngles() {
    const angleElements = [
        "Feature focused",
        "Painpoint addressed",
        "Angle approach",
        "Angle tone",
        "Emotion/ Effect to evoke"
    ];

    const popupContent = `
        <div id="angle-popup">
            <h3>Select angle elements</h3>
            ${angleElements.map(element => `
                <div>
                    <input type="checkbox" id="${element.replace(/\s+/g, '-').toLowerCase()}" name="angle-element" value="${element}">
                    <label for="${element.replace(/\s+/g, '-').toLowerCase()}">${element}</label>
                </div>
            `).join('')}
            <button id="generate-angles-confirm">Generate</button>
        </div>
    `;

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-angles-confirm').on('click', function() {
        const selectedElements = $('input[name="angle-element"]:checked').map(function() {
            return this.value;
        }).get();

        console.log("Selected angle elements:", selectedElements);
        popup.dialog('close');
        generateAnglesContent(selectedElements);
        
        // Show the "Generate More" button after generating angles
        document.getElementById('generate-more-angles').style.display = 'inline-block';
    });
}

function generateAnglesContent(selectedElements) {
    const anglesContainer = document.getElementById('angles');
    const boxContent = anglesContainer.querySelector('.box-content');
    boxContent.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        addAngle(boxContent, i, selectedElements);
    }
}

function addAngle(container, number, selectedElements) {
    const angleDiv = document.createElement('div');
    angleDiv.className = 'angle';
    angleDiv.innerHTML = `
        <h3>Angle ${number} <i class="fas fa-chevron-down"></i></h3>
        <div class="angle-content" style="display: none;">
            ${selectedElements.map(element => `
                <div class="angle-element">
                    <h4>${element}</h4>
                    <textarea rows="3" placeholder="xyz"></textarea>
                </div>
            `).join('')}
            <button class="generate-scripts-btn">Generate Scripts</button>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(angleDiv);

    angleDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    angleDiv.querySelector('.generate-scripts-btn').addEventListener('click', function() {
        generateScriptsPopup(this.closest('.angle'));
    });

    // Add event listeners for new buttons
    angleDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(angleDiv));
    angleDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(angleDiv));
    angleDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(angleDiv));
}

function addNewAngle() {
    const anglesContainer = document.getElementById('angles');
    const boxContent = anglesContainer.querySelector('.box-content');
    const existingAngles = boxContent.querySelectorAll('.angle');
    const newAngleNumber = existingAngles.length + 1;

    // Get the selected elements from the first angle
    const firstAngle = boxContent.querySelector('.angle');
    const selectedElements = Array.from(firstAngle.querySelectorAll('.angle-element h4')).map(h4 => h4.textContent);

    addAngle(boxContent, newAngleNumber, selectedElements);
}

function generateScriptsPopup(angleDiv) {
    const scriptSections = [
        "Hook",
        "Discredit",
        "Solution",
        "Results",
        "Social Proof",
        "CTA",
        "Outro"
    ];

    const scriptElementDetails = [
        "Time Stamp",
        "On-screen visual",
        "Voice over",
        "On-screen text"
    ];

    const popupContent = `
        <div id="script-popup">
            <h3>Select script sections</h3>
            ${scriptSections.map(section => `
                <div>
                    <input type="checkbox" id="${section.toLowerCase()}" name="script-section" value="${section}">
                    <label for="${section.toLowerCase()}">${section}</label>
                </div>
            `).join('')}
            <h3>Select script element details</h3>
            ${scriptElementDetails.map(detail => `
                <div>
                    <input type="checkbox" id="${detail.replace(/\s+/g, '-').toLowerCase()}" name="script-detail" value="${detail}">
                    <label for="${detail.replace(/\s+/g, '-').toLowerCase()}">${detail}</label>
                </div>
            `).join('')}
            <button id="generate-scripts-confirm">Generate</button>
        </div>
    `;

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-scripts-confirm').on('click', function() {
        const selectedSections = $('input[name="script-section"]:checked').map(function() {
            return this.value;
        }).get();

        const selectedDetails = $('input[name="script-detail"]:checked').map(function() {
            return this.value;
        }).get();

        console.log("Selected script sections:", selectedSections);
        console.log("Selected script details:", selectedDetails);
        popup.dialog('close');
        generateScripts(angleDiv, selectedSections, selectedDetails);
    });
}

function generateScripts(angleDiv, selectedSections, selectedDetails) {
    const scriptsContainer = document.getElementById('scripts');
    const boxContent = scriptsContainer.querySelector('.box-content');
    const angleNumber = angleDiv.querySelector('h3').textContent.match(/\d+/)[0];
    
    // Update the Scripts box title
    scriptsContainer.querySelector('h2').textContent = `Scripts (for Angle ${angleNumber})`;
    
    // Generate new script subboxes without clearing existing ones
    const currentScriptCount = boxContent.querySelectorAll('.script').length;
    for (let i = 1; i <= 4; i++) {
        addScript(boxContent, currentScriptCount + i, selectedSections, selectedDetails);
    }

    // Add or update "Generate More" button
    let generateMoreBtn = document.getElementById('generate-more-scripts');
    if (!generateMoreBtn) {
        generateMoreBtn = document.createElement('button');
        generateMoreBtn.id = 'generate-more-scripts';
        generateMoreBtn.className = 'small-btn';
        generateMoreBtn.textContent = 'Generate More';
        scriptsContainer.querySelector('h2').appendChild(generateMoreBtn);
    }
    generateMoreBtn.addEventListener('click', () => generateScriptsPopup(angleDiv));

    // Update graph tree for the angle
    updateAngleGraphTree(angleDiv);
}

function addScript(container, number, selectedSections, selectedDetails) {
    const scriptDiv = document.createElement('div');
    scriptDiv.className = 'script';
    scriptDiv.innerHTML = `
        <h3>Script ${number} <i class="fas fa-chevron-down"></i></h3>
        <div class="script-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Section</th>
                        ${selectedDetails.map(detail => `<th>${detail}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${selectedSections.map(section => `
                        <tr>
                            <td>${section}</td>
                            ${selectedDetails.map(() => `<td>XYZ</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button class="generate-variants-btn">Generate Variants</button>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(scriptDiv);

    scriptDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    scriptDiv.querySelector('.generate-variants-btn').addEventListener('click', function() {
        generateVariantsPopup(this.closest('.script'));
    });

    // Add event listeners for new buttons
    scriptDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(scriptDiv));
    scriptDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(scriptDiv));
    scriptDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(scriptDiv));
    scriptDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(scriptDiv));

    // Add graph tree for the script
    const graphTree = document.createElement('div');
    graphTree.className = 'graph-tree';
    graphTree.textContent = '(0 variants)';
    scriptDiv.querySelector('.script-content').appendChild(graphTree);
}

function generateVariantsPopup(scriptDiv) {
    const variantProperties = {
        "Region": ["North America", "Europe", "Asia", "Africa", "South America"],
        "Platform": ["Facebook", "Instagram", "YouTube", "TikTok", "Twitter"],
        "Language": ["English", "Spanish", "French", "German", "Chinese"],
        "Device Type": ["Mobile", "Desktop", "Tablet", "Smart TV"],
        "Season/Occasion": ["Spring", "Summer", "Fall", "Winter", "Holiday"]
    };

    let popupContent = '<div id="variant-popup"><h3>Select variant properties</h3>';
    
    for (const [property, options] of Object.entries(variantProperties)) {
        popupContent += `
            <div>
                <label for="${property.toLowerCase()}">${property}</label>
                <select id="${property.toLowerCase()}" name="${property.toLowerCase()}">
                    <option value="">Select ${property}</option>
                    ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
            </div>
        `;
    }
    
    popupContent += '<button id="generate-variants-confirm">Generate</button></div>';

    const popup = $('<div>').html(popupContent).dialog({
        modal: true,
        width: 400,
        close: function() {
            $(this).dialog('destroy').remove();
        }
    });

    $('#generate-variants-confirm').on('click', function() {
        const selectedVariants = {};
        for (const property of Object.keys(variantProperties)) {
            selectedVariants[property] = $(`#${property.toLowerCase()}`).val();
        }
        console.log("Selected variants:", selectedVariants);
        popup.dialog('close');
        generateVariants(scriptDiv, selectedVariants);
    });
}

function generateVariants(scriptDiv, selectedVariants) {
    const variantsContainer = document.getElementById('variants');
    const boxContent = variantsContainer.querySelector('.box-content');
    const scriptNumber = scriptDiv.querySelector('h3').textContent.match(/\d+/)[0];
    
    // Update the Variants box title
    variantsContainer.querySelector('h2').textContent = `Variants (for Script ${scriptNumber})`;
    
    // Generate new variant subboxes without clearing existing ones
    const currentVariantCount = boxContent.querySelectorAll('.variant').length;
    for (let i = 1; i <= 4; i++) {
        addVariant(boxContent, currentVariantCount + i, selectedVariants);
    }

    // Add or update "Generate More" button
    let generateMoreBtn = document.getElementById('generate-more-variants');
    if (!generateMoreBtn) {
        generateMoreBtn = document.createElement('button');
        generateMoreBtn.id = 'generate-more-variants';
        generateMoreBtn.className = 'small-btn';
        generateMoreBtn.textContent = 'Generate More';
        variantsContainer.querySelector('h2').appendChild(generateMoreBtn);
    }
    generateMoreBtn.addEventListener('click', () => generateVariantsPopup(scriptDiv));

    // Update graph tree for the script
    updateScriptGraphTree(scriptDiv);
}

function addVariant(container, number, selectedVariants) {
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant';
    variantDiv.innerHTML = `
        <h3>Variant ${number} <i class="fas fa-chevron-down"></i></h3>
        <div class="variant-content" style="display: none;">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(selectedVariants).map(([property, value]) => `
                        <tr>
                            <td>${property}</td>
                            <td>${value || 'Not selected'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="subbox-buttons">
                <div class="left-buttons">
                    <button class="small-icon-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="small-icon-btn copy-btn"><i class="fas fa-copy"></i></button>
                    <button class="small-icon-btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="right-buttons">
                    <button class="small-icon-btn download-csv-btn"><i class="fas fa-file-csv"></i></button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(variantDiv);

    variantDiv.querySelector('h3').addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // Add event listeners for new buttons
    variantDiv.querySelector('.edit-btn').addEventListener('click', () => editSubbox(variantDiv));
    variantDiv.querySelector('.copy-btn').addEventListener('click', () => copySubbox(variantDiv));
    variantDiv.querySelector('.delete-btn').addEventListener('click', () => deleteSubbox(variantDiv));
    variantDiv.querySelector('.download-csv-btn').addEventListener('click', () => downloadCSV(variantDiv));
}

function editSubbox(subbox) {
    console.log('Edit subbox:', subbox);
    // Implement edit functionality
}

function copySubbox(subbox) {
    console.log('Copy subbox:', subbox);
    // Implement copy functionality
}

function deleteSubbox(subbox) {
    console.log('Delete subbox:', subbox);
    // Implement delete functionality
}

function downloadCSV(subbox) {
    console.log('Download CSV for subbox:', subbox);
    // Implement CSV download functionality
}

function setupEventListeners() {
    const corporateEntitySelect = document.getElementById('corporate-entity');
    const brandSelect = document.getElementById('brand');
    const productSelect = document.getElementById('product');

    if (corporateEntitySelect) {
        corporateEntitySelect.addEventListener('change', (e) => {
            const selectedEntity = e.target.value;
            populateDropdown('brand', data.brands[selectedEntity] || []);
            populateDropdown('brand-version', []);
            populateDropdown('product', []);
            populateDropdown('product-version', []);
        });
    }

    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            const selectedBrand = e.target.value;
            populateDropdown('brand-version', data["brand-versions"]);
            populateDropdown('product', data.products[selectedBrand] || []);
            populateDropdown('product-version', []);
        });
    }

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            populateDropdown('product-version', data["product-versions"]);
        });
    }

    const generateAnglesBtn = document.getElementById('generate-angles-btn');
    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }
}

function toggleBoxContent(box) {
    const content = box.querySelector('.box-content');
    const icon = box.querySelector('h2 i');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function setupBoxToggle() {
    // Remove this function or leave it empty, as we don't want the boxes to be collapsible anymore
}

function updateAngleContent() {
    const angles = document.querySelectorAll('.angle');
    angles.forEach(angle => {
        const header = angle.querySelector('h3');
        const content = angle.querySelector('.angle-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateScriptContent() {
    const scripts = document.querySelectorAll('.script');
    scripts.forEach(script => {
        const header = script.querySelector('h3');
        const content = script.querySelector('.script-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateVariantContent() {
    const variants = document.querySelectorAll('.variant');
    variants.forEach(variant => {
        const header = variant.querySelector('h3');
        const content = variant.querySelector('.variant-content');
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        header.appendChild(icon);
        
        header.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function setupAutocomplete(inputId, items) {
    const $input = $(`#${inputId}`);
    if (!$input.length) {
        console.error(`Input with id "${inputId}" not found`);
        return;
    }

    $input.autocomplete({
        source: function(request, response) {
            const matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(items, function(item) {
                return matcher.test(item);
            }));
        },
        minLength: 0,
        select: function(event, ui) {
            if (ui.item.value === "Add new...") {
                const newItem = prompt(`Enter new ${inputId}:`);
                if (newItem) {
                    items.push(newItem);
                    $(this).val(newItem);
                }
                return false;
            }
        }
    }).focus(function() {
        $(this).autocomplete("search", "");
    });

    // Add custom rendering only if the widget is successfully initialized
    if ($input.autocomplete("instance")) {
        $input.autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<div>" + item.label + "</div>")
                .appendTo(ul);
        };
    }

    // Add "Add new..." option if it doesn't exist
    if (!items.includes("Add new...")) {
        items.push("Add new...");
    }
}

function setupVersionInfo(buttonId, versionType) {
    $(`#${buttonId}-info`).click(function(e) {
        e.preventDefault();
        alert(`${versionType} Version Information:\n\nVersion information`);
    });
}

function initializeApp() {
    console.log("Initializing app...");

    setupAutocomplete('brand', data["corporate-entity"].flatMap(entity => data.brands[entity]));
    setupAutocomplete('product', Object.values(data.products).flat());

    // Populate brand version and product version dropdowns
    const versions = ['V1', 'V2', 'V3'];
    populateDropdown('brand-version', versions);
    populateDropdown('product-version', versions);

    $('#brand-version, #product-version').change(function() {
        if ($(this).val() === 'new') {
            const newVersion = prompt(`Enter new ${this.id.replace('-', ' ')}:`);
            if (newVersion) {
                $(this).append(`<option value="${newVersion}">${newVersion}</option>`);
                $(this).val(newVersion);
            } else {
                $(this).val('');
            }
        }
    });

    setupVersionInfo('brand-version', 'Brand');
    setupVersionInfo('product-version', 'Product');

    populateDropdown('corporate-entity', data["corporate-entity"]);
    populateDropdown('region', data.regions);
    
    // Add property input fields
    const propertyInputs = [
        'Top feature customers look for while buying product',
        'Top Feature of company\'s product',
        'Top Benefit of company\'s product',
        'Ad references',
        'Product Media'
    ];
    const propertyInputsContainer = document.getElementById('property-inputs');
    if (propertyInputsContainer) {
        propertyInputs.forEach(property => addPropertyInput(property, 1, propertyInputsContainer));

        // Add Additional Information field
        addPropertyInput('Additional Information', 1, propertyInputsContainer);
    } else {
        console.error("Property inputs container not found");
    }

    setupEventListeners();

    // Hide the "Generate More" button initially
    const generateMoreAnglesBtn = document.getElementById('generate-more-angles');
    if (generateMoreAnglesBtn) {
        generateMoreAnglesBtn.style.display = 'none';
        generateMoreAnglesBtn.addEventListener('click', addNewAngle);
    }

    // Setup event listeners for Cancel, Save, and Generate Angles buttons
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const generateAnglesBtn = document.getElementById('generate-angles-btn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', handleSave);
    }

    if (generateAnglesBtn) {
        generateAnglesBtn.addEventListener('click', generateAngles);
    }

    console.log("App initialization complete");
}


function handleCancel() {
    console.log("Cancel button clicked");
    // Add your cancel logic here
}

function handleSave() {
    console.log("Save button clicked");
    
    // Remove Cancel and Save buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Add Edit and Delete buttons
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.className = 'edit-btn small-btn';
    editBtn.addEventListener('click', handleEdit);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = 'delete-btn small-btn';
    deleteBtn.addEventListener('click', handleDelete);

    // Create a container for Edit and Delete buttons
    const leftButtonContainer = document.createElement('div');
    leftButtonContainer.className = 'left-button-container';
    leftButtonContainer.appendChild(editBtn);
    leftButtonContainer.appendChild(deleteBtn);

    // Add Generate Angles button
    const generateAnglesBtn = document.createElement('button');
    generateAnglesBtn.textContent = 'Generate Angles';
    generateAnglesBtn.id = 'generate-angles-btn';
    generateAnglesBtn.addEventListener('click', generateAngles);

    // Add the new buttons to the container
    buttonContainer.appendChild(leftButtonContainer);
    buttonContainer.appendChild(generateAnglesBtn);

    // Disable all inputs
    const inputs = document.querySelectorAll('#product-properties input, #product-properties select');
    inputs.forEach(input => input.disabled = true);
}

function handleEdit() {
    console.log("Edit button clicked");
    
    // Remove Edit, Delete, and Generate Angles buttons
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '';

    // Add back Cancel and Save buttons
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.id = 'cancel-btn';
    cancelBtn.addEventListener('click', handleCancel);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.id = 'save-btn';
    saveBtn.addEventListener('click', handleSave);

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);

    // Enable all inputs
    const inputs = document.querySelectorAll('#product-properties input, #product-properties select');
    inputs.forEach(input => input.disabled = false);
}

function handleDelete() {
    console.log("Delete button clicked");
    // Add your delete logic here
}

$(document).ready(initializeApp);