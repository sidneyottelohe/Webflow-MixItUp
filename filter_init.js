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
            console.log(state)
            // update total # of results in header
            $("#filter-matches").text(mixer.state.totalMatching);
            const activeToggles = mixer.filterGroups[1].activeToggles
            let activeCategories = activeToggles.length;
            console.log(activeToggles)

            // if there's active categories
            if (activeCategories > 0) {
                if ($("#categories-toggle").hasClass("dropdown__toggle--active")) {
                    // set the new state
                    $("#categories-count").text("Categories: " + activeCategories);
                } else {
                    // set the active class and state
                    $("#categories-toggle").addClass("dropdown__toggle--active");
                    $("#categories-count").text("Categories: " + activeCategories);
                }
            }

            // if there's no active categories
            if (activeCategories == 0) {
                if ($("#categories-toggle").hasClass("dropdown__toggle--active")) {
                    // set the new state
                    $("#categories-toggle").toggleClass("dropdown__toggle--active");
                    $("#categories-count").text("Categories");
                }
            }

            // if no filters are set
            toggleResultsHeader(mixer);
            
            // if no results are found
            toggleEmptyState(mixer);
        }
    }
});

// initialize with results header hidden
toggleResultsHeader(mixer)



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


