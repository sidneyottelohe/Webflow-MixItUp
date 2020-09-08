const categories = ".ray-checkbox__input"; // filter categories
const toggles    = ".ray-chip.ray-chip--filter"; // featured toggle
const offers     = ".offers-list-item"; // offers


// set category with "data-category" on offer cards
$(offers).each(function(){
	
  // nth offer card
  let card       = this.childNodes[0];
  
  // filter and sort data
  let category   = this.childNodes[1].innerText;
  let featured   = this.childNodes[2];
  let published  = this.childNodes[3].innerText;
  let popularity = this.childNodes[4].innerText;
  
  // sanetize data
  category   = category.split('&').join('').replace(/\s+/g, '-').toLowerCase();
  published  = published.split('&').join('').replace(/\s+/g, '-').toLowerCase();
  popularity = popularity.split('&').join('').replace(/\s+/g, '-').toLowerCase();
  
  // add data as attributes and classes
  $(this).addClass(category);
  $(this).attr("data-category", "." + category);
  $(this).attr("data-published-date", published);
  $(this).attr("data-popularity", popularity);
  
  // if feature has w-condition-invisible class we know it's not featured
  if ( !($(featured).hasClass("w-condition-invisible")) ) {
    featured = featured.childNodes[0].data;
    featured = featured.split('&').join('').replace(/\s+/g, '-').toLowerCase();
    // add state data as class
    $(this).addClass(featured);
  }
});

// add type: reset attribute for clearing filters
$("#clear-filters").attr("type", "reset");
