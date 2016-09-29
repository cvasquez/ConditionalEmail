var snippet,
    variable,
    condition = '',
    htmlContent = $('.htmlContent'),
    variable_val = $('.variable'),
    custom_val = $('.custom_field input'),
    cond_val = $('.condition'),
    eq_val = $('.condition_value input');

// Show input when custom field is selected
$('.variable').on('change', function(){
  if($(this).val() == 'custom') {
    $('.custom_field').css('display', 'inline-block');
  } else {
    $('.custom_field').css('display', 'none');
  }
});

// Show input when equals string or equals number is selected
$('.condition').on('change', function(){
  if($(this).val() == 'eq_string' || $(this).val() == 'eq_num') {
    $('.condition_value').css('display', 'inline-block');
  } else {
    $('.condition_value').css('display', 'none');
  }
});

// Add new conditional statement
function newStatement() {
  var element = $('div[class^="block"]:last'),
      element_count = $('div[class^="block"]').length;
  element.clone().attr('class', 'block'+ (element_count+1)).appendTo('.statementStream');
}

// Build Snippet Code
function buildSnippet(){

  // If custom variable is selected
  if(variable_val.val() == 'custom') {
    variable = 'custom ' + custom_val.val();

  // If standard personalization is selected
  } else if (variable_val.val() != 'custom') {
    variable = variable_val.val();
  }

  // If equals numberif
  if(cond_val.val() == 'eq_string') {
    condition = '==\'' + eq_val.val() + '\'';
  } else if (cond_val.val() == 'eq_num') {
    condition = '==' + eq_val.val();
  } else {
    condition = '';
  }

  // Build snippet
  snippet = '{% if globals().get(\'' + variable + '\')' + condition + ' %}' + htmlContent.val() + '{% end %}'
  console.log(snippet);
}
