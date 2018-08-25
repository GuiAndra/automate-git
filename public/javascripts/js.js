$('.click-item').click(function (e) {
    e.preventDefault()
    
    let file = $(this).data('file')

    axios.post('file', { file: file }).then((res) => {

        var diffHtml = Diff2Html.getPrettyHtml(
            res.data,
            {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'side-by-side'}
          );
        
        document.getElementById("content-file").innerHTML = diffHtml;

    })
})