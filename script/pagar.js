// const url = new URL(window.location.href);
// const params = new URLSearchParams(url.search);
// const pagamentoFinalizar = params.get("id");
// const urlAPI = "https://public.franciscosensaulas.com"







// async function FinalizaPagamento(id) {
//     let url = `${urlAPI}/api/v1/trabalho/pagamentos/${id}`;
//     console.log(url);

//     const resposta = await fetch(url, {method: "DELETE"});
//     if(resposta.ok == false){
//         alert("Não foi possível cancelar");
//         return;
//     }

//     Swal.fire({
//         title: "Cancelado!",
//         text: "Produto cancelado com sucesso!",
//         icon: "success"
//     });

//     consultarPedidos();  
// }



async function atribuirCliqueBotoesPagar() {
    let botoesPagar = document.getElementsByClassName("botaoPagar" );

    Array.from(botoesPagar).forEach((botao) => {
        botao.addEventListener('click', pagarPedido);
    });


}
async function pagarPedido() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Pagamento realizado",
        showConfirmButton: false,
        timer: 1500
      });
    
}

