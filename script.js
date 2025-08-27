$(document).ready(function() { //espera que toda a página carregue antes de executar o código
    let postsCarregados = [];

    $('#btnBuscarPosts').click(function(){
        const userId = $("#inputUserId").val();

        if (!userId || userId < 1 || userId > 10 ){
            alert('Informe um valor entre 1 e 10.'); return;
        }

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: "GET",
            success: function(posts){
                postsCarregados = posts.filter(p => p.userId == userId);
                renderizarPosts(postsCarregados);
            },
            error: function() {
                $('#listaPosts').html("<li>Erro ao carregar os posts. Tente novamente.</li>");
            }
        });
    });
    
    function renderizarPosts(lista){
        $('#listaPosts').empty(); //limpa a lista

        lista.forEach(post => {
            const html =`
                <li>
                    <strong>Título</strong>: ${post.title}<br>
                    <strong>Post</strong>: ${post.body}<br>
                    <button class="btnVerComentarios" data-postid="${post.id}">Ver comentários</button><br>
                    <ul class="comentarios"></ul><br>
                </li>
            `;
            $('#listaPosts').append(html);
        });
    }

    $('#btnLimpar').click(function(){
        $('#listaPosts').empty();
        $('#inputUserId').val("");
        $('#inputFiltro').val("");
        postsCarregados = [];
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

    $('#btnFiltro').click(() => {
        const valorFiltro = $('#inputFiltro').val().toLowerCase();
        const filtrados = postsCarregados.filter(p => 
            p.title.toLowerCase().includes(valorFiltro) || 
            p.body.toLowerCase().includes(valorFiltro)
        );

        renderizarPosts(filtrados);
    })

})