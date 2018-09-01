$(window).ready(function(){

    $('.select2').select2()

    $('#repositories').change(function(e) {
    
        axios.post('diff', { repo: $(this).val()}).then((res) => {
    
            if(res.data.length > 0){
                
                $('.nothing').addClass('hidden')
    
                var diff2htmlUi = new Diff2HtmlUI({diff: res.data});
            
                diff2htmlUi.draw('#content-file', {
                    inputFormat: 'diff',
                    outputFormat: 'side-by-side',
                    showFiles: true,
                    matching: 'lines',
                    synchronisedScroll: true
                });
                
                diff2htmlUi.fileListCloseable('#content-file', true);
                
            }else{
                
                $('#content-file').html('')
    
                $('.nothing').removeClass('hidden')
            }
        
        })
        
    })
    
    $('#dumpautoload').click(function(e){
        $(this).attr('disabled', 'true')

        axios.post('dumpautoload', { repo: $('#repositories').val()}).then((res) => {
            
            $('#notifications').text(res.data)

            $('#notifications').addClass('show')

            $(this).removeAttr('disabled')

            setTimeout(function(){ 
                $('#notifications').text('')
                jQuery('#notifications').removeClass('show') 
            }, 2000);

        })
    })

    $('#restart-gulp').click(function(e){
        $(this).attr('disabled', 'true')

        axios.post('restart-gulp', { repo: $('#repositories').val()}).then((res) => {
            
            $('#notifications').text(res.data)

            $('#notifications').addClass('show')

            $(this).removeAttr('disabled')

            setTimeout(function(){ 
                $('#notifications').text('')
                jQuery('#notifications').removeClass('show') 
            }, 2000);

        })
    })
})