(function($){
  $(function(){
    var $singleRow = $('.works .row'),
        $summary = $('<div class="summary-row"><div class="summary-row-heder">Итого:</div><div class="summary-row-body"><div class="summary-row-element sum-users">0</div><div class="summary-row-element sum-days">0</div><div class="summary-row-element sum-price">0</div></div></div>');

    function _summaryRow() {
        var sumUsers = 0,
            sumDays = 0,
            sumPrice = 0;

        if ( !($('.summary-row').length) ) {
            $singleRow.last().after($summary);
        }

        $singleRow.each(function(){
            if ( $('.field-user-count input', this).val() ) {
                sumUsers += parseInt( $('.field-user-count input', this).val() );
            }
            if ( $('.field-day-count input', this).val() ) {
                sumDays += parseInt( $('.field-day-count input', this).val() );
            }
            if ( $('.field-cost input', this).val() ) {
                sumPrice += parseFloat( $('.field-cost input', this).val() );
            }
        });

        $('.sum-users').html(sumUsers);
        $('.sum-days').html(sumDays);
        $('.sum-price').html(sumPrice.toFixed(2));
    }

    _summaryRow();

    $singleRow.on('change keyup', function(e){

        var $okvedField = $('.field-okved select', this),
            $userCount = $('.field-user-count input', this),
            $dayCount = $('.field-day-count input', this),
            $priceField = $('.field-cost input', this);

        if ($(e.target).attr('id') === $priceField.attr('id')) {
            $(e.target).val('');
        }

        setTimeout(function(){
            if ($okvedField.val() !== '_none' && $userCount.val() && $dayCount.val()) {

                var sum = ( $okvedField.val() / 21 ) * ( $userCount.val() * $dayCount.val() );
                sum = (!isNaN(sum)) ? sum : 0;
                $priceField.val( sum.toFixed(2) ).attr( 'value', sum.toFixed(2) );
            }
            
            _summaryRow();
        }, 5);

    });
  });
})(jQuery);
