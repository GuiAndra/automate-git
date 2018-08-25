
$(document).ready(function() {

    axios.get('file').then((res) => {

        var diff2htmlUi = new Diff2HtmlUI({diff: res.data});
        
        diff2htmlUi.draw('#content-file', {inputFormat: 'diff', outputFormat: 'side-by-side', showFiles: true, matching: 'lines', synchronisedScroll: true});
        
        diff2htmlUi.fileListCloseable('#content-file', true);
        // diff2htmlUi.highlightCode('#content-file');
    
    })

})

