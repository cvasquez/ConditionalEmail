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
function newStatement(type) {
  var element = $('div[class^="block"]:first'),
      element_count = $('div[class^="block"]').length;
  if(type==0){
    element.clone(true).attr('class', 'block'+ (element_count+1)).appendTo('.statementStream');
    $('.block' + (element_count+1)).find('.statement').html('else');
  } else if(type==1) {
    element.clone(true).attr('class', 'block'+ (element_count+1)).appendTo('.statementStream');
    $('.block' + (element_count+1)).find('.statement .delete-block').css('display', 'block');
  }
}


// Delete block
function removeBlock(elem){
  $(elem).parents('div[class^="block"]').remove();
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

    $('#snippet').html($('#snippet').val() + snippet);
  });

  $('#snippetModal').modal('show');
}
