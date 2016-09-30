var snippet,
    variable,
    condition = '',
    htmlContent = $('.htmlContent'),
    variable_val = $('.variable'),
    custom_val = $('.custom_field input'),
    cond_val = $('.condition'),
    eq_val = $('.condition_value input'),
    i;



// Show input when custom field is selected
$(' .variable').on('change', function(){
  if($(this).val() == 'custom') {
    $(this).siblings('.custom_field').css('display', 'inline-block');
  } else {
    $(this).siblings('.custom_field').css('display', 'none');
  }
});

// Show input when equals string or equals number is selected
$('.condition').on('change', function(){
  if($(this).val() == 'eq_string' || $(this).val() == 'eq_num') {
    $(this).siblings('.condition_value').css('display', 'inline-block');
  } else {
    $(this).siblings('.condition_value').css('display', 'none');
  }
});


// Add new conditional statement
function newStatement() {
  var element = $('div[class^="block"]:last'),
      element_count = $('div[class^="block"]').length;
  element.clone(true).attr('class', 'block'+ (element_count+1)).appendTo('.statementStream');
}


// Build Snippet Code
function buildSnippet(){
  console.clear();
  $('#snippet').html('');
  $('div[class^="block"]').each(function(){
    i = $('div[class^="block"]').index(this);


    // If custom variable is selected
    if($(this).find('.variable').val() == 'custom') {
      variable = 'custom ' + $(this).find('.custom_field input').val();


    // If standard personalization is selected
    } else if ($(this).find('.variable').val() != 'custom') {
      variable = $(this).find('.variable').val();
    } else {
      variable = 'Error finding variable';
    }


    // If equals numberif
    if($(this).find('.condition').val() == 'eq_string') {
      condition = '==\'' +  $(this).find('.condition_value input').val() + '\'';
    } else if ($(this).find('.condition').val() == 'eq_num') {
      condition = '==' + $(this).find('.condition_value input').val();
    } else {
      condition = '';
    }


    // Build snippet
    snippet = '{% if globals().get(\'' + variable + '\')' + condition + ' %}' + $(this).find('.htmlContent').val() + '{% end %}'
    console.log(snippet);

    $('#snippet').append(snippet);
  });

  $('#snippetModal').modal('show');
}
