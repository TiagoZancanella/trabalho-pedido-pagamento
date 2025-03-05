


const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com"

async function consultarPedidosPorId() {
    const urlParaConsultarPedido = `${urlAPI}/api/v1/trabalho/pedidos/${idParaEditar}`
    console.log(urlParaConsultarPedido);

    const resposta = await fetch(urlParaConsultarPedido);
    if (resposta.ok == false) {
        alert("Empresa não encontrada");
        window.location.href = "/pedidos.html";
        return
    }

    const dadosPedidos = await resposta.json();
    console.log(dadosPedidos);

    campoNome.value = dadosPedidos.nome;
    campoCnpj.value = dadosPedidos.cnpj;


const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const valorTotal = document.getElementById("valorTotal");
const fornecedor = document.getElementById("fornecedor");
const dataPedido = document.getElementById("dataPedido");

let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();

   
    if (produto.value.length < 3) {
        alert("Deve inserir um produto");
        return; 
    }

    if (produto.value.length > 20) {
        alert("O nome do produto deve ter no máximo 20 caracteres");
        return;
    }

   
    const dados = {
        produto: produto.value, 
        quantidade: quantidade.value, 
        valorTotal: valorTotal.value,
        fornecedor: fornecedor.value,
        dataPedido: dataPedido.value
    }


    let url = `${urlAPI}/api/v1/trabalho/pedidos/${id}`;

    
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível cadastrar")
    } else {
        location.href = '/index.html';
    }
}
}
const botaoEditar = document.getElementById("botaoAlterar");
botaoEditar.addEventListener("click", editar);

consultarDadosEmpresaPorId();
