
$(document).ready(function() {

    axios.get('diff').then((res) => {

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
            $('.nothing').removeClass('hidden')
        }
    
    })

})

