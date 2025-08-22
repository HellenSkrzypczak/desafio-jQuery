$(document).ready(function() { //espera que toda a página carregue antes de executar o código

    $('#btnBuscarPosts').click(function(){
        const userId = $("#inputUserId").val();

        if (!userId || userId < 1 || userId > 10 ){
            alert('Informe um valor entre 1 e 10.')
            return;
        }

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: "GET",
            success: function(posts){
                $('#listaPosts').empty(); //limpa a lista
                posts.forEach(post => {
                    if(post.userId == userId)
                    {
                        //string de HTML
                        const html =`
                            <li>
                                <strong>Título</strong>: ${post.title}<br>
                                <strong>Post</strong>: ${post.body}<br>
                            </li>
                        `;
                        $('#listaPosts').append(html);
                    };
                })
            }
        })
    })


})

