const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);
let qntPizzas = 1;
let keyPizzas = 0;
let dataKey = 2;
let valorTamanho = 0;
let pizzasCarrinho = [];
let valorAtualizado = 0;
let valorPadrao = 0;
let tamanhoPizza = 'G';

function atualizarValores() {
    valorPadrao = pizzaJson[keyPizzas].price;
    let valorFinal = pizzaJson[keyPizzas].price - valorTamanho;

    valorAtualizado = valorFinal * qntPizzas;
}

function atualizarTamanho(e) {
    cs('.pizzaInfo--size').forEach((s) => s.classList.remove('selected'));
    e.target.classList.add('selected');

    dataKey = parseInt(e.target.getAttribute('data-key'));

    if (dataKey === 0) {
        valorTamanho = 10;
        tamanhoPizza = 'P';
    } else if (dataKey === 1) {
        tamanhoPizza = 'M';
        valorTamanho = 5;
    } else if (dataKey === 2) {
        tamanhoPizza = 'G';
        valorTamanho = 0;
    }

    atualizarModal(keyPizzas);
}

function listarProdutos() {
    pizzaJson.map((item, index) => {
        let pizzaItem = c('.models .pizza-item').cloneNode(true);

        pizzaItem.setAttribute('data-key', index);
        pizzaItem.querySelector('.pizza-item--img img').src = item.img;
        pizzaItem.querySelector(
            '.pizza-item--price',
        ).innerHTML = `R$ ${item.price.toFixed(2)}`;
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML =
            item.description;

        pizzaItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();

            qntPizzas = 1;

            let key = e.target.closest('.pizza-item').getAttribute('data-key');
            keyPizzas = key;
            atualizarModal(keyPizzas);
            c('.pizzaWindowArea').style.opacity = '0';
            qntPizzas = 1;
            c('.pizzaInfo--qt').innerHTML = qntPizzas;
            c('.pizzaWindowArea').style.display = 'flex';
            setTimeout(() => {
                c('.pizzaWindowArea').style.opacity = '1';
            }, 200);
        });

        c('.pizza-area').append(pizzaItem);
    });
}

function atualizarModal(keyPizzas) {
    let pizzaItem = c('.models .pizza-item');

    atualizarValores();

    c('.pizzaBig img').src = pizzaJson[keyPizzas].img;
    c('.pizzaInfo h1').innerHTML = pizzaJson[keyPizzas].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[keyPizzas].description;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valorAtualizado.toFixed(2)}`;
}

function fecharModal() {
    c('.pizzaWindowArea').style.opacity = '1';
    c('.pizzaWindowArea').style.opacity = '0';

    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
        qntPizzas = 1;
        c('.pizzaInfo--qt').innerHTML = qntPizzas;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valorPadrao.toFixed(2)}`;
    }, 200);
    valorTamanho = 0;

    const sizePadrao = c(`.pizzaInfo--size[data-key="2"]`);
    cs('.pizzaInfo--size').forEach((s) => s.classList.remove('selected'));

    if (sizePadrao) {
        sizePadrao.classList.add('selected');
    }
}

function adicionarProdutosCarrinho() {
    fecharModal();
    c('aside').classList.add('show');

    let pizzaAdicionada = {
        nome: pizzaJson[keyPizzas].name,
        imagem: pizzaJson[keyPizzas].img,
        valor: valorAtualizado,
        quantidade: qntPizzas,
        tamanho: tamanhoPizza,
    };

    pizzasCarrinho.push(pizzaAdicionada);

    console.log(pizzasCarrinho);
    c('.cart').innerHTML = '';

    c('.menu-openner span').innerHTML = pizzasCarrinho.length;

    pizzasCarrinho.map((pedido, index) => {
        let cardPedido = c('.models .cart--item').cloneNode(true);
        atualizarValoresCarrinho();
        cardPedido.setAttribute('data-key', index);
        cardPedido.querySelector('img').src = pedido.imagem;
        cardPedido.querySelector(
            '.cart--item-nome',
        ).innerHTML = `${pedido.nome} (${pedido.tamanho})`;
        cardPedido.querySelector('.cart--item--qt').innerHTML =
            pedido.quantidade;

        cardPedido
            .querySelector('.cart--item-qtmais')
            .addEventListener('click', (e) => {
                console.log('clicouu');
                pedido.quantidade = pedido.quantidade + 1;

                qntPizzas = pedido.quantidade;

                atualizarValores();

                pedido.valor = valorAtualizado;

                cardPedido.querySelector('.cart--item--qt').innerHTML =
                    qntPizzas;

                atualizarValoresCarrinho();
            });
        cardPedido
            .querySelector('.cart--item-qtmenos')
            .addEventListener('click', (e) => {
                pedido.quantidade = pedido.quantidade - 1;

                qntPizzas = pedido.quantidade;
                atualizarValores();

                pedido.valor = valorAtualizado;

                console.log(pizzasCarrinho);

                cardPedido.querySelector('.cart--item--qt').innerHTML =
                    qntPizzas;

                atualizarValoresCarrinho();
            });
        c('.cart').append(cardPedido);
    });
}

function atualizarValoresCarrinho() {
    let subtotal = 0;

    pizzasCarrinho.map((pedido, index) => {
        subtotal = subtotal + pedido.valor;
    });

    c('.sub').innerHTML = subtotal.toFixed(2);

    desconto = (10 / 100) * subtotal;
    c('.des').innerHTML = desconto.toFixed(2);

    total = subtotal - desconto;

    c('.total').innerHTML = total.toFixed(2);

    // cardPedido
    //     .querySelector('.cart--item-qtmais')
    //     .addEventListener('click', (e) => {
    //         qntPizzas++;
    //         cardPedido.querySelector('.cart--item--qt').innerHTML = qntPizzas;
    //         atualizarValores();
    //     });

    // cardPedido
    //     .querySelector('.cart--item-qtmenos')
    //     .addEventListener('click', (e) => {
    //         if (qntPizzas > 0) {
    //             qntPizzas--;
    //             cardPedido.querySelector('.cart--item--qt').innerHTML =
    //                 qntPizzas;
    //             atualizarValores();
    //         }

    //         if (qntPizzas === 0) {
    //             c('.pizzaWindowArea').style.opacity = '1';
    //             c('.pizzaWindowArea').style.opacity = '0';

    //             setTimeout(() => {
    //                 c('.pizzaWindowArea').style.display = 'none';
    //                 qntPizzas = 1;
    //                 cardPedido.querySelector('.cart--item--qt').innerHTML =
    //                     qntPizzas;
    //             }, 200);
    //             valorTamanho = 0;
    //             atualizarTamanho();
    //         }
    //     });
    // let valorPizza = pedido.valor * pedido.quantidade;
    // subtotal += valorPizza;
}

listarProdutos();

cs('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', (e) => {
        atualizarTamanho(e);
    });
});

c('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
    fecharModal();
});
c('.pizzaInfo--addButton').addEventListener('click', (e) => {
    adicionarProdutosCarrinho();
});

c('.pizzaInfo--qtmais').addEventListener('click', (e) => {
    qntPizzas++;
    atualizarValores();
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valorAtualizado.toFixed(2)}`;
    c('.pizzaInfo--qt').innerHTML = qntPizzas;
});
c('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
    if (qntPizzas > 0) {
        qntPizzas--;
        atualizarValores();
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valorAtualizado.toFixed(
            2,
        )}`;
        c('.pizzaInfo--qt').innerHTML = qntPizzas;
    }

    if (qntPizzas === 0) {
        c('.pizzaWindowArea').style.opacity = '1';
        c('.pizzaWindowArea').style.opacity = '0';

        setTimeout(() => {
            c('.pizzaWindowArea').style.display = 'none';
            qntPizzas = 1;
            c('.pizzaInfo--qt').innerHTML = qntPizzas;
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valorPadrao.toFixed(
                2,
            )}`;
        }, 200);
        valorTamanho = 0;

        atualizarTamanho();
    }
});

c('.menu-openner').addEventListener('click', (e) => {
    c('aside').classList.add('show');
    c('aside').style.left = 0;
    c('.menu-closer').addEventListener('click', (e) => {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    });
});
