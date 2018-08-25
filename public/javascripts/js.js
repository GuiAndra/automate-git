$('.click-item').click(function (e) {
    e.preventDefault()
    
    let file = $(this).data('file')

    axios.post('file', { file: file }).then((res) => {
        console.log(res)
        
        $('#content-file').text(res.data)
    })
})