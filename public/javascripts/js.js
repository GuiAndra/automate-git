$('.click-item').click(function (e) {
    e.preventDefault()
    
    let file = $(this).data('file')

    axios.post('file', { file: file }).then((res) => {

        let contentFile = res.data.split('\n')

        let text = ''

        $.each(contentFile, (i, row) => {
            
            if(row.slice(0,1) == '+'){

                text += '<span class="added">' + row + '</span>' + "\n"

            }else if(row.slice(0,1) == '-'){

                text += '<span class="minus">' + row + '</span>' + "\n"

            }else{

                text += '<span>' + row + '</span>' + "\n"

            }
            
        })
        
        $('#content-file').html(text)

    })
})