let urlAPI = "https://public.franciscosensaulas.com";

const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const valorTotal = document.getElementById("valorTotal");
const fornecedor = document.getElementById("fornecedor");

// Corrigido para acessar corretamente o valor do primeiro elemento com a classe 'dataPedido'
const dataPedido = document.querySelector(".dataPedido");

let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();

    // Verificando se o produto tem pelo menos 3 caracteres e no máximo 20
    if (produto.value.length < 3) {
        alert("Deve inserir um produto");
        return;
    }

    if (produto.value.length > 20) {
        alert("O nome do produto deve ter no máximo 20 caracteres");
        return;
    }

    // Verificando se o campo 'dataPedido' está vazio
    if (!dataPedido || !dataPedido.value) {
        alert("Deve inserir a data do pedido");
        return;
    }

    const dados = {
        produto: produto.value,
        quantidade: quantidade.value,
        valorTotal: valorTotal.value,
        fornecedor: fornecedor.value,
        dataPedido: dataPedido.value, // Certificando que 'dataPedido' tem um valor
    }

    let url = `${urlAPI}/api/v1/trabalho/pedidos`;

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            alert("Não foi possível cadastrar");
        } else {
            location.href = '/pedido/pedidos.html'; // Redireciona após sucesso
        }
    } catch (error) {
        console.error("Erro ao salvar o pedido:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
}
