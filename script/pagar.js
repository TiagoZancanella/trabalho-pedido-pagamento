

async function atribuirCliqueBotoesPagar() {
    let botoesPagar = document.getElementsByClassName("botaoPagar" );

    Array.from(botoesPagar).forEach((botao) => {
        botao.addEventListener('click', pagarPedido);
    });


}
async function pagarPedido() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Pagamento realizado",
        showConfirmButton: false,
        timer: 1500
      });
    
}

