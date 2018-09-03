$(window).ready(function(){

    $('.select2').select2()

    $('.show-list-files').click(function(e) {
        e.preventDefault();

        let listFiles = $('#list-files')

        if(listFiles.hasClass('show')){

            listFiles.css('position', 'absolute')
            $('#change-visualization').removeClass('col-9')
            listFiles.removeClass('show')

        }else{

            listFiles.css('position', 'relative')
            $('#change-visualization').addClass('col-9')
            listFiles.addClass('show')

        }
    })

    $('#repositories').change(function(e) {

        let repo = $(this).val()

        if(!repo){
            $('#content-files').html('')

            $('.show-list-files').hide()

            $('.nothing').removeClass('hidden')

            return
        }
    
        axios.post('diff', { repo: repo}).then((res) => {
    
            if(res.data.length > 0){
                
                $('.nothing').addClass('hidden')
    
                var diff2htmlUi = new Diff2HtmlUI({diff: res.data});
            
                diff2htmlUi.draw('#content-files', {
                    inputFormat: 'diff',
                    outputFormat: 'side-by-side',
                    showFiles: true,
                    matching: 'lines',
                    synchronisedScroll: true
                });
                
                diff2htmlUi.fileListCloseable('#content-files', true);

                $('.show-list-files').show()
                
            }else{
                
                $('#content-files').html('')

                $('.show-list-files').hide()
    
                $('.nothing').removeClass('hidden')
            }
        
        })

        axios.post('status', { repo: repo}).then((res) => {

            let nameFiles = $('#name-files').find('#dynamic')

            nameFiles.html('')

            let html = ''

            $.each(res.data.files, (i, v) => {
                
                html += '<a href=""  class="file-link link" data-target="' + v.path +'">' + v.path +'</a> <br><br>'
                
            })

            nameFiles.html(html)

            $('.file-link').click(function(e) {
                e.preventDefault()
                
                let repo = $('#repositories').val()
                let file = $(this).data('target')
            
                axios.post('diff', { repo: repo, file: file}).then((res) => {
            
                    if(res.data.length > 0){
                        
                        $('.nothing').addClass('hidden')
            
                        var diff2htmlUi = new Diff2HtmlUI({diff: res.data});
                    
                        diff2htmlUi.draw('#content-files', {
                            inputFormat: 'diff',
                            outputFormat: 'side-by-side',
                            showFiles: true,
                            matching: 'lines',
                            synchronisedScroll: true
                        });
                        
                        diff2htmlUi.fileListCloseable('#content-files', true);
        
                        $('.show-list-files').show()
                        
                    }else{
                        
                        $('#content-files').html('')
        
                        $('.show-list-files').hide()
            
                        $('.nothing').removeClass('hidden')
                    }
                
                })
        
            })
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