async function atribuirCliqueBotoesPagar() {
    let botoesPagar = document.getElementsByClassName("botaoPagar" );

    Array.from(botoesPagar).forEach((botao) => {
        botao.addEventListener('click', pagarPedido);
    });


}
async function pagarPedido() {
    console.log("Pagamento processado com sucesso!");
    
    alert("Seu pedido foi pago com sucesso!");
    
}


alert("chegou aqui")