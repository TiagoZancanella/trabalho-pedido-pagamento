let urlAPI = "https://public.franciscosensaulas.com";

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


    let url = `${urlAPI}/api/v1/trabalho/pedidos`;

    
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível cadastrar")
    } else {
        location.href = '/pedido/index.html';
    }


    
}

