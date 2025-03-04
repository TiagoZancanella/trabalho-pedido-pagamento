let urlAPI = "https://public.franciscosensaulas.com";
let tabelaPedidos = document.getElementById("tabelaPedidos");
let botaoConsultarPedidos = document.getElementById("consultarPedidos");



function atribuirCliqueBotoesApagar() {
    let botoesApagar = document.getElementsByClassName("botao-apagar");

    Array.from(botoesApagar).forEach((botao) => {
        botao.addEventListener('click', apagarPedidos);
    });
}

async function apagarPedidos(evento) {
    const botaoClique = evento.target;
    const pedido = botaoClique.getAttribute("data-pedido");  
    const id =     botaoClique.getAttribute("data-id");
    ;
    Swal.fire({
        
        title: "Deseja cancelar o pedido ?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim cancelar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            apagarPedido(id); 
        }
    });
}

async function apagarPedido(id) {
    let url = `${urlAPI}/api/v1/trabalho/pedidos/${id}`;
    console.log(url);

    const resposta = await fetch(url, {method: "DELETE"});
    if(resposta.ok == false){
        alert("Não foi possível cancelar");
        return;
    }

    Swal.fire({
        title: "Cancelado!",
        text: "Produto cancelado com sucesso!",
        icon: "success"
    });

    consultarPedidos();  
}


async function consultarPedidos() {
    let url = `${urlAPI}/api/v1/trabalho/pedidos`;

    const resposta = await fetch(url);
    if (resposta.ok == false) {
        alert("Não foi possível carregar os dados");
        return;
    }

    const pedidos = await resposta.json();

    let tbody = tabelaPedidos.querySelector("tbody");  
    tbody.innerHTML = "";  

    pedidos.forEach(pedido => {  
        const colunas = `
                <td>${pedido.id}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.valorTotal}</td>
                <td>${pedido.dataPedido}</td>
                <td>
                    <a href="editar.html?id=${pedido.id}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
                    <button 
                        class="btn btn-danger botao-apagar" 
                        data-id="${pedido.id}"
                        data-pedido="${pedido.nome}"
                        data-quantidade="${pedido.quantidade}"
                        data-valorTotal="${pedido.valorTotal}"
                        data-fornecedor="${pedido.fornecedor}"
                        data-dataPedido="${pedido.dataPedido}"
                    ><i class="fas fa-trash"></i> Cancelar </button>
                    <button type="button" class="btn btn-success id="botao-pagar">Pagar</button>
                </td>`;
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;
        tbody.appendChild(linha);

        console.log(pedido);
    });

    atribuirCliqueBotoesApagar();
}



consultarPedidos();

// -----------------------------------------------------------------------



// A função para atribuir o clique aos botões de pagar
function atribuirCliqueBotoesPagar() {
    let botoesPagar = document.getElementsByClassName("botao-pagar");

    // Adiciona o evento de clique a cada botão com a classe "botao-pagar"
    Array.from(botoesPagar).forEach((botao) => {
        botao.addEventListener('click', pagarPedidos); // Alterado para chamar a função correta
    });
}

// A função que será chamada quando o botão de pagar for clicado
async function pagarPedidos(evento) {
    const botaoClique = evento.target;  // O botão que foi clicado

    // Exemplo de como você pode acessar o ID ou outro atributo do botão
    const id = botaoClique.getAttribute("data-id"); // Exemplo de um atributo "data-id"
    
    // Mostrar o alerta de sucesso do SweetAlert2
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Pagamento efetuado com sucesso",
        showConfirmButton: false,
        timer: 1500
    });

    // Aqui você pode adicionar qualquer lógica para continuar o pagamento, se necessário.
    console.log("ID do pagamento:", id);  // Exemplo de como usar o id
}

// Chamada da função que atribui os cliques aos botões ao carregar a página
atribuirCliqueBotoesPagar();
