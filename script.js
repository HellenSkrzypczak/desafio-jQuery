$(document).ready(function() { //espera que toda a página carregue antes de executar o código
    function carregarPosts(callbak, userId, valorFiltro) {
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: "GET",
            success: function(posts){
                callbak(posts, userId, valorFiltro);
            },
            error: function() {
                $('#listaPosts').html("<li>Erro ao carregar os posts. Tente novamente.</li>");
            }
        });
    }

    $('#btnBuscarPosts').click(function(){
        const userId = $("#inputUserId").val();

        if (!userId || userId < 1 || userId > 10 ){
            alert('Informe um valor entre 1 e 10.')
            return;
        }
        carregarPosts(function(posts, userId) {
            $('#listaPosts').empty(); //limpa a lista

            posts.forEach(post => {
                if(post.userId == userId)
                {
                    const html =`
                        <li>
                            <strong>Título</strong>: ${post.title}<br>
                            <strong>Post</strong>: ${post.body}<br>
                            <button class="btnVerComentarios" data-postid="${post.id}">Ver comentários</button><br>
                            <ul class="comentarios"></ul><br>
                        </li>
                    `;
                    $('#listaPosts').append(html);
                };
            });  
        }, userId);
    });

    $('#btnLimpar').click(function(){
        $('#listaPosts').empty();
        $('#inputUserId').val("");
    })

    $('#listaPosts').on('click', '.btnVerComentarios', function(){
        const idComentario = $(this).data('postid');
        const li = $(this).closest('li'); //closest pega a tag ancestral

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/comments`,
            method: 'GET',
            success: function(comentarios){
                comentarios.forEach(c => {
                    if (c.postId == idComentario){
                        li.find('.comentarios').append(`
                            <li>
                                <strong>${c.name}</strong>: ${c.body}
                            </li>
                        `);
                    }
                });
            },
            error: function() {
                $('.comentarios').html("<li>Erro ao carregar os comentarios. Tente novamente.</li>");
            }
        })
    })

    function filtrarPosts(posts, valorFiltro){
       $('#listaPosts').empty();
        posts.forEach(post => {
            if(post.title.includes(valorFiltro)){
                const html =`
                    <li>
                        <strong>Título</strong>: ${post.title}<br>
                        <strong>Post</strong>: ${post.body}<br>
                        <button class="btnVerComentarios" data-postid="${post.id}">Ver comentários</button><br>
                        <ul class="comentarios"></ul><br>
                    </li>
                `;
                $('#listaPosts').append(html);
            }
            else
            {
                alert('Título inexistente!')
            }
       });
    }

    $('#btnFiltro').click(() => {
        const valorFiltro = $('#inputFiltro').val();
        filtrarPosts(valorFiltro);
    })

})