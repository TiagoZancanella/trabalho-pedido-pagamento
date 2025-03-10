// Selecionando os campos de entrada por meio da classe CSS
const campoProduto = document.querySelector(".produto");
const campoQuantidade = document.querySelector(".quantidade");
const campoFornecedor = document.querySelector(".fornecedor");
const campoPedido = document.getElementsByClassName("dataPedido");

// Obtendo o ID do pedido na URL
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com";

// URL da API para consulta e alteração dos dados

// Função para consultar os dados do pedido a partir do ID
async function consultarDadosPedidosPorId() {
    const urlParaConsultarPedido = `${urlAPI}/api/v1/trabalho/pedidos/${idParaEditar}`;
    console.log(urlParaConsultarPedido);

    const resposta = await fetch(urlParaConsultarPedido);

    // Caso o pedido não seja encontrado
    if (resposta.ok == false) {
        alert("Pedido não encontrado");
        window.location.href = "/pedido/pedidos.html";
        return;
    }

    // Pegando os dados do pedido e preenchendo os campos
    const dadosPedidos = await resposta.json();
    console.log(dadosPedidos);

    // Preenchendo os campos com os dados recebidos
    campoProduto.value = dadosPedidos.produto;
    campoQuantidade.value = dadosPedidos.quantidade;
    campoFornecedor.value = dadosPedidos.fornecedor;
    campoPedido.value = dadosPedidos.dataPedido;
}

// Função para editar os dados do pedido
async function editar(evento) {
    evento.preventDefault(); // Evita o comportamento padrão do botão

    // Pegando os valores inseridos nos campos
    let produto = campoProduto.value;
    let quantidade = campoQuantidade.value;
    let fornecedor = campoFornecedor.value;
    let dataPedido = campoPedido.value;

    // Validação para garantir que os campos não estão vazios
    if (!produto || !quantidade || !fornecedor || !dataPedido) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios',
            text: 'Por favor, preencha todos os campos antes de salvar.',
        });
        return;
    }

    // Estruturando os dados para enviar à API
    const dados = {
        produto: produto,
        quantidade: quantidade,
        fornecedor: fornecedor,
        dataPedido: dataPedido,
    };

    // URL da API para a atualização do pedido
    let url = `${urlAPI}/api/v1/trabalho/pedidos/${idParaEditar}`;

    // Enviando os dados via PUT para a API
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    // Verificando a resposta da API e redirecionando ou mostrando um erro
    if (resposta.ok == false) {
        const erro = await resposta.json();
        Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar',
            text: erro.message || 'Não foi possível salvar as alterações. Tente novamente.',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Alteração realizada',
            text: 'As alterações foram salvas com sucesso.',
        }).then(() => {
            location.href = '/pedido/pedidos.html'; // Redireciona para a lista de pedidos após a alteração
        });

    }

    
}

// Evento para capturar o clique no botão de salvar
const botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener("click", editar);

// Carregando os dados do pedido assim que a página for carregada
consultarDadosPedidosPorId();
