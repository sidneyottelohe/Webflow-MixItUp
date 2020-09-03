let container = $('#offers-list');

let mixer = mixitup(container, {
    multifilter: {
        enable: true
    },
    load: {
        sort: 'popularity:desc'
    },
    controls: {
        enable: true,
        toggleDefault: 'all'
    },
    animation: {
        duration: 0
    },
    selectors: {
        target: '.offers-list-item'
    },
    debug: {
        enable: true
    },
    callbacks: {
        onMixClick: function(state, originalEvent) {
            originalEvent.preventDefault();
        },
        onMixEnd: function(state) {
            // update total # of results in header
            $("#filter-matches").text(mixer.state.totalMatching);
            
            let activeCategories = mixer.filterGroups[0].activeToggles;
            console.log("active categories:" + activeCategories);
            
            let activeToggles    = mixer.filterGroups[1].activeToggles;
            console.log("active toggles:" + activeToggles);
            
            // update categories UI
            updateCategoryUI(activeCategories, activeToggles);            

            // if no filters are set
            toggleResultsHeader(mixer);
            
            // if no results are found
            toggleEmptyState(mixer);
        }
    }
});

// initialize with results header hidden
toggleResultsHeader(mixer)



// updates category dropdown toggle
// sets the count and adds/removes active state
function updateUI(categories, toggles) {
    // if there are no active categories
    if (categories == 0) {
        if ($("#categories-toggle").hasClass("dropdown__toggle--active")) {
            // set the new state
            $("#categories-toggle").toggleClass("dropdown__toggle--active");
            $("#categories-count").text("Categories");
        }
    }
    
    // if there are active categories
    if (categories > 0) {
        if ($("#categories-toggle").hasClass("dropdown__toggle--active")) {
            // set the new state
            $("#categories-count").text("Categories: " + categories);
        } else {
            // set the active class and state
            $("#categories-toggle").addClass("dropdown__toggle--active");
            $("#categories-count").text("Categories: " + categories);
        }
    }
}


// toggles results header 
// when we are not filtering
function toggleResultsHeader(mixer) {
    if (mixer.state.totalHide == 0 && mixer.filterGroups[0].activeSelectors.length == 0) {
        $("#filter-results").hide();
    } else {
        $("#filter-results").show();
    }
}

// toggles empty state component
// when no results are found
function toggleEmptyState(mixer) {
    if (mixer.state.hasFailed) {
        $("#offers-empty-state").show()
    } else {
        $("#offers-empty-state").hide()
    }
}


console.log(mixer)


